import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, Navigation } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Map className="h-8 w-8 text-primary-500" />
          <h1 className={`font-semibold ${scrolled ? 'text-2xl' : 'text-3xl'} transition-all duration-300 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent`}>
  TSP Solver
</h1>

        </div>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <a href="#about" className="text-gray-700 hover:text-primary-500 transition-colors duration-200">
                About
              </a>
            </li>
            <li>
              <a href="#solver" className="text-gray-700 hover:text-primary-500 transition-colors duration-200">
                Solver
              </a>
            </li>
            <li>
              <a 
                href="https://en.wikipedia.org/wiki/Travelling_salesman_problem" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors duration-200"
              >
                <span>Learn More</span>
                <Navigation className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;