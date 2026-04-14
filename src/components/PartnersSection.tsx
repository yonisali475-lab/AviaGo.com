export default function PartnersSection() {
  const partners = [
    { name: 'Amadeus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Amadeus_%28company%29_logo.svg/1200px-Amadeus_%28company%29_logo.svg.png' },
    { name: 'Booking.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1200px-Booking.com_logo.svg.png' },
    { name: 'Kayak', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/KAYAK_logo.svg/1200px-KAYAK_logo.svg.png' },
    { name: 'SNCF Connect', logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d2/SNCF_logo.svg/1200px-SNCF_logo.svg.png' },
    { name: 'FlixBus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/FlixBus_logo.svg/1200px-FlixBus_logo.svg.png' },
    { name: 'Hertz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hertz_logo.svg/1200px-Hertz_logo.svg.png' },
  ];

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Réservez avec nos Partenaires Officiels</h3>
          <p className="text-xs text-gray-400">Redirection vers des sites tiers pour la réservation finale</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <img 
              key={partner.name}
              src={partner.logo} 
              alt={partner.name} 
              className="h-6 md:h-8 object-contain"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
