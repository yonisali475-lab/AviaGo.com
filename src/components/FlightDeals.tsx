import { motion } from 'motion/react';
import { Plane, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

const flights = [
  {
    from: 'Paris',
    to: 'New York',
    airline: 'Air France',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Air_France_Logo.svg/1200px-Air_France_Logo.svg.png',
    duration: '8h 15m',
    stops: 'Direct',
    price: '410€',
    discount: '-15%'
  },
  {
    from: 'Lyon',
    to: 'Tokyo',
    airline: 'Emirates',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png',
    duration: '14h 30m',
    stops: '1 escale',
    price: '590€',
    discount: '-20%'
  },
  {
    from: 'Nice',
    to: 'Dubaï',
    airline: 'Qatar Airways',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Qatar_Airways_logo.svg/1200px-Qatar_Airways_logo.svg.png',
    duration: '6h 45m',
    stops: 'Direct',
    price: '380€',
    discount: 'Meilleur prix'
  }
];

export default function FlightDeals() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Plane className="w-5 h-5 text-trip-blue" />
              <span className="text-xs font-black text-trip-blue uppercase tracking-widest">Vols Populaires</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-trip-dark tracking-tighter">Offres Aériennes</h2>
          </div>
          <button className="text-trip-blue font-bold text-sm hover:underline">Voir tous les vols</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {flights.map((flight, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 p-2 flex items-center justify-center">
                    <img src={flight.logo} alt={flight.airline} className="w-full h-auto object-contain" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-trip-gray">{flight.airline}</p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-black uppercase tracking-widest">
                      <ShieldCheck className="w-3 h-3" />
                      Certifié AviaGo
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {flight.discount}
                </span>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="text-center flex-1">
                  <p className="text-2xl font-black text-trip-dark tracking-tighter">{flight.from}</p>
                  <p className="text-[10px] font-bold text-trip-gray uppercase tracking-widest">Départ</p>
                </div>
                <div className="flex flex-col items-center px-4 flex-1">
                  <div className="w-full h-px bg-gray-200 relative">
                    <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-trip-blue rotate-90" />
                  </div>
                  <span className="text-[9px] font-bold text-trip-gray mt-2 uppercase tracking-widest">{flight.duration}</span>
                </div>
                <div className="text-center flex-1">
                  <p className="text-2xl font-black text-trip-dark tracking-tighter">{flight.to}</p>
                  <p className="text-[10px] font-bold text-trip-gray uppercase tracking-widest">Arrivée</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div>
                  <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">Prix final</p>
                  <p className="text-2xl font-black text-trip-blue">{flight.price}</p>
                </div>
                <a 
                  href="https://www.aviasales.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-trip-blue text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-trip-blue/20"
                >
                  Voir les prix
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
