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
      title: 'Tokyo, Japon',
      desc: 'Vols directs vers la capitale impériale. Vivez le mélange parfait entre tradition et futurisme.',
      price: 850,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
      badge: 'Meilleur Prix',
      tag: 'Exploration Mondiale'
    },
    {
      id: 2,
      title: 'New York, USA',
      desc: 'La ville qui ne dort jamais. Profitez de nos tarifs exclusifs pour la Grosse Pomme.',
      price: 520,
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
      badge: 'Promotion -20%',
      tag: 'Tendance'
    },
    {
      id: 3,
      title: 'Bali, Indonésie',
      desc: 'Évadez-vous dans les rizières et les plages paradisiaques de l\'île des Dieux.',
      price: 740,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
      tag: 'Détente'
    }
  ],
  hotels: [
    {
      id: 1,
      title: 'Burj Al Arab Jumeirah',
      desc: 'L\'icône de Dubaï. Un service inégalé dans l\'hôtel le plus luxueux du monde.',
      price: 1450,
      rating: 5,
      reviews: 4.9,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
      badge: 'Palace'
    },
    {
      id: 2,
      title: 'Ritz Paris',
      desc: 'L\'élégance française absolue sur la mythique Place Vendôme.',
      price: 1100,
      rating: 5,
      reviews: 4.8,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
      badge: 'Historique'
    },
    {
      id: 3,
      title: 'Aman Tokyo',
      desc: 'Un sanctuaire de sérénité suspendu au-dessus de la métropole nippone.',
      price: 980,
      rating: 5,
      reviews: 4.9,
      image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=800',
      badge: 'Zen'
    }
  ],
  trains: [
    {
      id: 1,
      title: 'Shinkansen Nozomi',
      desc: 'Vitesse et ponctualité japonaises entre Tokyo et Kyoto.',
      price: 115,
      image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&q=80&w=800',
      badge: 'Premium'
    },
    {
      id: 2,
      title: 'Eurostar Business Premier',
      desc: 'Reliez Paris à Londres en moins de 2h30 avec un service gastronomique.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1474487056217-76fe757f81ec?auto=format&fit=crop&q=80&w=800',
      badge: 'Luxe'
    }
  ],
  cars: [
    {
      id: 1,
      title: 'Porsche 911 Carrera',
      desc: 'La performance pure pour vos virées sur la Côte d\'Azur.',
      price: 350,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      badge: 'Sport'
    },
    {
      id: 2,
      title: 'Range Rover Autobiography',
      desc: 'Le confort souverain pour explorer les paysages d\'Islande.',
      price: 220,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      badge: 'SUV Luxe'
    }
  ],
  attractions: [
    {
      id: 1,
      title: 'Toits de New York',
      desc: 'Coucher de soleil spectaculaire depuis le sommet du Top of the Rock.',
      price: 45,
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
      badge: 'Expérience'
    },
    {
      id: 2,
      title: 'Lagons de Bali',
      desc: 'Plongée privée dans les eaux cristallines d\'Uluwatu.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1544551763-47a0159f963f?auto=format&fit=crop&q=80&w=800',
      badge: 'Incontournable'
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
    <section className="py-24 px-6 bg-white relative">
      {/* Global Navigation Loader */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-trip-blue border-t-transparent rounded-full mb-6"
            />
            <p className="text-trip-blue font-black uppercase tracking-[0.3em] animate-pulse">Préparation de votre voyage...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-trip-dark tracking-tighter mb-4">Découvrez nos meilleures offres</h2>
          <p className="text-trip-gray font-medium">Des prix exclusifs négociés pour vous</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === cat.id 
                  ? 'bg-trip-blue text-white shadow-xl shadow-trip-blue/20' 
                  : 'bg-gray-50 text-trip-gray hover:bg-gray-100'
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
      className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-gray-100 group cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={deal.image} 
          alt={deal.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        {deal.badge && (
          <div className="absolute top-4 left-4 px-4 py-2 bg-trip-blue text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
            {deal.badge}
          </div>
        )}
        <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
          <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-0.5">À partir de</p>
          <p className="text-xl font-black text-trip-blue tracking-tighter">{deal.price} €</p>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center gap-2 mb-3">
          {category === 'hotels' && (
            <div className="flex gap-0.5">
              {[...Array(deal.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-trip-blue text-trip-blue" />
              ))}
            </div>
          )}
          {deal.tag && (
            <span className="text-[10px] font-black text-trip-blue uppercase tracking-widest">{deal.tag}</span>
          )}
        </div>
        
        <h3 className="text-xl font-black text-trip-dark tracking-tighter mb-3 group-hover:text-trip-blue transition-colors">
          {deal.title}
        </h3>
        <p className="text-sm text-trip-gray font-medium mb-6 line-clamp-2">
          {deal.desc}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <div className="flex items-center gap-2 text-trip-gray">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-bold">Voir détails</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-trip-blue/10 flex items-center justify-center group-hover:bg-trip-blue group-hover:text-white transition-all">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
