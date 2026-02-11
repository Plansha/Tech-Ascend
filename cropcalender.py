export interface CropCalendarItem {
  name: string;
  nameHi: string;
  sowing: string;
  sowingHi: string;
  harvest: string;
  harvestHi: string;
  icon: string;
}

export interface SeasonData {
  season: string;
  seasonHi: string;
  months: string;
  monthsHi: string;
  crops: CropCalendarItem[];
}

export const cropCalendarData: SeasonData[] = [
  {
    season: 'Kharif (Monsoon)',
    seasonHi: '\u0916\u0930\u0940\u092B (\u092E\u093E\u0928\u0938\u0942\u0928)',
    months: 'June - October',
    monthsHi: '\u091C\u0942\u0928 - \u0905\u0915\u094D\u091F\u0942\u092C\u0930',
    crops: [
      {
        name: 'Rice (Paddy)',
        nameHi: '\u0927\u093E\u0928',
        sowing: 'June - July',
        sowingHi: '\u091C\u0942\u0928 - \u091C\u0941\u0932\u093E\u0908',
        harvest: 'October - November',
        harvestHi: '\u0905\u0915\u094D\u091F\u0942\u092C\u0930 - \u0928\u0935\u0902\u092C\u0930',
        icon: 'grain',
      },
      {
        name: 'Maize (Corn)',
        nameHi: '\u092E\u0915\u094D\u0915\u093E',
        sowing: 'June - July',
        sowingHi: '\u091C\u0942\u0928 - \u091C\u0941\u0932\u093E\u0908',
        harvest: 'September - October',
        harvestHi: '\u0938\u093F\u0924\u0902\u092C\u0930 - \u0905\u0915\u094D\u091F\u0942\u092C\u0930',
        icon: 'grain',
      },
      {
        name: 'Cotton',
        nameHi: '\u0915\u092A\u093E\u0938',
        sowing: 'April - May',
        sowingHi: '\u0905\u092A\u094D\u0930\u0948\u0932 - \u092E\u0908',
        harvest: 'October - January',
        harvestHi: '\u0905\u0915\u094D\u091F\u0942\u092C\u0930 - \u091C\u0928\u0935\u0930\u0940',
        icon: 'cloud-outline',
      },
      {
        name: 'Soybean',
        nameHi: '\u0938\u094B\u092F\u093E\u092C\u0940\u0928',
        sowing: 'June - July',
        sowingHi: '\u091C\u0942\u0928 - \u091C\u0941\u0932\u093E\u0908',
        harvest: 'September - October',
        harvestHi: '\u0938\u093F\u0924\u0902\u092C\u0930 - \u0905\u0915\u094D\u091F\u0942\u092C\u0930',
        icon: 'leaf',
      },
      {
        name: 'Groundnut',
        nameHi: '\u092E\u0942\u0902\u0917\u092B\u0932\u0940',
        sowing: 'June - July',
        sowingHi: '\u091C\u0942\u0928 - \u091C\u0941\u0932\u093E\u0908',
        harvest: 'October - November',
        harvestHi: '\u0905\u0915\u094D\u091F\u0942\u092C\u0930 - \u0928\u0935\u0902\u092C\u0930',
        icon: 'nutrition',
      },
    ],
  },
  {
    season: 'Rabi (Winter)',
    seasonHi: '\u0930\u092C\u0940 (\u0938\u0930\u094D\u0926\u0940)',
    months: 'October - March',
    monthsHi: '\u0905\u0915\u094D\u091F\u0942\u092C\u0930 - \u092E\u093E\u0930\u094D\u091A',
    crops: [
      {
        name: 'Wheat',
        nameHi: '\u0917\u0947\u0939\u0942\u0901',
        sowing: 'October - December',
        sowingHi: '\u0905\u0915\u094D\u091F\u0942\u092C\u0930 - \u0926\u093F\u0938\u0902\u092C\u0930',
        harvest: 'March - April',
        harvestHi: '\u092E\u093E\u0930\u094D\u091A - \u0905\u092A\u094D\u0930\u0948\u0932',
        icon: 'grain',
      },
      {
        name: 'Mustard',
        nameHi: '\u0938\u0930\u0938\u094B\u0902',
        sowing: 'October - November',
        sowingHi: '\u0905\u0915\u094D\u091F\u0942\u092C\u0930 - \u0928\u0935\u0902\u092C\u0930',
        harvest: 'February - March',
        harvestHi: '\u092B\u0930\u0935\u0930\u0940 - \u092E\u093E\u0930\u094D\u091A',
        icon: 'flower',
      },
      {
        name: 'Chickpea (Chana)',
        nameHi: '\u091A\u0928\u093E',
        sowing: 'October - November',
        sowingHi: '\u0905\u0915\u094D\u091F\u0942\u092C\u0930 - \u0928\u0935\u0902\u092C\u0930',
        harvest: 'February - March',
        harvestHi: '\u092B\u0930\u0935\u0930\u0940 - \u092E\u093E\u0930\u094D\u091A',
        icon: 'nutrition',
      },
      {
        name: 'Potato',
        nameHi: '\u0906\u0932\u0942',
        sowing: 'October - November',
        sowingHi: '\u0905\u0915\u094D\u091F\u0942\u092C\u0930 - \u0928\u0935\u0902\u092C\u0930',
        harvest: 'January - March',
        harvestHi: '\u091C\u0928\u0935\u0930\u0940 - \u092E\u093E\u0930\u094D\u091A',
        icon: 'nutrition',
      },
      {
        name: 'Peas',
        nameHi: '\u092E\u091F\u0930',
        sowing: 'October - November',
        sowingHi: '\u0905\u0915\u094D\u091F\u0942\u092C\u0930 - \u0928\u0935\u0902\u092C\u0930',
        harvest: 'January - March',
        harvestHi: '\u091C\u0928\u0935\u0930\u0940 - \u092E\u093E\u0930\u094D\u091A',
        icon: 'leaf',
      },
    ],
  },
  {
    season: 'Zaid (Summer)',
    seasonHi: '\u091C\u093E\u092F\u0926 (\u0917\u0930\u094D\u092E\u0940)',
    months: 'March - June',
    monthsHi: '\u092E\u093E\u0930\u094D\u091A - \u091C\u0942\u0928',
    crops: [
      {
        name: 'Watermelon',
        nameHi: '\u0924\u0930\u092C\u0942\u091C',
        sowing: 'February - March',
        sowingHi: '\u092B\u0930\u0935\u0930\u0940 - \u092E\u093E\u0930\u094D\u091A',
        harvest: 'May - June',
        harvestHi: '\u092E\u0908 - \u091C\u0942\u0928',
        icon: 'nutrition',
      },
      {
        name: 'Cucumber',
        nameHi: '\u0916\u0940\u0930\u093E',
        sowing: 'February - March',
        sowingHi: '\u092B\u0930\u0935\u0930\u0940 - \u092E\u093E\u0930\u094D\u091A',
        harvest: 'April - June',
        harvestHi: '\u0905\u092A\u094D\u0930\u0948\u0932 - \u091C\u0942\u0928',
        icon: 'nutrition',
      },
      {
        name: 'Muskmelon',
        nameHi: '\u0916\u0930\u092C\u0942\u091C\u093E',
        sowing: 'February - March',
        sowingHi: '\u092B\u0930\u0935\u0930\u0940 - \u092E\u093E\u0930\u094D\u091A',
        harvest: 'May - June',
        harvestHi: '\u092E\u0908 - \u091C\u0942\u0928',
        icon: 'nutrition',
      },
      {
        name: 'Moong Dal',
        nameHi: '\u092E\u0942\u0902\u0917 \u0926\u093E\u0932',
        sowing: 'March - April',
        sowingHi: '\u092E\u093E\u0930\u094D\u091A - \u0905\u092A\u094D\u0930\u0948\u0932',
        harvest: 'May - June',
        harvestHi: '\u092E\u0908 - \u091C\u0942\u0928',
        icon: 'leaf',
      },
    ],
  },
];
