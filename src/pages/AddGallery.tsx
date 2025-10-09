import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';

const AddGallery = () => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file (JPG, PNG, or WEBP)');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size should be less than 10MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    try {
      // Generate unique filename with timestamp
      const timestamp = Date.now();
      const publicId = `gallery-${timestamp}`;

      // Step 1: Get signature from Vercel API
      const signResponse = await fetch(
        import.meta.env.VITE_CLOUDINARY_SIGN_API,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            folder: 'gallery',
            public_id: publicId,
          }),
        }
      );

      if (!signResponse.ok) {
        throw new Error('Failed to get upload signature');
      }

      const { signature, timestamp: apiTimestamp, cloud_name, api_key } = await signResponse.json();

      // Step 2: Upload to Cloudinary with signature
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', api_key);
      formData.append('timestamp', apiTimestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', 'gallery');
      formData.append('public_id', publicId);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await uploadResponse.json();
      return data.secure_url;
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      throw new Error(err.message || 'Failed to upload image to Cloudinary');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image to upload');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      // Upload image to Cloudinary
      const imagePath = await uploadToCloudinary(selectedFile);

      // Convert date string to Firestore Timestamp
      const selectedDate = new Date(date);
      const firestoreTimestamp = Timestamp.fromDate(selectedDate);

      // Create gallery document
      await addDoc(collection(db, 'gallery'), {
        path: imagePath,
        description: description.trim(),
        date: firestoreTimestamp,
        createdAt: Timestamp.now()
      });

      setSuccess('Gallery photo added successfully!');
      
      // Reset form
      setTimeout(() => {
        setDescription('');
        setDate('');
        setSelectedFile(null);
        setPreviewUrl('');
        setSuccess('');
      }, 2000);

    } catch (err: any) {
      console.error('Error adding gallery photo:', err);
      setError('Failed to add photo: ' + (err.message || ''));
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Add Gallery Photo</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                Upload a photo to the lab gallery with a description
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-3">
                  <Label>Photo *</Label>
                  
                  {/* Preview */}
                  {previewUrl && (
                    <div className="flex justify-center">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full h-auto max-h-96 rounded-lg border-4 border-gray-200"
                      />
                    </div>
                  )}

                  {/* File Input */}
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      disabled={uploading}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Max size: 10MB. Supported formats: JPG, PNG, WEBP
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the photo (e.g., Team dinner at conference 2024)"
                    rows={3}
                    required
                    disabled={uploading}
                  />
                </div>

                {/* Date */}
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    disabled={uploading}
                  />
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
                    {success}
                  </div>
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? 'Uploading Photo...' : 'Add to Gallery'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AddGallery;