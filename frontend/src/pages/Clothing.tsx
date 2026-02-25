import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useClothingItems } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import OrderForm from '../components/OrderForm';
import type { ClothingItem } from '../backend';

const clothingImages = [
  '/assets/generated/clothing-1.dim_400x400.png',
  '/assets/generated/clothing-2.dim_400x400.png',
  '/assets/generated/clothing-3.dim_400x400.png',
];

export default function Clothing() {
  const { t } = useLanguage();
  const { data: items, isLoading } = useClothingItems();
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  return (
    <div className="min-h-screen bg-ivory-light">
      {/* Page Header */}
      <div className="bg-crimson py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-ivory mb-3">
            {t('clothing.title')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-amber-400 mx-auto rounded-full mb-4" />
          <p className="text-ivory/80 text-base md:text-lg max-w-2xl mx-auto">
            {t('clothing.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : !items || items.length === 0 ? (
          <div className="text-center py-20 text-foreground/50">{t('clothing.empty')}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gold/20 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={clothingImages[index % clothingImages.length]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-gold text-crimson text-xs font-bold px-2 py-1 rounded-sm shadow">
                    ₹{item.price.toString()}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-crimson">{item.name}</h3>
                  <p className="text-foreground/60 text-sm font-medium mb-1">{item.nameHindi}</p>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-crimson font-bold text-lg">₹{item.price.toString()}</span>
                    <Button
                      onClick={() => setSelectedItem(item)}
                      className="bg-crimson hover:bg-crimson-dark text-ivory rounded-sm font-medium flex items-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      {t('clothing.order')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <OrderForm
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
