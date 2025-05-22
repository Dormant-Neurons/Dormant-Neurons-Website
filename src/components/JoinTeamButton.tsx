
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JoinTeamButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        size="lg"
        className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
        onClick={() => window.location.href = 'mailto:schoenherr@cispa.de?subject=Join Dormant Neurons Team'}
      >
        <Mail className="h-5 w-5 mr-2" />
        Join Our Team
      </Button>
    </div>
  );
};

export default JoinTeamButton;
