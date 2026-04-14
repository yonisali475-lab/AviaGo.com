import { Heart, MessageCircle } from 'lucide-react';

const moments = [
  {
    id: 1,
    user: 'Sarah_J',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=600',
    likes: '1.2k'
  },
  {
    id: 2,
    user: 'Marc_Travel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=600',
    likes: '856'
  },
  {
    id: 3,
    user: 'Elena_W',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600',
    likes: '2.4k'
  }
];

export default function SocialMoments() {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-trip-dark tracking-tight">Instants Partagés AviaGo</h2>
        <button className="text-trip-blue font-bold text-xs">See all</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 snap-x">
        {moments.map((moment) => (
          <div key={moment.id} className="flex-shrink-0 w-48 snap-start group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 trip-shadow">
              <img 
                src={moment.image} 
                alt="Travel Moment" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* User Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-white overflow-hidden">
                    <img src={moment.avatar} alt={moment.user} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-white text-[10px] font-bold">{moment.user}</span>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  <span className="text-[10px] font-bold">{moment.likes}</span>
                </div>
              </div>
            </div>
            
            {/* Profile Bubble (Static) */}
            <div className="flex items-center gap-2 px-1">
              <div className="w-8 h-8 rounded-full border-2 border-trip-blue p-0.5">
                <img src={moment.avatar} alt={moment.user} className="w-full h-full rounded-full object-cover" />
              </div>
              <span className="text-[11px] font-bold text-trip-dark">{moment.user}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
