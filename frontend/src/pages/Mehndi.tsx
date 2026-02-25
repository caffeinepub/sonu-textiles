import { useLanguage } from '../context/LanguageContext';
import { useMehndiDesigns } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import AppointmentForm from '../components/AppointmentForm';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';

const mehndiImages = [
  '/assets/generated/mehndi-design-1.dim_400x400.png',
  '/assets/generated/mehndi-design-2.dim_400x400.png',
  '/assets/generated/mehndi-design-3.dim_400x400.png',
  '/assets/generated/mehndi-design-4.dim_400x400.png',
];

const pricingData = [
  { en: 'Simple Floral (One Hand)', hi: 'सरल फूल (एक हाथ)', price: '₹200', duration: '30 min' },
  { en: 'Simple Floral (Both Hands)', hi: 'सरल फूल (दोनों हाथ)', price: '₹350', duration: '45 min' },
  { en: 'Arabic Design', hi: 'अरेबिक डिज़ाइन', price: '₹500', duration: '1 hr' },
  { en: 'Rajasthani Design', hi: 'राजस्थानी डिज़ाइन', price: '₹800', duration: '1.5 hr' },
  { en: 'Bridal Full Hands', hi: 'दुल्हन पूरे हाथ', price: '₹2000', duration: '3 hr' },
  { en: 'Bridal Full Hands & Feet', hi: 'दुल्हन हाथ और पैर', price: '₹3500', duration: '5 hr' },
];

export default function Mehndi() {
  const { t, language } = useLanguage();
  const { data: designs, isLoading } = useMehndiDesigns();

  return (
    <div className="min-h-screen bg-ivory-light">
      {/* Page Header */}
      <div className="bg-crimson py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-ivory mb-3">
            {t('mehndi.title')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-amber-400 mx-auto rounded-full mb-4" />
          <p className="text-ivory/80 text-base md:text-lg max-w-2xl mx-auto">
            {t('mehndi.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Design Gallery */}
        <section>
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-crimson mb-2">
              {t('mehndi.gallery.title')}
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-square rounded-lg" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mehndiImages.map((src, i) => {
                const design = designs?.[i];
                return (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-lg shadow-md border border-gold/20">
                    <img
                      src={src}
                      alt={design?.name || `Mehndi Design ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {design && (
                      <div className="absolute inset-0 bg-gradient-to-t from-crimson/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <div>
                          <p className="text-ivory text-sm font-semibold">{design.name}</p>
                          <p className="text-gold text-xs font-bold">₹{design.price.toString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Pricing Table */}
        <section>
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-crimson mb-2">
              {t('mehndi.pricing.title')}
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>
          <div className="bg-white rounded-lg shadow-md border border-gold/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-crimson hover:bg-crimson">
                  <TableHead className="text-ivory font-semibold">{t('mehndi.service')}</TableHead>
                  <TableHead className="text-ivory font-semibold">{t('mehndi.price')}</TableHead>
                  <TableHead className="text-ivory font-semibold">{t('mehndi.duration')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricingData.map((row, i) => (
                  <TableRow key={i} className={i % 2 === 0 ? 'bg-ivory-light/50' : 'bg-white'}>
                    <TableCell className="font-medium text-foreground">
                      <div>{language === 'hi' ? row.hi : row.en}</div>
                      <div className="text-xs text-foreground/50">{language === 'hi' ? row.en : row.hi}</div>
                    </TableCell>
                    <TableCell className="text-gold font-bold">{row.price}</TableCell>
                    <TableCell className="text-foreground/70 text-sm">{row.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Appointment Booking */}
        <section>
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-crimson mb-2">
              {t('mehndi.booking.title')}
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>
          <div className="max-w-2xl mx-auto">
            <AppointmentForm />
          </div>
        </section>
      </div>
    </div>
  );
}
