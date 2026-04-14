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

export interface SearchData {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  passengers: {
    total: number;
    label: string;
  };
}

export default function SearchEngine({ onSearch }: { onSearch: (data: SearchData) => void }) {
  const [activeTab, setActiveTab] = useState('flights');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);
  const [showDeparture, setShowDeparture] = useState(false);
  const [showArrival, setShowArrival] = useState(false);
  
  const [departure, setDeparture] = useState('Paris (CDG)');
  const [arrival, setArrival] = useState('Tokyo (HND)');
  const [dates, setDates] = useState({ start: '2026-06-15', end: '2026-06-30' });
  const [passengers, setPassengers] = useState({ total: 1, label: '1 Adulte, Éco' });

  const handleDateSelect = (selected: { start: string; end: string }) => {
    setDates(selected);
  };

  const handleSearchClick = () => {
    // Extract IATA codes from strings like "Paris (CDG)"
    const getIATA = (str: string) => {
      const match = str.match(/\(([^)]+)\)/);
      return match ? match[1] : str.substring(0, 3).toUpperCase();
    };

    onSearch({
      origin: getIATA(departure),
      destination: getIATA(arrival),
      departDate: dates.start,
      returnDate: dates.end,
      passengers
    });
  };

  const handlePassengerSelect = (data: any) => {
    const total = data.counts.adults + data.counts.children + data.counts.infants;
    setPassengers({
      total,
      label: `${total} Voyageur${total > 1 ? 's' : ''}, ${data.cabin}`
    });
  };

  const renderSearchFields = () => {
    return (
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] p-2 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
          <div 
            className={`md:col-span-3 px-8 py-6 hover:bg-white/10 transition-all cursor-pointer group relative rounded-l-[32px] ${showDeparture ? 'bg-white/20' : ''}`}
            onClick={() => { setShowDeparture(true); setShowArrival(false); setShowCalendar(false); setShowPassengers(false); }}
          >
            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1 block">Départ</label>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
              <input 
                type="text"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                onFocus={() => { setShowDeparture(true); setShowArrival(false); setShowCalendar(false); setShowPassengers(false); }}
                placeholder="Ville de départ"
                className="bg-transparent border-none outline-none font-bold text-white text-lg w-full placeholder:text-white/30"
              />
            </div>
            <AnimatePresence>
              {showDeparture && departure.length >= 3 && (
                <LocationSelector 
                  label="Ville de départ"
                  searchTerm={departure}
                  onClose={() => setShowDeparture(false)}
                  onSelect={setDeparture}
                />
              )}
            </AnimatePresence>
          </div>
          <div 
            className={`md:col-span-3 px-8 py-6 hover:bg-white/10 transition-all cursor-pointer group relative ${showArrival ? 'bg-white/20' : ''}`}
            onClick={() => { setShowArrival(true); setShowDeparture(false); setShowCalendar(false); setShowPassengers(false); }}
          >
            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1 block">Arrivée</label>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
              <input 
                type="text"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                onFocus={() => { setShowArrival(true); setShowDeparture(false); setShowCalendar(false); setShowPassengers(false); }}
                placeholder="Ville d'arrivée"
                className="bg-transparent border-none outline-none font-bold text-white text-lg w-full placeholder:text-white/30"
              />
            </div>
            <AnimatePresence>
              {showArrival && arrival.length >= 3 && (
                <LocationSelector 
                  label="Ville d'arrivée"
                  searchTerm={arrival}
                  onClose={() => setShowArrival(false)}
                  onSelect={setArrival}
                />
              )}
            </AnimatePresence>
          </div>
          <div 
            onClick={() => { setShowCalendar(!showCalendar); setShowDeparture(false); setShowArrival(false); setShowPassengers(false); }}
            className={`md:col-span-3 px-8 py-6 hover:bg-white/10 transition-all cursor-pointer group relative ${showCalendar ? 'bg-white/20' : ''}`}
          >
            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1 block">Dates</label>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
              <span className="font-bold text-white text-lg">{dates.start} - {dates.end}</span>
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
            className={`md:col-span-3 px-8 py-6 hover:bg-white/10 transition-all cursor-pointer group relative rounded-r-[32px] ${showPassengers ? 'bg-white/20' : ''}`}
          >
            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1 block">Voyageurs</label>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
              <span className="font-bold text-white text-lg truncate">{passengers.label}</span>
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
        </div>
        <div className="mt-2">
          <button 
            onClick={handleSearchClick}
            className="w-full py-6 bg-[#00AEEF] text-white rounded-[32px] font-black text-xl uppercase tracking-[0.2em] hover:bg-[#0096ce] transition-all shadow-2xl shadow-[#00AEEF]/40 active:scale-[0.98]"
          >
            CHERCHEUR
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center px-4 overflow-hidden pt-24 pb-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
          alt="Snowy Mountains" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">
            Explorez le monde
          </h1>
          <p className="text-white/80 text-lg font-medium mb-12 uppercase tracking-[0.3em]">Destinations Tendances 2026</p>
          {renderSearchFields()}
        </motion.div>
      </div>
    </section>
  );
}
