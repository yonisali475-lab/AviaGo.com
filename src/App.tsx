import { useState } from 'react';
import Header from './components/Header';
import SearchEngine from './components/SearchEngine';
import SearchResults from './components/SearchResults';
import DestinationsGrid from './components/DestinationsGrid';
import FlightDeals from './components/FlightDeals';
import HotelDeals from './components/HotelDeals';
import TrainDeals from './components/TrainDeals';
import CarDeals from './components/CarDeals';
import Promotions from './components/Promotions';
import TrustSection from './components/TrustSection';
import SocialMoments from './components/SocialMoments';
import { Search, Heart, Compass, User } from 'lucide-react';

export default function App() {
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setShowResults(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-trip-dark selection:bg-trip-blue/20">
      {/* Mobile System Bar */}
      <div className="h-8 bg-white flex items-center justify-between px-6 md:hidden">
        <span className="text-xs font-bold">9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-2.5 border border-black rounded-[2px]" />
          <div className="w-3 h-3 bg-black rounded-full" />
        </div>
      </div>

      <Header onLogoClick={handleGoHome} />

      <main>
        {showResults ? (
          <SearchResults />
        ) : (
          <>
            <SearchEngine onSearch={handleSearch} />
            
            <Promotions />

            <DestinationsGrid />

            <FlightDeals />

            <HotelDeals />

            <TrainDeals />

            <CarDeals />

            <TrustSection />

            <SocialMoments />

            {/* Partner Logos */}
            <section className="py-16 border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-4">
                <p className="text-center text-[10px] font-black text-trip-gray uppercase tracking-[0.3em] mb-10">Partenaires de confiance</p>
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png" alt="Emirates" className="h-8 w-auto" />
                  <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/d/d3/Logo_SNCF_Connect.svg/1200px-Logo_SNCF_Connect.svg.png" alt="SNCF" className="h-8 w-auto" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hertz_logo.svg/1200px-Hertz_logo.svg.png" alt="Hertz" className="h-8 w-auto" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Air_France_Logo.svg/1200px-Air_France_Logo.svg.png" alt="Air France" className="h-10 w-auto" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Booking.com_logo.svg/1200px-Booking.com_logo.svg.png" alt="Booking.com" className="h-6 w-auto" />
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 pt-20 pb-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div>
              <h4 className="text-xs font-black text-trip-dark uppercase tracking-widest mb-6">À propos</h4>
              <ul className="space-y-4 text-sm font-medium text-trip-gray">
                <li className="hover:text-trip-blue cursor-pointer">Qui sommes-nous ?</li>
                <li className="hover:text-trip-blue cursor-pointer">Carrières</li>
                <li className="hover:text-trip-blue cursor-pointer">Presse</li>
                <li className="hover:text-trip-blue cursor-pointer">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-trip-dark uppercase tracking-widest mb-6">Service Client</h4>
              <ul className="space-y-4 text-sm font-medium text-trip-gray">
                <li className="hover:text-trip-blue cursor-pointer">Centre d'aide</li>
                <li className="hover:text-trip-blue cursor-pointer">Garantie de prix</li>
                <li className="hover:text-trip-blue cursor-pointer">Nous contacter</li>
                <li className="hover:text-trip-blue cursor-pointer">Remboursements</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-trip-dark uppercase tracking-widest mb-6">Légal</h4>
              <ul className="space-y-4 text-sm font-medium text-trip-gray">
                <li className="hover:text-trip-blue cursor-pointer">Confidentialité</li>
                <li className="hover:text-trip-blue cursor-pointer">Conditions d'utilisation</li>
                <li className="hover:text-trip-blue cursor-pointer">Cookies</li>
                <li className="hover:text-trip-blue cursor-pointer">Mentions légales</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-trip-dark uppercase tracking-widest mb-6">Suivez-nous</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-trip-blue hover:text-white transition-all cursor-pointer">
                  <span className="font-bold">fb</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-trip-blue hover:text-white transition-all cursor-pointer">
                  <span className="font-bold">ig</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-trip-blue hover:text-white transition-all cursor-pointer">
                  <span className="font-bold">tw</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-gray-200 gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-trip-blue rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-trip-blue">AviaGo</span>
            </div>
            <p className="text-xs font-bold text-trip-gray">© 2026 AviaGo. Tous droits réservés. Propulsé par l'excellence.</p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 flex items-center justify-between md:hidden z-50">
        <button className="flex flex-col items-center gap-1 text-trip-blue">
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest">Explorer</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-trip-gray">
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest">Favoris</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-trip-gray">
          <Compass className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest">Moments</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-trip-gray">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest">Profil</span>
        </button>
      </nav>
    </div>
  );
}
