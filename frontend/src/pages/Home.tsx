import { Link } from '@tanstack/react-router';
import { Shirt, Sparkles, Phone, Star, Award, Users, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { t } = useLanguage();

  const whyItems = [
    { icon: Award, titleKey: 'home.why.quality', descKey: 'home.why.quality.desc' },
    { icon: Star, titleKey: 'home.why.tradition', descKey: 'home.why.tradition.desc' },
    { icon: Users, titleKey: 'home.why.service', descKey: 'home.why.service.desc' },
    { icon: Tag, titleKey: 'home.why.price', descKey: 'home.why.price.desc' },
  ];

  const services = [
    {
      icon: Shirt,
      titleKey: 'home.services.clothing.title',
      descKey: 'home.services.clothing.desc',
      btnKey: 'home.services.clothing.btn',
      path: '/clothing',
      img: '/assets/generated/clothing-1.dim_400x400.png',
    },
    {
      icon: Sparkles,
      titleKey: 'home.services.mehndi.title',
      descKey: 'home.services.mehndi.desc',
      btnKey: 'home.services.mehndi.btn',
      path: '/mehndi',
      img: '/assets/generated/mehndi-design-1.dim_400x400.png',
    },
    {
      icon: Phone,
      titleKey: 'home.services.contact.title',
      descKey: 'home.services.contact.desc',
      btnKey: 'home.services.contact.btn',
      path: '/contact',
      img: null,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[420px] md:h-[500px]">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt="Sonu Textiles Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-crimson/85 via-crimson/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <div className="inline-block border border-gold/60 px-3 py-1 mb-4 rounded-sm">
                  <span className="text-gold text-xs font-semibold uppercase tracking-widest">
                    Sonu Textiles / सोनू टेक्सटाइल्स
                  </span>
                </div>
                <h1 className="text-ivory font-display text-3xl md:text-5xl font-bold leading-tight mb-4">
                  {t('hero.tagline')}
                </h1>
                <p className="text-ivory/85 text-base md:text-lg mb-8 leading-relaxed">
                  {t('hero.sub')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/clothing">
                    <Button className="bg-gold text-crimson hover:bg-gold/90 font-semibold px-6 py-2 rounded-sm shadow-lg">
                      {t('hero.cta.clothing')}
                    </Button>
                  </Link>
                  <Link to="/mehndi">
                    <Button variant="outline" className="border-ivory text-ivory hover:bg-ivory hover:text-crimson font-semibold px-6 py-2 rounded-sm">
                      {t('hero.cta.mehndi')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative border */}
        <div className="h-2 bg-gradient-to-r from-gold via-amber-400 to-gold" />
      </section>

      {/* Services Section */}
      <section className="py-16 bg-ivory-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-crimson mb-3">
              {t('home.services.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-amber-400 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border border-gold/20 hover:shadow-xl transition-shadow duration-300 group">
                {svc.img ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={svc.img}
                      alt={t(svc.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center">
                    <svc.icon size={64} className="text-gold opacity-80" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svc.icon size={20} className="text-gold" />
                    <h3 className="font-display text-xl font-bold text-crimson">{t(svc.titleKey)}</h3>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-5">{t(svc.descKey)}</p>
                  <Link to={svc.path}>
                    <Button className="w-full bg-crimson hover:bg-crimson-dark text-ivory rounded-sm font-medium">
                      {t(svc.btnKey)}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-crimson">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ivory mb-3">
              {t('home.why.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-amber-400 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyItems.map((item, i) => (
              <div key={i} className="text-center p-6 bg-crimson-dark/50 rounded-lg border border-gold/20 hover:border-gold/50 transition-colors">
                <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-gold" />
                </div>
                <h3 className="text-ivory font-semibold text-base mb-2">{t(item.titleKey)}</h3>
                <p className="text-ivory/60 text-xs leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-ivory-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              '/assets/generated/clothing-1.dim_400x400.png',
              '/assets/generated/mehndi-design-2.dim_400x400.png',
              '/assets/generated/clothing-2.dim_400x400.png',
              '/assets/generated/mehndi-design-3.dim_400x400.png',
            ].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg shadow-md group">
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
