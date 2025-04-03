import { Link } from "react-router-dom";

import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  // Quick links data
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Courses", path: "/courses" },
  ];

  // Services data
  const services = [
    { name: "News", path: "/services/news" },
    { name: "Meeting", path: "/services/meeting" },
    { name: "Session", path: "/services/session" },
  ];

  // Subscribe links data
  const subscribeLinks = [
    { name: "Services", path: "/services" },
    { name: "Newsletter", path: "/newsletter" },
  ];

  // Social media icons data with correct icon components
  const socialMedia = [
    { name: "Github", icon: Github, link: "#" },
    { name: "Twitter", icon: Twitter, link: "#" },
    { name: "LinkedIn", icon: Linkedin, link: "#" },
    { name: "Instagram", icon: Instagram, link: "#" },
    
  ];

  // Arrow component for links
  const ArrowIcon = () => (
    <svg
      className="h-4 w-4 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  // Link section renderer
  const renderLinkSection = (
    title: string,
    links: Array<{ name: string; path: string }>
  ) => (
    <div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="w-12 h-1 bg-white mb-6"></div>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name} className="flex items-center">
            <ArrowIcon />
            <Link
              to={link.path}
              className="hover:text-gray-200 transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-blue-800 text-white py-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Company</h3>
            <div className="w-12 h-1 bg-white mb-6"></div>
            <p className="text-sm leading-relaxed">
              Learing Habits powers growth by connecting visionary organizations with
              exceptional talent through AI-driven precision hiring—building
              agile, future-ready teams at scale.
            </p>

            <div className="flex space-x-4 mt-6">
              {socialMedia.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="text-white hover:text-gray-200"
                  aria-label={item.name}
                >
                  <item.icon size={20} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {renderLinkSection("Quick Links", quickLinks)}

          {/* Services */}
          {renderLinkSection("Services", services)}

          {/* Subscribe */}
          {renderLinkSection("Subscribe", subscribeLinks)}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-blue-700 text-center">
          <p>© {currentYear} Copyrights by Learning Habits. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
