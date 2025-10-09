import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { News as NewsItem } from '@/data/news';

const News = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsCol = collection(db, 'news');
        const q = query(newsCol, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          const raw = doc.data() as any;
          return {
            title: raw.title,
            description: raw.description,
            date: raw.date?.toDate ? raw.date.toDate() : new Date(raw.date),
            link: raw.link || undefined,
          } as NewsItem;
        });
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">Loading news...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <p className="text-xl text-red-600">{error}</p>
            </div>
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
            {items.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
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
