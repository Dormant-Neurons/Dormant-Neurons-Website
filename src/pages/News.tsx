
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Card, CardContent } from '@/components/ui/card';

const News = () => {
  const allNews = [
    {
      date: "2025-01-15",
      title: "New Paper Accepted at ICML 2025",
      description: "Our groundbreaking work on interpretable neural networks has been accepted for publication at the International Conference on Machine Learning 2025.",
      content: "We are excited to announce that our paper 'Towards Interpretable Neural Networks: A Comprehensive Framework' has been accepted at ICML 2025. This work presents a novel approach to making deep learning models more interpretable without sacrificing performance."
    },
    {
      date: "2025-01-10",
      title: "Dr. Schönherr Receives Best Paper Award",
      description: "Recognition for outstanding contribution to AI fairness research at the International Conference on Algorithmic Fairness.",
      content: "Dr. Lea Schönherr has been honored with the Best Paper Award at the International Conference on Algorithmic Fairness for her seminal work on bias detection in large language models. This recognition highlights the impact of our research on creating more equitable AI systems."
    },
    {
      date: "2025-01-05",
      title: "Collaboration with Industry Partners",
      description: "Announcing new partnerships to advance AI safety in production systems with leading tech companies.",
      content: "We are pleased to announce strategic partnerships with several leading technology companies to advance AI safety research. These collaborations will focus on implementing our research findings in real-world production systems."
    },
    {
      date: "2024-12-20",
      title: "PhD Position Opening",
      description: "We are looking for motivated PhD candidates to join our team and contribute to cutting-edge AI research.",
      content: "The Dormant Neurons research group is seeking exceptional PhD candidates interested in AI fairness, explainability, and safety. We offer a dynamic research environment with opportunities for international collaboration."
    },
    {
      date: "2024-12-15",
      title: "Workshop on Trustworthy AI",
      description: "Successfully hosted an international workshop bringing together researchers from academia and industry.",
      content: "Our workshop on 'Building Trustworthy AI Systems' brought together over 200 researchers from around the world. The event featured keynote talks, panel discussions, and collaborative sessions on the future of responsible AI development."
    },
    {
      date: "2024-12-01",
      title: "Grant Funding Success",
      description: "Secured significant funding from the European Research Council for our AI safety research program.",
      content: "We are thrilled to announce that our research proposal on 'Safe and Robust AI Systems for Critical Applications' has been awarded a prestigious ERC Starting Grant, providing substantial funding for the next five years of research."
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
              Latest News
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest developments, achievements, and announcements 
              from the Dormant Neurons research group.
            </p>
          </div>

          {/* News Items */}
          <div className="max-w-4xl mx-auto space-y-8">
            {allNews.map((news, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {news.date}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
                    {news.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                    {news.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {news.content}
                  </p>
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
