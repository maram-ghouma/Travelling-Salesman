
import { TSPResult } from '../types/tsp';

/**
 * Request payload for the TSP backend
 */
interface TSPRequest {
  cities: string[];
  distances: number[][];
}

/**
 * Response format from the backend
 */
interface BackendResponse {
  best_path: string[];
  min_cost: number;
}

/**
 * Calls the backend to solve the TSP problem
 * @param cities - Array of city names
 * @param distances - Distance matrix between cities
 * @returns Promise resolving to a TSPResult object
 */
export async function calculateTSP(cities: string[], distances: number[][]): Promise<TSPResult> {
  const payload: TSPRequest = {
    cities,
    distances
  };

  const response = await fetch('http://127.0.0.1:8000/tsp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  console.log('Received response:', response.status);
  if (!response.ok) {
    throw new Error(`Backend error: ${response.statusText}`);
  }

  const data: BackendResponse = await response.json();

  const result: TSPResult = {
    path: data.best_path,
    distance: data.min_cost
  };

  return result;
}
