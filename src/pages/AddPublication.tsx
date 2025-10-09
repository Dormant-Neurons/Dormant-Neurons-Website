import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';

const AddPublication = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [paperLink, setPaperLink] = useState('');
  const [codeLink, setCodeLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [bibtex, setBibtex] = useState('');
  const [abstract, setAbstract] = useState('');
  const [slug, setSlug] = useState('');
  const [shortAuthors, setShortAuthors] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Generate slug when title, authors, or date changes
  useEffect(() => {
    if (title && authors && date) {
      const generatedSlug = generateSlug(title, authors, date);
      setSlug(generatedSlug);
    }
  }, [title, authors, date]);

  // Generate shortAuthors when authors change
  useEffect(() => {
    if (authors) {
      const generated = generateShortAuthors(authors);
      setShortAuthors(generated);
    }
  }, [authors]);

  const generateSlug = (title: string, authors: string, date: string): string => {
    const year = new Date(date).getFullYear();
    const firstAuthor = authors.split(',')[0].trim().split(' ').pop()?.toLowerCase() || ''; // Last name
    const titleWords = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special chars
      .split(/\s+/)
      .filter(word => word.length > 3) // Only meaningful words
      .slice(0, 3) // First 3 words
      .join('-');
    
    return `${year}-${firstAuthor}-${titleWords}`;
  };

  const generateShortAuthors = (authors: string): string => {
    const authorList = authors.split(',').map(a => a.trim());
    
    if (authorList.length === 1) {
      // Single author - just return their name
      return authorList[0];
    } else {
      // Multiple authors - "First Author et al."
      return `${authorList[0]} et al.`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const selectedDate = new Date(date);
      const firestoreTimestamp = Timestamp.fromDate(selectedDate);

      // Use slug as document ID
      const docRef = doc(db, 'publications', slug);
      
      await setDoc(docRef, {
        slug: slug,
        title: title.trim(),
        authors: authors.trim(),
        shortAuthors: shortAuthors.trim(),
        date: firestoreTimestamp,
        venue: venue.trim(),
        paperLink: paperLink.trim(),
        codeLink: codeLink.trim() || '',
        demoLink: demoLink.trim() || '',
        bibtex: bibtex.trim(),
        abstract: abstract.trim(),
        createdAt: Timestamp.now()
      });

      setSuccess('Publication added successfully!');
      
      // Reset form
      setTimeout(() => {
        setTitle('');
        setAuthors('');
        setDate('');
        setVenue('');
        setPaperLink('');
        setCodeLink('');
        setDemoLink('');
        setBibtex('');
        setAbstract('');
        setSlug('');
        setShortAuthors('');
        setSuccess('');
      }, 2000);

    } catch (err: any) {
      console.error('Error adding publication:', err);
      setError('Failed to add publication: ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-secondary">Add Publication</h1>
          </div>
          <Card>
            <CardHeader>
              <p className="text-sm text-gray-500 mt-2">
                Add a new research publication.
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

                {/* Short Authors (Auto-generated, Read-only) */}
                {shortAuthors && (
                  <div>
                    <Label htmlFor="shortAuthors">Short Authors (Auto-generated)</Label>
                    <Input
                      id="shortAuthors"
                      value={shortAuthors}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                )}

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

                {/* Slug (Auto-generated, Read-only) */}
                {slug && (
                  <div>
                    <Label htmlFor="slug">Slug (Auto-generated)</Label>
                    <Input
                      id="slug"
                      value={slug}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be the document ID in Firestore
                    </p>
                  </div>
                )}

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

                {/* Code Link (Optional) */}
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

                {/* Demo Link (Optional) */}
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
                    placeholder="Enter the abstract of the publication"
                    rows={6}
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
                    rows={8}
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

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? 'Adding Publication...' : 'Add Publication'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AddPublication;