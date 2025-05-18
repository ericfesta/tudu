import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 py-3 transition-colors">
      Made in Italy with ❤️ and <a 
        href="https://chantandbuild.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        ChatAndBuild
      </a>
    </footer>
  );
};

export default Footer;
