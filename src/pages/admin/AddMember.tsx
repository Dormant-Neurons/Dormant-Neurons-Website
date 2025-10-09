import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '@/firebase/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { isAdmin, generateSlug } from '@/utils/adminUtils';

const AddMember = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [customPosition, setCustomPosition] = useState('');
  const [slug, setSlug] = useState('');
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

  // Auto-generate slug when name changes
  useEffect(() => {
    if (name) {
      setSlug(generateSlug(name));
    }
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    // Validate position is selected
    if (!position || position === '') {
      setError('Please select a position');
      setSaving(false);
      return;
    }

    // Validate custom position if "Other" is selected
    if (position === 'Other' && !customPosition.trim()) {
      setError('Please enter a custom position');
      setSaving(false);
      return;
    }

    try {
      // Get the highest current order number
      const membersRef = collection(db, 'members');
      const snapshot = await getDocs(membersRef);
      const maxOrder = snapshot.docs.reduce((max, doc) => {
        const order = doc.data().order || 0;
        return order > max ? order : max;
      }, 0);

      // Create Firestore document with default values
      const finalPosition = position === 'Other' ? customPosition.trim() : position.trim();
      
      // Use slug as document ID
      const docRef = doc(db, 'members', slug.trim());
      await setDoc(docRef, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        slug: slug.trim(),
        position: finalPosition,
        image: 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg',
        office: '',
        linkedin: '',
        googleScholar: '',
        website: '',
        about: '',
        researchInterests: [],
        additionalInfo: '',
        order: maxOrder + 1
      });

      // Create Firebase Auth account
      // Note: This will log out the current admin, so we'll skip it for now
      // The admin can manually create the auth account in Firebase Console
      // Or we can use Firebase Admin SDK (requires backend)

      setSuccess(`Member ${name} added successfully! Please create their authentication account in Firebase Console.`);
      
      // Reset form
      setTimeout(() => {
        setName('');
        setEmail('');
        setPosition('');
        setCustomPosition('');
        setSlug('');
        setSuccess('');
      }, 3000);

    } catch (err: any) {
      console.error('Error adding member:', err);
      setError('Failed to add member: ' + (err.message || ''));
    } finally {
      setSaving(false);
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-secondary">Add New Team Member</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">New Member Details</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                Name, email, and position are required. Other fields can be edited later by the member.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane.doe@example.com"
                    required
                    disabled={saving}
                  />
                </div>

                {/* Position */}
                <div>
                  <Label htmlFor="position">Position *</Label>
                  <select
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={saving}
                  >
                    <option value="" disabled>Select Position</option>
                    <option value="Group Leader">Group Leader</option>
                    <option value="Faculty">Faculty</option>
                    <option value="PhD Student">PhD Student</option>
                    <option value="Student Assistant">Student Assistant</option>
                    <option value="PhD Intern">PhD Intern</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Custom Position (if Other selected) */}
                {position === 'Other' && (
                  <div>
                    <Label htmlFor="customPosition">Custom Position *</Label>
                    <Input
                      id="customPosition"
                      value={customPosition}
                      onChange={(e) => setCustomPosition(e.target.value)}
                      placeholder="Enter custom position"
                      required
                      disabled={saving}
                    />
                  </div>
                )}

                {/* Slug (Auto-generated) */}
                <div>
                  <Label htmlFor="slug">Profile Slug (Auto-generated)</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="jane-doe"
                    disabled={saving}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Generated from name. You can edit if needed.
                  </p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Default values:</strong>
                  </p>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Profile Image: Default placeholder</li>
                    <li>• All other fields: Empty</li>
                  </ul>
                  <p className="text-sm text-blue-700 mt-2">
                    The member can update these after logging in.
                  </p>
                </div>

                {/* After Adding Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> After adding the member, you need to:
                  </p>
                  <ol className="text-sm text-yellow-700 mt-2 space-y-1 list-decimal list-inside">
                    <li>Go to Firebase Console → Authentication</li>
                    <li>Manually create their auth account with their email</li>
                    <li>Send them a password reset email to set up access</li>
                  </ol>
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
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? 'Adding Member...' : 'Add Member'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AddMember;