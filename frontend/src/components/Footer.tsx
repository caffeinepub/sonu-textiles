import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'sonu-textiles');

  return (
    <footer className="bg-crimson-dark text-ivory border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/logo.dim_300x100.png"
                alt="Sonu Textiles"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-ivory/70 text-sm leading-relaxed">{t('footer.tagline')}</p>
            <p className="text-gold font-display text-lg mt-2">सोनू टेक्सटाइल्स</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.links')}</h3>
            <ul className="space-y-2">
              {[
                { key: 'nav.home', path: '/' },
                { key: 'nav.clothing', path: '/clothing' },
                { key: 'nav.mehndi', path: '/mehndi' },
                { key: 'nav.about', path: '/about' },
                { key: 'nav.contact', path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-ivory/70 hover:text-gold text-sm transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li className="text-ivory/70 text-sm">{t('footer.services.clothing')}</li>
              <li className="text-ivory/70 text-sm">{t('footer.services.mehndi')}</li>
              <li className="text-ivory/70 text-sm">{t('footer.services.booking')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ivory/50 text-xs">
            © {year} Sonu Textiles / सोनू टेक्सटाइल्स. {t('footer.rights')}
          </p>
          <p className="text-ivory/50 text-xs flex items-center gap-1">
            Built with <Heart size={12} className="text-gold fill-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
