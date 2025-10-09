import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '@/firebase/config';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';

interface MemberData {
  name: string;
  position: string;
  image: string;
  slug: string;
  email: string;
  office: string;
  linkedin: string;
  googleScholar: string;
  website: string;
  about: string;
  researchInterests: string[];
  additionalInfo: string;
  order?: number;
}

const EditProfile = () => {
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [researchInterestsInput, setResearchInterestsInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!auth.currentUser) return;

      try {
        const membersRef = collection(db, 'members');
        const q = query(membersRef, where('email', '==', auth.currentUser.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data() as MemberData;
          setMemberData(data);
          setResearchInterestsInput(data.researchInterests?.join(', ') || '');
          setPreviewUrl(data.image || '');
        } else {
          setError('Member profile not found');
        }
      } catch (err) {
        console.error('Error fetching member data:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file (JPG, PNG, or WEBP)');
        return;
      }

      // Validate file size (max 5MB)
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

  const uploadToCloudinary = async (file: File, slug: string): Promise<string> => {
    try {
      // Step 1: Get signature from Vercel API
      const signResponse = await fetch(
        import.meta.env.VITE_CLOUDINARY_SIGN_API,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            folder: 'teamMembers',
            public_id: slug,
          }),
        }
      );

      if (!signResponse.ok) {
        throw new Error('Failed to get upload signature');
      }

      const { signature, timestamp, cloud_name, api_key } = await signResponse.json();

      // Step 2: Upload to Cloudinary with signature
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', api_key);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', 'teamMembers');
      formData.append('public_id', slug);
      formData.append('overwrite', 'true');
      formData.append('invalidate', 'true');

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

  const handleImageUpload = async () => {
    if (!selectedFile || !memberData) return;

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      // Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(selectedFile, memberData.slug);

      // Update Firebase
      const membersRef = collection(db, 'members');
      const q = query(membersRef, where('email', '==', auth.currentUser?.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(db, 'members', querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          image: imageUrl
        });

        setMemberData({ ...memberData, image: imageUrl });
        setSelectedFile(null);
        setSuccess('Profile picture updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberData || !auth.currentUser) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const membersRef = collection(db, 'members');
      const q = query(membersRef, where('email', '==', auth.currentUser.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(db, 'members', querySnapshot.docs[0].id);
        
        const researchInterestsArray = researchInterestsInput
          .split(',')
          .map(item => item.trim())
          .filter(item => item.length > 0);

        await updateDoc(docRef, {
          name: memberData.name,
          position: memberData.position,
          office: memberData.office,
          linkedin: memberData.linkedin,
          googleScholar: memberData.googleScholar,
          website: memberData.website,
          about: memberData.about,
          researchInterests: researchInterestsArray,
          additionalInfo: memberData.additionalInfo
        });

        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading your profile...</p>
        </div>
      </Layout>
    );
  }

  if (!memberData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-6">
              <p className="text-red-600 mb-4">{error || 'Profile not found'}</p>
              <Button onClick={handleLogout}>Back to Login</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-secondary">Edit Your Profile</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Member Information</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                Fields marked with * cannot be edited. Contact admin if you need to change them.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                {/* Email (Read-only) */}
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    value={memberData.email}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                </div>

                {/* Slug (Read-only) */}
                <div>
                  <Label htmlFor="slug">Profile Slug *</Label>
                  <Input
                    id="slug"
                    value={memberData.slug}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                </div>

                {/* Profile Picture Upload */}
                <div className="space-y-3">
                  <Label>Profile Picture</Label>
                  
                  {/* Preview */}
                  {previewUrl && (
                    <div className="flex justify-center">
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
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
                    />
                    <p className="text-xs text-gray-500">
                      Max size: 10MB. Supported formats: JPG, PNG, WEBP
                    </p>
                  </div>

                  {/* Upload Button */}
                  {selectedFile && (
                    <Button
                      type="button"
                      onClick={handleImageUpload}
                      disabled={uploading}
                      className="w-full"
                      variant="secondary"
                    >
                      {uploading ? 'Uploading...' : 'Upload New Profile Picture'}
                    </Button>
                  )}
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={memberData.name}
                    onChange={(e) => setMemberData({ ...memberData, name: e.target.value })}
                    required
                  />
                </div>

                {/* Position */}
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={memberData.position}
                    onChange={(e) => setMemberData({ ...memberData, position: e.target.value })}
                    required
                  />
                </div>

                {/* Office */}
                <div>
                  <Label htmlFor="office">Office</Label>
                  <Input
                    id="office"
                    value={memberData.office}
                    onChange={(e) => setMemberData({ ...memberData, office: e.target.value })}
                    placeholder="Room 2.16"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={memberData.linkedin}
                    onChange={(e) => setMemberData({ ...memberData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                {/* Google Scholar */}
                <div>
                  <Label htmlFor="googleScholar">Google Scholar URL</Label>
                  <Input
                    id="googleScholar"
                    value={memberData.googleScholar}
                    onChange={(e) => setMemberData({ ...memberData, googleScholar: e.target.value })}
                    placeholder="https://scholar.google.com/citations?user=..."
                  />
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={memberData.website}
                    onChange={(e) => setMemberData({ ...memberData, website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {/* Additional Info */}
                <div>
                  <Label htmlFor="additionalInfo">Additional Info</Label>
                  <Input
                    id="additionalInfo"
                    value={memberData.additionalInfo}
                    onChange={(e) => setMemberData({ ...memberData, additionalInfo: e.target.value })}
                    placeholder="Co-Advisor: Name or From: University"
                  />
                </div>

                {/* About */}
                <div>
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    value={memberData.about}
                    onChange={(e) => setMemberData({ ...memberData, about: e.target.value })}
                    placeholder="Tell us about yourself, your research, and interests..."
                    rows={6}
                  />
                </div>

                {/* Research Interests */}
                <div>
                  <Label htmlFor="researchInterests">Research Interests</Label>
                  <Input
                    id="researchInterests"
                    value={researchInterestsInput}
                    onChange={(e) => setResearchInterestsInput(e.target.value)}
                    placeholder="Machine Learning, Data Privacy, LLM Security"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple interests with commas
                  </p>
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

                {/* Save Button */}
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;