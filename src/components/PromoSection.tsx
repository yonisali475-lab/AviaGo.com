import { Gift, Hotel, TrainFront, ChevronRight } from 'lucide-react';

export default function PromoSection() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Gift className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-xl font-extrabold text-trip-dark">New user exclusive</h2>
          </div>
          <button className="text-trip-blue font-bold text-sm flex items-center gap-1 hover:underline">
            Claim all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {/* Card A */}
          <div className="flex-shrink-0 w-[280px] bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-2xl border border-orange-200/50 relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-orange-900 font-extrabold text-lg mb-2 leading-tight">
                New users get more discounts on travel!
              </h3>
              <p className="text-orange-700 text-xs font-medium">
                Exclusive rewards for your first booking
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Gift className="w-24 h-24 text-orange-900" />
            </div>
          </div>

          {/* Card B */}
          <div className="flex-shrink-0 w-[240px] bg-white border border-trip-border p-5 rounded-2xl trip-shadow flex items-center gap-4 group cursor-pointer hover:border-trip-blue transition-colors">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-trip-blue transition-colors">
              <Hotel className="w-6 h-6 text-trip-blue group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-trip-blue font-black text-2xl leading-none mb-1">10% off</div>
              <div className="text-trip-gray text-xs font-bold uppercase tracking-wider">Hotels & Homes</div>
            </div>
          </div>

          {/* Card C */}
          <div className="flex-shrink-0 w-[240px] bg-white border border-trip-border p-5 rounded-2xl trip-shadow flex items-center gap-4 group cursor-pointer hover:border-trip-blue transition-colors">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-trip-blue transition-colors">
              <TrainFront className="w-6 h-6 text-trip-blue group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-trip-blue font-black text-2xl leading-none mb-1">5% off</div>
              <div className="text-trip-gray text-xs font-bold uppercase tracking-wider">EU trains</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
