import { TrendingDown, Clock, Tag, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const deals = [
  {
    id: 1,
    type: 'Aérien',
    brand: 'Emirates',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png',
    title: 'Paris - Dubaï',
    details: 'Classe Affaires • Sièges 180°',
    price: 2450,
    tag: 'Service Signature',
    image: 'https://images.unsplash.com/photo-1540339832862-47452993c66e?auto=format&fit=crop&q=80&w=800',
    comfort: 'Lounge VIP inclus',
  },
  {
    id: 2,
    type: 'Rail',
    brand: 'TGV Lyria',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Logo_TGV_Lyria.svg/1200px-Logo_TGV_Lyria.svg.png',
    title: 'Paris - Zurich',
    details: 'Business 1ère • Gastronomie',
    price: 185,
    tag: 'Éco-Prestige',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800',
    comfort: 'Silence & Confort',
  },
  {
    id: 3,
    type: 'Location',
    brand: 'Hertz Prestige',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hertz_logo.svg/1200px-Hertz_logo.svg.png',
    title: 'Porsche Taycan',
    details: 'Électrique Performance',
    price: 450,
    tag: 'Adrénaline',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    comfort: 'Livraison à l\'Aéroport',
  },
  {
    id: 4,
    type: 'Grand Tourisme',
    brand: 'AviaGo Luxury Bus',
    logo: '',
    title: 'Côte d\'Azur Express',
    details: 'Salon Roulant • 12 Sièges',
    price: 85,
    tag: 'Espace Jambes Premium',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    comfort: 'Service de Bord',
  },
];

export default function DealsSection() {
  return (
    <section className="py-24 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 bg-midnight rounded-2xl flex items-center justify-center shadow-lg">
            <Tag className="w-6 h-6 text-sand" />
          </div>
          <div>
            <h2 className="text-4xl font-serif font-light text-midnight tracking-tight">Le Hub des <span className="italic">Offres Premium</span></h2>
            <p className="text-midnight/40 text-sm font-medium tracking-wide">L'excellence opérationnelle au service de vos déplacements.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[32px] overflow-hidden luxury-shadow border border-white hover:border-sand/30 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 frosted-glass px-3 py-1 rounded-full">
                  <span className="text-[9px] font-bold text-midnight uppercase tracking-widest">{deal.tag}</span>
                </div>
                {deal.logo && (
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-sm">
                    <img src={deal.logo} alt={deal.brand} className="h-4 object-contain" referrerPolicy="no-referrer" />
                  </div>
                )}
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-bold text-midnight/30 uppercase tracking-[0.2em]">{deal.type}</span>
                  <div className="w-1 h-1 bg-sand rounded-full" />
                  <div className="flex items-center gap-1 text-[9px] font-bold text-electric-cyan uppercase tracking-widest">
                    <Zap className="w-3 h-3" />
                    <span>Disponibilité Immédiate</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-serif font-medium text-midnight mb-2 tracking-tight">{deal.title}</h3>
                <p className="text-xs text-midnight/50 font-medium mb-6 leading-relaxed">{deal.details}</p>
                
                <div className="flex items-center gap-2 mb-8 p-3 bg-soft-gray rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-sand" />
                  <span className="text-[10px] font-bold text-midnight/60 uppercase tracking-wide">{deal.comfort}</span>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-midnight/30 uppercase tracking-widest mb-1">Tarif Membre</span>
                    <span className="text-2xl font-mono font-medium text-midnight tracking-tighter">{deal.price.toLocaleString('fr-FR')}.00€</span>
                  </div>
                  <button className="w-12 h-12 rounded-full border border-midnight/10 flex items-center justify-center hover:bg-midnight hover:text-white transition-all duration-500 group/btn">
                    <TrendingDown className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
