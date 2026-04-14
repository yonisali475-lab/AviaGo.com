import { Bus } from 'lucide-react';
import { motion } from 'motion/react';

export default function BusSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200" 
            alt="Autocar de voyage moderne" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent flex items-center">
            <div className="max-w-xl px-8 md:px-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 bg-cyan text-navy text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
                  <Bus className="w-4 h-4" />
                  <span>Nouveau</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                  Le Bus, Confort et Économies
                </h2>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  Découvrez l'Europe à petit prix sur des itinéraires directes. Profitez de sièges inclinables, du Wi-Fi gratuit et de prises électriques à bord.
                </p>
                <button className="px-10 py-4 bg-cyan text-navy font-bold rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-lg flex items-center gap-3">
                  <Bus className="w-5 h-5" />
                  <span>Trouver un Billet de Bus</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
