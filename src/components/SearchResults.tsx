import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, Hotel, TrainFront, Car, Search, Filter, ArrowUpDown, 
  ChevronRight, Clock, Leaf, ShieldCheck, Star, MapPin, 
  Calendar, Users, Info, ExternalLink, Zap, Headphones,
  ChevronLeft, Plus, Minus, Shield, Globe, Award
} from 'lucide-react';
import { fetchCheapestFlights, getBookingUrl, getAirlineLogo } from '../services/travelpayoutsService';
import { SearchData } from './SearchEngine';

const partners = [
  { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png' },
  { name: 'Air France', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Air_France_Logo.svg/1200px-Air_France_Logo.svg.png' },
  { name: 'Japan Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Japan_Airlines_logo_%282011%29.svg/1200px-Japan_Airlines_logo_%282011%29.svg.png' },
  { name: 'Qatar Airways', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Qatar_Airways_logo.svg/1200px-Qatar_Airways_logo.svg.png' },
];

export default function SearchResults({ searchData }: { searchData: SearchData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [realPrices, setRealPrices] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setRealPrices(null);

    // Fetch real prices from Travelpayouts using dynamic data
    fetchCheapestFlights({
      origin: searchData.origin,
      destination: searchData.destination,
      departDate: searchData.departDate,
      returnDate: searchData.returnDate
    }).then(result => {
      if (result.error) {
        setError(result.error);
      } else if (Object.keys(result.data).length > 0) {
        setRealPrices(result.data);
      } else {
        setRealPrices([]); // Empty array to signify no results found
      }
      setIsLoading(false);
    }).catch(err => {
      console.error("Search error:", err);
      setError("Une erreur est survenue lors de la recherche.");
      setIsLoading(false);
    });
  }, [searchData]);

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
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header Skeleton */}
        <div className="relative h-[400px] bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
        </div>

        <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 animate-pulse">
              <div className="flex items-center gap-8 flex-1 w-full">
                <div className="w-16 h-16 rounded-2xl bg-gray-100" />
                <div className="flex-1 grid grid-cols-3 items-center gap-8">
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-100 rounded-lg w-20" />
                    <div className="h-3 bg-gray-50 rounded w-12" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-px bg-gray-100" />
                    <div className="h-3 bg-gray-50 rounded w-16" />
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <div className="h-8 bg-gray-100 rounded-lg w-20" />
                    <div className="h-3 bg-gray-50 rounded w-12" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-10 pl-8 border-l border-gray-100 w-full md:w-auto">
                <div className="space-y-2 flex flex-col items-end">
                  <div className="h-3 bg-gray-50 rounded w-24" />
                  <div className="h-10 bg-gray-100 rounded-lg w-28" />
                </div>
                <div className="h-14 bg-gray-100 rounded-2xl w-32" />
              </div>
            </div>
          ))}
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 font-sans selection:bg-trip-blue/20">
      {/* Premium Mountain Header */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
          alt="Mountain Background" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 text-center">
          {/* Semi-transparent Search Summary Bar */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/10 backdrop-blur-2xl rounded-[40px] p-2 shadow-2xl border border-white/20 max-w-5xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-center gap-1">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
                <div className="flex items-center gap-4 px-8 py-6 bg-white/10 rounded-l-[32px] group">
                  <MapPin className="w-6 h-6 text-white/40" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Destination</p>
                    <p className="text-lg font-black text-white">{searchData.origin} ✈️ {searchData.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-8 py-6 bg-white/10 group">
                  <Calendar className="w-6 h-6 text-white/40" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Dates</p>
                    <p className="text-lg font-black text-white">{searchData.departDate} - {searchData.returnDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-8 py-6 bg-white/10 rounded-r-[32px] group">
                  <Users className="w-6 h-6 text-white/40" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Passagers</p>
                    <p className="text-lg font-black text-white">{searchData.passengers.label}</p>
                  </div>
                </div>
              </div>
              <button className="w-full lg:w-auto px-12 py-6 bg-[#00AEEF] text-white rounded-[32px] font-black uppercase tracking-widest text-sm shadow-xl hover:bg-[#0096ce] transition-all ml-1">
                MODIFIER
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
        {/* Error or Info Banner */}
        {(error || (realPrices && Array.isArray(realPrices) && realPrices.length === 0)) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-white rounded-[32px] shadow-xl border border-gray-100 flex items-center gap-6"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${error ? 'bg-red-50' : 'bg-trip-blue/5'}`}>
              <Info className={`w-6 h-6 ${error ? 'text-red-500' : 'text-trip-blue'}`} />
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
        <div className="space-y-6">
          {displayFlights.map((flight, i) => (
            <motion.div 
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-2xl transition-all group"
            >
              <div className="flex items-center gap-8 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 p-3 flex items-center justify-center border border-gray-100">
                  <img src={flight.logo} alt={flight.airline} className="w-full h-auto object-contain" />
                </div>
                <div className="flex-1 grid grid-cols-3 items-center gap-8">
                  <div className="text-center md:text-left">
                    <p className="text-3xl font-black text-trip-dark tracking-tighter">{flight.departure}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{searchData.origin}</p>
                      {flight.departureDate && (
                        <span className="text-[10px] font-bold text-trip-blue uppercase tracking-widest">• {flight.departureDate}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-px bg-gray-200 relative">
                      <Plane className="w-4 h-4 text-trip-blue absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1" />
                    </div>
                    <span className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{flight.duration}</span>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-3xl font-black text-trip-dark tracking-tighter">{flight.arrival}</p>
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{searchData.destination}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10 pl-8 border-l border-gray-100">
                <div className="text-right">
                  <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Prix par personne</p>
                  <p className="text-4xl font-black text-trip-blue tracking-tighter">{flight.price} €</p>
                </div>
                <button 
                  onClick={handleBooking}
                  className="bg-trip-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-trip-blue/20 hover:bg-blue-600 transition-all hover:-translate-y-1 active:scale-95"
                >
                  RÉSERVER
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-20 text-center opacity-40">
          <div className="flex justify-center gap-12 mb-8 grayscale">
            {partners.map((p, i) => (
              <img key={i} src={p.logo} alt={p.name} className="h-5 w-auto object-contain" />
            ))}
          </div>
          <p className="text-[10px] font-black text-trip-gray uppercase tracking-[0.3em]">AviaGo • Excellence en Voyage • 2026</p>
        </div>
      </div>
    </div>
  );
}
