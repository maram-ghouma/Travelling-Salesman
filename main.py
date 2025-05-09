from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from gurobipy import Model, GRB, quicksum
import numpy as np

app = FastAPI()

class TSPRequest(BaseModel):
    cities: List[str]
    distances: List[List[float]]

class TSPResponse(BaseModel):
    best_path: List[str]
    min_cost: float

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tsp", response_model=TSPResponse)
def solve_tsp(data: TSPRequest):
    cities = data.cities
    dist_matrix = data.distances
    n = len(cities)

    if len(dist_matrix) != n or any(len(row) != n for row in dist_matrix):
        raise HTTPException(status_code=400, detail="Distance matrix must be square and match number of cities.")

    model = Model("TSP")
    model.setParam("OutputFlag", 0)  

    x = model.addVars(n, n, vtype=GRB.BINARY, name="x")
    u = model.addVars(n, vtype=GRB.CONTINUOUS, name="u")

    model.setObjective(quicksum(dist_matrix[i][j] * x[i, j] for i in range(n) for j in range(n)), GRB.MINIMIZE)

    for i in range(n):
        model.addConstr(quicksum(x[i, j] for j in range(n) if i != j) == 1)
        model.addConstr(quicksum(x[j, i] for j in range(n) if i != j) == 1)

    for i in range(1, n):
        for j in range(1, n):
            if i != j:
                model.addConstr(u[i] - u[j] + n * x[i, j] <= n - 1)

    model.optimize()

    if model.status != GRB.OPTIMAL:
        raise HTTPException(status_code=500, detail="No optimal solution found.")

    solution = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            if x[i, j].X > 0.5:
                solution[i, j] = 1

    tour = []
    current_city = 0
    visited = set()
    while len(tour) < n:
        tour.append(current_city)
        visited.add(current_city)
        next_city = int(np.where(solution[current_city] == 1)[0][0])
        current_city = next_city
    tour.append(tour[0])  

    best_path = [cities[i] for i in tour]
    min_cost = model.objVal

    return TSPResponse(best_path=best_path, min_cost=min_cost)
