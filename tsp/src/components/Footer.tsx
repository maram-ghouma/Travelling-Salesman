import React from 'react';
import { Github, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white text-sm">
              © {new Date().getFullYear()} TSP Solver. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6 text-white">
            <a
              href="#about"
              className="text-white hover:text-primary-500 transition-colors duration-200 text-sm"
            >
              About
            </a>
            <a
              href="#solver"
              className="text-white hover:text-primary-500 transition-colors duration-200 text-sm"
            >
              Solver
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Travelling_salesman_problem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary-500 transition-colors duration-200 text-sm"
            >
              Learn More
            </a>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary-500 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-white hover:text-primary-500 transition-colors duration-200"
              aria-label="Contact"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;