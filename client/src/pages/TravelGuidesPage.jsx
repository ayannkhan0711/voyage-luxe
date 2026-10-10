import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisaChecker from '../components/TravelInfo/VisaChecker';
import TravelAdvisories from '../components/TravelInfo/TravelAdvisories';
import HealthRequirements from '../components/TravelInfo/HealthRequirements';

const GUIDE_TABS = [
  { key: 'visa', label: 'Visa Checker', icon: '🛂' },
  { key: 'advisories', label: 'Travel Advisories', icon: '⚠️' },
  { key: 'health', label: 'Health Requirements', icon: '🏥' },
  { key: 'guides', label: 'Destination Guides', icon: '📖' },
];

const DESTINATION_GUIDES = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Mar-May, Sep-Nov',
    currency: 'JPY (¥)',
    language: 'Japanese',
    tagline: 'Futuristic Metropolises & Ancient Serenity',
    overview: 'Tokyo blends ultra-modern skyscrapers and neon-lit alleys with historic Shinto shrines and centuries-old imperial gardens. A global capital of Michelin-starred culinary artistry and avant-garde fashion.',
    spots: [
      { name: 'Meiji Jingu Shrine & Harajuku', type: 'Spiritual Heritage', desc: 'Ancient sacred forest surrounding Emperor Meiji’s resting shrine.' },
      { name: 'Roppongi Hills & Mori Art Museum', type: 'Modern Skyline & Culture', desc: '52nd-floor observation deck with panoramic views of Tokyo Tower and Mount Fuji.' },
      { name: 'Tsukiji Outer Market & Ginza', type: 'Haute Gastronomy', desc: 'World-renowned sushi master counters and flagship luxury fashion salons.' },
      { name: 'Shinjuku Gyoen National Garden', type: 'Botanical Sanctuary', desc: 'Traditional Japanese landscape garden with teahouses and cherry blossoms.' },
    ],
    tips: 'Carry cash — many places don\'t accept cards. Get a Japan Rail Pass for intercity travel.',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Apr-Jun, Sep-Oct',
    currency: 'EUR (€)',
    language: 'French',
    tagline: 'The City of Haute Couture & Timeless Culture',
    overview: 'The global epicenter of fine arts, fashion, gastronomy, and architectural grandeur along the historic banks of the Seine.',
    spots: [
      { name: 'The Louvre & Tuileries Garden', type: 'World Art Treasury', desc: 'Home to the Mona Lisa, Venus de Milo, and the iconic I.M. Pei glass pyramid.' },
      { name: 'Montmartre & Sacré-Cœur Basilica', type: 'Bohemian Heritage', desc: 'Cobblestone streets with panoramic views of Paris and artist ateliers.' },
      { name: 'Palace of Versailles', type: 'Royal Dynasty', desc: 'Opulent Hall of Mirrors and grand fountain gardens of Louis XIV.' },
      { name: 'Place Vendôme & Rue du Faubourg Saint-Honoré', type: 'High Jewelry & Luxury', desc: 'Historic palace hotels and premier jewelry houses.' },
    ],
    tips: 'Book museums in advance. Avoid tourist-trap restaurants near major landmarks.',
  },
  {
    id: 'delhi',
    name: 'Delhi & Agra',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Oct-Mar',
    currency: 'INR (₹)',
    language: 'Hindi, English',
    tagline: 'Mughal Splendor & Royal Dynastic Palaces',
    overview: 'A historic capital of empires where medieval monuments, imperial Mughal red sandstone forts, and royal spice bazaars meet luxurious tree-lined avenues.',
    spots: [
      { name: 'Taj Mahal & Agra Fort (Golden Triangle)', type: 'UNESCO Wonder', desc: 'Ivory-white marble mausoleum on the right bank of the river Yamuna.' },
      { name: 'Humayun’s Tomb & Sunder Nursery', type: 'Mughal Architecture', desc: 'Garden tomb precursor to the Taj Mahal surrounded by historic heritage flora.' },
      { name: 'Qutub Minar & Mehrauli Heritage Park', type: 'Ancient Monument', desc: '73-meter minaret built in 1193 surrounded by ancient iron pillars.' },
      { name: 'Chandni Chowk & Red Fort Heritage Walk', type: 'Old World Charm', desc: 'Historic lanes of the Mughal capital with master royal craftsmen and fragrant spices.' },
    ],
    tips: 'Visit monuments during golden hour sunrise. Book authorized heritage guides.',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Nov-Mar',
    currency: 'AED (د.إ)',
    language: 'Arabic, English',
    tagline: 'Ultra-Luxury Architecture & Desert Wonders',
    overview: 'The glamorous jewel of the Persian Gulf known for luxury shopping, ultramodern architecture, and a lively nightlife scene.',
    spots: [
      { name: 'Burj Khalifa & The Dubai Fountain', type: 'Skyline Icon', desc: 'Tallest building in the world with observation deck on Level 148.' },
      { name: 'Palm Jumeirah & Atlantis The Royal', type: 'Architectural Wonder', desc: 'Man-made palm island with ultra-luxury beachfront retreats and Michelin dining.' },
      { name: 'Dubai Desert Conservation Reserve', type: 'Exclusive Nature Safari', desc: 'Private vintage Land Rover desert safaris with falconry and starlit banquets.' },
      { name: 'Museum of the Future', type: 'Architectural Innovation', desc: 'Torus-shaped calligraphy masterpiece exploring next-century possibilities.' },
    ],
    tips: 'Dress modestly in public areas. Friday brunch is a local institution.',
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Apr-Oct',
    currency: 'IDR (Rp)',
    language: 'Indonesian',
    tagline: 'Spiritual Haven & Tropical Cliffs',
    overview: 'The Island of the Gods, famed for its forested volcanic mountains, iconic rice paddies, serene beaches, and vibrant spiritual coral reefs.',
    spots: [
      { name: 'Ubud Sacred Monkey Forest & Tegallalang', type: 'Emerald Terraces', desc: 'Dramatic layered rice terraces and artist communities.' },
      { name: 'Uluwatu Temple & Sunset Cliffs', type: 'Coastal Sanctuary', desc: 'Cliff-edge sea temple with traditional Kecak fire dance at dusk.' },
      { name: 'Seminyak & Canggu Coastline', type: 'Beachfront Elegance', desc: 'Vibrant sunset beach clubs, boutique shopping, and wellness retreats.' },
      { name: 'Nusa Penida Kelingking T-Rex Bay', type: 'Natural Wonder', desc: 'Limestone promontory overlooking turquoise waves and manta ray bays.' },
    ],
    tips: 'Rent a private chauffeur car for day trips. Visit temples before 9am to avoid crowds.',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Nov-Feb',
    currency: 'INR (₹)',
    language: 'Hindi, English, Marathi',
    tagline: 'Maximum City: Marine Promenade & Art Deco Splendor',
    overview: 'India’s bustling financial capital and coastal metropolis, featuring Victorian Gothic landmarks, the world’s second-largest Art Deco collection, and vibrant Arabian Sea breezes.',
    spots: [
      { name: 'Gateway of India & Colaba Causeway', type: 'Colonial Landmark', desc: 'Historic waterfront monument overlooking the Arabian Sea and harbor.' },
      { name: 'Marine Drive Queen’s Necklace', type: 'Coastal Promenade', desc: '3-kilometer C-shaped coastal boulevard sparkling with evening amber lights.' },
      { name: 'Elephanta Island Rock-Cut Caves', type: 'UNESCO World Heritage', desc: 'Historic 5th-century rock-cut Shiva sculptures accessed by private boat.' },
      { name: 'Kala Ghoda Art & Fashion Precinct', type: 'Cultural Heart', desc: 'Heritage cafes, independent boutiques, and art galleries in South Mumbai.' },
    ],
    tips: 'Take sunset strolls along Marine Drive. Enjoy high tea at The Taj Mahal Palace.',
  },
];

