import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '@/firebase/config';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { Edit, Newspaper, BookOpen, Image as ImageIcon, UserPlus, ArrowUpDown, FileEdit, Users, BookText, Images } from 'lucide-react';
import { isAdmin } from '@/utils/adminUtils';

interface MemberData {
  name: string;
  position: string;
  image: string;
  email: string;
}

const MemberDashboard = () => {
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!auth.currentUser) return;

      // Check if user is admin
      setUserIsAdmin(isAdmin(auth.currentUser.email));

      try {
        const membersRef = collection(db, 'members');
        const q = query(membersRef, where('email', '==', auth.currentUser.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data() as MemberData;
          setMemberData(data);
        }
      } catch (err) {
        console.error('Error fetching member data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!memberData && !userIsAdmin) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-6">
              <p className="text-red-600 mb-4">Profile not found</p>
              <Button onClick={handleLogout}>Back to Login</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const dashboardOptions = [
    {
      title: 'Edit Profile',
      description: 'Update your personal information and bio',
      icon: Edit,
      path: '/edit-profile',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      show: true
    },
    {
      title: 'Add News',
      description: 'Share news and updates',
      icon: Newspaper,
      path: '/add-news',
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      show: true
    },
    {
      title: 'Add Publication',
      description: 'Add your latest research publications',
      icon: BookOpen,
      path: '/add-publication',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      show: true
    },
    {
      title: 'Add Gallery Item',
      description: 'Upload photos to the lab gallery',
      icon: ImageIcon,
      path: '/add-gallery',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
      show: true
    },
    {
      title: 'Add Member',
      description: 'Add a new team member',
      icon: UserPlus,
      path: '/admin/add-member',
      color: 'bg-red-50 hover:bg-red-100 border-red-200',
      show: userIsAdmin
    },
    {
      title: 'Reorder Members',
      description: 'Change the order of team members',
      icon: ArrowUpDown,
      path: '/admin/reorder-members',
      color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
      show: userIsAdmin
    },
    {
      title: 'Edit News',
      description: 'Edit or delete existing news items',
      icon: FileEdit,
      path: '/admin/edit-news',
      color: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
      show: userIsAdmin
    },
    {
      title: 'Edit Members',
      description: 'Edit or delete team member profiles',
      icon: Users,
      path: '/admin/edit-members',
      color: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
      show: userIsAdmin
    },
    {
      title: 'Edit Publications',
      description: 'Edit or delete publications',
      icon: BookText,
      path: '/admin/edit-publications',
      color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      show: userIsAdmin
    },
    {
      title: 'Edit Gallery',
      description: 'Edit or delete gallery photos',
      icon: Images,
      path: '/admin/edit-gallery',
      color: 'bg-violet-50 hover:bg-violet-100 border-violet-200',
      show: userIsAdmin
    }
  ].filter(option => option.show);

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Header with Logout */}
          <div className="flex justify-end mb-8">
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          {/* Welcome Section */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image - Only show if member data exists */}
                {memberData && (
                  <div className="flex-shrink-0">
                    <img
                      src={memberData.image}
                      alt={memberData.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg";
                      }}
                    />
                  </div>
                )}

                {/* Welcome Text */}
                <div className="text-center md:text-left flex-grow">
                  <h1 className="text-4xl font-bold text-secondary mb-2">
                    Hello{memberData ? `, ${memberData.name.split(' ')[0]}` : ''}!
                  </h1>
                  {memberData && (
                    <>
                      <p className="text-xl text-gray-600 mb-1">{memberData.position}</p>
                      <p className="text-sm text-gray-500">{memberData.email}</p>
                    </>
                  )}
                  {userIsAdmin && (
                    <div className="mt-3">
                      <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        Admin Access
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Options */}
          <div>
            <h2 className="text-2xl font-semibold text-secondary mb-6">What would you like to do?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Card
                    key={option.path}
                    className={`cursor-pointer transition-all duration-200 border-2 ${option.color}`}
                    onClick={() => navigate(option.path)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          <IconComponent className="w-6 h-6 text-gray-700" />
                        </div>
                        <CardTitle className="text-xl">{option.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{option.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemberDashboard;