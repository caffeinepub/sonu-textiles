import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, toggleLanguage } = useLanguage();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLinks = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.clothing', path: '/clothing' },
    { key: 'nav.mehndi', path: '/mehndi' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.contact', path: '/contact' },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-0 z-50 bg-crimson shadow-md border-b border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/assets/generated/logo.dim_300x100.png"
              alt="Sonu Textiles"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-ivory font-display text-lg font-bold leading-tight">Sonu Textiles</div>
              <div className="text-gold text-xs font-medium leading-tight">सोनू टेक्सटाइल्स</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-gold bg-crimson-dark'
                    : 'text-ivory/90 hover:text-gold hover:bg-crimson-dark'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Language Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="border-gold/60 text-gold hover:bg-gold hover:text-crimson bg-transparent text-xs font-semibold px-3 py-1 h-8"
            >
              {t('nav.langToggle')}
            </Button>
            <button
              className="md:hidden text-ivory p-2 rounded-sm hover:bg-crimson-dark transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-crimson-dark border-t border-gold/20 px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-gold bg-crimson'
                  : 'text-ivory/90 hover:text-gold hover:bg-crimson'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
