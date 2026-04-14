import { motion } from 'motion/react';
import { Star, MapPin, Heart, ArrowRight, Zap } from 'lucide-react';

const hotels = [
  {
    name: 'Hôtel Ritz Paris',
    location: 'Place Vendôme, Paris',
    image: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 1240,
    price: '850€',
    tag: 'Meilleure offre 🔥',
    urgency: 'Plus que 2 chambres'
  },
  {
    name: 'Park Hyatt Tokyo',
    location: 'Shinjuku, Tokyo',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 890,
    price: '620€',
    tag: 'Best deal 🔥',
    urgency: 'Offre limitée'
  },
  {
    name: 'Marina Bay Sands',
    location: 'Bayfront, Singapour',
    image: 'https://images.unsplash.com/photo-1525625239445-a2ce8b769c79?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 3500,
    price: '450€',
    tag: 'Populaire',
    urgency: 'Dernière chance'
  }
];

export default function HotelDeals() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-trip-dark tracking-tighter mb-2">Hôtels d'Exception</h2>
          <p className="text-trip-gray font-medium">Séjournez dans les plus beaux endroits du monde</p>
        </div>
        <button className="flex items-center gap-2 text-trip-blue font-bold text-sm hover:gap-3 transition-all">
          Voir tout <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white rounded-[40px] overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-4 py-1.5 bg-trip-blue text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {hotel.tag}
                </span>
                <span className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" />
                  {hotel.urgency}
                </span>
              </div>
              <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-xs font-bold text-trip-dark">{hotel.rating}</span>
                <span className="text-xs text-trip-gray">({hotel.reviews} avis)</span>
              </div>

              <h3 className="text-2xl font-black text-trip-dark tracking-tighter mb-2 group-hover:text-trip-blue transition-colors">{hotel.name}</h3>
              
              <div className="flex items-center gap-1 text-trip-gray mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-medium">{hotel.location}</span>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div>
                  <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">Par nuit</p>
                  <p className="text-2xl font-black text-trip-blue">{hotel.price}</p>
                </div>
                <a 
                  href="https://www.booking.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-trip-blue text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-trip-blue/20"
                >
                  Réserver
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
