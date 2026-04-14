import { motion } from 'motion/react';
import { Star, Quote, Users, ShieldCheck, Globe } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Voyageuse Élite',
    text: 'AviaGo est devenu mon compagnon de voyage indispensable. Les prix sont imbattables et le service client est exceptionnel.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    name: 'Thomas Dubois',
    role: 'Globe-trotter',
    text: 'La fluidité de l\'application est incroyable. Réserver un vol et un hôtel n\'a jamais été aussi simple et rapide.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    name: 'Léa Bernard',
    role: 'Blogueuse Voyage',
    text: 'J\'adore la section inspiration. Elle me permet de découvrir des destinations auxquelles je n\'aurais jamais pensé.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    rating: 5
  }
];

const stats = [
  { icon: Users, value: '400M+', label: 'Voyageurs' },
  { icon: ShieldCheck, value: '100%', label: 'Sécurisé' },
  { icon: Globe, value: '200+', label: 'Pays' },
  { icon: Star, value: '4.9/5', label: 'Note App' }
];

export default function TrustSection() {
  return (
    <section className="py-24 bg-trip-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Faites confiance à l'expert</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Rejoignez des millions de voyageurs qui explorent le monde avec AviaGo.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-trip-blue/20 transition-colors">
                <stat.icon className="w-8 h-8 text-trip-blue" />
              </div>
              <p className="text-4xl font-black tracking-tighter mb-2">{stat.value}</p>
              <p className="text-xs font-black text-white/40 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-[40px] p-10 border border-white/10 relative group hover:bg-white/10 transition-all"
            >
              <Quote className="absolute top-8 right-10 w-12 h-12 text-white/5 group-hover:text-trip-blue/20 transition-colors" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testi.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-lg font-medium text-white/80 mb-8 leading-relaxed italic">"{testi.text}"</p>

              <div className="flex items-center gap-4">
                <img src={testi.avatar} alt={testi.name} className="w-12 h-12 rounded-full object-cover border-2 border-trip-blue" />
                <div>
                  <p className="font-black text-sm tracking-tight">{testi.name}</p>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
