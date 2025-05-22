
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, ExternalLink, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const Publication = () => {
  const { slug } = useParams();
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const publicationsData: Record<string, any> = {
    'interpretable-neural-networks-2025': {
      title: "Towards Interpretable Neural Networks: A Comprehensive Framework",
      authors: [
        { name: "Lea Schönherr", affiliation: "CISPA", isCorresponding: true },
        { name: "Alex Mueller", affiliation: "CISPA" },
        { name: "Maria Santos", affiliation: "CISPA" },
        { name: "James Chen", affiliation: "CISPA" }
      ],
      venue: "International Conference on Machine Learning (ICML) 2025",
      year: "2025",
      abstract: "Deep neural networks have achieved remarkable success across various domains, yet their lack of interpretability remains a significant barrier to adoption in critical applications. This paper presents a comprehensive framework for creating interpretable neural networks without sacrificing performance. Our approach combines novel architectural designs with post-hoc explanation methods to provide both global and local interpretability. We introduce a new metric for measuring interpretability and demonstrate that our framework maintains competitive performance while significantly improving model transparency. Extensive experiments on benchmark datasets show that our interpretable models achieve 95% of the performance of their black-box counterparts while providing meaningful explanations for their decisions.",
      paperLink: "https://arxiv.org/abs/example1",
      codeLink: "https://github.com/dormant-neurons/interpretable-nn",
      demoLink: "https://demo.dormant-neurons.org/interpretable-nn",
      bibtex: "@inproceedings{schoenherr2025interpretable,\n  title={Towards Interpretable Neural Networks: A Comprehensive Framework},\n  author={Schönherr, Lea and Mueller, Alex and Santos, Maria and Chen, James},\n  booktitle={International Conference on Machine Learning},\n  year={2025},\n  organization={PMLR}\n}",
      keywords: ["Interpretable AI", "Neural Networks", "Explainability", "Machine Learning"]
    },
    'fairness-aware-deep-learning-2024': {
      title: "Fairness-Aware Deep Learning: Methods and Applications",
      authors: [
        { name: "Alex Mueller", affiliation: "CISPA", isCorresponding: true },
        { name: "Maria Santos", affiliation: "CISPA" },
        { name: "Lea Schönherr", affiliation: "CISPA" }
      ],
      venue: "Advances in Neural Information Processing Systems (NeurIPS) 2024",
      year: "2024",
      abstract: "As deep learning systems become increasingly prevalent in high-stakes decision-making, ensuring fairness across different demographic groups has become crucial. This work proposes novel methods for incorporating fairness constraints into deep learning models across various applications. We introduce a unified framework that can handle multiple fairness definitions simultaneously and develop efficient optimization algorithms that maintain model performance while ensuring fairness. Our approach is evaluated on several real-world datasets including hiring, lending, and criminal justice applications, demonstrating significant improvements in fairness metrics while maintaining competitive accuracy.",
      paperLink: "https://arxiv.org/abs/example2",
      codeLink: "https://github.com/dormant-neurons/fairness-dl",
      bibtex: "@inproceedings{mueller2024fairness,\n  title={Fairness-Aware Deep Learning: Methods and Applications},\n  author={Mueller, Alex and Santos, Maria and Schönherr, Lea},\n  booktitle={Advances in Neural Information Processing Systems},\n  year={2024}\n}",
      keywords: ["Algorithmic Fairness", "Deep Learning", "Bias Mitigation", "Ethics in AI"]
    }
  };

  const publication = publicationsData[slug || ''];

  const copyBibtex = () => {
    navigator.clipboard.writeText(publication.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
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
              <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4 leading-tight">
                {publication.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-lg text-primary font-medium">{publication.venue}</span>
                <span className="text-gray-500">•</span>
                <span className="text-lg text-gray-600">{publication.year}</span>
              </div>

              {/* Authors */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Authors</h3>
                <div className="flex flex-wrap gap-2">
                  {publication.authors.map((author: any, index: number) => (
                    <span key={index} className="text-gray-700">
                      {author.name}
                      {author.isCorresponding && <sup className="text-primary">*</sup>}
                      <span className="text-gray-500 text-sm ml-1">({author.affiliation})</span>
                      {index < publication.authors.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">* Corresponding author</p>
              </div>

              {/* Keywords */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-secondary mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {publication.keywords.map((keyword: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Button asChild>
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
                  {copiedBibtex ? 'Copied!' : 'Copy BibTeX'}
                </Button>
              </div>
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
