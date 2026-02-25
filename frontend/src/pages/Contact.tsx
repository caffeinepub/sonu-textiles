import { useState } from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import { useSubmitContactMessage, useBusinessInfo } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

export default function Contact() {
  const { t } = useLanguage();
  const { mutateAsync, isPending } = useSubmitContactMessage();
  const { data: bizInfo, isLoading: bizLoading } = useBusinessInfo();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.message) return;
    try {
      await mutateAsync(form);
      setSuccess(true);
      toast.success(t('contact.success'));
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-ivory-light">
      {/* Page Header */}
      <div className="bg-crimson py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-ivory mb-3">
            {t('contact.title')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-amber-400 mx-auto rounded-full mb-4" />
          <p className="text-ivory/80 text-base md:text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-crimson rounded-lg shadow-md p-8 text-ivory">
              <h2 className="font-display text-xl font-bold mb-6">{t('contact.info.title')}</h2>
              <div className="space-y-5">
                {bizLoading ? (
                  <>
                    <Skeleton className="h-12 w-full bg-crimson-dark/50" />
                    <Skeleton className="h-12 w-full bg-crimson-dark/50" />
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Phone size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-ivory/60 text-xs uppercase tracking-wide mb-1">{t('contact.info.phone')}</p>
                        <p className="text-ivory font-semibold">{bizInfo?.phone || '+91 1234567890'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-ivory/60 text-xs uppercase tracking-wide mb-1">{t('contact.info.location')}</p>
                        <p className="text-ivory font-semibold">{bizInfo?.location || 'Patna, Bihar, India'}</p>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-ivory/60 text-xs uppercase tracking-wide mb-1">{t('contact.info.hours')}</p>
                    <p className="text-ivory font-semibold">{t('contact.info.hours.val')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative image */}
            <div className="rounded-lg overflow-hidden shadow-md border border-gold/20 h-48">
              <img
                src="/assets/generated/mehndi-design-1.dim_400x400.png"
                alt="Mehndi Art"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md border border-gold/20 overflow-hidden">
              <div className="bg-gradient-to-r from-crimson to-crimson-dark px-6 py-4">
                <h2 className="font-display text-xl font-bold text-ivory">{t('contact.title')}</h2>
              </div>
              <div className="p-8">
                {success ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl text-green-600">✓</span>
                    </div>
                    <p className="text-foreground font-medium text-base">{t('contact.success')}</p>
                    <Button
                      onClick={() => { setSuccess(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
                      className="mt-6 bg-crimson hover:bg-crimson-dark text-ivory rounded-sm"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-foreground/80 text-sm font-medium">{t('contact.name')}</Label>
                        <Input
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder={t('contact.name.placeholder')}
                          required
                          className="border-gold/30 focus:border-gold rounded-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-foreground/80 text-sm font-medium">{t('contact.phone')}</Label>
                        <Input
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder={t('contact.phone.placeholder')}
                          required
                          type="tel"
                          className="border-gold/30 focus:border-gold rounded-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-foreground/80 text-sm font-medium">{t('contact.email')}</Label>
                      <Input
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder={t('contact.email.placeholder')}
                        required
                        type="email"
                        className="border-gold/30 focus:border-gold rounded-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-foreground/80 text-sm font-medium">{t('contact.message')}</Label>
                      <Textarea
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder={t('contact.message.placeholder')}
                        required
                        rows={5}
                        className="border-gold/30 focus:border-gold rounded-sm resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-crimson hover:bg-crimson-dark text-ivory rounded-sm font-semibold py-2.5"
                    >
                      {isPending ? t('contact.submitting') : t('contact.submit')}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
