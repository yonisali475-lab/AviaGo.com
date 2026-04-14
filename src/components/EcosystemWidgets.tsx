import { QrCode, CloudSun, RefreshCw, ArrowRightLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function EcosystemWidgets() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* My Tickets Widget */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 frosted-glass rounded-[32px] p-8 luxury-shadow group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 bg-midnight rounded-2xl flex items-center justify-center">
                <QrCode className="w-6 h-6 text-sand" />
              </div>
              <span className="text-[10px] font-bold text-midnight/30 uppercase tracking-[0.2em]">Prochain Départ</span>
            </div>
            <h3 className="text-2xl font-serif font-medium text-midnight mb-2">Mes Billets</h3>
            <p className="text-sm text-midnight/50 mb-8">Accédez instantanément à vos cartes d'embarquement et réservations.</p>
            <div className="flex items-center justify-between p-4 bg-soft-gray rounded-2xl border border-midnight/5 group-hover:border-sand/30 transition-colors">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-midnight/40 uppercase tracking-widest">Vol AF1234</span>
                <span className="text-sm font-bold text-midnight">Paris CDG → Tokyo HND</span>
              </div>
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <QrCode className="w-5 h-5 text-midnight" />
              </div>
            </div>
          </motion.div>

          {/* Weather Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 frosted-glass rounded-[32px] p-8 luxury-shadow"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 bg-midnight rounded-2xl flex items-center justify-center">
                <CloudSun className="w-6 h-6 text-sand" />
              </div>
              <span className="text-[10px] font-bold text-midnight/30 uppercase tracking-[0.2em]">Météo Locale</span>
            </div>
            <h3 className="text-2xl font-serif font-medium text-midnight mb-2">Tokyo, Japon</h3>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-5xl font-mono font-light text-midnight tracking-tighter">18°C</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-midnight uppercase tracking-wide">Ensoleillé</span>
                <span className="text-[10px] text-midnight/40 uppercase tracking-widest">Ressenti 20°C</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1 p-2 bg-soft-gray rounded-xl">
                  <span className="text-[9px] font-bold text-midnight/40 uppercase tracking-widest">Lun</span>
                  <CloudSun className="w-4 h-4 text-midnight/60" />
                  <span className="text-[10px] font-bold text-midnight">19°</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Currency Converter Widget */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 frosted-glass rounded-[32px] p-8 luxury-shadow"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 bg-midnight rounded-2xl flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-sand" />
              </div>
              <span className="text-[10px] font-bold text-midnight/30 uppercase tracking-[0.2em]">Devises</span>
            </div>
            <h3 className="text-2xl font-serif font-medium text-midnight mb-6">Convertisseur</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-soft-gray rounded-2xl border border-midnight/5">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-midnight/40 uppercase tracking-widest">De</span>
                  <span className="text-lg font-mono font-medium text-midnight tracking-tighter">1,000.00 EUR</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-midnight">€</span>
                </div>
              </div>
              <div className="flex justify-center -my-2 relative z-10">
                <div className="w-8 h-8 bg-midnight rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <ArrowRightLeft className="w-4 h-4 text-sand" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-soft-gray rounded-2xl border border-midnight/5">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-midnight/40 uppercase tracking-widest">Vers</span>
                  <span className="text-lg font-mono font-medium text-midnight tracking-tighter">162,450.00 JPY</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-midnight">¥</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
