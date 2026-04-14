import { motion } from 'motion/react';
import { Zap, Clock, ArrowRight, Gift } from 'lucide-react';

const promos = [
  {
    title: 'Offre Flash Été',
    description: 'Jusqu\'à -50% sur une sélection d\'hôtels à Nice et sur la Côte d\'Azur.',
    discount: '-50%',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
    urgency: 'Se termine aujourd\'hui',
    color: 'bg-orange-500'
  },
  {
    title: 'Escapade à Tokyo',
    description: 'Réservez votre vol + hôtel et économisez sur votre séjour au Japon.',
    discount: '-30%',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800',
    urgency: 'Plus que quelques places',
    color: 'bg-trip-blue'
  }
];

export default function Promotions() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
          <Zap className="w-6 h-6 text-orange-500 fill-current" />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-trip-dark tracking-tighter">Offres & Promotions</h2>
          <p className="text-trip-gray font-medium">Ne manquez pas nos meilleures opportunités</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {promos.map((promo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-[48px] overflow-hidden group cursor-pointer shadow-2xl"
          >
            <img 
              src={promo.image} 
              alt={promo.title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${i === 0 ? 'from-orange-600/90' : 'from-blue-900/90'} to-transparent`} />
            
            <div className="absolute inset-0 p-12 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">{promo.urgency}</span>
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-trip-dark shadow-xl">
                  <Gift className="w-8 h-8" />
                </div>
              </div>

              <div className="max-w-md">
                <span className="text-6xl font-black tracking-tighter mb-4 block">{promo.discount}</span>
                <h3 className="text-3xl font-black tracking-tighter mb-4">{promo.title}</h3>
                <p className="text-white/80 font-medium mb-8 leading-relaxed">{promo.description}</p>
                <button className="px-8 py-4 bg-white text-trip-dark rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center gap-2 group/btn">
                  En profiter maintenant
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
