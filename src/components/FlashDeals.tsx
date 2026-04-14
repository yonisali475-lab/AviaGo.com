import { Gift, Briefcase, Map, ChevronRight } from 'lucide-react';

export default function FlashDeals() {
  return (
    <section className="py-6 px-4 bg-white">
      {/* Flash Deals Banner */}
      <div className="relative h-24 rounded-2xl overflow-hidden mb-8 trip-gradient flex items-center justify-between px-6 group cursor-pointer">
        <div className="relative z-10">
          <h2 className="text-white font-black text-xl italic tracking-tight mb-1">AviaGo Flash Deals</h2>
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Limited time offers • Up to 50% off</p>
        </div>
        <button className="relative z-10 bg-white text-trip-blue px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider group-hover:scale-105 transition-transform shadow-lg">
          Check now
        </button>
        {/* Background decorative elements */}
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-4 -top-4 w-24 h-24 bg-trip-cyan/20 rounded-full blur-xl" />
      </div>

      {/* Utility Icons */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Gift, label: 'My Rewards', color: 'bg-orange-50 text-orange-500' },
          { icon: Briefcase, label: 'My Trip', color: 'bg-blue-50 text-trip-blue' },
          { icon: Map, label: 'Guide', color: 'bg-green-50 text-green-500' },
        ].map((item, i) => (
          <button key={i} className="flex flex-col items-center gap-2 group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-active:scale-95 transition-transform ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-trip-dark">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
