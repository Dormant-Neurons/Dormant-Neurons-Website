import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { publications } from '@/data/publications';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Publication = () => {
  const { slug } = useParams();
  const [copiedBibtex, setCopiedBibtex] = useState<string | null>(null);

  const publication = publications.find(pub => pub.slug === slug);

  const copyBibtex = () => {
    if (publication) {
      navigator.clipboard.writeText(publication.bibtex);
      setCopiedBibtex(publication.title);
      setTimeout(() => setCopiedBibtex(null), 2000);
    }
  };

  if (!publication) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary mb-4">Publication not found</h1>
            <Link to="/publications">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Publications
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <JoinTeamButton />
      
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/publications">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Publications
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                  {formatDate(publication.date)}
                </span>
                <span className="text-sm text-primary font-medium">{publication.venue}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                {publication.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                {publication.authors}
              </p>
            </div>

            {/* Abstract */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Abstract</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {publication.abstract}
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="outline" asChild>
                <a href={publication.paperLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read Paper
                </a>
              </Button>
              
              {publication.codeLink && (
                <Button variant="outline" asChild>
                  <a href={publication.codeLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </Button>
              )}
              
              {publication.demoLink && (
                <Button variant="outline" asChild>
                  <a href={publication.demoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </a>
                </Button>
              )}
              
              <Button variant="outline" onClick={copyBibtex}>
                <Copy className="h-4 w-4 mr-2" />
                {copiedBibtex === publication.title ? 'Copied!' : 'Copy BibTeX'}
              </Button>
            </div>

            {/* BibTeX */}
            <Card>
              <CardHeader>
                <CardTitle>Citation</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
                  <code>{publication.bibtex}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Publication;
