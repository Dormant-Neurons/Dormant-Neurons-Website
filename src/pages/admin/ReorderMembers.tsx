import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { ArrowLeft, GripVertical } from 'lucide-react';
import { isAdmin } from '@/utils/adminUtils';

interface Member {
  id: string;
  name: string;
  position: string;
  email: string;
  order: number;
}

const ReorderMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    if (!auth.currentUser || !isAdmin(auth.currentUser.email)) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersRef = collection(db, 'members');
        const snapshot = await getDocs(membersRef);
        const membersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Member));

        // Sort by current order
        membersList.sort((a, b) => (a.order || 999) - (b.order || 999));
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

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === index) return;

    const newMembers = [...members];
    const draggedMember = newMembers[draggedIndex];
    
    // Remove from old position
    newMembers.splice(draggedIndex, 1);
    // Insert at new position
    newMembers.splice(index, 0, draggedMember);
    
    setMembers(newMembers);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSaveOrder = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Update order for all members
      const updatePromises = members.map((member, index) => {
        const docRef = doc(db, 'members', member.id);
        return updateDoc(docRef, { order: index + 1 });
      });

      await Promise.all(updatePromises);
      setSuccess('Order updated successfully!');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error updating order:', err);
      setError('Failed to update order: ' + (err.message || ''));
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
              <CardTitle className="text-2xl">Reorder Team Members</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                Drag and drop to reorder. Top member will appear first on the team page.
              </p>
            </CardHeader>
            <CardContent>
              {/* Members List */}
              <div className="space-y-2 mb-6">
                {members.map((member, index) => (
                  <div
                    key={member.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`
                      flex items-center gap-3 p-4 bg-white border-2 rounded-lg
                      cursor-move hover:bg-gray-50 transition-colors
                      ${draggedIndex === index ? 'opacity-50 border-blue-400' : 'border-gray-200'}
                    `}
                  >
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.position}</p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {member.email}
                    </div>
                  </div>
                ))}
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm mb-4">
                  {success}
                </div>
              )}

              {/* Save Button */}
              <Button
                onClick={handleSaveOrder}
                className="w-full"
                disabled={saving}
              >
                {saving ? 'Saving Order...' : 'Save Order'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ReorderMembers;