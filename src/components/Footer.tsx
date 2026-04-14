import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand & Social */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-trip-blue rounded-xl flex items-center justify-center shadow-lg shadow-trip-blue/20">
                <span className="text-white font-black text-2xl">A</span>
              </div>
              <span className="text-3xl font-black tracking-tighter text-trip-blue">AviaGo</span>
            </div>
            <p className="text-trip-gray text-sm font-medium leading-relaxed">
              Votre partenaire de confiance pour des voyages d'exception. Explorez le monde avec élégance et simplicité.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-trip-gray hover:bg-trip-blue hover:text-white hover:border-trip-blue transition-all">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* À propos */}
          <div>
            <h4 className="text-xs font-black text-trip-dark uppercase tracking-[0.2em] mb-8">À propos</h4>
            <ul className="space-y-4">
              {['Qui sommes-nous ?', 'Nos engagements', 'Carrières', 'Presse', 'Blog de voyage'].map((item) => (
                <li key={item} className="text-sm font-bold text-trip-gray hover:text-trip-blue cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Partenaires */}
          <div>
            <h4 className="text-xs font-black text-trip-dark uppercase tracking-[0.2em] mb-8">Partenaires</h4>
            <ul className="space-y-4">
              {['Devenir partenaire', 'Affiliation', 'Espace Agences', 'Publicité', 'API Travelpayouts'].map((item) => (
                <li key={item} className="text-sm font-bold text-trip-gray hover:text-trip-blue cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support 24/7 */}
          <div>
            <h4 className="text-xs font-black text-trip-dark uppercase tracking-[0.2em] mb-8">Support 24/7</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-trip-blue/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-trip-blue" />
                </div>
                <div>
                  <p className="text-xs font-black text-trip-dark uppercase tracking-widest mb-1">Téléphone</p>
                  <p className="text-sm font-bold text-trip-gray">+253 21 35 00 00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-trip-blue/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-trip-blue" />
                </div>
                <div>
                  <p className="text-xs font-black text-trip-dark uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm font-bold text-trip-gray">support@aviago.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-trip-blue/5 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-trip-blue" />
                </div>
                <div>
                  <p className="text-xs font-black text-trip-dark uppercase tracking-widest mb-1">Langue</p>
                  <p className="text-sm font-bold text-trip-gray">Français | EUR</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-bold text-trip-gray">
            © 2026 AviaGo. Tous droits réservés. Design Premium Montagne.
          </p>
          <div className="flex gap-8">
            {['Confidentialité', 'Conditions', 'Cookies'].map((item) => (
              <span key={item} className="text-xs font-bold text-trip-gray hover:text-trip-blue cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
