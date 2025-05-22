
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Index = () => {
  const [copiedBibtex, setCopiedBibtex] = useState<string | null>(null);

  const researchAreas = [
    {
      title: "Fairness in AI",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
      description: "Developing methods to ensure AI systems make unbiased decisions across different demographics and use cases."
    },
    {
      title: "Explainable AI",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      description: "Creating transparent AI models that provide clear explanations for their decision-making processes."
    },
    {
      title: "AI Safety",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      description: "Building robust AI systems that operate safely and reliably in real-world environments."
    }
  ];

  const latestNews = [
    {
      date: "2025-01-15",
      title: "New Paper Accepted at ICML 2025",
      description: "Our work on interpretable neural networks has been accepted for publication."
    },
    {
      date: "2025-01-10",
      title: "Dr. Schönherr Receives Best Paper Award",
      description: "Recognition for outstanding contribution to AI fairness research."
    },
    {
      date: "2025-01-05",
      title: "Collaboration with Industry Partners",
      description: "Announcing new partnerships to advance AI safety in production systems."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Lea Schönherr",
      position: "Group Leader",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      slug: "lea-schoenherr"
    },
    {
      name: "Dr. Alex Mueller",
      position: "Senior Researcher",
      coAdvised: "Prof. Sarah Johnson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      slug: "alex-mueller"
    },
    {
      name: "Maria Santos",
      position: "PhD Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      slug: "maria-santos"
    },
    {
      name: "Dr. James Chen",
      position: "Postdoc",
      coAdvised: "Prof. Robert Kim",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      slug: "james-chen"
    },
    {
      name: "Sophie Williams",
      position: "PhD Student",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      slug: "sophie-williams"
    },
    {
      name: "Dr. David Rodriguez",
      position: "Research Scientist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      slug: "david-rodriguez"
    }
  ];

  const publications = [
    {
      date: "2025",
      title: "Towards Interpretable Neural Networks: A Comprehensive Framework",
      authors: "Schönherr, L. et al.",
      venue: "ICML 2025",
      link: "#",
      bibtex: "@inproceedings{schoenherr2025interpretable,\n  title={Towards Interpretable Neural Networks: A Comprehensive Framework},\n  author={Schönherr, Lea and others},\n  booktitle={ICML},\n  year={2025}\n}",
      slug: "interpretable-neural-networks-2025"
    },
    {
      date: "2024",
      title: "Fairness-Aware Deep Learning: Methods and Applications",
      authors: "Mueller, A. et al.",
      venue: "NeurIPS 2024",
      link: "#",
      bibtex: "@inproceedings{mueller2024fairness,\n  title={Fairness-Aware Deep Learning: Methods and Applications},\n  author={Mueller, Alex and others},\n  booktitle={NeurIPS},\n  year={2024}\n}",
      slug: "fairness-aware-deep-learning-2024"
    }
  ];

  const copyBibtex = (bibtex: string, title: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(title);
    setTimeout(() => setCopiedBibtex(null), 2000);
  };

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <Layout>
      <JoinTeamButton />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-primary-foreground">Dormant Neurons</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
              We ensure that AI makes fair, clear, and safe decisions that people can rely on and trust.
            </p>
            <p className="text-lg mb-12 opacity-80">
              Our home is the CISPA Helmholtz Center for Information Security in Saarbrücken, Germany
            </p>
            
            {/* Group Photo */}
            <div className="max-w-2xl mx-auto mb-6">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop"
                alt="Dormant Neurons Research Group"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
            <p className="text-sm opacity-70 italic">
              Dormant Neurons as last seen in May 2025
            </p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        >
          <ArrowDown className="h-8 w-8" />
        </button>
      </section>

      {/* Research Areas */}
      <section className="section-gradient py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Our Research Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We focus on three core areas that are essential for building trustworthy AI systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-secondary">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Latest News</h2>
            <Link to="/news">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                See More
              </Button>
            </Link>
          </div>
          
          <div className="space-y-6">
            {latestNews.slice(0, 3).map((news, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {news.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-secondary mb-2">{news.title}</h3>
                      <p className="text-gray-600">{news.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="section-gradient py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Meet the Team</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {teamMembers.map((member, index) => (
              <Link key={index} to={`/team/${member.slug}`} className="group">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 border-2 border-primary/20 group-hover:border-primary transition-all duration-300 mb-3">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-secondary group-hover:text-primary transition-colors text-sm sm:text-base">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{member.position}</p>
                  {member.coAdvised && (
                    <p className="text-xs text-gray-500 mt-1">Co-advised with: {member.coAdvised}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Publications</h2>
            <Link to="/publications">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                See All
              </Button>
            </Link>
          </div>
          
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {pub.date}
                        </span>
                        <span className="text-sm text-primary font-medium">{pub.venue}</span>
                      </div>
                      <Link to={`/publications/${pub.slug}`}>
                        <h3 className="text-xl font-semibold text-secondary mb-2 hover:text-primary transition-colors">
                          {pub.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-2">{pub.authors}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Paper
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
        </div>
      </section>
    </Layout>
  );
};

export default Index;
