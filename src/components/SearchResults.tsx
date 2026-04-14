import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, Hotel, TrainFront, Car, Search, Filter, ArrowUpDown, 
  ChevronRight, Clock, Leaf, ShieldCheck, Star, MapPin, 
  Calendar, Users, Info, ExternalLink, Zap, Headphones,
  ChevronLeft, Plus, Minus, Shield, Globe, Award
} from 'lucide-react';
import { fetchCheapestFlights, getBookingUrl, getAirlineLogo, SearchParams } from '../services/travelpayoutsService';
import TravelpayoutsWidget from './TravelpayoutsWidget';

const partners = [
  { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png' },
  { name: 'Air France', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Air_France_Logo.svg/1200px-Air_France_Logo.svg.png' },
  { name: 'SNCF', logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d3/Logo_SNCF_Connect.svg/1200px-Logo_SNCF_Connect.svg.png' },
  { name: 'Booking.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Booking.com_logo.svg/1200px-Booking.com_logo.svg.png' },
];

const priceMatrix = [
  { date: '12 Mai', price: 549, cheapest: true },
  { date: '13 Mai', price: 612 },
  { date: '14 Mai', price: 580 },
  { date: '15 Mai', price: 595 },
  { date: '16 Mai', price: 620 },
  { date: '17 Mai', price: 575 },
  { date: '18 Mai', price: 590 },
];

const flightResults = [
  {
    id: 1,
    airline: 'Air France',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Air_France_Logo.svg/1200px-Air_France_Logo.svg.png',
    departure: '08:30',
    arrival: '16:15',
    duration: '15h 45m',
    stops: 'Direct',
    price: 549,
    best: true,
    cheapest: true,
    urgency: 'Derniers 3 sièges',
  },
  {
    id: 2,
    airline: 'Emirates',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png',
    departure: '14:20',
    arrival: '11:45',
    duration: '16h 25m',
    stops: '1 escale (DXB)',
    price: 580,
    eco: true,
    urgency: 'Prix en hausse',
  },
  {
    id: 3,
    airline: 'Qatar Airways',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Qatar_Airways_logo.svg/1200px-Qatar_Airways_logo.svg.png',
    departure: '16:45',
    arrival: '14:20',
    duration: '17h 35m',
    stops: '1 escale (DOH)',
    price: 595,
    urgency: null,
  }
];

export default function SearchResults() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [realPrices, setRealPrices] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Fetch real prices from Travelpayouts
    fetchCheapestFlights('NCE', 'KIX').then(result => {
      if (result.error) {
        setError(result.error);
      } else if (Object.keys(result.data).length > 0) {
        setRealPrices(result.data);
      }
    });

    return () => clearInterval(timer);
  }, []);

  const handleBooking = () => {
    const params: SearchParams = {
      origin: 'NCE',
      destination: 'KIX',
      departDate: '2026-05-12',
      returnDate: '2026-05-19',
      adults: 2,
      children: 1,
      infants: 0,
      tripClass: 'Y'
    };
    const url = getBookingUrl(params);
    window.open(url, '_blank');
  };

  const displayPriceMatrix = realPrices ? Object.values(realPrices).slice(0, 7).map((p: any, idx: number) => ({
    date: new Date(p.departure_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    price: p.price,
    cheapest: idx === 0
  })) : priceMatrix;

  const displayFlights = realPrices ? Object.values(realPrices).slice(0, 3).map((p: any, idx: number) => ({
    id: `real-${idx}`,
    airline: p.airline,
    logo: getAirlineLogo(p.airline),
    departure: new Date(p.departure_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    arrival: new Date(p.return_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    duration: '15h 45m',
    stops: '1 escale',
    price: p.price,
    isLive: true,
    urgency: idx === 0 ? 'Dernière chance' : null
  })) : flightResults;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-trip-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-10"
          >
            <Plane className="text-trip-blue w-10 h-10" />
          </motion.div>
          <h2 className="text-3xl font-black text-trip-dark tracking-tighter mb-6">
            Préparation de votre voyage...
          </h2>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-trip-blue shadow-[0_0_15px_rgba(0,180,216,0.5)]"
            />
          </div>
          <div className="flex justify-center items-center gap-10 opacity-30 grayscale">
            {partners.map((p, i) => (
              <img key={i} src={p.logo} alt={p.name} className="h-5 w-auto object-contain" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 font-sans selection:bg-trip-blue/20">
      {/* Immersive Panoramic Header */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
          alt="Mountain Clouds" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-trip-blue rounded-2xl flex items-center justify-center shadow-2xl shadow-trip-blue/40">
                <Plane className="text-white w-7 h-7" />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter">AviaGo</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-8 mr-8">
                {['Destinations', 'Offres', 'Aide'].map(item => (
                  <button key={item} className="text-white/90 text-sm font-black uppercase tracking-widest hover:text-white transition-colors">
                    {item}
                  </button>
                ))}
              </div>
              <button className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl">
                <Users className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Floating Search Bar */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/95 backdrop-blur-3xl rounded-[32px] p-3 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-white max-w-5xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-[24px] border border-gray-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                  <MapPin className="w-6 h-6 text-trip-blue group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Destination</p>
                    <p className="text-base font-black text-trip-dark">Nice ✈️ Kyoto</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-[24px] border border-gray-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                  <Calendar className="w-6 h-6 text-trip-blue group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Dates</p>
                    <p className="text-base font-black text-trip-dark">12 - 19 Mai</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-[24px] border border-gray-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                  <Users className="w-6 h-6 text-trip-blue group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Passagers</p>
                    <p className="text-base font-black text-trip-dark">2 Adultes, 1 Enfant</p>
                  </div>
                </div>
              </div>
              <button className="w-full lg:w-auto px-12 py-6 bg-trip-blue text-white rounded-[24px] font-black uppercase tracking-widest text-sm shadow-2xl shadow-trip-blue/30 hover:bg-blue-600 hover:-translate-y-1 transition-all active:scale-95">
                Rechercher
              </button>
            </div>
          </motion.div>

          {/* Category Selectors */}
          <div className="flex justify-center gap-8 mt-12">
            {[
              { icon: Plane, label: 'Vols', active: true },
              { icon: Hotel, label: 'Hôtels' },
              { icon: TrainFront, label: 'Trains' },
              { icon: Car, label: 'Voitures' },
            ].map((item, i) => (
              <button 
                key={i}
                className={`flex flex-col items-center gap-3 group transition-all ${item.active ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
              >
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all ${
                  item.active ? 'bg-white text-trip-blue shadow-2xl' : 'bg-white/10 text-white backdrop-blur-xl border border-white/20'
                }`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <span className={`text-[11px] font-black uppercase tracking-widest ${item.active ? 'text-white' : 'text-white/80'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content with Light Cyan Gradients */}
      <div className="relative bg-gradient-to-b from-white via-[#00B4D8]/5 to-white px-6 -mt-16">
        <div className="max-w-7xl mx-auto">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-trip-blue/5 border border-trip-blue/10 rounded-2xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-trip-blue/10 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4 text-trip-blue" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-trip-blue uppercase tracking-widest">Mode Démo Activé</p>
                  <p className="text-xs text-trip-gray font-medium">Les tarifs en temps réel sont indisponibles (Token API non configuré). Affichage des meilleures estimations.</p>
                </div>
              </div>
              <button 
                onClick={() => setError(null)}
                className="text-[10px] font-black text-trip-gray uppercase tracking-widest hover:text-trip-dark transition-colors"
              >
                Ignorer
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Sidebar Filters */}
            <div className="hidden lg:block lg:col-span-3 space-y-8">
              <div className="card-floating p-10 sticky top-24">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="font-black text-trip-dark uppercase tracking-widest text-xs">Filtres</h3>
                  <Filter className="w-5 h-5 text-trip-blue" />
                </div>

                <div className="space-y-12">
                  <div>
                    <label className="block text-[11px] font-black text-trip-gray uppercase tracking-widest mb-8">Escales</label>
                    <div className="space-y-5">
                      {['Direct', '1 escale', '2+ escales'].map((opt, i) => (
                        <label key={i} className="flex items-center justify-between cursor-pointer group">
                          <span className="text-sm font-bold text-trip-dark group-hover:text-trip-blue transition-colors">{opt}</span>
                          <div className="w-7 h-7 rounded-xl border-2 border-gray-100 flex items-center justify-center group-hover:border-trip-blue/30 transition-all">
                            {i === 0 && <div className="w-3.5 h-3.5 bg-trip-blue rounded-md" />}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-trip-gray uppercase tracking-widest mb-8">Budget Max</label>
                    <div className="px-2">
                      <div className="h-2 w-full bg-gray-100 rounded-full relative mb-6">
                        <div className="absolute left-0 right-1/4 h-full bg-trip-blue rounded-full" />
                        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-[5px] border-trip-blue rounded-full shadow-2xl" />
                      </div>
                      <div className="flex justify-between text-[11px] font-black text-trip-gray uppercase">
                        <span>400 €</span>
                        <span className="text-trip-blue">1200 €</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-50">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-4 h-4 text-trip-blue" />
                      <span className="text-[10px] font-black text-trip-dark uppercase tracking-widest">Protection Voyage</span>
                    </div>
                    <p className="text-[11px] text-trip-gray font-medium leading-relaxed">
                      Assurance annulation et assistance rapatriement incluses pour les membres Gold.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results List */}
            <div className="lg:col-span-9 space-y-10">
              
              {/* Price Matrix - Floating */}
              <div className="card-floating p-3 overflow-hidden">
                <div className="flex overflow-x-auto no-scrollbar">
                  {displayPriceMatrix.map((item, i) => (
                    <button 
                      key={i}
                      className={`flex-1 min-w-[130px] py-8 px-6 rounded-3xl transition-all ${
                        item.cheapest ? 'bg-trip-blue/5 border border-trip-blue/10' : 'hover:bg-gray-50'
                      }`}
                    >
                      <p className="text-[11px] font-black text-trip-gray uppercase tracking-widest mb-3">{item.date}</p>
                      <p className={`text-2xl font-black ${item.cheapest ? 'text-trip-blue' : 'text-trip-dark'}`}>
                        {item.price} €
                      </p>
                      {item.cheapest && (
                        <span className="inline-block mt-3 px-3 py-1 bg-trip-blue text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-trip-blue/20">
                          Moins cher
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flight Cards */}
              <div className="space-y-8">
                {displayFlights.map((flight, i) => (
                  <div key={flight.id}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="card-floating group overflow-hidden hover:scale-[1.01] transition-all duration-500"
                    >
                      <div className="p-10">
                        <div className="flex flex-col lg:flex-row gap-12">
                          {/* Flight Info Bubbles */}
                          <div className="flex-1 space-y-12">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-8">
                                <div className="w-20 h-20 rounded-[28px] bg-white shadow-2xl border border-gray-50 p-4 flex items-center justify-center group-hover:rotate-3 transition-transform">
                                  <img src={flight.logo} alt={flight.airline} className="w-full h-auto object-contain" />
                                </div>
                                <div>
                                  <h4 className="text-2xl font-black text-trip-dark tracking-tighter mb-2">{flight.airline}</h4>
                                  <div className="flex gap-3">
                                    <span className="px-4 py-1.5 bg-gray-50 rounded-full text-[10px] font-black text-trip-gray uppercase tracking-widest border border-gray-100">
                                      {flight.stops}
                                    </span>
                                    {flight.isLive && (
                                      <span className="px-4 py-1.5 bg-emerald-50 rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Live
                                      </span>
                                    )}
                                    <span className="px-4 py-1.5 bg-trip-blue/5 rounded-full text-[10px] font-black text-trip-blue uppercase tracking-widest border border-trip-blue/10">
                                      Premium
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {flight.urgency && (
                                <div className="px-5 py-2.5 bg-red-50 rounded-2xl flex items-center gap-3 border border-red-100">
                                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                                  <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">{flight.urgency}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between relative px-4">
                              <div className="text-center lg:text-left">
                                <p className="text-5xl font-black text-trip-dark tracking-tighter mb-2">{flight.departure}</p>
                                <p className="text-sm font-black text-trip-gray uppercase tracking-widest">Nice (NCE)</p>
                              </div>

                              <div className="flex-1 px-16 flex flex-col items-center">
                                <div className="w-full h-1.5 bg-gray-100 rounded-full relative">
                                  <div className="absolute inset-0 bg-trip-blue/20 rounded-full" />
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="absolute inset-0 bg-trip-blue rounded-full"
                                  />
                                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl border border-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Plane className="w-5 h-5 text-trip-blue" />
                                  </div>
                                </div>
                                <span className="mt-6 text-[11px] font-black text-trip-gray uppercase tracking-widest flex items-center gap-3">
                                  <Clock className="w-4 h-4" />
                                  {flight.duration}
                                </span>
                              </div>

                              <div className="text-center lg:text-right">
                                <p className="text-5xl font-black text-trip-dark tracking-tighter mb-2">{flight.arrival}</p>
                                <p className="text-sm font-black text-trip-gray uppercase tracking-widest">Kyoto (KIX)</p>
                              </div>
                            </div>

                            <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="text-[11px] font-black text-trip-gray uppercase tracking-widest">Aussi disponible sur :</span>
                                <div className="flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                                  {partners.map((p, i) => (
                                    <img key={i} src={p.logo} alt={p.name} className="h-5 w-auto object-contain" />
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-emerald-600">
                                <Leaf className="w-4 h-4 fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-widest">-15% CO2</span>
                              </div>
                            </div>
                          </div>

                          {/* Booking Bubble */}
                          <div className="lg:w-80 bg-gray-50/50 rounded-[40px] p-10 flex flex-col justify-between border border-gray-100 shadow-inner">
                            <div>
                              <p className="text-[11px] font-black text-trip-gray uppercase tracking-widest mb-3">Meilleur Tarif</p>
                              <div className="flex items-baseline gap-2 mb-10">
                                <span className="text-6xl font-black text-trip-blue tracking-tighter">{flight.price}</span>
                                <span className="text-2xl font-black text-trip-blue">€</span>
                              </div>
                              
                              <div className="space-y-5 mb-10">
                                <div className="flex items-center justify-between text-sm font-bold text-trip-dark">
                                  <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                    <span>Taxes & Frais</span>
                                  </div>
                                  <span className="text-emerald-600">Inclus</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-bold text-trip-dark">
                                  <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-emerald-500" />
                                    <span>Bagage (23kg)</span>
                                  </div>
                                  <span className="text-emerald-600">Offert</span>
                                </div>
                              </div>
                            </div>

                            <button 
                              onClick={handleBooking}
                              className="cta-gradient w-full py-6 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-2xl shadow-trip-blue/30 flex items-center justify-center gap-4 group/btn hover:-translate-y-1 transition-all"
                            >
                              Réserver
                              <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Immersive Hotel Result: Park Hyatt Tokyo */}
                    {i === 1 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="card-floating overflow-hidden group mb-8"
                      >
                        <div className="relative h-[550px]">
                          <img 
                            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" 
                            alt="Park Hyatt Tokyo Spa" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                          
                          <div className="absolute top-10 right-10">
                            <div className="bg-white/95 backdrop-blur-xl px-8 py-6 rounded-[28px] shadow-2xl border border-white/20">
                              <p className="text-[11px] font-black text-trip-gray uppercase tracking-widest mb-2">À partir de</p>
                              <p className="text-4xl font-black text-trip-blue tracking-tighter">450 € <span className="text-base text-trip-gray font-bold">/ nuit</span></p>
                            </div>
                          </div>

                          <div className="absolute bottom-16 left-16 right-16">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="flex gap-1.5">
                                {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-yellow-400 fill-current" />)}
                              </div>
                              <span className="text-white/90 text-sm font-black uppercase tracking-widest">Hôtel de Légende</span>
                            </div>
                            <h3 className="text-6xl font-black text-white tracking-tighter mb-8 leading-none">Park Hyatt Tokyo 🏨</h3>
                            <div className="flex flex-wrap gap-5">
                              <div className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-base font-bold flex items-center gap-4 hover:bg-white/20 transition-colors cursor-default">
                                <Zap className="w-5 h-5 text-trip-blue fill-current" />
                                Expérience "Lost in Translation"
                              </div>
                              <div className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-base font-bold flex items-center gap-4 hover:bg-white/20 transition-colors cursor-default">
                                <MapPin className="w-5 h-5 text-trip-blue" />
                                Shinjuku, Tokyo
                              </div>
                              <div className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-base font-bold flex items-center gap-4 hover:bg-white/20 transition-colors cursor-default">
                                <Globe className="w-5 h-5 text-trip-blue" />
                                Vue Mont Fuji
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-16 bg-white flex flex-col md:flex-row items-center justify-between gap-12">
                          <div className="max-w-3xl">
                            <p className="text-trip-gray text-xl font-medium leading-relaxed">
                              Plongez dans l'atrium iconique aux parois de verre triangulaires. Une vue panoramique sur le mont Fuji et la skyline de Tokyo vous attend pour un séjour hors du temps au sommet de la Shinjuku Park Tower.
                            </p>
                          </div>
                          <button className="cta-gradient px-16 py-6 text-white rounded-[24px] font-black uppercase tracking-widest text-sm shadow-2xl shadow-trip-blue/30 whitespace-nowrap hover:-translate-y-1 transition-all">
                            Réserver l'exception
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Travelpayouts Widget - Full Search Experience */}
              <div className="mt-12">
                <TravelpayoutsWidget marker={import.meta.env.VITE_TRAVELPAYOUTS_MARKER || '12345'} />
              </div>

              {/* Cross-sell: Kyoto Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="card-floating p-12 bg-gradient-to-br from-white to-trip-blue/5 group">
                  <div className="w-20 h-20 rounded-[32px] bg-trip-blue/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                    <TrainFront className="w-10 h-10 text-trip-blue" />
                  </div>
                  <h3 className="text-3xl font-black text-trip-dark tracking-tighter mb-6">Le Shinkansen Express</h3>
                  <p className="text-trip-gray text-base font-medium leading-relaxed mb-10">
                    Reliez Tokyo à Kyoto en seulement 2h15 à bord du train le plus rapide du monde. Billets JR Pass disponibles en exclusivité sur AviaGo.
                  </p>
                  <button className="text-trip-blue font-black uppercase tracking-widest text-xs flex items-center gap-3 group/link">
                    Réserver mon billet
                    <ChevronRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                  </button>
                </div>

                <div className="card-floating p-12 bg-gradient-to-br from-white to-emerald-50 group">
                  <div className="w-20 h-20 rounded-[32px] bg-emerald-100 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                    <Car className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-black text-trip-dark tracking-tighter mb-6">Location de Voiture</h3>
                  <p className="text-trip-gray text-base font-medium leading-relaxed mb-10">
                    Explorez les temples cachés de Kyoto en toute liberté. Kilométrage illimité, GPS japonais et assurance premium incluse.
                  </p>
                  <button className="text-emerald-600 font-black uppercase tracking-widest text-xs flex items-center gap-3 group/link">
                    Voir les offres
                    <ChevronRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Trust Footer */}
              <div className="pt-24 pb-16 text-center">
                <div className="flex justify-center gap-16 mb-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  {partners.map((p, i) => (
                    <img key={i} src={p.logo} alt={p.name} className="h-7 w-auto object-contain" />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-6">
                  <div className="flex items-center gap-4 px-6 py-3 bg-gray-50 rounded-full border border-gray-100">
                    <ShieldCheck className="w-6 h-6 text-trip-blue" />
                    <span className="text-sm font-black text-trip-dark uppercase tracking-widest">Paiement 100% Sécurisé & Crypté</span>
                  </div>
                  <div className="flex items-center gap-8 text-[11px] font-black text-trip-gray uppercase tracking-widest">
                    <button className="hover:text-trip-blue transition-colors">Conditions Générales</button>
                    <button className="hover:text-trip-blue transition-colors">Confidentialité</button>
                    <button className="hover:text-trip-blue transition-colors">Cookies</button>
                  </div>
                  <p className="text-[11px] font-bold text-trip-gray/60 uppercase tracking-widest mt-4">
                    AviaGo © 2026 • Le futur du voyage de luxe • Design by Senior Lead UI/UX
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
