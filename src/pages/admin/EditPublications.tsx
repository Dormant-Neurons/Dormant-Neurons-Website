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

interface Publication {
  id: string;
  slug: string;
  title: string;
  authors: string;
  shortAuthors: string;
  date: any; // Firestore Timestamp
  venue: string;
  paperLink: string;
  codeLink?: string;
  demoLink?: string;
  bibtex: string;
  abstract: string;
}

const EditPublications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [shortAuthors, setShortAuthors] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [paperLink, setPaperLink] = useState('');
  const [codeLink, setCodeLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [bibtex, setBibtex] = useState('');
  const [abstract, setAbstract] = useState('');
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

  // Fetch all publications
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const pubsRef = collection(db, 'publications');
        const q = query(pubsRef, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Publication[];
        
        setPublications(items);
      } catch (err) {
        console.error('Error fetching publications:', err);
        setError('Failed to load publications');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  // Auto-generate shortAuthors when authors change
  useEffect(() => {
    if (authors) {
      const generated = generateShortAuthors(authors);
      setShortAuthors(generated);
    }
  }, [authors]);

  const generateShortAuthors = (authors: string): string => {
    const authorList = authors.split(',').map(a => a.trim());
    
    if (authorList.length === 1) {
      return authorList[0];
    } else {
      return `${authorList[0]} et al.`;
    }
  };

  // When a publication is selected, fill the form
  const handleSelectPublication = (publication: Publication) => {
    setSelectedPublication(publication);
    setTitle(publication.title);
    setAuthors(publication.authors);
    setShortAuthors(publication.shortAuthors);
    
    // Convert Firestore Timestamp to date string
    const pubDate = publication.date.toDate();
    const dateString = pubDate.toISOString().split('T')[0];
    setDate(dateString);
    
    setVenue(publication.venue);
    setPaperLink(publication.paperLink);
    setCodeLink(publication.codeLink || '');
    setDemoLink(publication.demoLink || '');
    setBibtex(publication.bibtex);
    setAbstract(publication.abstract);
    setError('');
    setSuccess('');
  };

  // Update publication
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPublication) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const selectedDate = new Date(date);
      const firestoreTimestamp = Timestamp.fromDate(selectedDate);

      const pubRef = doc(db, 'publications', selectedPublication.id);
      await updateDoc(pubRef, {
        title: title.trim(),
        authors: authors.trim(),
        shortAuthors: shortAuthors.trim(),
        date: firestoreTimestamp,
        venue: venue.trim(),
        paperLink: paperLink.trim(),
        codeLink: codeLink.trim() || '',
        demoLink: demoLink.trim() || '',
        bibtex: bibtex.trim(),
        abstract: abstract.trim()
      });

      // Update local state
      setPublications(prev => prev.map(item => 
        item.id === selectedPublication.id 
          ? { 
              ...item, 
              title, 
              authors, 
              shortAuthors, 
              date: firestoreTimestamp, 
              venue, 
              paperLink, 
              codeLink, 
              demoLink, 
              bibtex, 
              abstract 
            }
          : item
      ));

      setSuccess('Publication updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error updating publication:', err);
      setError('Failed to update publication: ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  // Delete publication
  const handleDelete = async () => {
    if (!selectedPublication) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete "${selectedPublication.title}"?`);
    if (!confirmed) return;

    setSaving(true);
    setError('');

    try {
      const pubRef = doc(db, 'publications', selectedPublication.id);
      await deleteDoc(pubRef);

      // Remove from local state
      setPublications(prev => prev.filter(item => item.id !== selectedPublication.id));
      
      // Clear form
      setSelectedPublication(null);
      setTitle('');
      setAuthors('');
      setShortAuthors('');
      setDate('');
      setVenue('');
      setPaperLink('');
      setCodeLink('');
      setDemoLink('');
      setBibtex('');
      setAbstract('');
      
      setSuccess('Publication deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error deleting publication:', err);
      setError('Failed to delete publication: ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading publications...</p>
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

          <h1 className="text-3xl font-bold text-secondary mb-8">Edit Publications</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
            {/* Publications List */}
            <Card>
              <CardHeader>
                <CardTitle>All Publications</CardTitle>
                <p className="text-sm text-gray-500 mt-2">
                  Click on a publication to edit it
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[700px] overflow-y-auto">
                  {publications.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No publications found</p>
                  ) : (
                    publications.map((pub) => (
                      <div
                        key={pub.id}
                        onClick={() => handleSelectPublication(pub)}
                        className={`
                          p-4 border-2 rounded-lg cursor-pointer transition-all
                          ${selectedPublication?.id === pub.id 
                            ? 'border-blue-400 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <Edit className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                          <div className="flex-grow min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                              {pub.title}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">
                              {pub.shortAuthors}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {pub.venue} • {pub.date.toDate().getFullYear()}
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
                  {selectedPublication ? 'Edit Publication' : 'Select a Publication'}
                </CardTitle>
                {selectedPublication && (
                  <p className="text-sm text-gray-500 mt-2">
                    Update the details below
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {!selectedPublication ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      Select a publication from the list to edit
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleUpdate} className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                    {/* Title */}
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter publication title"
                        required
                        disabled={saving}
                      />
                    </div>

                    {/* Authors */}
                    <div>
                      <Label htmlFor="authors">Authors *</Label>
                      <Input
                        id="authors"
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                        placeholder="Jane Doe, John Smith, Alice Johnson"
                        required
                        disabled={saving}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Comma-separated list of authors
                      </p>
                    </div>

                    {/* Short Authors (Auto-generated) */}
                    <div>
                      <Label htmlFor="shortAuthors">Short Authors (Auto-generated)</Label>
                      <Input
                        id="shortAuthors"
                        value={shortAuthors}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <Label htmlFor="date">Publication Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        disabled={saving}
                      />
                    </div>

                    {/* Venue */}
                    <div>
                      <Label htmlFor="venue">Venue *</Label>
                      <Input
                        id="venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        placeholder="Conference or Journal name"
                        required
                        disabled={saving}
                      />
                    </div>

                    {/* Paper Link */}
                    <div>
                      <Label htmlFor="paperLink">Paper Link *</Label>
                      <Input
                        id="paperLink"
                        type="url"
                        value={paperLink}
                        onChange={(e) => setPaperLink(e.target.value)}
                        placeholder="https://arxiv.org/abs/..."
                        required
                        disabled={saving}
                      />
                    </div>

                    {/* Code Link */}
                    <div>
                      <Label htmlFor="codeLink">Code Link (Optional)</Label>
                      <Input
                        id="codeLink"
                        type="url"
                        value={codeLink}
                        onChange={(e) => setCodeLink(e.target.value)}
                        placeholder="https://github.com/..."
                        disabled={saving}
                      />
                    </div>

                    {/* Demo Link */}
                    <div>
                      <Label htmlFor="demoLink">Demo Link (Optional)</Label>
                      <Input
                        id="demoLink"
                        type="url"
                        value={demoLink}
                        onChange={(e) => setDemoLink(e.target.value)}
                        placeholder="https://demo-site.com"
                        disabled={saving}
                      />
                    </div>

                    {/* Abstract */}
                    <div>
                      <Label htmlFor="abstract">Abstract *</Label>
                      <Textarea
                        id="abstract"
                        value={abstract}
                        onChange={(e) => setAbstract(e.target.value)}
                        placeholder="Enter the abstract"
                        rows={4}
                        required
                        disabled={saving}
                      />
                    </div>

                    {/* BibTeX */}
                    <div>
                      <Label htmlFor="bibtex">BibTeX *</Label>
                      <Textarea
                        id="bibtex"
                        value={bibtex}
                        onChange={(e) => setBibtex(e.target.value)}
                        placeholder="@inproceedings{...}"
                        rows={6}
                        required
                        disabled={saving}
                        className="font-mono text-sm"
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
                    <div className="flex gap-3 pt-4">
                      <Button 
                        type="submit" 
                        className="flex-grow"
                        disabled={saving}
                      >
                        {saving ? 'Updating...' : 'Update Publication'}
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

export default EditPublications;