import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ChevronLeft, ChevronRight, Plus, Minus, 
  Users, Briefcase, Heart, Info, Check, Zap,
  Calendar as CalendarIcon, Search, MapPin, Loader2
} from 'lucide-react';
import { searchLocations } from '../services/travelpayoutsService';

interface CalendarSelectorProps {
  onClose: () => void;
  onSelect: (dates: { start: string; end: string }) => void;
}

export function CalendarSelector({ onClose, onSelect }: CalendarSelectorProps) {
  const [selectedStart, setSelectedStart] = useState('2026-05-12');
  const [selectedEnd, setSelectedEnd] = useState('2026-05-19');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['Mai 2026', 'Juin 2026'];

  const prices = {
    12: 150, 13: 185, 14: 160, 15: 145, 16: 190, 17: 155, 18: 165, 19: 140
  };

  const handleDayClick = (day: number) => {
    const dateStr = `2026-05-${day.toString().padStart(2, '0')}`;
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(dateStr);
      setSelectedEnd('');
    } else {
      if (new Date(dateStr) < new Date(selectedStart)) {
        setSelectedStart(dateStr);
        setSelectedEnd('');
      } else {
        setSelectedEnd(dateStr);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute top-full left-0 mt-4 bg-white rounded-[40px] shadow-2xl border border-gray-100 p-8 z-50 w-[700px] max-w-[95vw]"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-trip-dark tracking-tighter">Choisir vos dates</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-trip-gray" />
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        {['Aujourd\'hui', 'Demain', 'Ce week-end', 'Dates flexibles'].map((opt, i) => (
          <button 
            key={i}
            className="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-trip-gray hover:border-trip-blue hover:text-trip-blue transition-all"
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-12">
        {months.map((month, mIdx) => (
          <div key={mIdx}>
            <div className="flex items-center justify-between mb-6">
              <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-sm font-black text-trip-dark uppercase tracking-widest">{month}</span>
              <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map(d => (
                <span key={d} className="text-[10px] font-black text-trip-gray uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map(day => {
                const dateStr = `2026-05-${day.toString().padStart(2, '0')}`;
                const isSelected = selectedStart === dateStr || selectedEnd === dateStr;
                const isInRange = selectedStart && selectedEnd && 
                                 new Date(dateStr) > new Date(selectedStart) && 
                                 new Date(dateStr) < new Date(selectedEnd);
                
                return (
                  <button 
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`relative aspect-square flex flex-col items-center justify-center rounded-xl transition-all ${
                      isSelected ? 'bg-trip-blue text-white shadow-lg shadow-trip-blue/30' : 
                      isInRange ? 'bg-trip-blue/10 text-trip-blue' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xs font-bold">{day}</span>
                    {prices[day as keyof typeof prices] && (
                      <div className="flex flex-col items-center">
                        <span className={`text-[8px] font-medium mt-0.5 ${isSelected ? 'text-white/80' : 'text-emerald-600'}`}>
                          {prices[day as keyof typeof prices]}€
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-trip-blue">
          <Zap className="w-4 h-4 fill-current" />
          <span className="text-xs font-bold">Dates flexibles (+/- 3 jours) activé</span>
        </div>
        <button 
          onClick={() => {
            if (selectedStart && selectedEnd) {
              onSelect({ start: selectedStart, end: selectedEnd });
              onClose();
            }
          }}
          className="px-8 py-3 bg-trip-blue text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-trip-blue/20"
        >
          Confirmer les dates
        </button>
      </div>
    </motion.div>
  );
}

interface PassengerSelectorProps {
  onClose: () => void;
  onSelect: (data: { total: number; label: string; counts: any; cabin: string }) => void;
}

export function PassengerSelector({ onClose, onSelect }: PassengerSelectorProps) {
  const [counts, setCounts] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabin, setCabin] = useState('Économique');
  const [assistance, setAssistance] = useState(false);

  const updateCount = (type: keyof typeof counts, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + delta)
    }));
  };

  const handleConfirm = () => {
    const total = counts.adults + counts.children + counts.infants;
    const label = `${total} Voyageur${total > 1 ? 's' : ''}, ${cabin}`;
    onSelect({ total, label, counts, cabin });
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute top-full right-0 mt-4 bg-white rounded-[40px] shadow-2xl border border-gray-100 p-8 z-50 w-[400px] max-w-[95vw]"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-trip-dark tracking-tighter">Voyageurs & Classe</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-trip-gray" />
        </button>
      </div>

      <div className="space-y-6 mb-8">
        {[
          { id: 'adults', label: 'Adultes', sub: '12+ ans' },
          { id: 'children', label: 'Enfants', sub: '2-11 ans' },
          { id: 'infants', label: 'Bébés', sub: '0-2 ans' },
        ].map((type) => (
          <div key={type.id} className="flex items-center justify-between">
            <div>
              <p className="font-black text-trip-dark tracking-tight">{type.label}</p>
              <p className="text-[10px] font-bold text-trip-gray uppercase tracking-widest">{type.sub}</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => updateCount(type.id as any, -1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-trip-blue hover:text-trip-blue transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-4 text-center font-black text-trip-dark">{counts[type.id as keyof typeof counts]}</span>
              <button 
                onClick={() => updateCount(type.id as any, 1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-trip-blue hover:text-trip-blue transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label className="block text-[10px] font-black text-trip-gray uppercase tracking-widest mb-4">Classe de cabine</label>
        <div className="grid grid-cols-2 gap-2">
          {['Économique', 'Premium Eco', 'Business', 'Première'].map((c) => (
            <button 
              key={c}
              onClick={() => setCabin(c)}
              className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                cabin === c ? 'bg-trip-blue border-trip-blue text-white shadow-md' : 'border-gray-200 text-trip-gray hover:border-trip-blue/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
            assistance ? 'bg-trip-blue border-trip-blue' : 'border-gray-200 group-hover:border-trip-blue/30'
          }`}>
            {assistance && <Check className="w-4 h-4 text-white" />}
          </div>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={assistance} 
            onChange={() => setAssistance(!assistance)} 
          />
          <span className="text-xs font-bold text-trip-dark">Besoins spécifiques (Assistance)</span>
        </label>
      </div>

      <button 
        onClick={handleConfirm}
        className="w-full py-4 bg-trip-blue text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-trip-blue/20"
      >
        Confirmer ({counts.adults + counts.children + counts.infants} Voyageurs)
      </button>
    </motion.div>
  );
}

interface LocationSelectorProps {
  label: string;
  searchTerm: string;
  onClose: () => void;
  onSelect: (city: string) => void;
}

export function LocationSelector({ label, searchTerm, onClose, onSelect }: LocationSelectorProps) {
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const popularCities = [
    { name: 'Paris', code: 'PAR', country_name: 'France' },
    { name: 'Tokyo', code: 'TYO', country_name: 'Japon' },
    { name: 'New York', code: 'NYC', country_name: 'USA' },
    { name: 'Londres', code: 'LON', country_name: 'UK' },
    { name: 'Dubaï', code: 'DXB', country_name: 'Émirats' },
  ];

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        setIsSearching(true);
        const data = await searchLocations(searchTerm);
        setResults(data);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-full left-0 mt-4 bg-white rounded-[32px] shadow-2xl border border-gray-100 p-6 z-50 w-[400px] max-w-[95vw]"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-black text-trip-gray uppercase tracking-widest">{label}</h3>
        {isSearching && (
          <Loader2 className="w-4 h-4 text-trip-blue animate-spin" />
        )}
      </div>

      <div className="space-y-1 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
        {searchTerm.length < 2 ? (
          <>
            <p className="text-[10px] font-black text-trip-gray uppercase tracking-widest mb-2 px-3">Destinations populaires</p>
            {popularCities.map((city) => (
              <button 
                key={city.code}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(`${city.name} (${city.code})`);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 hover:bg-trip-blue/5 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-trip-blue/10 transition-colors">
                    <MapPin className="w-4 h-4 text-trip-gray group-hover:text-trip-blue" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-trip-dark">{city.name}</p>
                    <p className="text-[10px] font-bold text-trip-gray uppercase tracking-widest">{city.country_name}</p>
                  </div>
                </div>
                <span className="text-xs font-black text-trip-blue opacity-0 group-hover:opacity-100 transition-all">{city.code}</span>
              </button>
            ))}
          </>
        ) : results.length > 0 ? (
          results.map((item: any, index: number) => (
            <button 
              key={`${item.code}-${item.type}-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(`${item.name} (${item.code})`);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 hover:bg-trip-blue/5 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-trip-blue/10 transition-colors">
                  <MapPin className="w-4 h-4 text-trip-gray group-hover:text-trip-blue" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-trip-dark">{item.name}</p>
                  <p className="text-[10px] font-bold text-trip-gray uppercase tracking-widest">
                    {item.country_name} {item.type === 'airport' ? '• Aéroport' : ''}
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-trip-blue opacity-0 group-hover:opacity-100 transition-all">{item.code}</span>
            </button>
          ))
        ) : !isSearching && (
          <div className="py-8 text-center">
            <p className="text-sm font-bold text-trip-gray">Aucun résultat pour "{searchTerm}"</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
