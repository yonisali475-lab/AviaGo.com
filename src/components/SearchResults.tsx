import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, Hotel, TrainFront, Car, Search, Filter, ArrowUpDown, 
  ChevronRight, Clock, Leaf, ShieldCheck, Star, MapPin, 
  Calendar, Users, Info, ExternalLink, Zap, Headphones,
  ChevronLeft, Plus, Minus, Shield, Globe, Award, RefreshCw,
  AlertCircle, Loader2
} from 'lucide-react';
import { fetchCheapestFlights, getBookingUrl, getAirlineLogo } from '../services/travelpayoutsService';
import { SearchData } from './SearchEngine';
import DealsExplorer from './DealsExplorer';

const partners = [
  { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png' },
  { name: 'Air France', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Air_France_Logo.svg/1200px-Air_France_Logo.svg.png' },
  { name: 'Japan Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Japan_Airlines_logo_%282011%29.svg/1200px-Japan_Airlines_logo_%282011%29.svg.png' },
  { name: 'Qatar Airways', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Qatar_Airways_logo.svg/1200px-Qatar_Airways_logo.svg.png' },
];

export default function SearchResults({ 
  searchData, 
  onSearch 
}: { 
  searchData: SearchData;
  onSearch?: (data: SearchData) => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [realPrices, setRealPrices] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [is403, setIs403] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const performSearch = useCallback(async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);
    
    setError(null);
    setIs403(false);

    try {
      const result = await fetchCheapestFlights({
        origin: searchData.origin,
        destination: searchData.destination,
        departDate: searchData.departDate,
        returnDate: searchData.returnDate
      });

      if (result.error) {
        if (result.error.includes('403') || result.error.toLowerCase().includes('unauthorized')) {
          setIs403(true);
        } else {
          setError(result.error);
        }
      } else if (Object.keys(result.data).length > 0) {
        setRealPrices(result.data);
      } else {
        setRealPrices([]); 
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Une erreur est survenue lors de la recherche.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [searchData]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const handleBooking = () => {
    const url = getBookingUrl({
      origin: searchData.origin,
      destination: searchData.destination,
      departDate: searchData.departDate,
      returnDate: searchData.returnDate,
      adults: searchData.passengers.total,
      children: 0,
      infants: 0,
      tripClass: 'Y'
    });
    window.open(url, '_blank');
  };

  const displayFlights = realPrices && !Array.isArray(realPrices) 
    ? Object.values(realPrices).slice(0, 10).map((p: any, idx: number) => {
        const depDate = new Date(p.departure_at);
        return {
          id: `real-${idx}`,
          airline: p.airline,
          logo: getAirlineLogo(p.airline),
          departure: depDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          departureDate: depDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
          arrival: '--:--', // Cheap API doesn't provide arrival time
          duration: 'Prix le plus bas trouvé',
          stops: 'Direct ou avec escale',
          price: p.price,
          isLive: true,
        };
      }) 
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-trip-surface flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-24 h-24 border-4 border-trip-primary border-t-transparent rounded-full animate-spin mb-8" />
          <Plane className="w-8 h-8 text-trip-primary absolute top-8 left-8 animate-pulse" />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-2xl font-black text-trip-dark tracking-tighter mb-2 uppercase">Recherche en cours</h2>
          <p className="text-trip-gray font-black uppercase tracking-[0.3em] text-[10px]">Connexion aux serveurs mondiaux...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-trip-surface pb-20 font-sans selection:bg-trip-primary/10">
      {/* Premium Mountain Header */}
      <div className="relative h-[450px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
          alt="Mountain Background" 
          className="absolute inset-0 w-full h-full object-cover fade-in-image"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 text-center">
          {/* Semi-transparent Search Summary Bar */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="frosted-glass-white rounded-[32px] p-2 shadow-2xl border border-white/20 max-w-5xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-center gap-1">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
                <div className="flex items-center gap-4 px-8 py-6 bg-trip-primary/5 rounded-l-[28px] group">
                  <MapPin className="w-6 h-6 text-trip-primary" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Destination</p>
                    <p className="text-lg font-black text-trip-dark">{searchData.origin} ✈️ {searchData.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-8 py-6 bg-trip-primary/5 group">
                  <Calendar className="w-6 h-6 text-trip-primary" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Dates</p>
                    <p className="text-lg font-black text-trip-dark">{searchData.departDate} - {searchData.returnDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-8 py-6 bg-trip-primary/5 rounded-r-[28px] group">
                  <Users className="w-6 h-6 text-trip-primary" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Passagers</p>
                    <p className="text-lg font-black text-trip-dark">{searchData.passengers.label}</p>
                  </div>
                </div>
              </div>
              <button className="w-full lg:w-auto px-10 py-6 bg-trip-primary text-white rounded-[28px] font-black uppercase tracking-widest text-xs shadow-xl hover:bg-trip-primary/90 transition-all ml-1">
                MODIFIER
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
        {/* 403 Pending Status Banner */}
        {is403 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white rounded-[32px] p-10 shadow-2xl border border-trip-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-trip-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-[24px] bg-trip-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-10 h-10 text-trip-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black text-trip-dark tracking-tighter mb-2">Accès en cours de validation</h3>
                <p className="text-trip-gray font-medium leading-relaxed">
                  Validation de votre accès aux tarifs en cours par Travelpayouts... <br />
                  <span className="text-trip-primary font-bold">En attendant, voici nos meilleures destinations suggérées.</span>
                </p>
              </div>
              <button 
                onClick={() => performSearch(true)}
                disabled={isRefreshing}
                className="flex items-center gap-3 px-8 py-4 cta-blue rounded-xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-50"
              >
                {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Vérifier la connexion
              </button>
            </div>
          </motion.div>
        )}

        {/* Error or Info Banner */}
        {(error || (realPrices && Array.isArray(realPrices) && realPrices.length === 0)) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-white rounded-[24px] shadow-xl border border-trip-border flex items-center gap-6"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${error ? 'bg-red-50' : 'bg-trip-primary/5'}`}>
              <Info className={`w-6 h-6 ${error ? 'text-red-500' : 'text-trip-primary'}`} />
            </div>
            <div>
              <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">
                {error ? 'Erreur de recherche' : 'Aucun vol trouvé'}
              </p>
              <p className="text-sm text-trip-dark font-bold">
                {error || `Désolé, nous n'avons trouvé aucun vol direct ou bon marché pour ${searchData.origin} vers ${searchData.destination} aux dates sélectionnées.`}
              </p>
            </div>
          </motion.div>
        )}

        {/* Flight Cards */}
        {!is403 && (
          <div className="space-y-6">
            {displayFlights.map((flight, i) => (
              <motion.div 
                key={flight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-white p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8"
              >
                <div className="flex items-center gap-8 flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-trip-surface p-3 flex items-center justify-center border border-trip-border">
                    <img 
                      src={flight.logo} 
                      alt={flight.airline} 
                      className="w-full h-auto object-contain" 
                      onError={(e) => (e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/723/723955.png')}
                    />
                  </div>
                  <div className="flex-1 grid grid-cols-3 items-center gap-8">
                    <div className="text-center md:text-left">
                      <p className="text-3xl font-black text-trip-dark tracking-tighter">{flight.departure}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{searchData.origin}</p>
                        {flight.departureDate && (
                          <span className="text-[10px] font-bold text-trip-primary uppercase tracking-widest">• {flight.departureDate}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-px bg-trip-border relative">
                        <Plane className="w-4 h-4 text-trip-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1" />
                      </div>
                      <span className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{flight.duration}</span>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-3xl font-black text-trip-dark tracking-tighter">{flight.arrival}</p>
                      <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{searchData.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-10 pl-8 border-l border-trip-border">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Prix par personne</p>
                    <p className="text-4xl font-black text-trip-primary tracking-tighter">{flight.price} €</p>
                  </div>
                  <button 
                    onClick={handleBooking}
                    className="cta-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg"
                  >
                    RÉSERVER
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Fallback Content: Deals Explorer when API is pending or error */}
        {(is403 || error || (realPrices && Array.isArray(realPrices) && realPrices.length === 0)) && (
          <div className="mt-12">
            <DealsExplorer onSearch={onSearch} />
          </div>
        )}

        {/* Trust Footer */}
        <div className="mt-20 text-center opacity-40">
          <div className="flex justify-center gap-12 mb-8 grayscale">
            {partners.map((p, i) => (
              <img key={i} src={p.logo} alt={p.name} className="h-5 w-auto object-contain" />
            ))}
          </div>
          <p className="text-[10px] font-black text-trip-gray uppercase tracking-[0.3em]">AviaGo • Excellence en Voyage • 2028</p>
        </div>
      </div>
    </div>
  );
}
