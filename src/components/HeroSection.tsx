import { useState } from 'react';
import { Hotel, Plane, TrainFront, Car, Ticket, Package, Search, ShieldCheck, Clock, MapPin, Calendar, Users } from 'lucide-react';

const tabs = [
  { id: 'hotels', label: 'Hotels & Homes', icon: Hotel },
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'trains', label: 'Trains', icon: TrainFront },
  { id: 'cars', label: 'Cars', icon: Car },
  { id: 'attractions', label: 'Attractions & Tours', icon: Ticket },
  { id: 'bundle', label: 'Flight + Hotel', icon: Package },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('hotels');

  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Background with Gradient and Mountains */}
      <div className="absolute inset-0 z-0 trip-gradient">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-bottom opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4">
        {/* Hero Text */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-sm">
            Your Trip Starts Here
          </h1>
          <div className="flex flex-wrap gap-6 text-white/90 text-sm font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Support in approx. 30s</span>
            </div>
          </div>
        </div>

        {/* Search Widget */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex overflow-x-auto no-scrollbar border-b border-gray-100 bg-gray-50/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-all relative ${
                  activeTab === tab.id ? 'text-trip-blue font-bold' : 'text-trip-gray hover:text-trip-dark'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-trip-blue' : 'text-trip-gray'}`} />
                <span className="text-[15px]">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-trip-blue" />
                )}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Destination */}
              <div className="md:col-span-4 group">
                <label className="block text-[13px] font-bold text-trip-gray mb-1.5 ml-1">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-trip-gray group-focus-within:text-trip-blue transition-colors" />
                  <input 
                    type="text" 
                    placeholder="City, airport, region, landmark or hotel name" 
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-trip-blue/20 focus:border-trip-blue outline-none transition-all text-[15px] font-medium"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="md:col-span-4 grid grid-cols-2 gap-2">
                <div className="group">
                  <label className="block text-[13px] font-bold text-trip-gray mb-1.5 ml-1">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-trip-gray group-focus-within:text-trip-blue transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Mon, Oct 16" 
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-trip-blue/20 focus:border-trip-blue outline-none transition-all text-[15px] font-medium"
                    />
                  </div>
                </div>
                <div className="group relative">
                  <label className="block text-[13px] font-bold text-trip-gray mb-1.5 ml-1">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-trip-gray group-focus-within:text-trip-blue transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Tue, Oct 17" 
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-trip-blue/20 focus:border-trip-blue outline-none transition-all text-[15px] font-medium"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-gray-100 px-2 py-0.5 rounded-full text-[10px] font-bold text-trip-blue shadow-sm z-10">
                    1 night
                  </div>
                </div>
              </div>

              {/* Rooms and Guests */}
              <div className="md:col-span-3 group">
                <label className="block text-[13px] font-bold text-trip-gray mb-1.5 ml-1">Rooms and guests</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-trip-gray group-focus-within:text-trip-blue transition-colors" />
                  <input 
                    type="text" 
                    placeholder="1 room, 2 adults" 
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-trip-blue/20 focus:border-trip-blue outline-none transition-all text-[15px] font-medium"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-1 flex items-end">
                <button className="w-full h-[54px] bg-trip-blue text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center group">
                  <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
