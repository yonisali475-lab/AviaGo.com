import { Globe } from 'lucide-react';

const destinations = [
  { id: 1, name: 'Hargeisa', image: 'https://images.unsplash.com/photo-1594913785162-e6785b493bd2?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Johannesburg', image: 'https://images.unsplash.com/photo-1545153997-446707328207?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Siem Reap', image: 'https://images.unsplash.com/photo-1500049242364-5f500807cdd7?auto=format&fit=crop&q=80&w=600' },
];

export default function InspirationGrid() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-2xl font-extrabold text-trip-dark mb-8">Get Inspired for your next trip</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
          {/* Large Card */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
              alt="Anywhere" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <Globe className="w-16 h-16 mb-4 opacity-80 group-hover:scale-110 transition-transform" />
              <span className="text-3xl font-black tracking-tight">Anywhere</span>
            </div>
          </div>

          {/* Small Cards Grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {destinations.map((dest, i) => (
              <div 
                key={dest.id} 
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? 'col-span-2' : ''}`}
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-lg font-extrabold">{dest.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
