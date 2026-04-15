import { useState, useRef, useEffect } from 'react';
import { Globe, User, Menu, ChevronDown, X, Settings, HelpCircle, Calendar, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header({ onLogoClick }: { onLogoClick?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAction = () => {
    setShowNotification(true);
    setIsMenuOpen(false);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Fermer le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const menuItems = [
    { label: 'Mon Profil', icon: UserCircle },
    { label: 'Mes Réservations', icon: Calendar },
    { label: 'Support', icon: HelpCircle },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-trip-primary/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Gauche : Logo */}
        <div 
          onClick={() => {
            if (onLogoClick) onLogoClick();
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-trip-primary rounded-xl flex items-center justify-center shadow-lg shadow-trip-primary/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-2xl">A</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-trip-primary uppercase">AviaGo</span>
        </div>

        {/* Droite : Liens Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {['Destinations', 'Offres', 'Aide'].map((item) => (
            <button 
              key={item} 
              onClick={handleAction}
              className="text-xs font-black text-trip-dark uppercase tracking-[0.2em] hover:text-trip-primary transition-all"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={handleAction}
            className="w-10 h-10 rounded-xl bg-trip-primary/5 border border-trip-primary/10 flex items-center justify-center text-trip-primary hover:bg-trip-primary hover:text-white transition-all"
          >
            <User className="w-5 h-5" />
          </button>
        </div>

        {/* Toggle Menu Mobile */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 bg-trip-primary/5 border border-trip-primary/10 rounded-xl text-trip-primary hover:bg-trip-primary/10 transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile (Drawer) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay sombre */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Contenu du Menu */}
            <motion.div 
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-xs bg-white/95 backdrop-blur-xl z-[70] shadow-2xl border-l border-white/20 md:hidden p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-black text-trip-primary tracking-tighter uppercase">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-trip-primary/5 rounded-lg">
                  <X className="w-5 h-5 text-trip-primary" />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={handleAction}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-trip-primary/5 hover:bg-trip-primary/10 text-trip-dark transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-trip-primary" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-trip-primary/10">
                <button 
                  onClick={handleAction}
                  className="w-full py-4 bg-trip-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-trip-primary/20"
                >
                  Se Déconnecter
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notification "Bientôt disponible" */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-trip-dark text-white px-6 py-3 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 border border-white/10"
          >
            <div className="w-2 h-2 bg-trip-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Section bientôt disponible</span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
