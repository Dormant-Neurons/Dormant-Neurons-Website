import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { teamMembers } from '@/data/teamMembers';
import { news } from '@/data/news';
import { researchAreas } from '@/data/researchAreas';
import { publications } from '@/data/publications';
import { galleryPhotos } from '@/data/gallery';

const Index = () => {
  const [copiedBibtex, setCopiedBibtex] = useState<string | null>(null);

  const copyBibtex = (bibtex: string, title: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(title);
    setTimeout(() => setCopiedBibtex(null), 2000);
  };

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get the 3 most recent news items
  const latestNews = [...news]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3);

  // Get the 3 most recent photos
  const latestPhotos = [...galleryPhotos]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3);

  return (
    <Layout>
      <JoinTeamButton />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/50 -z-10"
          aria-hidden="true"
        ></div>
        <div 
          className="absolute inset-0 bg-[url('/pattern-bg.png')] bg-repeat opacity-10 -z-10"
          aria-hidden="true"
        ></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                Welcome to <span className="text-primary-foreground logo-flicker">Dormant Neurons</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90 animate-fade-in" style={{ animationDelay: "200ms" }}>
                We ensure that AI makes fair, clear, and safe decisions that people can rely on and trust.
              </p>
              <p className="text-lg mb-6 opacity-80 animate-fade-in" style={{ animationDelay: "400ms" }}>
                Our home is the <a href="https://cispa.de/en" target="_blank" rel="noopener noreferrer" className="text-primary-foreground italic hover:underline">CISPA Helmholtz Center for Information Security</a> in Saarbrücken, Germany
              </p>
              
              <Button 
                onClick={scrollToContent} 
                variant="outline" 
                className="border-white text-black hover:bg-white hover:text-secondary mt-4 animate-fade-in"
                style={{ animationDelay: "600ms" }}
              >
                <ArrowDown className="mr-2 h-4 w-4" /> Explore Our Work
              </Button>
            </div>
            
            {/* Right side - Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-white/20 transition-transform hover:scale-[1.01] duration-300">
                <img
                  src="team/team.jpg"
                  alt="Dormant Neurons Research Group"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-white italic text-sm mt-4 text-center">
                Dormant Neurons as last seen in June 2024
              </p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - now at bottom center */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hidden md:block"
          aria-label="Scroll to content"
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
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
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
            {latestNews.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      {item.link ? (
                        <Link to={item.link} target="_blank" rel="noopener noreferrer">
                          <h3 className="text-xl font-semibold text-secondary mb-2 hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="text-xl font-semibold text-secondary mb-2">
                          {item.title}
                        </h3>
                      )}
                      <div 
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {teamMembers.map((member, index) => (
              <Link key={index} to={`/team/${member.slug}`} className="group">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-32 h-32 border-2 border-primary/20 group-hover:border-primary transition-all duration-300 mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-secondary group-hover:text-primary transition-colors text-sm sm:text-base">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{member.position}</p>
                  {member.coAdvised && (
                    <p className="text-xs text-gray-500 mt-1">{member.coAdvised}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Recent Publications</h2>
            <Link to="/publications">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                See All
              </Button>
            </Link>
          </div>
          
          <div className="space-y-6">
            {[...publications]
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .slice(0, 3)
              .map((pub, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                          {formatDate(pub.date)}
                        </span>
                        <span className="text-sm text-primary font-medium">{pub.venue}</span>
                      </div>
                      <Link to={`/publications/${pub.slug}`}>
                        <h3 className="text-xl font-semibold text-secondary mb-2 hover:text-primary transition-colors">
                          {pub.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-2">{pub.shortAuthors}</p>
                    </div>
                    <div className="flex space-x-2">
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
        </div>
      </section>

      {/* Latest Photos */}
      <section className="section-gradient py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Latest Photos</h2>
            <Link to="/gallery">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                See More
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPhotos.map((photo) => (
              <Card key={photo.path} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={photo.path}
                    alt={photo.description}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {formatDate(photo.date)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{photo.description}</p>
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
