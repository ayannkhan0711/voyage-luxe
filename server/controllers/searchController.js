const amadeusService = require('../services/amadeusService');
const rome2rioService = require('../services/rome2rioService');
const cache = require('../config/redis');
const { AIRPORTS_AND_CITIES, isIndianCityOrAirport, resolveLocation } = require('../data/airportsData');

// Saved searches in-memory / cache fallback
let savedSearchesStore = [
  {
    id: 'saved-1',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    title: 'Autumn in Hernur & Panling',
    origin: 'New York (JFK)',
    destination: 'Hernur Grand Riviera',
    departureDate: '2026-11-20',
    returnDate: '2026-11-27',
    category: 'multi-modal',
    passengers: 2,
    cabinClass: 'First Class',
    savedAt: new Date(),
  },
  {
    id: 'saved-2',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    title: 'Vouke Chalet & Glacier Ski Hop',
    origin: 'Geneva (GVA)',
    destination: 'Vouke Alpine Reserve',
    departureDate: '2026-12-15',
    returnDate: '2026-12-22',
    category: 'hotel',
    passengers: 4,
    cabinClass: 'VIP Helicopter + Suite',
    savedAt: new Date(),
  },
];

// @desc Autocomplete airport & city suggestions
// @route GET /api/search/suggestions
exports.getSuggestions = async (req, res) => {
  const { query = '' } = req.query;
  const q = query.trim().toLowerCase();
  if (!q) {
    return res.status(200).json({
      success: true,
      data: AIRPORTS_AND_CITIES.slice(0, 8),
    });
  }

  const filtered = AIRPORTS_AND_CITIES.filter((item) =>
    item.code.toLowerCase().includes(q) ||
    item.city.toLowerCase().includes(q) ||
    item.name.toLowerCase().includes(q) ||
    item.country.toLowerCase().includes(q)
  );

  res.status(200).json({
    success: true,
    data: filtered.slice(0, 10),
  });
};

