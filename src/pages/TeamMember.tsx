
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, ExternalLink, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TeamMember = () => {
  const { slug } = useParams();

  const teamMembersData: Record<string, any> = {
    'lea-schoenherr': {
      name: "Dr. Lea Schönherr",
      position: "Group Leader",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      email: "schoenherr@cispa.de",
      office: "Room 2.15, CISPA Building",
      linkedin: "https://linkedin.com/in/lea-schoenherr",
      googleScholar: "https://scholar.google.com/citations?user=example",
      about: "Dr. Lea Schönherr is the leader of the Dormant Neurons research group at CISPA. She received her PhD in Computer Science from Ruhr University Bochum in 2020. Her research focuses on the intersection of AI fairness, safety, and security, with particular emphasis on developing trustworthy AI systems for critical applications.",
      researchInterests: ["AI Fairness", "AI Safety", "Adversarial ML", "Trustworthy AI", "Audio Security"]
    },
    'alex-mueller': {
      name: "Dr. Alex Mueller",
      position: "Senior Researcher",
      coAdvised: "Prof. Sarah Johnson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      email: "alex.mueller@cispa.de",
      office: "Room 2.12, CISPA Building",
      linkedin: "https://linkedin.com/in/alex-mueller",
      googleScholar: "https://scholar.google.com/citations?user=example2",
      website: "https://alexmueller.dev",
      about: "Dr. Alex Mueller is a senior researcher specializing in explainable AI and interpretable machine learning. He completed his PhD at ETH Zurich and has published extensively on methods for making AI systems more transparent and understandable to human users.",
      researchInterests: ["Explainable AI", "Interpretable ML", "Human-AI Interaction", "Model Transparency"]
    },
    'maria-santos': {
      name: "Maria Santos",
      position: "PhD Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      email: "maria.santos@cispa.de",
      office: "Room 2.08, CISPA Building",
      linkedin: "https://linkedin.com/in/maria-santos-phd",
      googleScholar: "https://scholar.google.com/citations?user=example3",
      about: "Maria Santos is a PhD student researching algorithmic fairness in recommendation systems. She holds a Master's degree in Computer Science from the University of São Paulo and is passionate about ensuring AI systems treat all users fairly regardless of their background.",
      researchInterests: ["Algorithmic Fairness", "Recommendation Systems", "Bias Detection", "Social Computing"]
    },
    'james-chen': {
      name: "Dr. James Chen",
      position: "Postdoc",
      coAdvised: "Prof. Robert Kim",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      email: "james.chen@cispa.de",
      office: "Room 2.10, CISPA Building",
      linkedin: "https://linkedin.com/in/james-chen-ai",
      googleScholar: "https://scholar.google.com/citations?user=example4",
      github: "https://github.com/jameschen",
      about: "Dr. James Chen is a postdoctoral researcher working on adversarial robustness and AI safety. He received his PhD from Stanford University and has expertise in developing AI systems that remain safe and reliable even under adversarial conditions.",
      researchInterests: ["Adversarial Robustness", "AI Safety", "Critical Systems", "Deep Learning Security"]
    }
  };

  const member = teamMembersData[slug || ''];

  if (!member) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary mb-4">Team member not found</h1>
            <Link to="/team">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Team
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
            <Link to="/team">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Team
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-8 text-center">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-secondary mb-2">{member.name}</h1>
                  <p className="text-primary font-medium mb-2">{member.position}</p>
                  {member.coAdvised && (
                    <p className="text-sm text-gray-500 mb-6">Co-advised with: {member.coAdvised}</p>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <a href={`mailto:${member.email}`} className="text-sm text-gray-600 hover:text-primary">
                        {member.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{member.office}</span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="mt-6 space-y-2">
                    {member.linkedin && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    
                    {member.googleScholar && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={member.googleScholar} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Google Scholar
                        </a>
                      </Button>
                    )}
                    
                    {member.website && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={member.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
                    
                    {member.github && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-secondary mb-4">About</h2>
                  <p className="text-gray-700 leading-relaxed">{member.about}</p>
                </CardContent>
              </Card>

              {/* Research Interests */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-secondary mb-4">Research Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {member.researchInterests.map((interest: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamMember;
