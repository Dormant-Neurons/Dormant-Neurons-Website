import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Card, CardContent } from '@/components/ui/card';
import { teamMembers } from '@/data/teamMembers';

const Team = () => {
  return (
    <Layout>
      <JoinTeamButton />
      
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Our Team
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
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
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.position}</p>
                    {member.coAdvised && (
                      <p className="text-sm text-gray-500 mb-4">{member.coAdvised}</p>
                    )}
                    {/* <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p> */}
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
