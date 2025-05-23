import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, ExternalLink, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { publications } from '@/data/publications';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedBibtex, setCopiedBibtex] = useState<string | null>(null);

  const filteredPublications = publications
    .filter(pub =>
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.venue.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const copyBibtex = (bibtex: string, title: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(title);
    setTimeout(() => setCopiedBibtex(null), 2000);
  };

  return (
    <Layout>
      <JoinTeamButton />
      
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Publications
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Explore our research contributions to the field of trustworthy AI, covering 
              fairness, explainability, and safety in artificial intelligence systems.
            </p>
            
            {/* Search */}
            <div className="max-w relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Publications List */}
          <div className="mx-auto space-y-6">
            {filteredPublications.map((pub) => (
              <Card key={pub.slug} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {formatDate(pub.date)}
                        </span>
                        <span className="text-sm text-primary font-medium">{pub.venue}</span>
                      </div>
                      
                      <Link to={`/publications/${pub.slug}`}>
                        <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 hover:text-primary transition-colors">
                          {pub.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 mb-3 font-medium">
                        {pub.shortAuthors}
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-2 lg:flex-shrink-0">
                      <Button variant="outline" size="sm" asChild>
                        <a href={pub.paperLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Paper
                        </a>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyBibtex(pub.bibtex, pub.title)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {copiedBibtex === pub.title ? 'Copied!' : 'BibTeX'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No publications found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Publications;
