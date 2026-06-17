#!/usr/bin/env bash

set -euo pipefail

BASE_URL="https://swapi.py4e.com/api"

curl -s "${BASE_URL}/people/schema" > ../lib/schemas/peopleSchema.json
curl -s "${BASE_URL}/planets/schema" > ../lib/schemas/planetsSchema.json
curl -s "${BASE_URL}/films/schema" > ../lib/schemas/filmsSchema.json
curl -s "${BASE_URL}/species/schema" > ../lib/schemas/speciesSchema.json
curl -s "${BASE_URL}/starships/schema" > ../lib/schemas/starshipsSchema.json
curl -s "${BASE_URL}/vehicles/schema" > ../lib/schemas/vehiclesSchema.json

echo "Schemas downloaded."