import React from 'react';
import { motion } from 'framer-motion';
import { Route, Map } from 'lucide-react';

const IntroSection = () => {
  return (
    <motion.section
      id="about"
      className="my-12 card p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Map className="h-16 w-16 text-primary-500" />
            <Route className="h-8 w-8 text-accent-500 absolute -bottom-1 -right-1" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
          Traveling Salesperson Problem Solver
        </h2>
        
        <div className="space-y-4 text-gray-600">
          <p className="text-lg leading-relaxed">
            The <strong>Traveling Salesperson Problem (TSP)</strong> is a classic algorithmic challenge that asks:
            "Given a list of cities and the distances between each pair of cities, what is the shortest possible
            route that visits each city exactly once and returns to the origin city?"
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-primary-600 mb-2">How This Tool Works:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Enter the names of your cities</li>
              <li>Fill in the distance matrix between each pair of cities</li>
              <li>Submit your data to calculate the optimal route</li>
              <li>View and download the results</li>
            </ol>
          </div>
          
          <p>
            This solver implements a solution to find the optimal path for small to medium-sized problems. For larger problems
            (15+ cities), it uses approximation algorithms to find near-optimal solutions in reasonable time.
          </p>
          
          <div className="flex justify-center mt-6">
            <a 
              href="#solver" 
              className="btn btn-primary"
            >
              Start Solving
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default IntroSection;