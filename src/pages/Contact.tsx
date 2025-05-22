
import { Mail, MapPin, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <Layout>
      <JoinTeamButton />
      
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our research group. We welcome collaborations, 
              questions about our work, and inquiries about joining our team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Head Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">Group Leader</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary mb-2">Dr. Lea Schönherr</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a href="mailto:schoenherr@cispa.de" className="text-primary hover:underline">
                          schoenherr@cispa.de
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div className="text-gray-700">
                      <p className="font-semibold">CISPA Helmholtz Center for Information Security</p>
                      <p>Stuhlsatzenhaus 5</p>
                      <p>66123 Saarbrücken</p>
                      <p>Germany</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Join Our Team */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">Join Our Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Interested in joining our research group? We are always looking for 
                    talented researchers who share our passion for trustworthy AI.
                  </p>
                  <Button asChild>
                    <a href="mailto:schoenherr@cispa.de?subject=Join Dormant Neurons Team">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Application
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2592.7962687655827!2d6.996285315935678!3d49.41422487934398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4795b6b8c6b3f5af%3A0x2c8c5c5b5e5d5c5c!2sCISPA%20Helmholtz%20Center%20for%20Information%20Security!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="CISPA Location"
                    ></iframe>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      CISPA is located in Saarbrücken, Germany, on the campus of 
                      Saarland University. The center is easily accessible by public 
                      transportation and car.
                    </p>
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

export default Contact;
