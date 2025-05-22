
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, ExternalLink, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedBibtex, setCopiedBibtex] = useState<string | null>(null);

  const publications = [
    {
      date: "2025",
      title: "Towards Interpretable Neural Networks: A Comprehensive Framework",
      authors: "Schönherr, L., Mueller, A., Santos, M., Chen, J.",
      venue: "ICML 2025",
      link: "https://arxiv.org/abs/example1",
      bibtex: "@inproceedings{schoenherr2025interpretable,\n  title={Towards Interpretable Neural Networks: A Comprehensive Framework},\n  author={Schönherr, Lea and Mueller, Alex and Santos, Maria and Chen, James},\n  booktitle={International Conference on Machine Learning},\n  year={2025}\n}",
      slug: "interpretable-neural-networks-2025",
      abstract: "This paper presents a comprehensive framework for creating interpretable neural networks without sacrificing performance."
    },
    {
      date: "2024",
      title: "Fairness-Aware Deep Learning: Methods and Applications",
      authors: "Mueller, A., Santos, M., Schönherr, L.",
      venue: "NeurIPS 2024",
      link: "https://arxiv.org/abs/example2",
      bibtex: "@inproceedings{mueller2024fairness,\n  title={Fairness-Aware Deep Learning: Methods and Applications},\n  author={Mueller, Alex and Santos, Maria and Schönherr, Lea},\n  booktitle={Advances in Neural Information Processing Systems},\n  year={2024}\n}",
      slug: "fairness-aware-deep-learning-2024",
      abstract: "We propose novel methods for incorporating fairness constraints into deep learning models across various applications."
    },
    {
      date: "2024",
      title: "Adversarial Robustness in Critical AI Systems",
      authors: "Chen, J., Schönherr, L.",
      venue: "ICLR 2024",
      link: "https://arxiv.org/abs/example3",
      bibtex: "@inproceedings{chen2024adversarial,\n  title={Adversarial Robustness in Critical AI Systems},\n  author={Chen, James and Schönherr, Lea},\n  booktitle={International Conference on Learning Representations},\n  year={2024}\n}",
      slug: "adversarial-robustness-2024",
      abstract: "This work addresses the challenges of maintaining AI system performance under adversarial attacks in critical applications."
    },
    {
      date: "2024",
      title: "Bias Detection in Large Language Models: A Systematic Approach",
      authors: "Santos, M., Mueller, A., Williams, S., Schönherr, L.",
      venue: "ACL 2024",
      link: "https://arxiv.org/abs/example4",
      bibtex: "@inproceedings{santos2024bias,\n  title={Bias Detection in Large Language Models: A Systematic Approach},\n  author={Santos, Maria and Mueller, Alex and Williams, Sophie and Schönherr, Lea},\n  booktitle={Annual Meeting of the Association for Computational Linguistics},\n  year={2024}\n}",
      slug: "bias-detection-llm-2024",
      abstract: "We develop systematic methods for detecting and measuring bias in large language models across multiple dimensions."
    },
    {
      date: "2023",
      title: "Safe Reinforcement Learning for Autonomous Systems",
      authors: "Rodriguez, D., Chen, J., Schönherr, L.",
      venue: "AAAI 2023",
      link: "https://arxiv.org/abs/example5",
      bibtex: "@inproceedings{rodriguez2023safe,\n  title={Safe Reinforcement Learning for Autonomous Systems},\n  author={Rodriguez, David and Chen, James and Schönherr, Lea},\n  booktitle={AAAI Conference on Artificial Intelligence},\n  year={2023}\n}",
      slug: "safe-rl-autonomous-2023",
      abstract: "This paper presents novel approaches to ensure safety in reinforcement learning agents for autonomous systems."
    }
  ];

  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Publications
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our research contributions to the field of trustworthy AI, covering 
              fairness, explainability, and safety in artificial intelligence systems.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
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
          <div className="max-w-5xl mx-auto space-y-6">
            {filteredPublications.map((pub, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {pub.date}
                        </span>
                        <span className="text-sm text-primary font-medium">{pub.venue}</span>
                      </div>
                      
                      <Link to={`/publications/${pub.slug}`}>
                        <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 hover:text-primary transition-colors">
                          {pub.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 mb-3 font-medium">{pub.authors}</p>
                      <p className="text-gray-700 leading-relaxed">{pub.abstract}</p>
                    </div>
                    
                    <div className="flex flex-col space-y-2 lg:flex-shrink-0">
                      <Button variant="outline" size="sm" asChild>
                        <a href={pub.link} target="_blank" rel="noopener noreferrer">
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