export default function TravelGuidesPage() {
  const [activeTab, setActiveTab] = useState('visa');

  const renderContent = () => {
    switch (activeTab) {
      case 'visa':
        return <VisaChecker />;
      case 'advisories':
        return <TravelAdvisories />;
      case 'health':
        return <HealthRequirements />;
      case 'guides':
        return <GuidesSection />;
      default:
        return <VisaChecker />;
    }
  };

  return (
    <div className="min-h-screen bg-luxury-offwhite">
      {/* Header */}
      <section className="bg-gradient-to-r from-luxury-brown to-luxury-brownDark py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-luxury-goldLight text-sm font-semibold tracking-widest uppercase">Travel Intelligence</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
            Travel <span className="bg-gradient-to-r from-luxury-goldLight to-luxury-gold bg-clip-text text-transparent">Guides & Intel</span>
          </h1>
          <p className="text-white/60 max-w-xl">
            Visa requirements, travel advisories, health guidelines, and insider destination guides — everything for informed travel.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-luxury-border bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex gap-1 overflow-x-auto">
          {GUIDE_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-luxury-brown text-luxury-brown'
                  : 'border-transparent text-luxury-muted hover:text-luxury-brown'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </section>
    </div>
  );
}

function GuidesSection() {
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
      {/* Grid of Cities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DESTINATION_GUIDES.map((guide) => (
          <div
            key={guide.name}
            onClick={() => setSelectedCity(guide)}
            className="luxury-card overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 border border-luxury-beige"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={guide.image}
                alt={guide.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold tracking-wider uppercase border border-white/30">
                Click for Travel Spots
              </div>
              <div className="absolute bottom-4 left-5">
                <span className="text-xs text-luxury-gold font-semibold uppercase tracking-wider block">
                  {guide.country}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">{guide.name}</h3>
                <p className="text-white/80 text-xs mt-0.5 line-clamp-1">{guide.tagline}</p>
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-[#FFFAF0] p-2 rounded-xl border border-luxury-beige/50">
                  <p className="text-[9px] uppercase tracking-wider text-luxury-muted">Best Time</p>
                  <p className="text-xs font-bold text-luxury-dark mt-0.5 truncate">{guide.bestTime}</p>
                </div>
                <div className="bg-[#FFFAF0] p-2 rounded-xl border border-luxury-beige/50">
                  <p className="text-[9px] uppercase tracking-wider text-luxury-muted">Currency</p>
                  <p className="text-xs font-bold text-luxury-brown mt-0.5">{guide.currency}</p>
                </div>
                <div className="bg-[#FFFAF0] p-2 rounded-xl border border-luxury-beige/50">
                  <p className="text-[9px] uppercase tracking-wider text-luxury-muted">Language</p>
                  <p className="text-xs font-bold text-luxury-dark mt-0.5 truncate">{guide.language}</p>
                </div>
              </div>

              <div className="bg-luxury-cream rounded-xl p-3 flex items-center justify-between">
                <span className="text-xs text-luxury-brown font-semibold">View Attractions & Spots</span>
                <span className="text-xs text-luxury-brown font-bold group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* City Detail Modal */}
      {selectedCity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-luxury-beige shadow-2xl">
            {/* Header banner */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedCity.image}
                alt={selectedCity.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <button
                onClick={() => setSelectedCity(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center text-lg hover:bg-black transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase font-bold tracking-widest text-luxury-gold block">
                  {selectedCity.country} Destination Dossier
                </span>
                <h2 className="font-serif text-3xl font-bold text-white mt-1">
                  {selectedCity.name}
                </h2>
                <p className="text-white/80 text-xs mt-1">{selectedCity.tagline}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <h4 className="font-serif text-base font-bold text-luxury-dark mb-2">
                  Destination Overview
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedCity.overview}
                </p>
              </div>

              {/* Traveling Spots & Attractions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-base font-bold text-luxury-dark flex items-center gap-2">
                    <span className="text-luxury-brown">✦</span> Iconic Traveling Spots & Highlights
                  </h4>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                    Curated Concierge Guide
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedCity.spots?.map((spot, i) => (
                    <div
                      key={i}
                      className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-4 space-y-1 hover:border-luxury-brown transition-colors"
                    >
                      <span className="text-[10px] uppercase font-bold text-luxury-brown tracking-wider">
                        {spot.type}
                      </span>
                      <h5 className="font-serif text-sm font-bold text-luxury-dark">
                        {spot.name}
                      </h5>
                      <p className="text-xs text-gray-500 leading-normal">
                        {spot.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insider Tip */}
              <div className="bg-luxury-cream border border-luxury-beige rounded-2xl p-4 flex items-start gap-3">
                <span className="text-luxury-brown text-base">💡</span>
                <div className="text-xs text-gray-600">
                  <span className="font-bold text-luxury-brown">Insider Concierge Secret: </span>
                  {selectedCity.tips}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-luxury-beige flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/results?to=${encodeURIComponent(selectedCity.name)}&tab=hotels`);
                  }}
                  className="w-full sm:w-auto btn-gold px-6 py-3 text-xs uppercase tracking-wider font-semibold"
                >
                  Explore Hotels & Suites in {selectedCity.name} ➔
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity(null)}
                  className="btn-outline px-6 py-3 text-xs uppercase tracking-wider font-semibold w-full sm:w-auto"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
