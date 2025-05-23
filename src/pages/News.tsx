import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Card, CardContent } from '@/components/ui/card';
import { news } from '@/data/news';

const News = () => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Sort news items by date in reverse chronological order
  const sortedNews = [...news].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Layout>
      <JoinTeamButton />
      
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Latest News
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Stay updated with the latest developments, achievements, and announcements 
              from the Dormant Neurons research group.
            </p>
          </div>

          {/* News Items */}
          <div className="mx-auto space-y-8">
            {sortedNews.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">
                    {item.title}
                  </h3>
                  <div 
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;
