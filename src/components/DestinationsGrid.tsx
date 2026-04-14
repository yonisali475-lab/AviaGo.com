import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const destinations = [
  {
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    price: '45€',
    tag: 'Populaire'
  },
  {
    city: 'Tokyo',
    country: 'Japon',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
    price: '590€',
    tag: 'Incontournable'
  },
  {
    city: 'Singapour',
    country: 'Singapour',
    image: 'https://images.unsplash.com/photo-1525625239445-a2ce8b769c79?auto=format&fit=crop&q=80&w=800',
    price: '620€',
    tag: 'Luxe'
  },
  {
    city: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
    price: '410€',
    tag: 'Vibrant'
  },
  {
    city: 'Dubaï',
    country: 'Émirats Arabes Unis',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    price: '380€',
    tag: 'Spectaculaire'
  },
  {
    city: 'Kyoto',
    country: 'Japon',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    price: '650€',
    tag: 'Zen'
  }
];

export default function DestinationsGrid() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-trip-dark tracking-tighter mb-2">Où aller ?</h2>
          <p className="text-trip-gray font-medium">Découvrez nos destinations coup de cœur</p>
        </div>
        <button className="flex items-center gap-2 text-trip-blue font-bold text-sm hover:gap-3 transition-all">
          Voir tout <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <img 
                src={dest.image} 
                alt={dest.city} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                  {dest.tag}
                </span>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">{dest.country}</p>
                <h3 className="text-3xl font-black text-white tracking-tighter">{dest.city}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-trip-gray uppercase tracking-widest">À partir de</span>
                <span className="text-xl font-black text-trip-blue">{dest.price}</span>
              </div>
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-trip-blue group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
