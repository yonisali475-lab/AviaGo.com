import { useState, useRef, useEffect } from 'react';
import { Plane, Hotel, TrainFront, Car, Search, Calendar, MapPin, ArrowRight, Users, ShieldCheck, Headphones, BadgeCheck, Ticket, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence as FramerAnimatePresence } from 'motion/react';
import { CalendarSelector, PassengerSelector, LocationSelector } from './BookingSelectors';

// Using a local AnimatePresence to avoid naming conflicts if necessary, 
// but motion/react should be fine.
const AnimatePresence = FramerAnimatePresence;

const tabs = [
  { id: 'flights', label: 'Vols', icon: Plane },
  { id: 'trains', label: 'Trains', icon: TrainFront },
  { id: 'activities', label: 'Activités', icon: Ticket },
  { id: 'hotels', label: 'Hôtels', icon: Hotel },
  { id: 'cars', label: 'Voitures', icon: Car },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Paiement Sécurisé' },
  { icon: Headphones, label: 'Support 24/7' },
  { icon: BadgeCheck, label: 'Meilleur Prix Garanti' },
];

export interface SearchData {
  service: string;
  origin: string;
  destination: string;
  originCoords?: { lat: number; lng: number };
  destCoords?: { lat: number; lng: number };
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
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureCoords, setDepartureCoords] = useState<{ lat: number; lng: number } | undefined>();
  const [arrivalCoords, setArrivalCoords] = useState<{ lat: number; lng: number } | undefined>();
  const [dates, setDates] = useState({ start: '2026-06-15', end: '2026-06-30' });
  const [passengers, setPassengers] = useState({ total: 1, label: '1 Adulte, Éco' });

  // Refs pour la détection de clic extérieur
  const departureRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const passengersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (departureRef.current && !departureRef.current.contains(event.target as Node)) setShowDeparture(false);
      if (arrivalRef.current && !arrivalRef.current.contains(event.target as Node)) setShowArrival(false);
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) setShowCalendar(false);
      if (passengersRef.current && !passengersRef.current.contains(event.target as Node)) setShowPassengers(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset des champs lors du changement de service
  useEffect(() => {
    setDeparture('');
    setArrival('');
    setSearchError(null);
    setShowDeparture(false);
    setShowArrival(false);
    setShowCalendar(false);
    setShowPassengers(false);
  }, [activeTab]);

  const handleDateSelect = (selected: { start: string; end: string }) => {
    setDates(selected);
  };

  const isFormValid = () => {
    if (activeTab === 'flights' || activeTab === 'trains') {
      return departure.length > 0 && arrival.length > 0;
    }
    if (activeTab === 'hotels' || activeTab === 'cars' || activeTab === 'activities') {
      return departure.length > 0;
    }
    return false;
  };

  const handleSearchClick = async () => {
    if (!isFormValid()) return;
    setSearchError(null);

    // Extraction des codes IATA si présents
    const getIATA = (str: string) => {
      const match = str.match(/\(([^)]+)\)/);
      return match ? match[1] : str.substring(0, 3).toUpperCase();
    };

    const origin = getIATA(departure);
    const destination = getIATA(arrival || departure);

    console.log("AviaGo: Lancement de la recherche - Service:", activeTab);
    console.log("AviaGo: Départ:", departure, "Coordonnées:", departureCoords);
    console.log("AviaGo: Arrivée:", arrival, "Coordonnées:", arrivalCoords);

    // SÉPARATION STRICTE DES API (LOGIQUE PAR SERVICE)
    let finalOrigin = departure;
    let finalDestination = arrival;

    if (activeTab === 'flights') {
      // Pour les vols, on utilise uniquement les codes IATA
      finalOrigin = origin;
      finalDestination = destination;

      if (finalOrigin === finalDestination) {
        setSearchError("Veuillez choisir une destination différente du départ");
        return;
      }
    } else if (activeTab === 'trains') {
      // Pour les trains, on utilise les noms de gares
      if (departure === arrival) {
        setSearchError("Veuillez choisir une destination différente du départ");
        return;
      }
    }

    setIsLoading(true);
    
    // Simulation de délai API pour le feedback UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    onSearch({
      service: activeTab,
      origin: finalOrigin,
      destination: finalDestination || finalOrigin,
      originCoords: departureCoords,
      destCoords: arrivalCoords || departureCoords,
      departDate: dates.start,
      returnDate: dates.end,
      passengers
    });
    
    setIsLoading(false);
  };

  const handlePassengerSelect = (data: any) => {
    const total = data.counts.adults + data.counts.children + data.counts.infants;
    setPassengers({
      total,
      label: `${total} Voyageur${total > 1 ? 's' : ''}, ${data.cabin}`
    });
  };

  const renderSearchFields = () => {
    const getPlaceholder = () => {
      switch(activeTab) {
        case 'hotels': return "Où allez-vous ?";
        case 'flights': return "Ville de départ (IATA)";
        case 'trains': return "Gare de départ";
        case 'cars': return "Lieu de prise en charge";
        case 'activities': return "Nom de l'activité";
        default: return "Départ";
      }
    };

    const getLabel = () => {
      switch(activeTab) {
        case 'hotels': return "Destination ou nom de l'hôtel";
        case 'cars': return "Lieu de prise en charge";
        case 'activities': return "Activités";
        case 'trains': return "Gare de départ";
        default: return "Départ";
      }
    };

    const showArrivalField = activeTab === 'flights' || activeTab === 'trains';
    const isActivity = activeTab === 'activities';
    const isHotelOrCar = activeTab === 'hotels' || activeTab === 'cars';

    return (
      <div className="bg-white rounded-[32px] p-2 shadow-2xl border border-trip-border">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
          {/* Champ Départ / Destination Principale */}
          <div 
            ref={departureRef}
            className={`${showArrivalField ? 'md:col-span-3' : isActivity || isHotelOrCar ? 'md:col-span-5' : 'md:col-span-5'} px-8 py-6 hover:bg-trip-surface transition-all cursor-pointer group relative rounded-l-[28px] ${showDeparture ? 'bg-trip-surface' : ''}`}
            onClick={(e) => { 
              e.stopPropagation();
              setShowDeparture(true); setShowArrival(false); setShowCalendar(false); setShowPassengers(false); 
            }}
          >
            <label className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1 block">
              {getLabel()}
            </label>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-trip-primary/40 group-hover:text-trip-primary transition-colors" />
              <input 
                type="text"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                onFocus={(e) => { 
                  e.stopPropagation();
                  setShowDeparture(true); setShowArrival(false); setShowCalendar(false); setShowPassengers(false); 
                }}
                placeholder={getPlaceholder()}
                className="bg-transparent border-none outline-none font-bold text-trip-dark text-lg w-full placeholder:text-trip-gray/30"
              />
            </div>
            <AnimatePresence>
              {showDeparture && departure.length >= 2 && (
                <div className="z-[9999] absolute top-full left-0 w-full" onClick={(e) => e.stopPropagation()}>
                  <LocationSelector 
                    label={getLabel()}
                    searchTerm={departure}
                    activeService={activeTab}
                    onClose={() => setShowDeparture(false)}
                    onSelect={(val, coords) => {
                      setDeparture(val);
                      if (coords) setDepartureCoords(coords);
                    }}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Champ Arrivée (Seulement pour Vols et Trains) */}
          {showArrivalField && (
            <div 
              ref={arrivalRef}
              className={`md:col-span-3 px-8 py-6 hover:bg-trip-surface transition-all cursor-pointer group relative ${showArrival ? 'bg-trip-surface' : ''}`}
              onClick={(e) => { 
                e.stopPropagation();
                setShowArrival(true); setShowDeparture(false); setShowCalendar(false); setShowPassengers(false); 
              }}
            >
              <label className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1 block">
                {activeTab === 'trains' ? 'Gare d\'arrivée' : 'Arrivée'}
              </label>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-trip-primary/40 group-hover:text-trip-primary transition-colors" />
                <input 
                  type="text"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  onFocus={(e) => { 
                    e.stopPropagation();
                    setShowArrival(true); setShowDeparture(false); setShowCalendar(false); setShowPassengers(false); 
                  }}
                  placeholder={activeTab === 'trains' ? "Gare d'arrivée" : "Ville d'arrivée"}
                  className="bg-transparent border-none outline-none font-bold text-trip-dark text-lg w-full placeholder:text-trip-gray/30"
                />
              </div>
              <AnimatePresence>
                {showArrival && arrival.length >= 2 && (
                  <div className="z-[9999] absolute top-full left-0 w-full" onClick={(e) => e.stopPropagation()}>
                    <LocationSelector 
                      label={activeTab === 'trains' ? "Gare d'arrivée" : "Ville d'arrivée"}
                      searchTerm={arrival}
                      activeService={activeTab}
                      onClose={() => setShowArrival(false)}
                      onSelect={(val, coords) => {
                        setArrival(val);
                        if (coords) setArrivalCoords(coords);
                      }}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Champ Dates */}
          <div 
            ref={calendarRef}
            onClick={(e) => { 
              e.stopPropagation();
              setShowCalendar(!showCalendar); setShowDeparture(false); setShowArrival(false); setShowPassengers(false); 
            }}
            className={`${showArrivalField ? 'md:col-span-3' : 'md:col-span-4'} px-8 py-6 hover:bg-trip-surface transition-all cursor-pointer group relative ${showCalendar ? 'bg-trip-surface' : ''}`}
          >
            <label className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1 block">
              {activeTab === 'activities' ? 'Date' : 'Dates'}
            </label>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-trip-primary/40 group-hover:text-trip-primary transition-colors" />
              <span className="font-bold text-trip-dark text-lg">
                {isActivity ? dates.start : `${dates.start} - ${dates.end}`}
              </span>
            </div>
            <AnimatePresence>
              {showCalendar && (
                <div className="z-[9999] absolute top-full left-0" onClick={(e) => e.stopPropagation()}>
                  <CalendarSelector 
                    onClose={() => setShowCalendar(false)} 
                    onSelect={handleDateSelect} 
                  />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Champ Passagers / Voyageurs */}
          <div 
            ref={passengersRef}
            onClick={(e) => { 
              e.stopPropagation();
              setShowPassengers(!showPassengers); setShowCalendar(false); setShowDeparture(false); setShowArrival(false); 
            }}
            className={`${showArrivalField ? 'md:col-span-3' : 'md:col-span-3'} px-8 py-6 hover:bg-trip-surface transition-all cursor-pointer group relative rounded-r-[28px] ${showPassengers ? 'bg-trip-surface' : ''}`}
          >
            <label className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1 block">
              {activeTab === 'hotels' ? 'Chambres / Personnes' : activeTab === 'cars' ? 'Type de véhicule' : 'Voyageurs'}
            </label>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-trip-primary/40 group-hover:text-trip-primary transition-colors" />
              <span className="font-bold text-trip-dark text-lg truncate">
                {activeTab === 'cars' ? 'Standard' : passengers.label}
              </span>
            </div>
            <AnimatePresence>
              {showPassengers && activeTab !== 'cars' && (
                <div className="z-[9999] absolute top-full right-0" onClick={(e) => e.stopPropagation()}>
                  <PassengerSelector 
                    onClose={() => setShowPassengers(false)} 
                    onSelect={handlePassengerSelect} 
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-2">
          {searchError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {searchError}
            </motion.div>
          )}
          <button 
            onClick={handleSearchClick}
            disabled={isLoading || !isFormValid()}
            className="w-full py-6 cta-blue rounded-[24px] font-black text-xl uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Recherche en cours...</span>
              </>
            ) : (
              <span>RECHERCHER DES OFFRES</span>
            )}
          </button>
        </div>

        {/* Category Bar (Interactive Tabs) */}
        <div className="mt-8 flex justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'flights', icon: Plane, label: 'Vols' },
            { id: 'trains', icon: TrainFront, label: 'Trains' },
            { id: 'activities', icon: Ticket, label: 'Activités' },
            { id: 'hotels', icon: Hotel, label: 'Hôtels' },
            { id: 'cars', icon: Car, label: 'Transport' }
          ].map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex flex-col items-center gap-2 min-w-[80px] group transition-all ${activeTab === cat.id ? 'scale-110' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border-2 ${
                activeTab === cat.id 
                  ? 'bg-trip-primary text-white border-trip-primary shadow-trip-primary/30' 
                  : 'bg-trip-primary/5 text-trip-primary border-transparent group-hover:bg-trip-primary group-hover:text-white group-hover:border-trip-primary'
              }`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                activeTab === cat.id ? 'text-trip-primary' : 'text-trip-gray group-hover:text-trip-primary'
              }`}>
                {cat.label}
              </span>
              {activeTab === cat.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="w-1 h-1 rounded-full bg-trip-primary"
                />
              )}
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
