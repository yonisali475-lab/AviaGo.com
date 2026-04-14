import { Home, Plane, Hotel, TrainFront, User } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { label: 'Accueil', icon: Home, active: true },
    { label: 'Vols', icon: Plane },
    { label: 'Hôtels', icon: Hotel },
    { label: 'Transports', icon: TrainFront },
    { label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="frosted-glass rounded-full px-8 h-18 flex items-center justify-between luxury-shadow">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-1 transition-all duration-500 group ${
              item.active ? 'text-electric-cyan' : 'text-midnight/30 hover:text-midnight/60'
            }`}
          >
            <item.icon strokeWidth={item.active ? 2 : 1.2} className={`w-6 h-6 transition-transform duration-500 group-hover:scale-110`} />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
