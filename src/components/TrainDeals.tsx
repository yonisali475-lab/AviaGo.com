import { motion } from 'motion/react';
import { TrainFront, Clock, ArrowRight, MapPin } from 'lucide-react';

const trains = [
  {
    from: 'Paris Gare de Lyon',
    to: 'Lyon Part-Dieu',
    departure: '08:30',
    arrival: '10:27',
    duration: '1h 57m',
    price: '45€',
    type: 'TGV INOUI'
  },
  {
    from: 'Marseille St-Charles',
    to: 'Nice Ville',
    departure: '14:15',
    arrival: '16:55',
    duration: '2h 40m',
    price: '28€',
    type: 'TER'
  },
  {
    from: 'Bordeaux St-Jean',
    to: 'Paris Montparnasse',
    departure: '10:04',
    arrival: '12:08',
    duration: '2h 04m',
    price: '52€',
    type: 'OUIGO'
  }
];

export default function TrainDeals() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrainFront className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Trains & Rail</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-trip-dark tracking-tighter">Réservez votre trajet</h2>
          </div>
          <button className="text-trip-blue font-bold text-sm hover:underline">Voir tous les trajets</button>
        </div>

        <div className="space-y-4">
          {trains.map((train, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-8 flex-1 w-full md:w-auto">
                <div className="text-center">
                  <p className="text-3xl font-black text-trip-dark tracking-tighter">{train.departure}</p>
                  <p className="text-[10px] font-bold text-trip-gray uppercase tracking-widest mt-1">{train.from}</p>
                </div>
                
                <div className="flex-1 flex flex-col items-center px-4">
                  <div className="w-full h-px bg-gray-200 relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold text-trip-gray mt-3 uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {train.duration}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-3xl font-black text-trip-dark tracking-tighter">{train.arrival}</p>
                  <p className="text-[10px] font-bold text-trip-gray uppercase tracking-widest mt-1">{train.to}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                <div className="text-right flex-1 md:flex-none">
                  <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{train.type}</p>
                  <p className="text-3xl font-black text-trip-blue">{train.price}</p>
                </div>
                <a 
                  href="https://www.trip.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-trip-blue text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-trip-blue/20 whitespace-nowrap"
                >
                  Réserver le train
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
