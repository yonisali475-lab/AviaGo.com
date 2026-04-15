import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, Hotel, TrainFront, Car, Search, Filter, ArrowUpDown, 
  ChevronRight, Clock, Leaf, ShieldCheck, Star, MapPin, 
  Calendar, Users, Info, ExternalLink, Zap, Headphones,
  ChevronLeft, Plus, Minus, Shield, Globe, Award, RefreshCw,
  AlertCircle, Loader2, Ticket, Fuel, Navigation, Briefcase
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { fetchCheapestFlights, getBookingUrl, getAirlineLogo, getHotelBookingUrl } from '../services/travelpayoutsService';
import { SearchData } from './SearchEngine';
import DealsExplorer from './DealsExplorer';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// --- HELPERS ---

/**
 * Génère une URL d'image dynamique et cohérente basée sur la destination
 */
const getDestinationImage = (destination: string, type: string = 'city') => {
  const cleanDest = destination.split('(')[0].trim();
  const keywords: Record<string, string> = {
    'Disneyland': 'disneyland park castle',
    'Paris': 'eiffel tower paris',
    'Tokyo': 'tokyo city skyline',
    'Londres': 'london big ben',
    'New York': 'new york manhattan',
    'Dubaï': 'dubai burj khalifa',
    'Rome': 'rome colosseum',
    'Barcelone': 'barcelona sagrada familia',
  };

  const query = keywords[cleanDest] || `${cleanDest} ${type}`;
  return `https://images.unsplash.com/photo-1500000000000?auto=format&fit=crop&q=80&w=800&sig=${encodeURIComponent(query)}`;
  // Note: Unsplash source is deprecated, using a placeholder logic with signature for consistency
  // In a real app, we'd use the Unsplash API search
};

