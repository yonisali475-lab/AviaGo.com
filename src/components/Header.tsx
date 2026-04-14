import { Globe, User, Menu, ChevronDown } from 'lucide-react';

export default function Header({ onLogoClick }: { onLogoClick?: () => void }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors md:hidden">
            <Menu className="w-6 h-6 text-trip-dark" />
          </button>
          <div 
            onClick={onLogoClick}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-trip-blue rounded-lg flex items-center justify-center shadow-lg shadow-trip-blue/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-trip-blue hidden sm:block">AviaGo</span>
          </div>
        </div>

        {/* Right: Language, Currency, Profile */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-bold text-trip-gray">
            <button className="hover:text-trip-blue transition-colors">Mes Réservations</button>
            <button className="hover:text-trip-blue transition-colors">Aide</button>
          </div>
          
          <div className="h-6 w-px bg-gray-200 hidden md:block" />

          <button className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-gray-50 rounded-lg transition-colors">
            <Globe className="w-4 h-4 text-trip-gray" />
            <span className="text-xs font-bold text-trip-dark">FR | EUR</span>
            <ChevronDown className="w-3 h-3 text-trip-gray" />
          </button>

          <button className="flex items-center gap-2 pl-2 pr-1 py-1 bg-trip-blue/5 border border-trip-blue/10 rounded-full hover:bg-trip-blue/10 transition-all group">
            <span className="text-xs font-bold text-trip-blue ml-1 hidden sm:block">Se connecter</span>
            <div className="w-8 h-8 bg-trip-blue rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
