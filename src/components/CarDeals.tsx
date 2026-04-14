import { motion } from 'motion/react';
import { Car, Star, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const cars = [
  {
    name: 'Tesla Model 3',
    type: 'Électrique • Premium',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    price: '85€',
    features: ['Autopilot', 'Supercharge', 'Cuir']
  },
  {
    name: 'BMW Série 3',
    type: 'Berline • Luxe',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    price: '72€',
    features: ['Automatique', 'GPS Pro', 'Sièges chauffants']
  },
  {
    name: 'Peugeot 3008',
    type: 'SUV • Confort',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    price: '55€',
    features: ['5 places', 'Grand coffre', 'Diesel']
  }
];

export default function CarDeals() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-5 h-5 text-cyan-500" />
              <span className="text-xs font-black text-cyan-500 uppercase tracking-widest">Location de Voitures</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-trip-dark tracking-tighter">Roulez en toute liberté</h2>
          </div>
          <button className="text-trip-blue font-bold text-sm hover:underline">Voir tous les véhicules</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-bold text-trip-dark">{car.rating}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">{car.type}</p>
                  <h3 className="text-2xl font-black text-trip-dark tracking-tighter">{car.name}</h3>
                </div>

                <div className="space-y-3 mb-8">
                  {car.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2 text-trip-gray">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">Par jour</p>
                    <p className="text-2xl font-black text-trip-blue">{car.price}</p>
                  </div>
                  <a 
                    href="https://www.trip.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-trip-blue text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-trip-blue/20"
                  >
                    Louer maintenant
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
