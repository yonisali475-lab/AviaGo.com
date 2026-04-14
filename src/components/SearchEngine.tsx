import { useState } from 'react';
import { Plane, Hotel, TrainFront, Car, Search, Calendar, MapPin, ArrowRight, Users, ShieldCheck, Headphones, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence as FramerAnimatePresence } from 'motion/react';
import { CalendarSelector, PassengerSelector, LocationSelector } from './BookingSelectors';

// Using a local AnimatePresence to avoid naming conflicts if necessary, 
// but motion/react should be fine.
const AnimatePresence = FramerAnimatePresence;

const tabs = [
  { id: 'flights', label: 'Vols', icon: Plane },
  { id: 'hotels', label: 'Hôtels', icon: Hotel },
  { id: 'trains', label: 'Trains', icon: TrainFront },
  { id: 'cars', label: 'Voitures', icon: Car },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Paiement Sécurisé' },
  { icon: Headphones, label: 'Support 24/7' },
  { icon: BadgeCheck, label: 'Meilleur Prix Garanti' },
];

export default function SearchEngine({ onSearch }: { onSearch: () => void }) {
  const [activeTab, setActiveTab] = useState('flights');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);
  const [showDeparture, setShowDeparture] = useState(false);
  const [showArrival, setShowArrival] = useState(false);
  
  const [departure, setDeparture] = useState('Nice (NCE)');
  const [arrival, setArrival] = useState('Kyoto (KIX)');
  const [dates, setDates] = useState({ start: '12 Mai', end: '19 Mai' });
  const [passengers, setPassengers] = useState({ total: 1, label: '1 Adulte, Éco' });

  const handleDateSelect = (selected: { start: string; end: string }) => {
    setDates({ start: '12 Mai', end: '19 Mai' });
  };

  const handlePassengerSelect = (data: any) => {
    const total = data.counts.adults + data.counts.children + data.counts.infants;
    setPassengers({
      total,
      label: `${total} Voyageur${total > 1 ? 's' : ''}, ${data.cabin}`
    });
  };

  const renderSearchFields = () => {
    switch (activeTab) {
      case 'flights':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center bg-white rounded-2xl md:rounded-full shadow-xl border border-gray-100 overflow-visible relative">
            <div 
              onClick={() => { setShowDeparture(!showDeparture); setShowArrival(false); setShowCalendar(false); setShowPassengers(false); }}
              className={`md:col-span-3 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-all cursor-pointer group relative ${showDeparture ? 'ring-2 ring-trip-blue ring-inset bg-trip-blue/5' : ''}`}
            >
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Départ</label>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <span className="font-bold text-trip-dark">{departure}</span>
              </div>
              <AnimatePresence>
                {showDeparture && (
                  <LocationSelector 
                    label="Ville de départ"
                    onClose={() => setShowDeparture(false)}
                    onSelect={setDeparture}
                  />
                )}
              </AnimatePresence>
            </div>
            <div 
              onClick={() => { setShowArrival(!showArrival); setShowDeparture(false); setShowCalendar(false); setShowPassengers(false); }}
              className={`md:col-span-3 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-all cursor-pointer group relative ${showArrival ? 'ring-2 ring-trip-blue ring-inset bg-trip-blue/5' : ''}`}
            >
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Arrivée</label>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <span className="font-bold text-trip-dark">{arrival}</span>
              </div>
              <AnimatePresence>
                {showArrival && (
                  <LocationSelector 
                    label="Ville d'arrivée"
                    onClose={() => setShowArrival(false)}
                    onSelect={setArrival}
                  />
                )}
              </AnimatePresence>
            </div>
            <div 
              onClick={() => { setShowCalendar(!showCalendar); setShowDeparture(false); setShowArrival(false); setShowPassengers(false); }}
              className={`md:col-span-3 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-all cursor-pointer group relative ${showCalendar ? 'ring-2 ring-trip-blue ring-inset bg-trip-blue/5' : ''}`}
            >
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Dates</label>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <span className="font-bold text-trip-dark">{dates.start} - {dates.end}</span>
              </div>
              <AnimatePresence>
                {showCalendar && (
                  <CalendarSelector 
                    onClose={() => setShowCalendar(false)} 
                    onSelect={handleDateSelect} 
                  />
                )}
              </AnimatePresence>
            </div>
            <div 
              onClick={() => { setShowPassengers(!showPassengers); setShowCalendar(false); }}
              className={`md:col-span-2 px-8 py-4 hover:bg-gray-50 transition-all cursor-pointer group relative ${showPassengers ? 'ring-2 ring-trip-blue ring-inset bg-trip-blue/5' : ''}`}
            >
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Voyageurs</label>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <span className="font-bold text-trip-dark truncate">{passengers.label}</span>
              </div>
              <AnimatePresence>
                {showPassengers && (
                  <PassengerSelector 
                    onClose={() => setShowPassengers(false)} 
                    onSelect={handlePassengerSelect} 
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="md:col-span-1 p-2">
              <button 
                onClick={onSearch}
                className="w-full aspect-square bg-trip-blue text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-trip-blue/30 active:scale-95"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        );
      case 'hotels':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center bg-white rounded-2xl md:rounded-full shadow-xl border border-gray-100 overflow-hidden">
            <div className="md:col-span-5 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Destination</label>
              <div className="flex items-center gap-3">
                <Hotel className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <input type="text" placeholder="Hôtel, ville ou adresse" className="w-full bg-transparent outline-none font-bold text-trip-dark placeholder:text-gray-300" />
              </div>
            </div>
            <div className="md:col-span-3 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Séjour</label>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <input type="text" placeholder="Arrivée - Départ" className="w-full bg-transparent outline-none font-bold text-trip-dark placeholder:text-gray-300" />
              </div>
            </div>
            <div className="md:col-span-3 px-8 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Voyageurs</label>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <input type="text" placeholder="2 adultes, 1 chambre" className="w-full bg-transparent outline-none font-bold text-trip-dark placeholder:text-gray-300" />
              </div>
            </div>
            <div className="md:col-span-1 p-2">
              <button 
                onClick={onSearch}
                className="w-full aspect-square bg-trip-blue text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-trip-blue/30 active:scale-95"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        );
      case 'trains':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center bg-white rounded-2xl md:rounded-full shadow-xl border border-gray-100 overflow-hidden">
            <div className="md:col-span-4 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Gare de départ</label>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <input type="text" placeholder="D'où partez-vous ?" className="w-full bg-transparent outline-none font-bold text-trip-dark placeholder:text-gray-300" />
              </div>
            </div>
            <div className="md:col-span-4 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Gare d'arrivée</label>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <input type="text" placeholder="Où allez-vous ?" className="w-full bg-transparent outline-none font-bold text-trip-dark placeholder:text-gray-300" />
              </div>
            </div>
            <div className="md:col-span-3 px-8 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Date</label>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <input type="text" placeholder="Date de départ" className="w-full bg-transparent outline-none font-bold text-trip-dark placeholder:text-gray-300" />
              </div>
            </div>
            <div className="md:col-span-1 p-2">
              <button 
                onClick={onSearch}
                className="w-full aspect-square bg-trip-blue text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-trip-blue/30 active:scale-95"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        );
      case 'cars':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center bg-white rounded-2xl md:rounded-full shadow-xl border border-gray-100 overflow-hidden">
            <div className="md:col-span-7 px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Lieu de prise en charge</label>
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <input type="text" placeholder="Aéroport, gare ou ville" className="w-full bg-transparent outline-none font-bold text-trip-dark placeholder:text-gray-300" />
              </div>
            </div>
            <div className="md:col-span-4 px-8 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
              <label className="text-[10px] font-black text-trip-blue uppercase tracking-widest mb-1 block">Dates</label>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-trip-gray group-hover:text-trip-blue transition-colors" />
                <input type="text" placeholder="Prise en charge - Restitution" className="w-full bg-transparent outline-none font-bold text-trip-dark placeholder:text-gray-300" />
              </div>
            </div>
            <div className="md:col-span-1 p-2">
              <button 
                onClick={onSearch}
                className="w-full aspect-square bg-trip-blue text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-trip-blue/30 active:scale-95"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative pt-12 pb-24 px-4 overflow-hidden min-h-[600px] flex flex-col items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" 
          alt="Travel Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/90" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-trip-dark tracking-tighter mb-4">
            Votre voyage commence <span className="text-trip-blue">ici</span>
          </h1>
          <p className="text-lg text-trip-gray font-medium">Explorez le monde avec AviaGo</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-trip-blue shadow-[0_-4px_20px_rgba(0,0,0,0.05)]' 
                  : 'bg-white/40 text-trip-gray hover:bg-white/60'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Form Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderSearchFields()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-trip-gray group">
              <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <badge.icon className="w-4 h-4 text-trip-blue" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
