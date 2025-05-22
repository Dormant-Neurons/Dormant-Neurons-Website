
import Layout from '@/components/Layout';
import JoinTeamButton from '@/components/JoinTeamButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Research = () => {
  const researchAreas = [
    {
      title: "Fairness in AI",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
      description: "We develop cutting-edge methods to ensure AI systems make unbiased decisions across different demographics and use cases. Our research focuses on algorithmic fairness, bias detection, and mitigation strategies in machine learning models.",
      keyAreas: [
        "Algorithmic bias detection and mitigation",
        "Fair representation learning",
        "Demographic parity and equalized odds",
        "Fairness in recommender systems"
      ]
    },
    {
      title: "Explainable AI",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      description: "Creating transparent AI models that provide clear explanations for their decision-making processes. We work on interpretability methods that help users understand how AI systems arrive at their conclusions.",
      keyAreas: [
        "Local and global interpretability methods",
        "Feature importance analysis",
        "Counterfactual explanations",
        "Human-AI interaction in explanation"
      ]
    },
    {
      title: "AI Safety",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      description: "Building robust AI systems that operate safely and reliably in real-world environments. Our focus is on developing methods to ensure AI systems remain safe even under adversarial conditions or distribution shifts.",
      keyAreas: [
        "Adversarial robustness",
        "Out-of-distribution detection",
        "Safe reinforcement learning",
        "AI alignment and value learning"
      ]
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
              Our Research
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are dedicated to advancing the frontiers of trustworthy AI through rigorous research 
              in fairness, explainability, and safety. Our interdisciplinary approach combines theoretical 
              foundations with practical applications.
            </p>
          </div>

          {/* Research Areas */}
          <div className="space-y-16">
            {researchAreas.map((area, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}>
                <div className="lg:w-1/2">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="lg:w-1/2 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                    {area.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {area.description}
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-4">Key Research Areas:</h3>
                    <ul className="space-y-2">
                      {area.keyAreas.map((keyArea, keyIndex) => (
                        <li key={keyIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600">{keyArea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Research Impact */}
          <div className="mt-20 bg-gray-50 rounded-lg p-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Research Impact
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our research contributes to building AI systems that are not only powerful but also 
                trustworthy and beneficial for society. We collaborate with industry partners, 
                policymakers, and other research institutions to ensure our work has real-world impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Research;
