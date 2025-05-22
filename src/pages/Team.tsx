
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Card, CardContent } from '@/components/ui/card';

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. Lea Schönherr",
      position: "Group Leader",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      slug: "lea-schoenherr",
      bio: "Dr. Schönherr leads the Dormant Neurons research group with expertise in AI fairness and safety."
    },
    {
      name: "Dr. Alex Mueller",
      position: "Senior Researcher",
      coAdvised: "Prof. Sarah Johnson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      slug: "alex-mueller",
      bio: "Specializes in explainable AI and interpretable machine learning methods."
    },
    {
      name: "Maria Santos",
      position: "PhD Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      slug: "maria-santos",
      bio: "Research focus on algorithmic fairness in recommendation systems."
    },
    {
      name: "Dr. James Chen",
      position: "Postdoc",
      coAdvised: "Prof. Robert Kim",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      slug: "james-chen",
      bio: "Works on adversarial robustness and AI safety in critical applications."
    },
    {
      name: "Sophie Williams",
      position: "PhD Student",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      slug: "sophie-williams",
      bio: "Investigating bias in large language models and mitigation strategies."
    },
    {
      name: "Dr. David Rodriguez",
      position: "Research Scientist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      slug: "david-rodriguez",
      bio: "Expert in reinforcement learning and AI alignment research."
    }
  ];

  return (
    <Layout>
      <JoinTeamButton />
      
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the talented researchers and scientists who are working together to build 
              more trustworthy and reliable AI systems.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Link key={index} to={`/team/${member.slug}`}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                  <CardContent className="p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.position}</p>
                    {member.coAdvised && (
                      <p className="text-sm text-gray-500 mb-4">Co-advised with: {member.coAdvised}</p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Join Team Section */}
          <div className="mt-20 bg-gray-50 rounded-lg p-8 lg:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Join Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              We are always looking for talented individuals who share our passion for 
              responsible AI research. If you're interested in joining our team, we'd love to hear from you.
            </p>
            <p className="text-gray-700">
              Please send an email to{' '}
              <a href="mailto:schoenherr@cispa.de" className="text-primary hover:underline">
                schoenherr@cispa.de
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
