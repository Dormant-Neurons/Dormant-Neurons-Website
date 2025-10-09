import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, ExternalLink, MapPin } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TeamMember } from '@/data/teamMembers';

const TeamMember = () => {
  const { slug } = useParams();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMember = async () => {
      if (!slug) return;
      
      try {
        const membersCollection = collection(db, 'members');
        const q = query(membersCollection, where('slug', '==', slug));
        const membersSnapshot = await getDocs(q);
        
        if (membersSnapshot.empty) {
          setMember(null);
        } else {
          const memberData = {
            ...membersSnapshot.docs[0].data(),
            id: membersSnapshot.docs[0].id
          } as unknown as TeamMember;
          setMember(memberData);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching team member:', err);
        setError('Failed to load team member');
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Loading team member...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <p className="text-xl text-red-600">{error}</p>
            <Link to="/team">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Team
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

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

  // Function to get the correct image path
  const getImagePath = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `/${imagePath}`;
  };

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
                      src={getImagePath(member.image)}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-secondary mb-2">{member.name}</h1>
                  <p className="text-primary font-medium mb-2">{member.position}</p>
                  {member.additionalInfo && (
                    <p className="text-sm text-gray-500 mb-6">{member.additionalInfo}</p>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-3 text-left">
                    {member.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a href={`mailto:${member.email}`} className="text-sm text-gray-600 hover:text-primary">
                          {member.email}
                        </a>
                      </div>
                    )}
                    
                    {member.office && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{member.office}</span>
                      </div>
                    )}
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
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              {member.about && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-secondary mb-4">About</h2>
                    <p className="text-gray-700 leading-relaxed">{member.about}</p>
                  </CardContent>
                </Card>
              )}

              {/* Research Interests */}
              {member.researchInterests && member.researchInterests.length > 0 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-secondary mb-4">Research Interests</h2>
                    <div className="flex flex-wrap gap-2">
                      {member.researchInterests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamMember;
