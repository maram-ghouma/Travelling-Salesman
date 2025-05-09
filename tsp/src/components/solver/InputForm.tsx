import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Info, Trash2 } from 'lucide-react';

interface InputFormProps {
  cities: string[];
  distanceMatrix: number[][];
  onCityNameChange: (index: number, name: string) => void;
  onDistanceChange: (fromIdx: number, toIdx: number, value: number) => void;
  onAddCity: () => void;
  onRemoveCity: (index: number) => void;
  onSubmit: () => void;
  calculating: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  cities,
  distanceMatrix,
  onCityNameChange,
  onDistanceChange,
  onAddCity,
  onRemoveCity,
  onSubmit,
  calculating
}) => {
  const handleDistanceInputChange = (fromIdx: number, toIdx: number, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onDistanceChange(fromIdx, toIdx, numValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium text-gray-800">Enter Cities</h3>
          <button 
            onClick={onAddCity}
            className="btn btn-secondary flex items-center space-x-1 text-sm"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add City</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={city}
                onChange={(e) => onCityNameChange(index, e.target.value)}
                placeholder={`City ${index + 1}`}
                className="input-field flex-grow"
                maxLength={10}
              />
              <button
                onClick={() => onRemoveCity(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Remove city"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-4">
          <h3 className="text-xl font-medium text-gray-800 mr-2">Distance Matrix</h3>
          <div className="group relative">
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute left-0 -top-2 transform -translate-y-full w-64 bg-gray-800 text-white text-sm rounded-md p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              Enter the distance between each pair of cities. The matrix is symmetric, so you only need to fill in the upper or lower triangle.
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto pb-4">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="w-16 p-2 text-left text-gray-500"></th>
                {cities.map((city, i) => (
                  <th key={i} className="w-24 p-2 text-center font-medium text-gray-600">
                    {city}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cities.map((fromCity, fromIdx) => (
                <tr key={fromIdx}>
                  <td className="w-16 p-2 font-medium text-gray-600">{fromCity}</td>
                  {cities.map((toCity, toIdx) => (
                    <td key={toIdx} className="w-24 p-1">
                      {fromIdx === toIdx ? (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center py-2">
                          <span className="text-gray-400">0</span>
                        </div>
                      ) : (
                        <input
                          type="number"
                          min="0"
                          value={distanceMatrix[fromIdx][toIdx] || ''}
                          onChange={(e) => handleDistanceInputChange(fromIdx, toIdx, e.target.value)}
                          className="w-full py-2 px-1 border rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-center pt-4">
        <button
          onClick={onSubmit}
          disabled={calculating}
          className={`btn btn-primary px-8 py-3 ${calculating ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {calculating ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculating...
            </span>
          ) : 'Calculate Optimal Route'}
        </button>
      </div>
    </motion.div>
  );
};

export default InputForm;