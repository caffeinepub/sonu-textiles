import { Shirt, Sparkles, Target, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutUs() {
  const { t } = useLanguage();

  const values = [
    { key: 'about.values.quality', icon: '✦' },
    { key: 'about.values.tradition', icon: '✿' },
    { key: 'about.values.trust', icon: '❋' },
    { key: 'about.values.service', icon: '✸' },
  ];

  return (
    <div className="min-h-screen bg-ivory-light">
      {/* Page Header */}
      <div className="bg-crimson py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-ivory mb-3">
            {t('about.title')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-amber-400 mx-auto rounded-full mb-4" />
          <p className="text-ivory/80 text-lg">Sonu Textiles / सोनू टेक्सटाइल्स</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Our Story */}
        <section className="bg-white rounded-lg shadow-md border border-gold/20 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5">
              <img
                src="/assets/generated/clothing-3.dim_400x400.png"
                alt="About Sonu Textiles"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-3/5 p-8">
              <h2 className="font-display text-2xl font-bold text-crimson mb-4">{t('about.subtitle')}</h2>
              <div className="w-12 h-1 bg-gold rounded-full mb-5" />
              <p className="text-foreground/75 leading-relaxed text-base">{t('about.story')}</p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md border border-gold/20 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center">
                <Shirt size={24} className="text-crimson" />
              </div>
              <h3 className="font-display text-xl font-bold text-crimson">{t('about.clothing.title')}</h3>
            </div>
            <div className="w-10 h-0.5 bg-gold mb-4" />
            <p className="text-foreground/70 leading-relaxed text-sm">{t('about.clothing.desc')}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {['Saree / साड़ी', 'Lehenga / लहंगा', 'Kurta / कुर्ता', 'Dupatta / दुपट्टा'].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-foreground/60">
                  <span className="text-gold">✦</span> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gold/20 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center">
                <Sparkles size={24} className="text-crimson" />
              </div>
              <h3 className="font-display text-xl font-bold text-crimson">{t('about.mehndi.title')}</h3>
            </div>
            <div className="w-10 h-0.5 bg-gold mb-4" />
            <p className="text-foreground/70 leading-relaxed text-sm">{t('about.mehndi.desc')}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {['Bridal / दुल्हन', 'Arabic / अरेबिक', 'Rajasthani / राजस्थानी', 'Floral / फूल'].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-foreground/60">
                  <span className="text-gold">✿</span> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-crimson rounded-lg shadow-md p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target size={28} className="text-gold" />
            <h3 className="font-display text-2xl font-bold text-ivory">{t('about.mission.title')}</h3>
          </div>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-5" />
          <p className="text-ivory/85 leading-relaxed text-base max-w-2xl mx-auto">{t('about.mission.desc')}</p>
        </section>

        {/* Values */}
        <section>
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl font-bold text-crimson mb-2">{t('about.values.title')}</h3>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((val, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gold/20 p-6 text-center hover:border-gold/50 transition-colors">
                <div className="text-3xl text-gold mb-3">{val.icon}</div>
                <p className="font-semibold text-crimson text-base">{t(val.key)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section>
          <div className="grid grid-cols-3 gap-3">
            {[
              '/assets/generated/mehndi-design-4.dim_400x400.png',
              '/assets/generated/clothing-2.dim_400x400.png',
              '/assets/generated/mehndi-design-2.dim_400x400.png',
            ].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg shadow-md">
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
