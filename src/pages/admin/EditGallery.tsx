import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, deleteDoc, Timestamp, orderBy, query } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import { ArrowLeft, Trash2, ImageIcon } from 'lucide-react';
import { isAdmin } from '@/utils/adminUtils';

interface GalleryPhoto {
  id: string;
  path: string;
  description: string;
  date: any; // Firestore Timestamp
}

const EditGallery = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    if (!auth.currentUser || !isAdmin(auth.currentUser.email)) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Fetch all gallery photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const galleryRef = collection(db, 'gallery');
        const q = query(galleryRef, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GalleryPhoto[];
        
        setPhotos(items);
      } catch (err) {
        console.error('Error fetching gallery photos:', err);
        setError('Failed to load gallery photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // When a photo is selected, fill the form
  const handleSelectPhoto = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
    setDescription(photo.description);
    
    // Convert Firestore Timestamp to date string
    const photoDate = photo.date.toDate();
    const dateString = photoDate.toISOString().split('T')[0];
    setDate(dateString);
    
    setError('');
    setSuccess('');
  };

  // Update photo metadata
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhoto) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const selectedDate = new Date(date);
      const firestoreTimestamp = Timestamp.fromDate(selectedDate);

      const photoRef = doc(db, 'gallery', selectedPhoto.id);
      await updateDoc(photoRef, {
        description: description.trim(),
        date: firestoreTimestamp
        // Note: path (image URL) is not updated - can't change uploaded image
      });

      // Update local state
      setPhotos(prev => prev.map(item => 
        item.id === selectedPhoto.id 
          ? { ...item, description, date: firestoreTimestamp }
          : item
      ));

      setSuccess('Photo updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error updating photo:', err);
      setError('Failed to update photo: ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  // Delete photo
  const handleDelete = async () => {
    if (!selectedPhoto) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this photo?');
    if (!confirmed) return;

    setSaving(true);
    setError('');

    try {
      const photoRef = doc(db, 'gallery', selectedPhoto.id);
      await deleteDoc(photoRef);

      // Remove from local state
      setPhotos(prev => prev.filter(item => item.id !== selectedPhoto.id));
      
      // Clear form
      setSelectedPhoto(null);
      setDescription('');
      setDate('');
      
      setSuccess('Photo deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error deleting photo:', err);
      setError('Failed to delete photo: ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading gallery...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <h1 className="text-3xl font-bold text-secondary mb-8">Edit Gallery</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-6">
            {/* Photos Grid */}
            <Card>
              <CardHeader>
                <CardTitle>All Gallery Photos</CardTitle>
                <p className="text-sm text-gray-500 mt-2">
                  Click on a photo to edit it
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 max-h-[700px] overflow-y-auto">
                  {photos.length === 0 ? (
                    <p className="text-gray-500 text-center py-8 col-span-2">No photos found</p>
                  ) : (
                    photos.map((photo) => (
                      <div
                        key={photo.id}
                        onClick={() => handleSelectPhoto(photo)}
                        className={`
                          relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all
                          aspect-square
                          ${selectedPhoto?.id === photo.id 
                            ? 'border-blue-400 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <img
                          src={photo.path}
                          alt={photo.description}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/400x400?text=Image+Not+Found";
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                          <p className="text-white text-xs line-clamp-2">
                            {photo.description}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Edit Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedPhoto ? 'Edit Photo' : 'Select a Photo'}
                </CardTitle>
                {selectedPhoto && (
                  <p className="text-sm text-gray-500 mt-2">
                    Update the photo details below
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {!selectedPhoto ? (
                  <div className="text-center py-12">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Select a photo from the gallery to edit its details
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Large Photo Preview */}
                    <div className="rounded-lg overflow-hidden border-4 border-gray-200">
                      <img
                        src={selectedPhoto.path}
                        alt={selectedPhoto.description}
                        className="w-full h-auto"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
                        }}
                      />
                    </div>

                    {/* Photo URL (Read-only) */}
                    <div>
                      <Label>Image URL (Cannot be changed)</Label>
                      <Input
                        value={selectedPhoto.path}
                        disabled
                        className="bg-gray-100 text-xs"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        To change the image, delete this photo and upload a new one
                      </p>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-4">
                      {/* Description */}
                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe the photo"
                          rows={3}
                          required
                          disabled={saving}
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
                          disabled={saving}
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

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button 
                          type="submit" 
                          className="flex-grow"
                          disabled={saving}
                        >
                          {saving ? 'Updating...' : 'Update Photo'}
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={handleDelete}
                          disabled={saving}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditGallery;