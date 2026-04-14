import { Globe, User, Menu, ChevronDown } from 'lucide-react';

export default function Header({ onLogoClick }: { onLogoClick?: () => void }) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Left: Logo */}
        <div 
          onClick={onLogoClick}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-trip-blue rounded-xl flex items-center justify-center shadow-2xl shadow-trip-blue/40 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-2xl">A</span>
          </div>
          <span className="text-3xl font-black tracking-tighter text-white">AviaGo</span>
        </div>

        {/* Right: Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Destinations', 'Offres', 'Aide'].map((item) => (
            <button 
              key={item} 
              className="text-xs font-black text-white uppercase tracking-[0.2em] hover:text-trip-blue transition-colors"
            >
              {item}
            </button>
          ))}
          <button className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <User className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
