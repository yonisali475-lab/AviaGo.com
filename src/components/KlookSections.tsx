import { motion } from 'motion/react';
import { Star, ArrowRight, Clock, MapPin } from 'lucide-react';

const weeklyDeals = [
  {
    id: 1,
    title: 'Santorin : Croisière au coucher du soleil',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
    price: 85,
    oldPrice: 105,
    discount: '-20%',
    location: 'Grèce'
  },
  {
    id: 2,
    title: 'Tokyo : Billet combiné TeamLab & Sky',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
    price: 42,
    oldPrice: 52,
    discount: '-20%',
    location: 'Japon'
  },
  {
    id: 3,
    title: 'Dubaï : Safari dans le désert & Dîner',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    price: 65,
    oldPrice: 82,
    discount: '-20%',
    location: 'Émirats Arabes Unis'
  },
  {
    id: 4,
    title: 'New York : Pass 3 Attractions',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
    price: 95,
    oldPrice: 118,
    discount: '-20%',
    location: 'USA'
  }
];

const topActivities = [
  {
    id: 1,
    title: 'Visite guidée du Louvre',
    image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: '12,450',
    price: 45,
    location: 'Paris, France'
  },
  {
    id: 2,
    title: 'Excursion au Mont Fuji',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: '8,920',
    price: 89,
    location: 'Tokyo, Japon'
  },
  {
    id: 3,
    title: 'Billet Burj Khalifa (124e étage)',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: '25,100',
    price: 42,
    location: 'Dubaï, EAU'
  }
];

export default function KlookSections() {
  return (
    <div className="bg-white space-y-24 py-24 px-6">
      {/* ÉTAPE 2 : Offres de la semaine */}
      <section className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-trip-dark tracking-tighter uppercase mb-2">Offres de la semaine</h2>
            <p className="text-trip-gray font-bold text-xs uppercase tracking-widest">Économisez jusqu'à 20% sur vos réservations</p>
          </div>
          <button className="flex items-center gap-2 text-trip-primary font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
            Voir tout <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weeklyDeals.map((deal) => (
            <motion.div 
              key={deal.id}
              whileHover={{ y: -8 }}
              className="card-white overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 fade-in-image"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-3 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                  {deal.discount}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-3 h-3 text-trip-primary" />
                  <span className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{deal.location}</span>
                </div>
                <h3 className="text-sm font-black text-trip-dark tracking-tight mb-4 line-clamp-2 group-hover:text-trip-primary transition-colors">
                  {deal.title}
                </h3>
                <div className="flex items-end gap-2">
                  <span className="text-lg font-black text-trip-primary">{deal.price} €</span>
                  <span className="text-xs text-trip-gray line-through mb-0.5">{deal.oldPrice} €</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ÉTAPE 3 : Top Activités */}
      <section className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-trip-dark tracking-tighter uppercase mb-2">Top Activités</h2>
            <p className="text-trip-gray font-bold text-xs uppercase tracking-widest">Les expériences les plus populaires recommandées par nos clients</p>
          </div>
          <button className="flex items-center gap-2 text-trip-primary font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
            Voir tout <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topActivities.map((activity) => (
            <motion.div 
              key={activity.id}
              whileHover={{ x: 5 }}
              className="flex gap-6 items-center group cursor-pointer"
            >
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-md">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 fade-in-image"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-black text-trip-dark">{activity.rating}</span>
                  </div>
                  <span className="text-[10px] font-bold text-trip-gray">({activity.reviews} avis)</span>
                </div>
                <h3 className="text-base font-black text-trip-dark tracking-tight mb-2 group-hover:text-trip-primary transition-colors">
                  {activity.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-trip-primary">Dès {activity.price} €</span>
                  <div className="flex items-center gap-1 text-trip-gray">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Instantané</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
