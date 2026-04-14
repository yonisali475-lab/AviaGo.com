import { Star, CloudSun } from 'lucide-react';
import { motion } from 'motion/react';

const destinations = [
  {
    id: 1,
    city: 'Nice',
    title: 'Le luxe de la Riviera',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200',
    rating: 5.0,
    climate: '22°C Ensoleillé',
    price: 180,
    type: 'Vols',
  },
  {
    id: 2,
    city: 'Kyoto',
    title: 'L\'âme du Japon',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    climate: '18°C Doux',
    price: 850,
    type: 'Vols',
  },
  {
    id: 3,
    city: 'Paris',
    title: 'La Ville Lumière',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1200',
    rating: 4.8,
    climate: '15°C Nuageux',
    price: 45,
    type: 'Trains',
  },
  {
    id: 4,
    city: 'Rome',
    title: 'La Cité Éternelle',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    climate: '20°C Ensoleillé',
    price: 120,
    type: 'Hôtels',
  },
];

export default function InspirationSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-serif font-light text-midnight mb-4 tracking-tight">L'Inspiration <span className="italic">Sans Limite</span></h2>
            <p className="text-midnight/50 font-medium tracking-wide">Découvrez des horizons d'exception, sélectionnés pour leur caractère unique et leur prestige inégalé.</p>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-[0.25em] text-midnight border-b border-midnight/20 pb-1 hover:border-midnight transition-all">
            Explorer l'Atlas
          </button>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar -mx-6 px-6 snap-x">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[400px] snap-start group cursor-pointer"
            >
              <div className="relative h-[540px] rounded-[24px] overflow-hidden mb-6 luxury-shadow">
                <img 
                  src={dest.image} 
                  alt={dest.city} 
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                
                <div className="absolute top-6 right-6 frosted-glass px-3 py-1.5 rounded-full flex items-center gap-2">
                  <CloudSun className="w-3.5 h-3.5 text-sand" />
                  <span className="text-[10px] font-bold text-midnight uppercase tracking-wider">{dest.climate}</span>
                </div>

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(dest.rating) ? 'fill-sand text-sand' : 'text-white/30'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/70">{dest.rating} Prestige</span>
                  </div>
                  <h3 className="text-3xl font-serif font-medium mb-1 tracking-tight">{dest.city}</h3>
                  <p className="text-sm text-white/60 font-light italic tracking-wide">{dest.title}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-midnight/30">{dest.type}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] font-bold text-midnight/30 uppercase tracking-widest mr-1">À partir de</span>
                  <span className="text-2xl font-mono font-medium text-midnight tracking-tighter">{dest.price.toLocaleString('fr-FR')}€</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
