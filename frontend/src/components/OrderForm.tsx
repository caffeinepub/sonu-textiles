import { useState } from 'react';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSubmitOrder } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ClothingItem } from '../backend';

interface OrderFormProps {
  item: ClothingItem;
  onClose: () => void;
}

export default function OrderForm({ item, onClose }: OrderFormProps) {
  const { t } = useLanguage();
  const { mutateAsync, isPending } = useSubmitOrder();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    try {
      await mutateAsync({
        name: form.name,
        phone: form.phone,
        address: form.address,
        product: `${item.name} (${item.nameHindi}) - ₹${item.price}`,
      });
      setSuccess(true);
      toast.success(t('order.success'));
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md border border-gold/30 overflow-hidden">
        {/* Header */}
        <div className="bg-crimson px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-ivory">{t('order.title')}</h2>
          <button onClick={onClose} className="text-ivory/70 hover:text-ivory transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <p className="text-foreground font-medium text-base">{t('order.success')}</p>
              <Button onClick={onClose} className="mt-6 bg-crimson hover:bg-crimson-dark text-ivory rounded-sm">
                {t('order.cancel')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Product */}
              <div className="bg-ivory-light rounded-sm p-3 border border-gold/20">
                <p className="text-xs text-foreground/50 uppercase tracking-wide mb-1">{t('order.product')}</p>
                <p className="font-semibold text-crimson">{item.name} — {item.nameHindi}</p>
                <p className="text-gold font-bold">₹{item.price.toString()}</p>
              </div>

              <div className="space-y-1">
                <Label className="text-foreground/80 text-sm font-medium">{t('order.name')}</Label>
                <Input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder={t('order.name.placeholder')}
                  required
                  className="border-gold/30 focus:border-gold rounded-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-foreground/80 text-sm font-medium">{t('order.phone')}</Label>
                <Input
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder={t('order.phone.placeholder')}
                  required
                  type="tel"
                  className="border-gold/30 focus:border-gold rounded-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-foreground/80 text-sm font-medium">{t('order.address')}</Label>
                <Textarea
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder={t('order.address.placeholder')}
                  required
                  rows={3}
                  className="border-gold/30 focus:border-gold rounded-sm resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gold/40 text-foreground/70 rounded-sm"
                >
                  {t('order.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-crimson hover:bg-crimson-dark text-ivory rounded-sm font-semibold"
                >
                  {isPending ? t('order.submitting') : t('order.submit')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
