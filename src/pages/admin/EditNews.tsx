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
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { isAdmin } from '@/utils/adminUtils';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: any; // Firestore Timestamp
  link?: string;
}

const EditNews = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
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

  // Fetch all news items
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsRef = collection(db, 'news');
        const q = query(newsRef, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as NewsItem[];
        
        setNewsList(items);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news items');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // When a news item is selected, fill the form
  const handleSelectNews = (news: NewsItem) => {
    setSelectedNews(news);
    setTitle(news.title);
    setDescription(news.description);
    
    // Convert Firestore Timestamp to date string for input
    const newsDate = news.date.toDate();
    const dateString = newsDate.toISOString().split('T')[0];
    setDate(dateString);
    
    setLink(news.link || '');
    setError('');
    setSuccess('');
  };

  // Update news
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNews) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const selectedDate = new Date(date);
      const firestoreTimestamp = Timestamp.fromDate(selectedDate);

      const newsRef = doc(db, 'news', selectedNews.id);
      await updateDoc(newsRef, {
        title: title.trim(),
        description: description.trim(),
        date: firestoreTimestamp,
        link: link.trim() || ''
      });

      // Update local state
      setNewsList(prev => prev.map(item => 
        item.id === selectedNews.id 
          ? { ...item, title, description, date: firestoreTimestamp, link }
          : item
      ));

      setSuccess('News updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error updating news:', err);
      setError('Failed to update news: ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  // Delete news
  const handleDelete = async () => {
    if (!selectedNews) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this news item?');
    if (!confirmed) return;

    setSaving(true);
    setError('');

    try {
      const newsRef = doc(db, 'news', selectedNews.id);
      await deleteDoc(newsRef);

      // Remove from local state
      setNewsList(prev => prev.filter(item => item.id !== selectedNews.id));
      
      // Clear form
      setSelectedNews(null);
      setTitle('');
      setDescription('');
      setDate('');
      setLink('');
      
      setSuccess('News deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error deleting news:', err);
      setError('Failed to delete news: ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading news...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <h1 className="text-3xl font-bold text-secondary mb-8">Edit News</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* News List */}
            <Card>
              <CardHeader>
                <CardTitle>All News Items</CardTitle>
                <p className="text-sm text-gray-500 mt-2">
                  Click on a news item to edit it
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {newsList.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No news items found</p>
                  ) : (
                    newsList.map((news) => (
                      <div
                        key={news.id}
                        onClick={() => handleSelectNews(news)}
                        className={`
                          p-4 border-2 rounded-lg cursor-pointer transition-all
                          ${selectedNews?.id === news.id 
                            ? 'border-blue-400 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <Edit className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                          <div className="flex-grow min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {news.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                              {news.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {news.date.toDate().toLocaleDateString()}
                            </p>
                          </div>
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
                  {selectedNews ? 'Edit News Item' : 'Select a News Item'}
                </CardTitle>
                {selectedNews && (
                  <p className="text-sm text-gray-500 mt-2">
                    Update the details below
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {!selectedNews ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      Select a news item from the list to edit
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleUpdate} className="space-y-6">
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

                    {/* Link */}
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
                        {saving ? 'Updating...' : 'Update News'}
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
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditNews;