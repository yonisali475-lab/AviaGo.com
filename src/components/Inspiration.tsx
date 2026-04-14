import { ChevronRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    city: 'Nice, France',
    label: 'Nice - Le luxe de la Riviera',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200',
    description: 'Explore the azure coast and the iconic Promenade des Anglais.'
  },
  {
    id: 2,
    city: 'Kyoto, Japan',
    label: 'Kyoto - L\'âme du Japon',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
    description: 'Discover the spiritual heart of Japan through its ancient temples.'
  }
];

export default function Inspiration() {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-trip-dark tracking-tight">Inspiration</h2>
        <button className="text-trip-blue font-bold text-xs flex items-center gap-1">
          Explore more <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {destinations.map((dest) => (
          <div key={dest.id} className="group cursor-pointer">
            <div className="relative h-64 rounded-2xl overflow-hidden mb-3 trip-shadow">
              <img 
                src={dest.image} 
                alt={dest.city} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-trip-blue text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                  {dest.city}
                </span>
                <h3 className="text-white text-2xl font-black tracking-tight drop-shadow-md">{dest.label}</h3>
              </div>
            </div>
            <p className="text-trip-gray text-xs font-medium px-1">{dest.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
