import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { isAdmin } from '@/utils/adminUtils';

interface Member {
  id: string;
  name: string;
  position: string;
  email: string;
  slug: string;
  image: string;
  office: string;
  linkedin: string;
  googleScholar: string;
  website: string;
  about: string;
  researchInterests: string[];
  additionalInfo: string;
  order: number;
}

const EditMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    slug: '',
    image: '',
    office: '',
    linkedin: '',
    googleScholar: '',
    website: '',
    about: '',
    additionalInfo: ''
  });
  const [researchInterestsInput, setResearchInterestsInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    if (!auth.currentUser || !isAdmin(auth.currentUser.email)) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Fetch all members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersRef = collection(db, 'members');
        const q = query(membersRef, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        const membersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Member[];
        
        setMembers(membersList);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // When a member is selected, fill the form
  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      email: member.email,
      slug: member.slug,
      image: member.image,
      office: member.office || '',
      linkedin: member.linkedin || '',
      googleScholar: member.googleScholar || '',
      website: member.website || '',
      about: member.about || '',
      additionalInfo: member.additionalInfo || ''
    });
    setResearchInterestsInput(member.researchInterests?.join(', ') || '');
    setPreviewUrl(member.image || ''); // Set preview to current image
    setSelectedFile(null); // Clear any previously selected file
    setError('');
    setSuccess('');
  };

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
    if (!selectedFile || !selectedMember) return;

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      // Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(selectedFile, formData.slug);

      // Update Firebase
      const memberRef = doc(db, 'members', selectedMember.id);
      await updateDoc(memberRef, {
        image: imageUrl
      });

      // Update local states
      setFormData({ ...formData, image: imageUrl });
      setMembers(prev => prev.map(m => 
        m.id === selectedMember.id ? { ...m, image: imageUrl } : m
      ));
      setSelectedFile(null);
      setSuccess('Profile picture updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Update member
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const researchInterestsArray = researchInterestsInput
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const memberRef = doc(db, 'members', selectedMember.id);
      await updateDoc(memberRef, {
        name: formData.name.trim(),
        position: formData.position.trim(),
        email: formData.email.trim(),
        slug: formData.slug.trim(),
        image: formData.image.trim(),
        office: formData.office.trim(),
        linkedin: formData.linkedin.trim(),
        googleScholar: formData.googleScholar.trim(),
        website: formData.website.trim(),
        about: formData.about.trim(),
        researchInterests: researchInterestsArray,
        additionalInfo: formData.additionalInfo.trim()
        // Note: order is not updated here to prevent accidental changes
      });

      // Update local state
      setMembers(prev => prev.map(item => 
        item.id === selectedMember.id 
          ? { ...item, ...formData, researchInterests: researchInterestsArray }
          : item
      ));

      setSuccess('Member updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error updating member:', err);
      setError('Failed to update member: ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  // Delete member
  const handleDelete = async () => {
    if (!selectedMember) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete ${selectedMember.name}? This action cannot be undone.`);
    if (!confirmed) return;

    setSaving(true);
    setError('');

    try {
      const memberRef = doc(db, 'members', selectedMember.id);
      await deleteDoc(memberRef);

      // Remove from local state
      setMembers(prev => prev.filter(item => item.id !== selectedMember.id));
      
      // Clear form
      setSelectedMember(null);
      setFormData({
        name: '',
        position: '',
        email: '',
        slug: '',
        image: '',
        office: '',
        linkedin: '',
        googleScholar: '',
        website: '',
        about: '',
        additionalInfo: ''
      });
      setResearchInterestsInput('');
      
      setSuccess('Member deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error deleting member:', err);
      setError('Failed to delete member: ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading members...</p>
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

          <h1 className="text-3xl font-bold text-secondary mb-8">Edit Members</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle>All Team Members</CardTitle>
                <p className="text-sm text-gray-500 mt-2">
                  Click on a member to edit their profile
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[700px] overflow-y-auto">
                  {members.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No members found</p>
                  ) : (
                    members.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => handleSelectMember(member)}
                        className={`
                          p-4 border-2 rounded-lg cursor-pointer transition-all
                          ${selectedMember?.id === member.id 
                            ? 'border-blue-400 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg";
                            }}
                          />
                          <div className="flex-grow min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {member.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {member.position}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {member.email}
                            </p>
                          </div>
                          <Edit className="w-5 h-5 text-gray-400 flex-shrink-0" />
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
                  {selectedMember ? `Edit ${selectedMember.name}` : 'Select a Member'}
                </CardTitle>
                {selectedMember && (
                  <p className="text-sm text-gray-500 mt-2">
                    Update member details below
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {!selectedMember ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      Select a member from the list to edit their profile
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleUpdate} className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
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
                            onError={(e) => {
                              e.currentTarget.src = "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg";
                            }}
                          />
                        </div>
                      )}

                      {/* File Input */}
                      <div className="flex flex-col gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          disabled={uploading || saving}
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
                          disabled={uploading || saving}
                          className="w-full"
                          variant="secondary"
                        >
                          {uploading ? 'Uploading...' : 'Upload New Profile Picture'}
                        </Button>
                      )}
                    </div>

                    {/* Name */}
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={saving || uploading}
                      />
                    </div>

                    {/* Position */}
                    <div>
                      <Label htmlFor="position">Position *</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        required
                        disabled={saving}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={saving}
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <Label htmlFor="slug">Slug *</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                        disabled={saving || uploading}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Warning: Changing slug will break existing profile links and affect image uploads
                      </p>
                    </div>

                    {/* Office */}
                    <div>
                      <Label htmlFor="office">Office</Label>
                      <Input
                        id="office"
                        value={formData.office}
                        onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                        placeholder="Room 2.16"
                        disabled={saving || uploading}
                      />
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <Label htmlFor="linkedin">LinkedIn URL</Label>
                      <Input
                        id="linkedin"
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        disabled={saving || uploading}
                      />
                    </div>

                    {/* Google Scholar */}
                    <div>
                      <Label htmlFor="googleScholar">Google Scholar URL</Label>
                      <Input
                        id="googleScholar"
                        type="url"
                        value={formData.googleScholar}
                        onChange={(e) => setFormData({ ...formData, googleScholar: e.target.value })}
                        placeholder="https://scholar.google.com/..."
                        disabled={saving || uploading}
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <Label htmlFor="website">Personal Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yoursite.com"
                        disabled={saving || uploading}
                      />
                    </div>

                    {/* Additional Info */}
                    <div>
                      <Label htmlFor="additionalInfo">Additional Info</Label>
                      <Input
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        placeholder="Co-Advisor: Name or From: University"
                        disabled={saving || uploading}
                      />
                    </div>

                    {/* About */}
                    <div>
                      <Label htmlFor="about">About</Label>
                      <Textarea
                        id="about"
                        value={formData.about}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                        placeholder="Bio and research interests..."
                        rows={4}
                        disabled={saving || uploading}
                      />
                    </div>

                    {/* Research Interests */}
                    <div>
                      <Label htmlFor="researchInterests">Research Interests</Label>
                      <Input
                        id="researchInterests"
                        value={researchInterestsInput}
                        onChange={(e) => setResearchInterestsInput(e.target.value)}
                        placeholder="Machine Learning, AI, Security"
                        disabled={saving || uploading}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Comma-separated list
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

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button 
                        type="submit" 
                        className="flex-grow"
                        disabled={saving || uploading}
                      >
                        {saving ? 'Updating...' : 'Update Member'}
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={saving || uploading}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditMembers;