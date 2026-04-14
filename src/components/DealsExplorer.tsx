import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Hotel, TrainFront, Car, Ticket, Star, MapPin, Clock, ArrowRight, BadgePercent } from 'lucide-react';

const categories = [
  { id: 'flights', label: 'Vols', icon: Plane },
  { id: 'hotels', label: 'Hôtels', icon: Hotel },
  { id: 'trains', label: 'Trains & Bus', icon: TrainFront },
  { id: 'cars', label: 'Voitures', icon: Car },
  { id: 'attractions', label: 'Attractions', icon: Ticket },
];
const deals = {
  flights: [
    {
      id: 1,
      title: 'Santorin, Grèce',
      desc: 'Les dômes bleus et les couchers de soleil légendaires. Une escapade méditerranéenne inoubliable.',
      price: 420,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
      badge: 'Tendance',
      tag: 'Méditerranée'
    },
    {
      id: 2,
      title: 'Tokyo, Japon',
      desc: 'Le mélange parfait de tradition millénaire et de technologie futuriste.',
      price: 890,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
      badge: 'Business Class',
      tag: 'Asie'
    },
    {
      id: 3,
      title: 'New York, USA',
      desc: 'Vivez l\'énergie débordante de Manhattan et les lumières de Times Square.',
      price: 550,
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
      tag: 'Métropole'
    }
  ],
  hotels: [
    {
      id: 1,
      title: 'Burj Al Arab, Dubaï',
      desc: 'L\'icône mondiale du luxe. Un service d\'exception dans un cadre architectural unique.',
      price: 1850,
      rating: 5,
      reviews: 5.0,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
      badge: '7 Étoiles'
    },
    {
      id: 2,
      title: 'Grace Hotel, Santorin',
      desc: 'Une vue imprenable sur la Caldeira pour un séjour romantique et exclusif.',
      price: 950,
      rating: 5,
      reviews: 4.9,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
      badge: 'Vue Mer'
    },
    {
      id: 3,
      title: 'The Ritz-Carlton, Tokyo',
      desc: 'Le luxe absolu au sommet de la ville, avec une vue panoramique sur le Mont Fuji.',
      price: 1100,
      rating: 5,
      reviews: 4.9,
      image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=800',
      badge: 'Premium'
    }
  ],
  trains: [
    {
      id: 1,
      title: 'Orient Express',
      desc: 'Le voyage ferroviaire le plus mythique d\'Europe dans un décor Art Déco.',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1474487056217-76fe757f81ec?auto=format&fit=crop&q=80&w=800',
      badge: 'Légendaire'
    },
    {
      id: 2,
      title: 'Shinkansen Nozomi',
      desc: 'La vitesse et le confort japonais pour relier Tokyo à Kyoto en un clin d\'œil.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&q=80&w=800',
      badge: 'Express'
    }
  ],
  cars: [
    {
      id: 1,
      title: 'Tesla Model S Plaid',
      desc: 'La technologie électrique de pointe pour vos déplacements urbains.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
      badge: 'Électrique'
    },
    {
      id: 2,
      title: 'Range Rover Sport',
      desc: 'Le compagnon idéal pour vos aventures en toute élégance.',
      price: 210,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      badge: 'SUV'
    }
  ],
  attractions: [
    {
      id: 1,
      title: 'Croisière Privée Santorin',
      desc: 'Explorez les criques cachées et profitez d\'un dîner au coucher du soleil.',
      price: 350,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
      badge: 'Exclusif'
    },
    {
      id: 2,
      title: 'Héli-Tour New York',
      desc: 'Une vue à couper le souffle sur la Statue de la Liberté et Central Park.',
      price: 220,
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
      badge: 'Aventure'
    }
  ]
};

export default function DealsExplorer({ onSearch }: { onSearch?: (data: any) => void }) {
  const [activeTab, setActiveTab] = useState('flights');
  const [isNavigating, setIsNavigating] = useState(false);

  const handleDealClick = (deal: any) => {
    setIsNavigating(true);
    
    // Simulate a professional loading state before navigating
    setTimeout(() => {
      if (onSearch) {
        // Map deal to search data
        const searchData = {
          origin: 'PAR', // Default origin for demo
          destination: deal.title.split(',')[0].substring(0, 3).toUpperCase(),
          departDate: '2026-06-15',
          returnDate: '2026-06-30',
          passengers: { total: 1, label: '1 Voyageur, Éco' }
        };
        onSearch(searchData);
      }
      setIsNavigating(false);
    }, 1500);
  };

  return (
    <section className="py-24 px-6 bg-trip-surface relative">
      {/* Global Navigation Loader */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-trip-primary border-t-transparent rounded-full mb-6"
            />
            <p className="text-trip-primary font-black uppercase tracking-[0.3em] animate-pulse">Préparation de votre voyage...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-trip-dark tracking-tighter mb-4 uppercase">Explorez nos offres</h2>
          <p className="text-trip-gray font-black uppercase tracking-[0.3em] text-xs">Des tarifs exclusifs pour vos prochaines destinations</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === cat.id 
                  ? 'bg-trip-primary text-white shadow-xl shadow-trip-primary/20' 
                  : 'bg-white text-trip-gray hover:bg-trip-surface border border-trip-border'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {deals[activeTab as keyof typeof deals].map((deal) => (
                <OfferCard key={deal.id} deal={deal} category={activeTab} onClick={() => handleDealClick(deal)} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

interface OfferCardProps {
  deal: any;
  category: string;
  key?: any;
  onClick?: () => void;
}

function OfferCard({ deal, category, onClick }: OfferCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="card-white overflow-hidden shadow-sm group cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={deal.image} 
          alt={deal.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 fade-in-image"
          referrerPolicy="no-referrer"
          onError={(e) => (e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/723/723955.png')}
        />
        {deal.badge && (
          <div className="absolute top-4 left-4 px-4 py-2 bg-trip-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
            {deal.badge}
          </div>
        )}
        <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-trip-border">
          <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-0.5">À partir de</p>
          <p className="text-xl font-black text-trip-primary tracking-tighter">{deal.price} €</p>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center gap-2 mb-3">
          {category === 'hotels' && (
            <div className="flex gap-0.5">
              {[...Array(deal.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-trip-primary text-trip-primary" />
              ))}
            </div>
          )}
          {deal.tag && (
            <span className="text-[10px] font-black text-trip-primary uppercase tracking-widest">{deal.tag}</span>
          )}
        </div>
        
        <h3 className="text-xl font-black text-trip-dark tracking-tighter mb-3 group-hover:text-trip-primary transition-colors">
          {deal.title}
        </h3>
        <p className="text-sm text-trip-gray font-medium mb-6 line-clamp-2">
          {deal.desc}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-trip-border">
          <div className="flex items-center gap-2 text-trip-gray">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Voir détails</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-trip-primary/10 flex items-center justify-center group-hover:bg-trip-primary group-hover:text-white transition-all">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
