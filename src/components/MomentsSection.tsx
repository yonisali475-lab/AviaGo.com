const moments = [
  { id: 1, image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=600', user: '@traveler_joy' },
  { id: 2, image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=600', user: '@wanderlust' },
  { id: 3, image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600', user: '@italy_lover' },
  { id: 4, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600', user: '@beach_bum' },
  { id: 5, image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600', user: '@mountain_high' },
];

export default function MomentsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-2xl font-extrabold text-trip-dark mb-8">Magical trip moments that last</h2>
        
        <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar -mx-4 px-4 snap-x">
          {moments.map((moment) => (
            <div 
              key={moment.id} 
              className="flex-shrink-0 w-48 aspect-[3/4] rounded-2xl overflow-hidden relative group cursor-pointer snap-start"
            >
              <img 
                src={moment.image} 
                alt="Moment" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {moment.user}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