// Re-using Unsplash with a more reliable pattern for this demo
const getUnsplashUrl = (query: string) => {
  const seeds: Record<string, string> = {
    'disneyland': '1545173168-82f8da9f787b',
    'paris': '1502602898657-3e91760cbb34',
    'tokyo': '1540959733332-eab4deabeeaf',
    'london': '1513635269975-59663e0ac1ad',
    'new york': '1496442226666-8d4d0e62e6e9',
    'dubai': '1512453979798-5eaad0df3b06',
    'rome': '1552832230-c0197dd311b5',
    'barcelona': '1583422409516-2895a77efded',
    'nice': '1589197331516-4d839a13b51e',
    'lyon': '1509909756405-be0199881695',
    'hotel': '1566073771259-6a8506099945',
    'activity': '1533105079780-92b9be482077',
    'train': '1474487056217-76fe757f81ec',
    'car': '1560958089-b8a1929cea89'
  };

  const cleanQuery = query.toLowerCase();
  let id = '1500000000000';
  for (const [key, val] of Object.entries(seeds)) {
    if (cleanQuery.includes(key)) {
      id = val;
      break;
    }
  }
  
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800`;
};

// --- COMPOSANTS UI SPÉCIFIQUES ---

const FlightCard = ({ flight, bookingUrl }: { flight: any, bookingUrl: string }) => {
  console.log(`AviaGo: Rendu FlightCard pour ${flight.airline}, Lien:`, bookingUrl);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-white p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 border border-trip-border hover:border-trip-primary transition-all pointer-events-auto"
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
              <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{flight.origin}</p>
              <span className="text-[10px] font-bold text-trip-primary uppercase tracking-widest">• {flight.departureDate}</span>
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
            <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{flight.destination}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10 pl-8 border-l border-trip-border">
        <div className="text-right">
          <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Prix par personne</p>
          <p className="text-4xl font-black text-trip-primary tracking-tighter">{flight.price} €</p>
        </div>
        {bookingUrl ? (
          <a 
            href={bookingUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cta-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center justify-center"
          >
            RÉSERVER
          </a>
        ) : (
          <button disabled className="cta-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg opacity-50 cursor-not-allowed">
            INDISPONIBLE
          </button>
        )}
      </div>
    </motion.div>
  );
};

const HotelCard = ({ hotel }: { hotel: any }) => {
  console.log(`AviaGo: Rendu HotelCard pour ${hotel.name}, Lien:`, hotel.bookingUrl);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-white overflow-hidden shadow-sm flex flex-col md:flex-row gap-6 border border-trip-border hover:border-trip-primary transition-all pointer-events-auto"
    >
      <div className="w-full md:w-72 h-48 md:h-auto overflow-hidden">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black text-trip-dark tracking-tighter">{hotel.name}</h3>
            <div className="flex items-center gap-1">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-trip-gray mb-4">
            <MapPin className="w-4 h-4" />
            <p className="text-xs font-bold">{hotel.address}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Disponible</span>
            <span className="text-xs text-trip-gray font-bold">{hotel.rating} / 10 • {hotel.reviews} avis</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-trip-border">
          <div>
            <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">À partir de</p>
            <p className="text-3xl font-black text-trip-primary tracking-tighter">{hotel.price} € <span className="text-sm text-trip-gray font-bold">/ nuit</span></p>
          </div>
          {hotel.bookingUrl ? (
            <a 
              href={hotel.bookingUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-blue px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center justify-center"
            >
              VOIR L'HÔTEL
            </a>
          ) : (
            <button disabled className="cta-blue px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg opacity-50 cursor-not-allowed">
              INDISPONIBLE
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ActivityCard = ({ activity }: { activity: any }) => {
  console.log(`AviaGo: Rendu ActivityCard pour ${activity.title}, Lien:`, activity.bookingUrl);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-white overflow-hidden shadow-sm flex flex-col md:flex-row gap-6 border border-trip-border hover:border-trip-primary transition-all pointer-events-auto"
    >
      <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden">
        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-black text-trip-dark tracking-tighter mb-2">{activity.title}</h3>
          <div className="flex items-center gap-4 text-trip-gray mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold">{activity.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-xs font-bold">{activity.rating} ({activity.reviews})</span>
            </div>
          </div>
          <p className="text-sm text-trip-gray line-clamp-2">{activity.description}</p>
        </div>
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-trip-border">
          <div>
            <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">Par personne</p>
            <p className="text-3xl font-black text-trip-primary tracking-tighter">{activity.price} €</p>
          </div>
          {activity.bookingUrl ? (
            <a 
              href={activity.bookingUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-blue px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center justify-center"
            >
              RÉSERVER
            </a>
          ) : (
            <button disabled className="cta-blue px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg opacity-50 cursor-not-allowed">
              INDISPONIBLE
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TrainCard = ({ train }: { train: any }) => {
  console.log(`AviaGo: Rendu TrainCard pour ${train.origin} -> ${train.destination}, Lien:`, train.bookingUrl);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-white p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 border border-trip-border hover:border-trip-primary transition-all pointer-events-auto"
    >
      <div className="flex items-center gap-8 flex-1">
        <div className="w-16 h-16 rounded-2xl bg-trip-surface p-3 flex items-center justify-center border border-trip-border text-trip-primary">
          <TrainFront className="w-8 h-8" />
        </div>
        <div className="flex-1 grid grid-cols-3 items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-2xl font-black text-trip-dark tracking-tighter">{train.departureTime}</p>
            <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{train.origin}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-full h-px bg-trip-border relative">
              <TrainFront className="w-4 h-4 text-trip-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1" />
            </div>
            <span className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{train.duration}</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-2xl font-black text-trip-dark tracking-tighter">{train.arrivalTime}</p>
            <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{train.destination}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10 pl-8 border-l border-trip-border">
        <div className="text-right">
          <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">À partir de</p>
          <p className="text-3xl font-black text-trip-primary tracking-tighter">{train.price} €</p>
        </div>
        {train.bookingUrl ? (
          <a 
            href={train.bookingUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cta-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center justify-center"
          >
            RÉSERVER
          </a>
        ) : (
          <button disabled className="cta-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg opacity-50 cursor-not-allowed">
            INDISPONIBLE
          </button>
        )}
      </div>
    </motion.div>
  );
};

const CarCard = ({ car }: { car: any }) => {
  console.log(`AviaGo: Rendu CarCard pour ${car.model}, Lien:`, car.bookingUrl);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-white overflow-hidden shadow-sm flex flex-col md:flex-row gap-6 border border-trip-border hover:border-trip-primary transition-all pointer-events-auto"
    >
      <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden bg-trip-surface p-6 flex items-center justify-center">
        <img src={car.image} alt={car.model} className="w-full h-auto object-contain" />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black text-trip-dark tracking-tighter">{car.model}</h3>
            <div className="flex items-center gap-1 px-2 py-1 bg-trip-primary/5 rounded-lg">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-[10px] font-black text-trip-primary">{car.rating}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-trip-gray mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold">{car.seats} Places</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-xs font-bold">{car.bags} Sacs</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              <span className="text-xs font-bold">{car.fuel}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-trip-gray">
            <MapPin className="w-4 h-4" />
            <p className="text-xs font-bold">{car.location}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-trip-border">
          <div>
            <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">Par jour</p>
            <p className="text-3xl font-black text-trip-primary tracking-tighter">{car.price} €</p>
          </div>
          {car.bookingUrl ? (
            <a 
              href={car.bookingUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-blue px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center justify-center"
            >
              LOUER
            </a>
          ) : (
            <button disabled className="cta-blue px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg opacity-50 cursor-not-allowed">
              INDISPONIBLE
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- CARTE INTERACTIVE ---

const MapComponent = ({ points }: { points: any[] }) => {
  const center = points.length > 0 ? [points[0].lat, points[0].lng] : [48.8566, 2.3522];
  
  return (
    <div className="h-[400px] w-full rounded-[32px] overflow-hidden shadow-2xl border border-trip-border z-0">
      <MapContainer center={center as any} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {points.map((p, i) => (
          <Marker 
            key={i} 
            position={[p.lat, p.lng] as any}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: p.type === 'hotel' && p.price 
                ? `<div class="bg-white px-2 py-1 rounded-full shadow-lg border border-trip-primary/20 flex items-center justify-center min-w-[40px] hover:scale-110 transition-transform">
                     <span class="text-[9px] font-black text-trip-primary">${p.price}€</span>
                   </div>`
                : `<div class="w-3 h-3 bg-trip-primary rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"></div>`,
              iconSize: p.type === 'hotel' && p.price ? [40, 20] : [12, 12],
              iconAnchor: p.type === 'hotel' && p.price ? [20, 10] : [6, 6]
            })}
          >
            <Popup>
              <div className="p-2">
                <p className="font-black text-trip-dark uppercase tracking-widest text-[10px]">{p.label}</p>
                {p.price && <p className="text-trip-primary font-black text-xs mt-1">{p.price} €</p>}
              </div>
            </Popup>
          </Marker>
        ))}
        <MapUpdater points={points} />
      </MapContainer>
    </div>
  );
};

const MapUpdater = ({ points }: { points: any[] }) => {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
    }
  }, [points, map]);
  return null;
};

// --- COMPOSANT PRINCIPAL ---

export default function SearchResults({ 
  searchData, 
  onSearch 
}: { 
  searchData: SearchData;
  onSearch?: (data: SearchData) => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [is403, setIs403] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Coordonnées pour la carte
  const mapPoints = useMemo(() => {
    console.log("AviaGo: Mise à jour des points de la carte - Résultats:", results.length);
    
    if (searchData.service === 'flights') {
      const points = [];
      if (searchData.originCoords) {
        points.push({ lat: searchData.originCoords.lat, lng: searchData.originCoords.lng, label: `Départ: ${searchData.origin}` });
      }
      if (searchData.destCoords) {
        points.push({ lat: searchData.destCoords.lat, lng: searchData.destCoords.lng, label: `Arrivée: ${searchData.destination}` });
      }
      
      // Fallback si pas de coordonnées
      if (points.length === 0) {
        points.push({ lat: 48.8566, lng: 2.3522, label: "Paris (Centre)" });
      }
      
      console.log("AviaGo: Coordonnées carte (Vols):", points);
      return points;
    }
    
    // Pour les autres services, on utilise les coordonnées des résultats
    const points = results.map(r => ({
      lat: r.lat,
      lng: r.lng,
      label: r.name || r.title || r.model,
      price: r.price,
      type: r.type
    })).filter(p => p.lat && p.lng);

    if (points.length === 0 && searchData.destCoords) {
      points.push({ lat: searchData.destCoords.lat, lng: searchData.destCoords.lng, label: searchData.destination });
    }

    // Fallback ultime
    if (points.length === 0) {
      points.push({ lat: 48.8566, lng: 2.3522, label: "Paris (Centre)" });
    }

    console.log("AviaGo: Coordonnées carte:", points);
    return points;
  }, [results, searchData]);

  const performSearch = useCallback(async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);
    
    setError(null);
    setIs403(false);

    try {
      if (searchData.service === 'flights') {
        const result = await fetchCheapestFlights({
          origin: searchData.origin,
          destination: searchData.destination,
          departDate: searchData.departDate,
          returnDate: searchData.returnDate
        });

        if (result.error) {
          if (result.error.includes('403') || result.error.toLowerCase().includes('unauthorized')) {
            setIs403(true);
          } else if (result.error.includes('equal') || result.error.includes('invalid params')) {
            setError("La ville de départ et d'arrivée ne peuvent pas être identiques.");
          } else {
            setError(result.error);
          }
        } else if (Object.keys(result.data).length > 0) {
          const flights = Object.values(result.data).map((p: any, idx: number) => {
            const depDate = new Date(p.departure_at);
            const flightData = {
              origin: searchData.origin,
              destination: searchData.destination,
              departDate: searchData.departDate,
              returnDate: searchData.returnDate,
              adults: searchData.passengers.total,
              children: 0,
              infants: 0,
              tripClass: 'Y' as const
            };
            const bookingUrl = getBookingUrl(flightData);
            
            return {
              id: `flight-${idx}`,
              type: 'flight',
              airline: p.airline,
              logo: getAirlineLogo(p.airline),
              departure: depDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
              departureDate: depDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
              arrival: '--:--',
              duration: 'Direct / Escale',
              origin: searchData.origin,
              destination: searchData.destination,
              price: p.price,
              bookingUrl: bookingUrl
            };
          });
          setResults(flights);
        } else {
          setResults([]); 
        }
      } else {
        // Simulation dynamique pour les autres services
        // Dans une vraie app, on appellerait les APIs respectives
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        let dynamicResults = [];
        const dest = searchData.destination;
        const baseLat = searchData.destCoords?.lat || 48.8566;
        const baseLng = searchData.destCoords?.lng || 2.3522;

        if (searchData.service === 'hotels') {
          dynamicResults = [
            { 
              id: 'h1', type: 'hotel', name: `Grand Hôtel ${dest.split('(')[0]}`, stars: 5, address: `12 Rue de la Paix, ${dest}`, rating: 9.2, reviews: 1240, price: 185, 
              image: getUnsplashUrl(`${dest} hotel luxury`),
              bookingUrl: getHotelBookingUrl(dest, searchData.departDate, searchData.returnDate),
              lat: baseLat + 0.005, lng: baseLng + 0.005
            },
            { 
              id: 'h2', type: 'hotel', name: `${dest.split('(')[0]} Palace`, stars: 4, address: `45 Avenue des Arts, ${dest}`, rating: 8.7, reviews: 850, price: 145, 
              image: getUnsplashUrl(`${dest} palace resort`),
              bookingUrl: getHotelBookingUrl(dest, searchData.departDate, searchData.returnDate),
              lat: baseLat - 0.005, lng: baseLng + 0.008
            },
            { 
              id: 'h3', type: 'hotel', name: `Boutique Hôtel ${dest.split('(')[0]}`, stars: 4, address: `8 Place du Marché, ${dest}`, rating: 8.9, reviews: 420, price: 120, 
              image: getUnsplashUrl(`${dest} boutique hotel`),
              bookingUrl: getHotelBookingUrl(dest, searchData.departDate, searchData.returnDate),
              lat: baseLat + 0.008, lng: baseLng - 0.005
            },
          ];
        } else if (searchData.service === 'activities') {
          dynamicResults = [
            { 
              id: 'a1', type: 'activity', title: `Visite Guidée Historique - ${dest.split('(')[0]}`, duration: '3h', rating: 4.9, reviews: 320, price: 45, 
              description: 'Découvrez les secrets les mieux gardés de la ville avec un guide expert local.', 
              image: getUnsplashUrl(`${dest} history culture`),
              bookingUrl: `https://www.viator.com/search/${dest}?mcid=12345`,
              lat: baseLat + 0.01, lng: baseLng + 0.01
            },
            { 
              id: 'a2', type: 'activity', title: `Dégustation Gastronomique`, duration: '2h', rating: 4.8, reviews: 150, price: 65, 
              description: 'Un voyage culinaire à travers les spécialités régionales et vins fins.', 
              image: getUnsplashUrl(`${dest} food gourmet`),
              bookingUrl: `https://www.getyourguide.com/s/?q=${dest}&partner_id=12345`,
              lat: baseLat - 0.01, lng: baseLng - 0.01
            },
          ];
        } else if (searchData.service === 'trains') {
          dynamicResults = [
            { 
              id: 't1', type: 'train', origin: searchData.origin, destination: searchData.destination, departureTime: '08:30', arrivalTime: '11:45', duration: '3h 15m', price: 55,
              bookingUrl: `https://www.thetrainline.com/en/search/results?from=${searchData.origin}&to=${searchData.destination}`,
              lat: baseLat, lng: baseLng
            },
            { 
              id: 't2', type: 'train', origin: searchData.origin, destination: searchData.destination, departureTime: '14:15', arrivalTime: '17:30', duration: '3h 15m', price: 48,
              bookingUrl: `https://www.thetrainline.com/en/search/results?from=${searchData.origin}&to=${searchData.destination}`,
              lat: baseLat, lng: baseLng
            },
          ];
        } else if (searchData.service === 'cars') {
          dynamicResults = [
            { 
              id: 'c1', type: 'car', model: 'Tesla Model 3', rating: 4.9, seats: 5, bags: 2, fuel: 'Électrique', location: searchData.origin, price: 85, 
              image: getUnsplashUrl(`tesla car`),
              bookingUrl: `https://www.rentalcars.com/search-results?location=${searchData.origin}`,
              lat: baseLat + 0.02, lng: baseLng + 0.02
            },
            { 
              id: 'c2', type: 'car', model: 'BMW Série 3', rating: 4.7, seats: 5, bags: 3, fuel: 'Hybride', location: searchData.origin, price: 75, 
              image: getUnsplashUrl(`bmw car`),
              bookingUrl: `https://www.rentalcars.com/search-results?location=${searchData.origin}`,
              lat: baseLat - 0.02, lng: baseLng - 0.02
            },
          ];
        }
        setResults(dynamicResults);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Une erreur est survenue, veuillez réessayer.");
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-trip-surface flex flex-col items-center justify-center p-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
          <div className="w-24 h-24 border-4 border-trip-primary border-t-transparent rounded-full animate-spin mb-8" />
          <Plane className="w-8 h-8 text-trip-primary absolute top-8 left-8 animate-pulse" />
        </motion.div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-trip-dark tracking-tighter mb-2 uppercase">Recherche en cours</h2>
          <p className="text-trip-gray font-black uppercase tracking-[0.3em] text-[10px]">Optimisation des meilleurs tarifs pour vous...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-trip-surface pb-20 font-sans selection:bg-trip-primary/10">
      {/* Header Summary */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={getUnsplashUrl(searchData.destination)} 
          alt="Destination Background" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 text-center">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="frosted-glass-white rounded-[32px] p-2 shadow-2xl border border-white/20 max-w-5xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-center gap-1">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
                <div className="flex items-center gap-4 px-8 py-6 bg-trip-primary/5 rounded-l-[28px]">
                  <MapPin className="w-6 h-6 text-trip-primary" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Destination</p>
                    <p className="text-lg font-black text-trip-dark truncate max-w-[200px]">{searchData.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-8 py-6 bg-trip-primary/5">
                  <Calendar className="w-6 h-6 text-trip-primary" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Dates</p>
                    <p className="text-lg font-black text-trip-dark">{searchData.departDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-8 py-6 bg-trip-primary/5 rounded-r-[28px]">
                  <Users className="w-6 h-6 text-trip-primary" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-1">Service</p>
                    <p className="text-lg font-black text-trip-dark uppercase tracking-tighter">{searchData.service}</p>
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

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Results */}
        <div className="lg:col-span-8 space-y-6">
          {is403 && (
            <div className="bg-white rounded-[32px] p-10 shadow-2xl border border-trip-border">
              <h3 className="text-2xl font-black text-trip-dark tracking-tighter mb-4">Accès en cours de validation</h3>
              <p className="text-trip-gray mb-6">Validation de votre accès aux tarifs en cours par Travelpayouts...</p>
              <button onClick={() => performSearch(true)} className="cta-blue px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl">
                VÉRIFIER LA CONNEXION
              </button>
            </div>
          )}

          {(error || (results.length === 0 && !is403)) && (
            <div className="p-8 bg-white rounded-[24px] shadow-xl border border-trip-border flex items-center gap-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
              <div>
                <p className="text-lg font-black text-trip-dark">{error || "Aucun résultat trouvé"}</p>
                <p className="text-trip-gray font-medium">Essayez de modifier vos critères de recherche ou vos dates.</p>
              </div>
            </div>
          )}

          {results.map((item) => {
            switch(item.type) {
              case 'flight': return <div key={item.id}><FlightCard flight={item} bookingUrl={item.bookingUrl} /></div>;
              case 'hotel': return <div key={item.id}><HotelCard hotel={item} /></div>;
              case 'activity': return <div key={item.id}><ActivityCard activity={item} /></div>;
              case 'train': return <div key={item.id}><TrainCard train={item} /></div>;
              case 'car': return <div key={item.id}><CarCard car={item} /></div>;
              default: return null;
            }
          })}

          {results.length === 0 && !is403 && !error && <DealsExplorer onSearch={onSearch} />}
        </div>

        {/* Right Column: Map */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-black text-trip-dark uppercase tracking-widest flex items-center gap-2">
                <Navigation className="w-4 h-4 text-trip-primary" />
                Aperçu de la zone
              </h3>
              <span className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{results.length} Résultats</span>
            </div>
            <MapComponent points={mapPoints} />
            
            <div className="mt-8 card-white p-6 border border-trip-border">
              <h4 className="text-xs font-black text-trip-dark uppercase tracking-widest mb-4">Pourquoi réserver avec AviaGo ?</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <p className="text-xs font-bold text-trip-gray">Protection complète du voyageur</p>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-trip-primary" />
                  <p className="text-xs font-bold text-trip-gray">Confirmation instantanée</p>
                </div>
                <div className="flex items-center gap-3">
                  <Headphones className="w-5 h-5 text-trip-primary" />
                  <p className="text-xs font-bold text-trip-gray">Support client 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
