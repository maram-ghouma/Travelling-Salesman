import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftCircle, Download, RotateCcw } from 'lucide-react';
import { TSPResult } from '../../types/tsp';

interface ResultsDisplayProps {
  result: TSPResult;
  cities: string[];
  onReset: () => void;
  onDownload: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  result,
  cities,
  onReset,
  onDownload
}) => {
  // Animation variants for path elements
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  // Generate visual representation coordinates
  const cityCoordinates = generateCircularCoordinates(cities.length, 150);
  
  // Create SVG path for the optimal tour
  const createPathData = () => {
    const pathIndices = result.path.map(cityName => cities.indexOf(cityName));
    let d = `M ${cityCoordinates[pathIndices[0]].x} ${cityCoordinates[pathIndices[0]].y}`;
    
    for (let i = 1; i < pathIndices.length; i++) {
      d += ` L ${cityCoordinates[pathIndices[i]].x} ${cityCoordinates[pathIndices[i]].y}`;
    }
    
    // Close the path
    d += ` L ${cityCoordinates[pathIndices[0]].x} ${cityCoordinates[pathIndices[0]].y}`;
    
    return d;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-1 text-primary-600">Optimal Route Found!</h3>
        <p className="text-gray-600">We've calculated the shortest possible route that visits all cities.</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8">
        {/* Visual representation */}
        <motion.div 
          className="flex-grow flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative" style={{ width: '300px', height: '300px' }}>
            <svg width="270" height="300" viewBox="0 0 320 300">
              {/* Tour path */}
              <motion.path
                d={createPathData()}
                fill="none"
                stroke="url(#gradientPath)"
                strokeWidth="2"
                strokeLinecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
              
              {/* City points */}
              {cities.map((city, i) => (
                <g key={i}>
                  <motion.circle
                    cx={cityCoordinates[i].x}
                    cy={cityCoordinates[i].y}
                    r="8"
                    fill="white"
                    stroke="#4682B4"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  />
                  <motion.text
                    x={cityCoordinates[i].x}
                    y={cityCoordinates[i].y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#1E293B"
                    fontSize="10"
                    fontWeight="500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {city}
                  </motion.text>
                </g>
              ))}
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4682B4" />
                  <stop offset="100%" stopColor="#66CDAA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Visual representation of the optimal route
          </p>
        </motion.div>
        
        {/* Result details */}
        <div className="md:w-1/2 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Route Details</h4>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Optimal Path:</p>
            <div className="flex flex-wrap items-center">
              {result.path.map((city, i) => (
                <React.Fragment key={i}>
                  <motion.div 
                    className="bg-primary-100 text-primary-800 rounded-md px-3 py-1 font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {city}
                  </motion.div>
                  
                  {i < result.path.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * i + 0.05 }}
                    >
                      <ArrowLeftCircle className="mx-2 text-gray-400 h-4 w-4 transform rotate-180" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Total Distance:</p>
            <motion.div 
              className="text-3xl font-bold text-accent-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {result.distance.toFixed(2)} units
            </motion.div>
          </div>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={onReset}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try Another</span>
            </button>
            
            <button
              onClick={onDownload}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Results</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to generate coordinates in a circle
function generateCircularCoordinates(count: number, radius: number) {
  const center = { x: 150, y: 150 };
  const coordinates = [];
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI;
    coordinates.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle)
    });
  }
  
  return coordinates;
}

export default ResultsDisplay;