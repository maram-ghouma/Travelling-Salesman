import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  PlusCircle, 
  X, 
  Info, 
  RotateCcw, 
  Download,
  Route
} from 'lucide-react';

import InputForm from './solver/InputForm';
import ResultsDisplay from './solver/ResultsDisplay';
import { calculateTSP } from '../utils/tspAlgorithm';
import { TSPResult } from '../types/tsp';

const TspSolver = () => {
  const [cities, setCities] = useState<string[]>(['A', 'B', 'C']);
  const [distanceMatrix, setDistanceMatrix] = useState<number[][]>([
    [0, 10, 15],
    [10, 0, 20],
    [15, 20, 0]
  ]);
  
  const [result, setResult] = useState<TSPResult | null>(null);
  const [calculating, setCalculating] = useState(false);

  const handleAddCity = () => {
    const newCityName = String.fromCharCode(65 + cities.length); // A, B, C, ...
    const newCities = [...cities, newCityName];
    
    // Expand the distance matrix
    const newMatrix = distanceMatrix.map(row => [...row, 0]);
    newMatrix.push(new Array(newCities.length).fill(0));
    
    setCities(newCities);
    setDistanceMatrix(newMatrix);
  };

  const handleRemoveCity = (index: number) => {
    if (cities.length <= 2) {
      toast.error('At least 2 cities are required');
      return;
    }
    
    const newCities = cities.filter((_, i) => i !== index);
    
    // Shrink the distance matrix
    const newMatrix = distanceMatrix
      .filter((_, i) => i !== index)
      .map(row => row.filter((_, j) => j !== index));
    
    setCities(newCities);
    setDistanceMatrix(newMatrix);
  };

  const handleCityNameChange = (index: number, name: string) => {
    const newCities = [...cities];
    newCities[index] = name;
    setCities(newCities);
  };

  const handleDistanceChange = (fromIdx: number, toIdx: number, value: number) => {
    const newMatrix = [...distanceMatrix];
    
    // Update distance in both directions (symmetric matrix)
    newMatrix[fromIdx][toIdx] = value;
    newMatrix[toIdx][fromIdx] = value;
    
    setDistanceMatrix(newMatrix);
  };

  const handleReset = () => {
    setCities(['A', 'B', 'C']);
    setDistanceMatrix([
      [0, 10, 15],
      [10, 0, 20],
      [15, 20, 0]
    ]);
    setResult(null);
  };

  const validateInput = () => {
    // Check if all cities have names
    if (cities.some(city => !city.trim())) {
      toast.error('All cities must have names');
      return false;
    }
    
    // Check if all distances are filled
    for (let i = 0; i < cities.length; i++) {
      for (let j = 0; j < cities.length; j++) {
        if (i !== j && (distanceMatrix[i][j] <= 0 || isNaN(distanceMatrix[i][j]))) {
          toast.error('All distances must be positive numbers');
          return false;
        }
      }
    }
    
    return true;
  };

  const handleSubmit = async() => {
    if (!validateInput()) return;
    
    setCalculating(true);
    
    setTimeout(async() => {
      try {
        const tspResult = await calculateTSP(cities, distanceMatrix);
        setResult(tspResult);
        toast.success('Solution found successfully!');
      } catch (error) {
        toast.error('Error calculating solution');
        console.error(error);
      } finally {
        setCalculating(false);
      }
    }, 800);
  };

  const handleDownloadResults = () => {
    if (!result) return;
    
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'tsp-solution.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <motion.section
      id="solver"
      className="my-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="card overflow-visible">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center">
            <Route className="h-6 w-6 mr-2" />
            <h2 className="text-xl sm:text-2xl font-semibold">TSP Solver</h2>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={handleReset}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Reset"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            
            {result && (
              <button
                onClick={handleDownloadResults}
                className="p-2 hover:bg-white/10 rounded-full transition-colors ml-2"
                title="Download Results"
              >
                <Download className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {!result ? (
            <InputForm
              cities={cities}
              distanceMatrix={distanceMatrix}
              onCityNameChange={handleCityNameChange}
              onDistanceChange={handleDistanceChange}
              onAddCity={handleAddCity}
              onRemoveCity={handleRemoveCity}
              onSubmit={handleSubmit}
              calculating={calculating}
            />
          ) : (
            <ResultsDisplay
              result={result}
              cities={cities}
              onReset={() => setResult(null)}
              onDownload={handleDownloadResults}
            />
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default TspSolver;