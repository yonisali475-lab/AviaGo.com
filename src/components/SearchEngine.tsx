import { useState } from 'react';
import { Plane, Hotel, TrainFront, Car, Search, Calendar, MapPin, ArrowRight, Users, ShieldCheck, Headphones, BadgeCheck, Ticket } from 'lucide-react';
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
      <div className="bg-white rounded-[32px] p-2 shadow-2xl border border-trip-border">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
          <div 
            className={`md:col-span-3 px-8 py-6 hover:bg-trip-surface transition-all cursor-pointer group relative rounded-l-[28px] ${showDeparture ? 'bg-trip-surface' : ''}`}
            onClick={() => { setShowDeparture(true); setShowArrival(false); setShowCalendar(false); setShowPassengers(false); }}
          >
            <label className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1 block">Départ</label>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-trip-primary/40 group-hover:text-trip-primary transition-colors" />
              <input 
                type="text"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                onFocus={() => { setShowDeparture(true); setShowArrival(false); setShowCalendar(false); setShowPassengers(false); }}
                placeholder="Ville de départ"
                className="bg-transparent border-none outline-none font-bold text-trip-dark text-lg w-full placeholder:text-trip-gray/30"
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
            className={`md:col-span-3 px-8 py-6 hover:bg-trip-surface transition-all cursor-pointer group relative ${showArrival ? 'bg-trip-surface' : ''}`}
            onClick={() => { setShowArrival(true); setShowDeparture(false); setShowCalendar(false); setShowPassengers(false); }}
          >
            <label className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1 block">Arrivée</label>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-trip-primary/40 group-hover:text-trip-primary transition-colors" />
              <input 
                type="text"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                onFocus={() => { setShowArrival(true); setShowDeparture(false); setShowCalendar(false); setShowPassengers(false); }}
                placeholder="Ville d'arrivée"
                className="bg-transparent border-none outline-none font-bold text-trip-dark text-lg w-full placeholder:text-trip-gray/30"
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
            className={`md:col-span-3 px-8 py-6 hover:bg-trip-surface transition-all cursor-pointer group relative ${showCalendar ? 'bg-trip-surface' : ''}`}
          >
            <label className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1 block">Dates</label>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-trip-primary/40 group-hover:text-trip-primary transition-colors" />
              <span className="font-bold text-trip-dark text-lg">{dates.start} - {dates.end}</span>
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
            className={`md:col-span-3 px-8 py-6 hover:bg-trip-surface transition-all cursor-pointer group relative rounded-r-[28px] ${showPassengers ? 'bg-trip-surface' : ''}`}
          >
            <label className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1 block">Voyageurs</label>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-trip-primary/40 group-hover:text-trip-primary transition-colors" />
              <span className="font-bold text-trip-dark text-lg truncate">{passengers.label}</span>
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
            className="w-full py-6 cta-blue rounded-[24px] font-black text-xl uppercase tracking-[0.2em] shadow-xl active:scale-[0.98]"
          >
            CHERCHEUR
          </button>
        </div>

        {/* Category Bar (Step 1) */}
        <div className="mt-8 flex justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-2">
          {[
            { icon: Plane, label: 'Vols' },
            { icon: TrainFront, label: 'Trains' },
            { icon: Ticket, label: 'Activités' },
            { icon: Hotel, label: 'Hôtels' },
            { icon: Car, label: 'Transport' }
          ].map((cat, i) => (
            <button 
              key={i}
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className="w-12 h-12 rounded-2xl bg-trip-primary/5 flex items-center justify-center text-trip-primary group-hover:bg-trip-primary group-hover:text-white transition-all duration-300 shadow-sm">
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-trip-gray group-hover:text-trip-primary transition-colors">
                {cat.label}
              </span>
            </button>
          ))}
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
          className="w-full h-full object-cover fade-in-image"
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
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl uppercase text-shadow-sm">
            Explorez le monde sans limites avec AviaGo
          </h1>
          <p className="text-white/90 text-lg font-black mb-12 uppercase tracking-[0.5em] text-shadow-sm">Destinations Business & Loisirs</p>
          {renderSearchFields()}
        </motion.div>
      </div>
    </section>
  );
}
