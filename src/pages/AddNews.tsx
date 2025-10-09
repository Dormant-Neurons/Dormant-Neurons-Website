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

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Convert date string to Date object then to Firestore Timestamp
      const selectedDate = new Date(date);
      const firestoreTimestamp = Timestamp.fromDate(selectedDate);

      // Create news document
      await addDoc(collection(db, 'news'), {
        title: title.trim(),
        description: description.trim(),
        date: firestoreTimestamp,
        link: link.trim() || '',
        createdAt: Timestamp.now()
      });

      setSuccess('News added successfully!');
      
      // Reset form
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setDate('');
        setLink('');
        setSuccess('');
      }, 2000);

    } catch (err: any) {
      console.error('Error adding news:', err);
      setError('Failed to add news: ' + (err.message || ''));
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
                    <h1 className="text-3xl font-bold text-secondary">Add News</h1>
          </div>
          <Card>
            <CardHeader>
              <p className="text-sm text-gray-500 mt-2">
                Share news and updates with the team
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter news title"
                    required
                    disabled={saving}
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter news description"
                    rows={4}
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

                {/* Link (Optional) */}
                <div>
                  <Label htmlFor="link">Link (Optional)</Label>
                  <Input
                    id="link"
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com"
                    disabled={saving}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Add a link for more information
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

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? 'Adding News...' : 'Add News'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AddNews;