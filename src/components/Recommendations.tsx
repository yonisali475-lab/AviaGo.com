import { useState } from 'react';
import { Star, ChevronRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Grand Hyatt Luxury Resort',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    rating: '4.8/5 Excellent',
    reviews: '1,240 reviews',
    oldPrice: 120,
    price: 85,
    badges: ['Free Cancellation', 'Breakfast Included'],
    category: 'Luxury'
  },
  {
    id: 2,
    name: 'Seaside Boutique Hotel',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    rating: '4.7/5 Great',
    reviews: '856 reviews',
    oldPrice: 150,
    price: 99,
    badges: ['No Prepayment', 'Free Cancellation'],
    category: 'Popular'
  },
  {
    id: 3,
    name: 'City Center Modern Suites',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    rating: '4.9/5 Exceptional',
    reviews: '2,105 reviews',
    oldPrice: 200,
    price: 145,
    badges: ['Breakfast Included', 'Free WiFi'],
    category: 'Luxury'
  }
];

export default function Recommendations() {
  const [activeTab, setActiveTab] = useState('Popular');

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-trip-dark tracking-tight">Our Recommendations</h2>
        <button className="text-trip-blue font-bold text-xs flex items-center gap-1">
          View all <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 overflow-x-auto no-scrollbar">
        {['Nearby', 'Popular', 'Luxury'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-trip-blue text-white shadow-lg shadow-trip-blue/20' 
                : 'bg-white text-trip-gray border border-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden trip-shadow flex group cursor-pointer border border-transparent hover:border-trip-blue/20 transition-all">
            <div className="w-32 h-40 flex-shrink-0 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-sm font-black text-trip-dark mb-1 leading-tight group-hover:text-trip-blue transition-colors">{product.name}</h3>
              
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center gap-0.5 text-orange-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[11px] font-black">{product.rating}</span>
                </div>
                <span className="text-[10px] text-trip-gray font-medium">({product.reviews})</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {product.badges.map((badge, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-green-50 text-green-600 text-[9px] font-bold rounded">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-trip-gray line-through font-bold">{product.oldPrice}€</span>
                  <span className="text-lg font-black text-trip-dark tracking-tighter leading-none">
                    <span className="text-xs mr-0.5">€</span>{product.price}
                  </span>
                </div>
                <button className="bg-trip-blue text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
