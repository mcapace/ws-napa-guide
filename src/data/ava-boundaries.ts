// Approximate AVA boundary polygons for Napa Valley appellations
// Coordinates are [longitude, latitude]
export const avaBoundaries = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: {
        name: 'Oakville',
        slug: 'oakville',
        color: '#C4943A',
        description: 'The Cabernet heartland — volcanic and alluvial benchland soils',
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-122.450, 38.435],
          [-122.380, 38.435],
          [-122.370, 38.445],
          [-122.365, 38.465],
          [-122.380, 38.470],
          [-122.450, 38.470],
          [-122.460, 38.455],
          [-122.450, 38.435],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: {
        name: 'Rutherford',
        slug: 'rutherford',
        color: '#8B2E3E',
        description: 'Rutherford dust — silty loam soils of legendary age-worthiness',
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-122.450, 38.470],
          [-122.380, 38.470],
          [-122.370, 38.480],
          [-122.368, 38.500],
          [-122.385, 38.510],
          [-122.455, 38.508],
          [-122.462, 38.490],
          [-122.450, 38.470],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: {
        name: 'Calistoga',
        slug: 'calistoga',
        color: '#5C6B52',
        description: 'Northern valley heat, volcanic soils, bold reds and legendary spas',
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-122.620, 38.555],
          [-122.530, 38.550],
          [-122.510, 38.560],
          [-122.505, 38.590],
          [-122.520, 38.610],
          [-122.600, 38.615],
          [-122.630, 38.595],
          [-122.620, 38.555],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: {
        name: 'Yountville',
        slug: 'yountville',
        color: '#9B9283',
        description: 'The culinary capital — more Michelin stars per capita than anywhere in America',
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-122.400, 38.390],
          [-122.340, 38.390],
          [-122.330, 38.400],
          [-122.332, 38.420],
          [-122.348, 38.428],
          [-122.405, 38.425],
          [-122.412, 38.410],
          [-122.400, 38.390],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: {
        name: 'Pritchard Hill',
        slug: 'pritchard-hill',
        color: '#D4A94F',
        description: 'Napa\'s most coveted mountain address — cult Cabernets above Lake Hennessey',
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-122.480, 38.500],
          [-122.420, 38.495],
          [-122.410, 38.510],
          [-122.415, 38.545],
          [-122.440, 38.555],
          [-122.490, 38.548],
          [-122.498, 38.525],
          [-122.480, 38.500],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: {
        name: 'Downtown Napa',
        slug: 'downtown-napa',
        color: '#B5ADA0',
        description: 'The reinvented city — chefs, hoteliers and the Oxbow Market',
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-122.310, 38.285],
          [-122.260, 38.285],
          [-122.255, 38.305],
          [-122.262, 38.318],
          [-122.295, 38.320],
          [-122.315, 38.310],
          [-122.310, 38.285],
        ]],
      },
    },
  ],
}

export type AVAFeature = typeof avaBoundaries.features[0]
