import { Globe, User, Menu, ChevronDown } from 'lucide-react';

export default function Header({ onLogoClick }: { onLogoClick?: () => void }) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-trip-primary/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div 
          onClick={onLogoClick}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-trip-primary rounded-xl flex items-center justify-center shadow-lg shadow-trip-primary/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-2xl">A</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-trip-primary uppercase">AviaGo</span>
        </div>

        {/* Right: Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Destinations', 'Offres', 'Aide'].map((item) => (
            <button 
              key={item} 
              className="text-xs font-black text-trip-dark uppercase tracking-[0.2em] hover:text-trip-primary transition-all"
            >
              {item}
            </button>
          ))}
          <button className="w-10 h-10 rounded-xl bg-trip-primary/5 border border-trip-primary/10 flex items-center justify-center text-trip-primary hover:bg-trip-primary hover:text-white transition-all">
            <User className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 bg-trip-primary/5 border border-trip-primary/10 rounded-xl text-trip-primary">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
