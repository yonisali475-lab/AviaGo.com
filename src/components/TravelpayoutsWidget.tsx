import { useEffect, useRef } from 'react';

interface TravelpayoutsWidgetProps {
  marker: string;
  origin?: string;
  destination?: string;
}

export default function TravelpayoutsWidget({ marker, origin = 'NCE', destination = 'KIX' }: TravelpayoutsWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Travelpayouts search widget script
    const script = document.createElement('script');
    script.src = `https://www.travelpayouts.com/widgets/${marker}.js?v=2182`;
    script.charset = 'utf-8';
    script.async = true;
    
    // Configuration for the widget
    // Note: This is a simplified example. Real widgets often need specific container IDs.
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [marker]);

  return (
    <div className="card-floating p-8 bg-white overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-5 h-5 text-trip-blue" />
        <h3 className="text-xl font-black text-trip-dark tracking-tighter">Moteur de recherche complet</h3>
      </div>
      <div ref={containerRef} id="tp-widget-container" className="min-h-[200px] w-full" />
      <p className="mt-4 text-[10px] font-bold text-trip-gray uppercase tracking-widest text-center">
        Propulsé par Travelpayouts • Réservation sécurisée
      </p>
    </div>
  );
}

// Helper to use Search icon inside the component
import { Search } from 'lucide-react';
