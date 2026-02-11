export interface SoilInfo {
  region: string;
  states: string[];
  soilType: string;
  soilTypeHi: string;
  majorCrops: string;
  majorCropsHi: string;
  irrigation: string;
  irrigationHi: string;
  ph: string;
  nutrients: string;
}

export const soilDatabase: SoilInfo[] = [
  {
    region: 'Indo-Gangetic Plains',
    states: ['Uttar Pradesh', 'Bihar', 'Punjab', 'Haryana', 'West Bengal'],
    soilType: 'Alluvial Soil',
    soilTypeHi: '\u091C\u0932\u094B\u0922\u093C \u092E\u093F\u091F\u094D\u091F\u0940',
    majorCrops: 'Rice, Wheat, Sugarcane, Maize',
    majorCropsHi: '\u0927\u093E\u0928, \u0917\u0947\u0939\u0942\u0901, \u0917\u0928\u094D\u0928\u093E, \u092E\u0915\u094D\u0915\u093E',
    irrigation: 'Canal & Tube Wells',
    irrigationHi: '\u0928\u0939\u0930 \u0914\u0930 \u091F\u094D\u092F\u0942\u092C\u0935\u0947\u0932',
    ph: '6.5-8.0',
    nutrients: 'Rich in potash, phosphoric acid',
  },
  {
    region: 'Deccan Plateau',
    states: ['Maharashtra', 'Karnataka', 'Telangana', 'Andhra Pradesh', 'Madhya Pradesh'],
    soilType: 'Black Cotton Soil (Regur)',
    soilTypeHi: '\u0915\u093E\u0932\u0940 \u092E\u093F\u091F\u094D\u091F\u0940 (\u0930\u0947\u0917\u0941\u0930)',
    majorCrops: 'Cotton, Soybean, Jowar, Groundnut',
    majorCropsHi: '\u0915\u092A\u093E\u0938, \u0938\u094B\u092F\u093E\u092C\u0940\u0928, \u091C\u094D\u0935\u093E\u0930, \u092E\u0942\u0902\u0917\u092B\u0932\u0940',
    irrigation: 'Well & Drip Irrigation',
    irrigationHi: '\u0915\u0941\u0906\u0901 \u0914\u0930 \u091F\u092A\u0915 \u0938\u093F\u0902\u091A\u093E\u0908',
    ph: '7.2-8.5',
    nutrients: 'Rich in calcium, magnesium, iron',
  },
  {
    region: 'Western Coast',
    states: ['Goa', 'Kerala', 'Coastal Karnataka'],
    soilType: 'Laterite Soil',
    soilTypeHi: '\u0932\u0947\u091F\u0930\u093E\u0907\u091F \u092E\u093F\u091F\u094D\u091F\u0940',
    majorCrops: 'Coconut, Rice, Spices, Rubber',
    majorCropsHi: '\u0928\u093E\u0930\u093F\u092F\u0932, \u0927\u093E\u0928, \u092E\u0938\u093E\u0932\u0947, \u0930\u092C\u0930',
    irrigation: 'Rainfall & Well',
    irrigationHi: '\u0935\u0930\u094D\u0937\u093E \u0914\u0930 \u0915\u0941\u0906\u0901',
    ph: '5.0-6.5',
    nutrients: 'Rich in iron, aluminium',
  },
  {
    region: 'Western Rajasthan',
    states: ['Rajasthan', 'Gujarat'],
    soilType: 'Desert / Arid Soil',
    soilTypeHi: '\u0930\u0947\u0924\u0940\u0932\u0940 / \u0936\u0941\u0937\u094D\u0915 \u092E\u093F\u091F\u094D\u091F\u0940',
    majorCrops: 'Bajra, Mustard, Cumin, Guar',
    majorCropsHi: '\u092C\u093E\u091C\u0930\u093E, \u0938\u0930\u0938\u094B\u0902, \u091C\u0940\u0930\u093E, \u0917\u094D\u0935\u093E\u0930',
    irrigation: 'Sprinkler & Canal',
    irrigationHi: '\u092B\u0941\u0939\u093E\u0930\u093E \u0914\u0930 \u0928\u0939\u0930',
    ph: '7.5-9.0',
    nutrients: 'Rich in phosphate, calcium',
  },
  {
    region: 'North-East India',
    states: ['Assam', 'Meghalaya', 'Nagaland', 'Manipur', 'Mizoram', 'Tripura', 'Arunachal Pradesh', 'Sikkim'],
    soilType: 'Forest / Mountain Soil',
    soilTypeHi: '\u0935\u0928 / \u092A\u0939\u093E\u0921\u093C\u0940 \u092E\u093F\u091F\u094D\u091F\u0940',
    majorCrops: 'Tea, Rice, Bamboo, Fruits',
    majorCropsHi: '\u091A\u093E\u092F, \u0927\u093E\u0928, \u092C\u093E\u0902\u0938, \u092B\u0932',
    irrigation: 'Rainfall',
    irrigationHi: '\u0935\u0930\u094D\u0937\u093E',
    ph: '5.0-6.0',
    nutrients: 'Rich in humus, organic matter',
  },
  {
    region: 'Southern Tamil Nadu',
    states: ['Tamil Nadu', 'Puducherry'],
    soilType: 'Red & Sandy Soil',
    soilTypeHi: '\u0932\u093E\u0932 \u0914\u0930 \u092C\u0932\u0941\u0908 \u092E\u093F\u091F\u094D\u091F\u0940',
    majorCrops: 'Rice, Millets, Groundnut, Cotton',
    majorCropsHi: '\u0927\u093E\u0928, \u092C\u093E\u091C\u0930\u093E, \u092E\u0942\u0902\u0917\u092B\u0932\u0940, \u0915\u092A\u093E\u0938',
    irrigation: 'Tank & Well',
    irrigationHi: '\u0924\u093E\u0932\u093E\u092C \u0914\u0930 \u0915\u0941\u0906\u0901',
    ph: '6.0-7.5',
    nutrients: 'Rich in iron oxide',
  },
  {
    region: 'Chhattisgarh & Jharkhand',
    states: ['Chhattisgarh', 'Jharkhand', 'Odisha'],
    soilType: 'Red & Yellow Soil',
    soilTypeHi: '\u0932\u093E\u0932 \u0914\u0930 \u092A\u0940\u0932\u0940 \u092E\u093F\u091F\u094D\u091F\u0940',
    majorCrops: 'Rice, Pulses, Oilseeds',
    majorCropsHi: '\u0927\u093E\u0928, \u0926\u093E\u0932\u0947\u0902, \u0924\u093F\u0932\u0939\u0928',
    irrigation: 'Rainfall & Canal',
    irrigationHi: '\u0935\u0930\u094D\u0937\u093E \u0914\u0930 \u0928\u0939\u0930',
    ph: '5.5-7.0',
    nutrients: 'Moderate in nitrogen, phosphorus',
  },
];

export function getSoilInfoByState(state: string): SoilInfo | null {
  const normalizedState = state.toLowerCase().trim();
  for (const soil of soilDatabase) {
    for (const s of soil.states) {
      if (s.toLowerCase().includes(normalizedState) || normalizedState.includes(s.toLowerCase())) {
        return soil;
      }
    }
  }
  return soilDatabase[0];
}
