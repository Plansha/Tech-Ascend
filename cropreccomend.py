export interface CropRecommendation {
  name: string;
  nameHi: string;
  season: string;
  seasonHi: string;
  waterNeeds: string;
  waterNeedsHi: string;
  expectedYield: string;
  expectedYieldHi: string;
  icon: string;
  minTemp: number;
  maxTemp: number;
  minRainfall: number;
  maxRainfall: number;
  soilTypes: string[];
}

export const allCrops: CropRecommendation[] = [
  {
    name: 'Rice (Paddy)',
    nameHi: '\u0927\u093E\u0928',
    season: 'Kharif',
    seasonHi: '\u0916\u0930\u0940\u092B',
    waterNeeds: 'High (1200-2000mm)',
    waterNeedsHi: '\u0905\u0927\u093F\u0915 (1200-2000mm)',
    expectedYield: '3-5 tonnes/hectare',
    expectedYieldHi: '3-5 \u091F\u0928/\u0939\u0947\u0915\u094D\u091F\u0947\u092F\u0930',
    icon: 'grain',
    minTemp: 20,
    maxTemp: 37,
    minRainfall: 100,
    maxRainfall: 300,
    soilTypes: ['Alluvial Soil', 'Clay', 'Laterite Soil'],
  },
  {
    name: 'Wheat',
    nameHi: '\u0917\u0947\u0939\u0942\u0901',
    season: 'Rabi',
    seasonHi: '\u0930\u092C\u0940',
    waterNeeds: 'Moderate (450-650mm)',
    waterNeedsHi: '\u092E\u0927\u094D\u092F\u092E (450-650mm)',
    expectedYield: '3-6 tonnes/hectare',
    expectedYieldHi: '3-6 \u091F\u0928/\u0939\u0947\u0915\u094D\u091F\u0947\u092F\u0930',
    icon: 'grain',
    minTemp: 10,
    maxTemp: 25,
    minRainfall: 20,
    maxRainfall: 100,
    soilTypes: ['Alluvial Soil', 'Black Cotton Soil (Regur)', 'Clay'],
  },
  {
    name: 'Maize (Corn)',
    nameHi: '\u092E\u0915\u094D\u0915\u093E',
    season: 'Kharif',
    seasonHi: '\u0916\u0930\u0940\u092B',
    waterNeeds: 'Moderate (500-800mm)',
    waterNeedsHi: '\u092E\u0927\u094D\u092F\u092E (500-800mm)',
    expectedYield: '5-8 tonnes/hectare',
    expectedYieldHi: '5-8 \u091F\u0928/\u0939\u0947\u0915\u094D\u091F\u0947\u092F\u0930',
    icon: 'grain',
    minTemp: 18,
    maxTemp: 35,
    minRainfall: 50,
    maxRainfall: 200,
    soilTypes: ['Alluvial Soil', 'Red & Sandy Soil', 'Black Cotton Soil (Regur)'],
  },
  {
    name: 'Cotton',
    nameHi: '\u0915\u092A\u093E\u0938',
    season: 'Kharif',
    seasonHi: '\u0916\u0930\u0940\u092B',
    waterNeeds: 'Moderate (700-1300mm)',
    waterNeedsHi: '\u092E\u0927\u094D\u092F\u092E (700-1300mm)',
    expectedYield: '1.5-3 tonnes/hectare',
    expectedYieldHi: '1.5-3 \u091F\u0928/\u0939\u0947\u0915\u094D\u091F\u0947\u092F\u0930',
    icon: 'cloud-outline',
    minTemp: 20,
    maxTemp: 40,
    minRainfall: 50,
    maxRainfall: 150,
    soilTypes: ['Black Cotton Soil (Regur)', 'Alluvial Soil'],
  },
  {
    name: 'Soybean',
    nameHi: '\u0938\u094B\u092F\u093E\u092C\u0940\u0928',
    season: 'Kharif',
    seasonHi: '\u0916\u0930\u0940\u092B',
    waterNeeds: 'Moderate (450-700mm)',
    waterNeedsHi: '\u092E\u0927\u094D\u092F\u092E (450-700mm)',
    expectedYield: '1.5-2.5 tonnes/hectare',
    expectedYieldHi: '1.5-2.5 \u091F\u0928/\u0939\u0947\u0915\u094D\u091F\u0947\u092F\u0930',
    icon: 'leaf',
    minTemp: 20,
    maxTemp: 35,
    minRainfall: 60,
    maxRainfall: 200,
    soilTypes: ['Black Cotton Soil (Regur)', 'Alluvial Soil', 'Red & Yellow Soil'],
  },
  {
    name: 'Groundnut',
    nameHi: '\u092E\u0942\u0902\u0917\u092B\u0932\u0940',
    season: 'Kharif',
    seasonHi: '\u0916\u0930\u0940\u092B',
    waterNeeds: 'Low-Moderate (500-700mm)',
    waterNeedsHi: '\u0915\u092E-\u092E\u0927\u094D\u092F\u092E (500-700mm)',
    expectedYield: '1.5-2 tonnes/hectare',
    expectedYieldHi: '1.5-2 \u091F\u0928/\u0939\u0947\u0915\u094D\u091F\u0947\u092F\u0930',
    icon: 'nutrition',
    minTemp: 22,
    maxTemp: 38,
    minRainfall: 40,
    maxRainfall: 150,
    soilTypes: ['Red & Sandy Soil', 'Alluvial Soil', 'Black Cotton Soil (Regur)'],
  },
  {
    name: 'Mustard',
    nameHi: '\u0938\u0930\u0938\u094B\u0902',
    season: 'Rabi',
    seasonHi: '\u0930\u092C\u0940',
    waterNeeds: 'Low (250-400mm)',
    waterNeedsHi: '\u0915\u092E (250-400mm)',
    expectedYield: '1-2 tonnes/hectare',
    expectedYieldHi: '1-2 \u091F\u0928/\u0939\u0947\u0915\u094D\u091F\u0947\u092F\u0930',
    icon: 'flower',
    minTemp: 10,
    maxTemp: 25,
    minRainfall: 10,
    maxRainfall: 60,
    soilTypes: ['Alluvial Soil', 'Desert / Arid Soil', 'Red & Sandy Soil'],
  },
  {
    name: 'Bajra (Pearl Millet)',
    nameHi: '\u092C\u093E\u091C\u0930\u093E',
    season: 'Kharif',
    seasonHi: '\u0916\u0930\u0940\u092B',
    waterNeeds: 'Low (250-500mm)',
    waterNeedsHi: '\u0915\u092E (250-500mm)',
    expectedYield: '1.5-3 tonnes/hectare',
    expectedYieldHi: '1.5-3 \u091F\u0928/\u0939\u0947\u0915\u094D\u091F\u0947\u092F\u0930',
    icon: 'grain',
    minTemp: 25,
    maxTemp: 42,
    minRainfall: 20,
    maxRainfall: 100,
    soilTypes: ['Desert / Arid Soil', 'Red & Sandy Soil', 'Alluvial Soil'],
  },
  {
    name: 'Sugarcane',
    nameHi: '\u0917\u0928\u094D\u0928\u093E',
    season: 'Kharif',
    seasonHi: '\u0916\u0930\u0940\u092B',
    waterNeeds: 'High (1500-2500mm)',
    waterNeedsHi: '\u0905\u0927\u093F\u0915 (1500-2500mm)',
    expectedYield: '60-100 tonnes/hectare',
    expectedYieldHi: '60-100 \u091F\u0928/\u0939\u0947\u0915\u094D\u091F\u0947\u092F\u0930',
    icon: 'leaf',
    minTemp: 20,
    maxTemp: 40,
    minRainfall: 80,
    maxRainfall: 300,
    soilTypes: ['Alluvial Soil', 'Black Cotton Soil (Regur)'],
  },
  {
    name: 'Chickpea (Chana)',
    nameHi: '\u091A\u0928\u093E',
    season: 'Rabi',
    seasonHi: '\u0930\u092C\u0940',
    waterNeeds: 'Low (300-450mm)',
    waterNeedsHi: '\u0915\u092E (300-450mm)',
    expectedYield: '1-2 tonnes/hectare',
    expectedYieldHi: '1-2 \u091F\u0928/\u0939\u0947\u0915\u094D\u091F\u0947\u092F\u0930',
    icon: 'nutrition',
    minTemp: 15,
    maxTemp: 30,
    minRainfall: 10,
    maxRainfall: 60,
    soilTypes: ['Black Cotton Soil (Regur)', 'Alluvial Soil', 'Red & Yellow Soil'],
  },
];

export function getRecommendedCrops(
  temperature: number,
  rainfall: number,
  soilType: string
): CropRecommendation[] {
  return allCrops.filter((crop) => {
    const tempMatch = temperature >= crop.minTemp && temperature <= crop.maxTemp;
    const rainfallMatch = rainfall >= crop.minRainfall && rainfall <= crop.maxRainfall;
    const soilMatch = crop.soilTypes.some(
      (s) => soilType.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(soilType.toLowerCase())
    );
    return (tempMatch && rainfallMatch) || (tempMatch && soilMatch) || (rainfallMatch && soilMatch);
  }).slice(0, 6);
}