// @desc Multi-modal trip search
// @route GET /api/search/multi-modal
exports.searchMultiModal = async (req, res, next) => {
  try {
    const { origin = 'London', destination = 'Paris', date = '2026-11-15' } = req.query;
    const routes = await rome2rioService.searchMultiModal(origin, destination, date);

    res.status(200).json({
      success: true,
      query: { origin, destination, date },
      count: routes.length,
      data: routes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Flight search (Amadeus / Luxury Indian & Flag Carrier Live Engine)
// @route GET /api/search/flights
exports.searchFlights = async (req, res, next) => {
  try {
    const { origin = 'DEL', destination = 'BOM', date = '2026-11-20', cabinClass = 'First' } = req.query;
    const flights = await amadeusService.searchFlights(origin, destination, date, cabinClass);

    res.status(200).json({
      success: true,
      query: { origin, destination, date, cabinClass },
      count: flights.length,
      data: flights,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Railway search (Palace Rail, Indian Maharajas' Express / Vande Bharat Executive, Eurostar)
// @route GET /api/search/trains
exports.searchTrains = async (req, res, next) => {
  try {
    const { origin = 'Delhi', destination = 'Mumbai', date = '2026-11-20' } = req.query;
    const isIndia = isIndianCityOrAirport(origin) || isIndianCityOrAirport(destination);
    const currency = isIndia ? 'INR' : 'USD';

    let trains = [];
    if (isIndia) {
      trains = [
        {
          id: 'trn-in-01',
          name: "Maharajas' Express Heritage Presidential Suite",
          trainNumber: 'ME-001',
          origin: { station: `${origin} Central`, time: '08:00', city: origin },
          destination: { station: `${destination} Terminus`, time: '18:30', city: destination },
          duration: '10h 30m',
          coachClass: 'Navratna Presidential Palace Suite',
          price: 48000,
          currency: 'INR',
          operator: "IRCTC / Maharajas' Express",
          amenities: [
            'Dedicated 24/7 Royal Khidmatgar (Valet)',
            'Silver-plated dining service with bespoke thali',
            'En-suite private bathtub and shower cabin',
            'Complimentary off-train palace safari excursion',
          ],
          seatsAvailable: 2,
        },
        {
          id: 'trn-in-02',
          name: 'Vande Bharat Platinum Executive Class (EC)',
          trainNumber: 'VB-22436',
          origin: { station: `${origin} Executive Hub`, time: '06:15', city: origin },
          destination: { station: `${destination} Grand Junction`, time: '13:45', city: destination },
          duration: '7h 30m',
          coachClass: 'Executive Class (180° Rotating Recliners)',
          price: 3650,
          currency: 'INR',
          operator: 'Indian Railways High-Speed Network',
          amenities: [
            '180-degree rotating ergonomic leather seats',
            'Curated gourmet regional breakfast & lunch',
            'Bio-vacuum washroom with touchless sensors',
            'High-speed onboard entertainment hotspot',
          ],
          seatsAvailable: 8,
        },
        {
          id: 'trn-in-03',
          name: 'Tejas Express First AC Premier',
          trainNumber: 'TJ-82502',
          origin: { station: `${origin} Terminal`, time: '15:30', city: origin },
          destination: { station: `${destination} Platform 1`, time: '22:15', city: destination },
          duration: '6h 45m',
          coachClass: 'First AC Smart Cabin',
          price: 2850,
          currency: 'INR',
          operator: 'IRCTC Premium Fleet',
          amenities: [
            'Smart climate auto-adjustment',
            'Artisanal chai and coffee service on demand',
            'Attendant call button & reading led lamp',
          ],
          seatsAvailable: 12,
        },
      ];
    } else {
      trains = [
        {
          id: 'trn-001',
          name: 'Venice Simplon-Orient-Express',
          trainNumber: 'OE-101',
          origin: { station: `${origin} Station`, time: '09:15', city: origin },
          destination: { station: `${destination} Station`, time: '16:40', city: destination },
          duration: '7h 25m',
          coachClass: 'Grand Suite (Historic Art Deco)',
          price: 1850,
          currency: 'USD',
          operator: 'Belmond Orient-Express',
          amenities: ['Private marble bathroom', '24-hour steward', 'Free-flowing champagne', 'Fine crystal dining car'],
          seatsAvailable: 2,
        },
        {
          id: 'trn-002',
          name: 'Frecciarossa 1000 Executive Class',
          trainNumber: 'FR-9540',
          origin: { station: `${origin} Centrale`, time: '11:20', city: origin },
          destination: { station: `${destination} Centrale`, time: '18:10', city: destination },
          duration: '6h 50m',
          coachClass: 'Executive Lounge (Single Leather Recliners)',
          price: 380,
          currency: 'USD',
          operator: 'Trenitalia / SNCF',
          amenities: ['Rotating leather swivel chair', 'Meeting room onboard', 'Espresso bar & hot meal service', 'VIP station lounge'],
          seatsAvailable: 5,
        },
      ];
    }

    res.status(200).json({
      success: true,
      query: { origin, destination, date },
      count: trains.length,
      data: trains,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Luxury bus & coach search (City-aware, Volvo Multi-Axle Sleeper & Royale Cruisers)
// @route GET /api/search/buses
exports.searchBuses = async (req, res, next) => {
  try {
    const { origin = 'Delhi', destination = 'Jaipur', date = '2026-11-20' } = req.query;
    const isIndia = isIndianCityOrAirport(origin) || isIndianCityOrAirport(destination);

    let buses = [];
    if (isIndia) {
      buses = [
        {
          id: 'bus-in-01',
          name: 'Volvo B11R 9600 Multi-Axle Royal Sleeper',
          operator: 'Zingbus Luxury Lounge / Intrcity SmartBus',
          busType: 'Ultra-Comfort 1+1 Capsule Sleeper',
          departureTime: '22:00',
          arrivalTime: '05:30',
          duration: '7h 30m',
          price: 1850,
          currency: 'INR',
          rating: 4.94,
          amenities: [
            'Individual private privacy pod with blackout blind',
            'Freshly laundered duvet and orthopedic pillow',
            'Air purifier & USB-C fast charging stations',
            'Private boarding lounge with mineral water',
          ],
        },
        {
          id: 'bus-in-02',
          name: 'Scania Metrolink HD Diamond Cruiser',
          operator: 'Orange Luxury Travels',
          busType: '2+1 Semi-Sleeper Leather Club Class',
          departureTime: '07:30',
          arrivalTime: '13:00',
          duration: '5h 30m',
          price: 1350,
          currency: 'INR',
          rating: 4.88,
          amenities: [
            'Air suspension whisper ride',
            'Snack box with hot beverage stop at 5-star highway hub',
            'Live GPS tracking with emergency response',
          ],
        },
      ];
    } else {
      buses = [
        {
          id: 'bus-001',
          name: 'Voyager Royale Sleeper Coach',
          operator: 'Voyager Luxe Lines',
          busType: 'Double-Decker VIP Panoramic Sleeper',
          departureTime: '22:30',
          arrivalTime: '06:00',
          duration: '7h 30m',
          price: 160,
          currency: 'USD',
          rating: 4.9,
          amenities: ['Private cubicle capsule', 'Memory foam mattress', 'Noise-cancelling audio', 'En-suite private washroom'],
        },
        {
          id: 'bus-002',
          name: 'Alps Executive Cruiser',
          operator: 'Busbud Platinum Select',
          busType: 'Single-Aisle 2+1 Leather Recliners',
          departureTime: '08:00',
          arrivalTime: '12:30',
          duration: '4h 30m',
          price: 110,
          currency: 'USD',
          rating: 4.8,
          amenities: ['Full 160-degree recline', 'Panoramic alpine skyroof', 'Wi-Fi 6', 'Complimentary charcuterie box'],
        },
      ];
    }

    res.status(200).json({
      success: true,
      query: { origin, destination, date },
      count: buses.length,
      data: buses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Hotel search (Amadeus / City-Specific)
// @route GET /api/search/hotels
exports.searchHotels = async (req, res, next) => {
  try {
    const { city = 'Paris', destination, checkIn = '2026-11-20', checkOut = '2026-11-25', guests = 2 } = req.query;
    const targetCity = destination || city;
    const hotels = await amadeusService.searchHotels(targetCity, checkIn, checkOut, guests);

    res.status(200).json({
      success: true,
      query: { city: targetCity, checkIn, checkOut, guests },
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Taxi/Private Chauffeur search (City-aware, Luxury fleet)
// @route GET /api/search/taxis
exports.searchTaxis = async (req, res, next) => {
  try {
    const { origin = 'Mumbai', destination = 'South Mumbai', pickup, dropoff, date = '2026-11-20' } = req.query;
    const from = pickup || origin;
    const to = dropoff || destination;
    const isIndia = isIndianCityOrAirport(from) || isIndianCityOrAirport(to);

    let taxis = [];
    if (isIndia) {
      taxis = [
        {
          id: 'tx-in-01',
          provider: 'Voyager Chauffeur Privé India',
          vehicleModel: 'Rolls-Royce Ghost Series II',
          vehicleClass: 'Ultra-Luxury Bespoke Chauffeur',
          capacity: '3 Passengers, 4 Luggage Bags',
          chauffeur: 'English & Hindi certified VIP security chauffeur',
          price: 25000,
          currency: 'INR',
          rating: 5.0,
          features: [
            'VVIP Airport Airside Ramp Escort',
            'Chilled Himalayan spring water & wet towels',
            'Wi-Fi 6 with onboard iPad tablet',
            'Complimentary 90-minute wait time',
          ],
        },
        {
          id: 'tx-in-02',
          provider: 'Silver Arrow India Elite',
          vehicleModel: 'Mercedes-Maybach S 580 4MATIC',
          vehicleClass: 'First Class Executive Chauffeur',
          capacity: '3 Passengers, 3 Luggage Bags',
          chauffeur: 'Diplomatic protocol certified chauffeur',
          price: 14500,
          currency: 'INR',
          rating: 4.96,
          features: [
            'Rear calf recliners with massage seats',
            'Burmester 3D High-End Sound System',
            'Daily sanitized leather cabin',
          ],
        },
        {
          id: 'tx-in-03',
          provider: 'Voyager Green Reserve',
          vehicleModel: 'BMW i7 xDrive60 Pure Electric',
          vehicleClass: 'Zero-Emission Luxury Sedan',
          capacity: '3 Passengers, 3 Bags',
          chauffeur: 'Professional executive driver',
          price: 11200,
          currency: 'INR',
          rating: 4.94,
          features: ['31.3-inch 8K Theatre Screen in Rear', 'Whisper-quiet electric drive', 'Panoramic Sky Lounge Glass Roof'],
        },
      ];
    } else {
      taxis = [
        {
          id: 'tx-001',
          provider: 'GetTransfer Premier / Voyager Fleet',
          vehicleModel: 'Rolls-Royce Phantom VIII',
          vehicleClass: 'Ultra-Luxury Bespoke',
          capacity: '3 Passengers, 4 Bags',
          chauffeur: 'English & French speaking private bodyguard-driver',
          price: 490,
          currency: 'USD',
          rating: 5.0,
          features: ['Complimentary Dom Pérignon', 'In-car Wi-Fi & iPad', 'Flight delay guarantee', 'Door-to-lounge escort'],
        },
        {
          id: 'tx-002',
          provider: 'Blacklane Global Elite',
          vehicleModel: 'Mercedes-Maybach S-Class',
          vehicleClass: 'First Class Sedan',
          capacity: '3 Passengers, 3 Bags',
          chauffeur: 'Certified executive chauffeur',
          price: 280,
          currency: 'USD',
          rating: 4.95,
          features: ['60-minute complimentary airport wait', 'Bottled San Pellegrino', 'Climate-controlled cabin'],
        },
      ];
    }

    res.status(200).json({
      success: true,
      query: { pickup: from, dropoff: to, date },
      count: taxis.length,
      data: taxis,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Experiences & Activities (City-aware, Indian & International)
// @route GET /api/search/activities
exports.searchActivities = async (req, res, next) => {
  try {
    const { destination = 'Delhi', city } = req.query;
    const target = city || destination;
    const isIndia = isIndianCityOrAirport(target);

    let activities = [];
    if (isIndia) {
      activities = [
        {
          id: `act-in-01-${target}`,
          title: `Royal Palace Private Access & Curator Walk in ${target}`,
          category: 'Heritage & Dynasty',
          duration: '3.5 Hours',
          rating: 4.98,
          reviewsCount: 164,
          price: 14500,
          currency: 'INR',
          image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
          highlights: [
            'Access to private royal family residential wings',
            'Curated by renowned royal historian',
            'High tea with vintage royal crockery in heritage courtyard',
          ],
        },
        {
          id: `act-in-02-${target}`,
          title: `Private Sunrise Hot Air Balloon Safari Over Historic ${target}`,
          category: 'Aerial Romance',
          duration: '4 Hours',
          rating: 4.96,
          reviewsCount: 112,
          price: 22000,
          currency: 'INR',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
          highlights: [
            'Exclusive two-person VIP basket',
            'Touchdown champagne and caviar breakfast',
            'Drone photography and video package included',
          ],
        },
        {
          id: `act-in-03-${target}`,
          title: `Culinary Journey with Master Chef & Spice Trail in ${target}`,
          category: 'Gourmet Gastronomy',
          duration: '3 Hours',
          rating: 4.94,
          reviewsCount: 89,
          price: 9500,
          currency: 'INR',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
          highlights: [
            'VIP back-alley secret spice tastings',
            'Private cooking masterclass at ancestral haveli',
            'Personalized engraved brass spice box to take home',
          ],
        },
      ];
    } else {
      activities = [
        {
          id: `act-intl-01-${target}`,
          title: `Private After-Hours Museum & Landmark Tour in ${target}`,
          category: 'Art & Heritage',
          duration: '3 Hours',
          rating: 5.0,
          reviewsCount: 128,
          price: 1200,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=600&q=80',
          highlights: ['Complete solitude with master art pieces', 'Secret archive access', 'Private champagne toast'],
        },
        {
          id: `act-intl-02-${target}`,
          title: `Sunset Yacht Charter with Sommelier in ${target}`,
          category: 'Private Sailing',
          duration: '4 Hours',
          rating: 4.98,
          reviewsCount: 94,
          price: 1850,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
          highlights: ['Caspian Oscietra tasting', 'Dedicated captain & deck crew', 'Custom sound & mood lighting'],
        },
        {
          id: `act-intl-03-${target}`,
          title: `Scenic Helicopter Flight Over ${target} Countryside`,
          category: 'Aviation & Luxury',
          duration: '5 Hours',
          rating: 4.96,
          reviewsCount: 76,
          price: 2600,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
          highlights: ['Touchdown at Grand Cru Estate', 'Rare vintage cellar tasting with owner', 'Helicopter pilot narration'],
        },
      ];
    }

    res.status(200).json({
      success: true,
      destination: target,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Restaurant search
// @route GET /api/search/restaurants
exports.searchRestaurants = async (req, res, next) => {
  try {
    const { destination = 'Paris' } = req.query;
    const isIndia = isIndianCityOrAirport(destination);
    const currency = isIndia ? 'INR' : 'USD';

    let restaurants = [];
    if (isIndia) {
      restaurants = [
        {
          id: 'rst-in-01',
          name: `Bukhara & Royal Peshawari ${destination}`,
          michelinStars: 3,
          cuisine: 'North-West Frontier Royal Clay Tandoor',
          priceTier: '₹₹₹₹',
          rating: 4.98,
          address: `Luxury Hotel Diplomatic Enclave, ${destination}`,
          chef: 'Master Chef Manjit Gill Protégé',
          tableAvailability: 'VIP Concierge Reserved Table tonight 20:30',
          image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'rst-in-02',
          name: `Indian Accent Heritage Salon ${destination}`,
          michelinStars: 2,
          cuisine: 'Progressive Modern Indian Fine Dining',
          priceTier: '₹₹₹₹',
          rating: 4.97,
          address: `The Lodhi Complex, ${destination}`,
          chef: 'Manish Mehrotra Concept',
          tableAvailability: 'Chef Counter reserved for Voyager Luxe guests',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        },
      ];
    } else {
      restaurants = [
        {
          id: 'rst-001',
          name: `Le Gabriel - La Réserve ${destination}`,
          michelinStars: 3,
          cuisine: 'Haute French Gastronomy',
          priceTier: '$$$$',
          rating: 4.96,
          address: `42 Avenue Gabriel, ${destination}`,
          chef: 'Jérôme Banctel',
          tableAvailability: 'VIP Concierge Reserved Table tonight 20:30',
          image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'rst-002',
          name: `Plénitude - Cheval Blanc ${destination}`,
          michelinStars: 3,
          cuisine: 'Sauce-Centric Culinary Symphony',
          priceTier: '$$$$',
          rating: 4.99,
          address: `8 Quai du Louvre, ${destination}`,
          chef: 'Arnaud Donckele',
          tableAvailability: 'Exclusive Chef Counter reserved for Voyager Luxe guests',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        },
      ];
    }

    res.status(200).json({
      success: true,
      destination,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get saved searches
// @route GET /api/search/saved
exports.getSavedSearches = async (req, res) => {
  res.status(200).json({
    success: true,
    count: savedSearchesStore.length,
    data: savedSearchesStore,
  });
};

// @desc Save a search
// @route POST /api/search/save
exports.saveSearch = async (req, res) => {
  const newSave = {
    id: `saved-${Date.now()}`,
    userId: req.user?._id || '660e1a2b3c4d5e6f7a8b9c0d',
    title: req.body.title || `${req.body.origin || 'Search'} to ${req.body.destination || 'Destination'}`,
    ...req.body,
    savedAt: new Date(),
  };
  savedSearchesStore.unshift(newSave);

  res.status(201).json({
    success: true,
    message: 'Search successfully saved to your Voyager Luxe dossier',
    data: newSave,
  });
};

// @desc Delete saved search
// @route DELETE /api/search/:id
exports.deleteSavedSearch = async (req, res) => {
  savedSearchesStore = savedSearchesStore.filter((s) => s.id !== req.params.id);
  res.status(200).json({
    success: true,
    message: 'Saved search removed',
  });
};
