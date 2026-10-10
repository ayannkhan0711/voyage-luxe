// Master list of global and Indian airports, cities, railway stations, and luxury destinations
const AIRPORTS_AND_CITIES = [
  // India (Major Metro & Regional Airports & Stations)
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India', type: 'airport', isIndia: true },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India', type: 'airport', isIndia: true },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', country: 'India', type: 'airport', isIndia: true },
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India', type: 'airport', isIndia: true },
  { code: 'CCU', name: 'Netaji Subhash Chandra Bose International', city: 'Kolkata', country: 'India', type: 'airport', isIndia: true },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India', type: 'airport', isIndia: true },
  { code: 'GOI', name: 'Goa Dabolim Airport', city: 'Goa', country: 'India', type: 'airport', isIndia: true },
  { code: 'GOX', name: 'Manohar International Airport (Mopa)', city: 'Goa', country: 'India', type: 'airport', isIndia: true },
  { code: 'COK', name: 'Cochin International Airport', city: 'Kochi', country: 'India', type: 'airport', isIndia: true },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel International', city: 'Ahmedabad', country: 'India', type: 'airport', isIndia: true },
  { code: 'JAI', name: 'Jaipur International Airport', city: 'Jaipur', country: 'India', type: 'airport', isIndia: true },
  { code: 'UDR', name: 'Maharana Pratap Airport', city: 'Udaipur', country: 'India', type: 'airport', isIndia: true },
  { code: 'VNS', name: 'Lal Bahadur Shastri Airport', city: 'Varanasi', country: 'India', type: 'airport', isIndia: true },
  { code: 'ATQ', name: 'Sri Guru Ram Dass Jee International', city: 'Amritsar', country: 'India', type: 'airport', isIndia: true },
  { code: 'SXR', name: 'Sheikh ul-Alam International Airport', city: 'Srinagar', country: 'India', type: 'airport', isIndia: true },
  { code: 'IXB', name: 'Bagdogra Airport (Darjeeling Gateway)', city: 'Siliguri', country: 'India', type: 'airport', isIndia: true },
  { code: 'PNQ', name: 'Pune International Airport', city: 'Pune', country: 'India', type: 'airport', isIndia: true },
  { code: 'LKO', name: 'Chaudhary Charan Singh International', city: 'Lucknow', country: 'India', type: 'airport', isIndia: true },

  // International Tier-1 Luxury Gateways
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States', type: 'airport', isIndia: false },
  { code: 'EWR', name: 'Newark Liberty International', city: 'New York', country: 'United States', type: 'airport', isIndia: false },
  { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', type: 'airport', isIndia: false },
  { code: 'LGW', name: 'London Gatwick Airport', city: 'London', country: 'United Kingdom', type: 'airport', isIndia: false },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', type: 'airport', isIndia: false },
  { code: 'ORY', name: 'Paris Orly Airport', city: 'Paris', country: 'France', type: 'airport', isIndia: false },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE', type: 'airport', isIndia: false },
  { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', type: 'airport', isIndia: false },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', type: 'airport', isIndia: false },
  { code: 'HND', name: 'Tokyo Haneda International', city: 'Tokyo', country: 'Japan', type: 'airport', isIndia: false },
  { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan', type: 'airport', isIndia: false },
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', type: 'airport', isIndia: false },
  { code: 'GVA', name: 'Geneva Airport', city: 'Geneva', country: 'Switzerland', type: 'airport', isIndia: false },
  { code: 'FCO', name: 'Leonardo da Vinci–Fiumicino', city: 'Rome', country: 'Italy', type: 'airport', isIndia: false },
  { code: 'MXP', name: 'Milan Malpensa Airport', city: 'Milan', country: 'Italy', type: 'airport', isIndia: false },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', type: 'airport', isIndia: false },
  { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia', type: 'airport', isIndia: false },
  { code: 'DPS', name: 'Ngurah Rai International Airport', city: 'Bali', country: 'Indonesia', type: 'airport', isIndia: false },
  { code: 'MLE', name: 'Velana International Airport', city: 'Male', country: 'Maldives', type: 'airport', isIndia: false },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', type: 'airport', isIndia: false },
  { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong', type: 'airport', isIndia: false },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'United States', type: 'airport', isIndia: false },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'United States', type: 'airport', isIndia: false },

  // Luxury / Bespoke Reserves
  { code: 'HRN', name: 'Hernur Grand Riviera', city: 'Hernur', country: 'Riviera Reserve', type: 'city', isIndia: false },
  { code: 'PNL', name: 'Panling Atoll Marine Reserve', city: 'Panling', country: 'Emerald Atoll', type: 'city', isIndia: false },
  { code: 'FML', name: 'Famling Château Domain', city: 'Famling', country: 'Heritage Vineyards', type: 'city', isIndia: false },
  { code: 'VUK', name: 'Vouke Alpine Chalet', city: 'Vouke', country: 'Alpine Glaciers', type: 'city', isIndia: false },
];

function isIndianCityOrAirport(str = '') {
  if (!str) return false;
  const s = str.trim().toLowerCase();
  const indianKeywords = [
    'india', 'delhi', 'mumbai', 'bombay', 'bengaluru', 'bangalore', 'chennai', 'madras',
    'kolkata', 'calcutta', 'hyderabad', 'goa', 'kochi', 'cochin', 'ahmedabad', 'jaipur',
    'udaipur', 'varanasi', 'amritsar', 'srinagar', 'pune', 'lucknow', 'darjeeling',
    'del', 'bom', 'blr', 'maa', 'ccu', 'hyd', 'goi', 'gox', 'cok', 'amd', 'jai', 'udr', 'vns', 'pnq'
  ];
  return indianKeywords.some((k) => s.includes(k));
}

function resolveLocation(query = '') {
  if (!query) return null;
  const clean = query.trim().toLowerCase();
  return AIRPORTS_AND_CITIES.find(
    (item) =>
      item.code.toLowerCase() === clean ||
      item.city.toLowerCase() === clean ||
      clean.includes(item.city.toLowerCase()) ||
      clean.includes(item.code.toLowerCase())
  );
}

module.exports = {
  AIRPORTS_AND_CITIES,
  isIndianCityOrAirport,
  resolveLocation,
};
