import { Link } from 'react-router-dom';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import '@/styles/animations.css';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="h-28 flex items-center">
              <Link to="/" className="inline-block h-full logo-flicker">
                <img src="/logo/logo-dark-wo-bg.png" alt="Dormant Neurons Logo" className="h-full w-auto" />
              </Link>
            </div>
            {/* <div className="space-y-4 mt-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Ensuring that AI makes fair, clear, and safe decisions that people can rely on and trust.
              </p>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/research" className="text-gray-300 hover:text-primary transition-colors">
                Research
              </Link>
              <Link to="/news" className="text-gray-300 hover:text-primary transition-colors">
                News
              </Link>
              <Link to="/team" className="text-gray-300 hover:text-primary transition-colors">
                Team
              </Link>
              <Link to="/publications" className="text-gray-300 hover:text-primary transition-colors">
                Publications
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:schoenherr@cispa.de" className="hover:text-primary transition-colors">
                  schoenherr@cispa.de
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <div>
                  <p>CISPA Helmholtz Center</p>
                  <p>Stuhlsatzenhaus 5</p>
                  <p>66123 Saarbrücken, Germany</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Dormant Neurons. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
