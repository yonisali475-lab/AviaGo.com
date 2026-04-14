import { Heart, Star, ChevronRight } from 'lucide-react';

const places = [
  {
    id: 1,
    name: 'Seine River Cruise',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: '1,582',
    tag: 'Trip.Best'
  },
  {
    id: 2,
    name: 'Sagrada Familia',
    image: 'https://images.unsplash.com/photo-1583839832210-5244b3397856?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: '2,431',
    tag: 'Trip.Best'
  },
  {
    id: 3,
    name: 'Badaling Great Wall',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: '1,205',
    tag: 'Trip.Best'
  }
];

export default function PlacesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-trip-dark">Places you may like</h2>
          <button className="text-trip-blue font-bold text-sm flex items-center gap-1 hover:underline">
            More <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map((place) => (
            <div key={place.id} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-trip-blue text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm">
                  {place.tag}
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="font-extrabold text-trip-dark mb-1 group-hover:text-trip-blue transition-colors">
                {place.name}
              </h3>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-orange-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[13px] font-bold">{place.rating}/5</span>
                </div>
                <span className="text-trip-gray text-[13px] font-medium">({place.reviews} reviews)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
