// The figures behind Nusantara Statistics.
// Every number is a published public statistic for Indonesia, labelled in the
// interface with its source (BPS — Statistics Indonesia, Bank Indonesia, or
// the Ministry of Finance) and its year. Figures are rounded for display;
// the site never invents a number and never fetches one at run time.

export const META = {
  country: 'Indonesia',
  updated: '26 November 2026',
  currency: 'rupiah (Rp)',
};

export const KPIS = [
  { label: 'Population', value: '281.6m', note: '2024 · BPS', href: '#/people', hint: 'People' },
  { label: 'GDP', value: 'Rp 22,139tn', note: '2024 · BPS', href: '#/economy', hint: 'Economy' },
  { label: 'GDP growth', value: '5.03%', note: '2024 · BPS', href: '#/economy', hint: 'Economy' },
  { label: 'GDP per capita', value: 'US$ 4,960', note: '2024 · BPS', href: '#/economy', hint: 'Economy' },
  { label: 'Unemployment', value: '4.76%', note: 'Feb 2025 · BPS', href: '#/people', hint: 'People' },
  { label: 'Inflation (y-on-y)', value: '1.57%', note: 'Dec 2024 · BPS', href: '#/prices', hint: 'Prices' },
];

// Real GDP growth, percent per year, 2015-2024 (BPS).
export const GDP_GROWTH = [
  { year: 2015, v: 4.88 }, { year: 2016, v: 5.03 }, { year: 2017, v: 5.07 },
  { year: 2018, v: 5.17 }, { year: 2019, v: 5.02 }, { year: 2020, v: -2.07 },
  { year: 2021, v: 3.70 }, { year: 2022, v: 5.31 }, { year: 2023, v: 5.05 },
  { year: 2024, v: 5.03 },
];

// Population, millions, selected years (BPS census and intercensal estimates).
export const POPULATION = [
  { year: 2015, v: 255.6 }, { year: 2018, v: 266.9 }, { year: 2020, v: 270.2 },
  { year: 2022, v: 275.8 }, { year: 2024, v: 281.6 },
];

// Share of GDP by sector, percent, 2024 (BPS).
export const SECTORS = [
  { name: 'Manufacturing', v: 19.0 },
  { name: 'Wholesale & retail trade', v: 13.0 },
  { name: 'Agriculture, forestry & fishing', v: 11.9 },
  { name: 'Construction', v: 10.2 },
  { name: 'Mining & quarrying', v: 8.3 },
  { name: 'Public administration & defence', v: 7.3 },
  { name: 'Transport & storage', v: 5.1 },
  { name: 'Financial & insurance', v: 4.1 },
  { name: 'Information & communication', v: 4.1 },
  { name: 'Real estate', v: 2.7 },
  { name: 'Other services', v: 14.3 },
];

// Trade, US$ billion, 2024 (BPS / Ministry of Trade).
export const TRADE = { exports: 264.7, imports: 233.7, surplus: 31.0, year: 2024 };

// Age structure, percent of population, 2024 (BPS).
export const AGE_GROUPS = [
  { group: '0–14', v: 24.4 },
  { group: '15–29', v: 25.0 },
  { group: '30–44', v: 22.4 },
  { group: '45–59', v: 17.5 },
  { group: '60+', v: 10.7 },
];

// Consumer-price inflation, percent year-on-year, by month, 2024 (BPS).
export const INFLATION_2024 = [
  { m: 'Jan', v: 2.57 }, { m: 'Feb', v: 2.75 }, { m: 'Mar', v: 3.05 },
  { m: 'Apr', v: 3.00 }, { m: 'May', v: 2.84 }, { m: 'Jun', v: 2.51 },
  { m: 'Jul', v: 2.13 }, { m: 'Aug', v: 2.12 }, { m: 'Sep', v: 1.84 },
  { m: 'Oct', v: 1.71 }, { m: 'Nov', v: 1.55 }, { m: 'Dec', v: 1.57 },
];

// Annual average inflation, percent, 2015-2024 (BPS).
export const INFLATION_ANNUAL = [
  { year: 2015, v: 6.38 }, { year: 2016, v: 3.53 }, { year: 2017, v: 3.61 },
  { year: 2018, v: 3.13 }, { year: 2019, v: 2.72 }, { year: 2020, v: 1.68 },
  { year: 2021, v: 1.87 }, { year: 2022, v: 5.51 }, { year: 2023, v: 2.61 },
  { year: 2024, v: 2.38 },
];

// Largest provinces by population, millions, 2024 (BPS). gdpShare is the
// province's approximate share of national GDP, percent, 2024.
export const PROVINCES = [
  { name: 'West Java', pop: 49.94, gdpShare: 14.4 },
  { name: 'East Java', pop: 41.81, gdpShare: 14.4 },
  { name: 'Central Java', pop: 37.89, gdpShare: 8.3 },
  { name: 'North Sumatra', pop: 15.59, gdpShare: 5.0 },
  { name: 'Banten', pop: 12.43, gdpShare: 3.2 },
  { name: 'Jakarta', pop: 10.56, gdpShare: 16.5 },
  { name: 'South Sulawesi', pop: 9.42, gdpShare: 3.1 },
  { name: 'Lampung', pop: 9.28, gdpShare: 2.6 },
  { name: 'South Sumatra', pop: 8.94, gdpShare: 3.0 },
  { name: 'Riau', pop: 6.91, gdpShare: 5.1 },
  { name: 'West Sumatra', pop: 6.02, gdpShare: 1.9 },
  { name: 'West Kalimantan', pop: 5.80, gdpShare: 1.9 },
  { name: 'South Kalimantan', pop: 4.37, gdpShare: 1.7 },
  { name: 'Bali', pop: 4.36, gdpShare: 1.6 },
  { name: 'East Kalimantan', pop: 4.01, gdpShare: 5.4 },
  { name: 'Aceh', pop: 5.51, gdpShare: 1.6 },
];

// Latest statistical releases (BPS release calendar, Nov 2026).
export const RELEASES = [
  { date: '25 Nov 2026', title: 'Exports and imports, October 2026', topic: 'Trade' },
  { date: '17 Nov 2026', title: 'Labour force situation, August 2026', topic: 'People' },
  { date: '5 Nov 2026', title: 'Economic growth, Q3 2026', topic: 'Economy' },
  { date: '3 Nov 2026', title: 'Consumer price index, October 2026', topic: 'Prices' },
  { date: '15 Oct 2026', title: 'Poverty profile, March 2026', topic: 'People' },
  { date: '1 Oct 2026', title: 'Producer price index, Q3 2026', topic: 'Prices' },
];

export const SOURCES = [
  { name: 'BPS — Statistics Indonesia', what: 'Population, GDP, inflation, labour, poverty', url: 'bps.go.id' },
  { name: 'Bank Indonesia', what: 'Exchange rate, balance of payments', url: 'bi.go.id' },
  { name: 'Ministry of Finance', what: 'State budget and fiscal figures', url: 'kemenkeu.go.id' },
  { name: 'Ministry of Trade', what: 'Export and import values', url: 'kemendag.go.id' },
];
