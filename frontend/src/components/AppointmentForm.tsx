import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import { useSubmitAppointment } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const serviceOptions = [
  { en: 'Simple Floral (One Hand)', hi: 'सरल फूल (एक हाथ)' },
  { en: 'Simple Floral (Both Hands)', hi: 'सरल फूल (दोनों हाथ)' },
  { en: 'Arabic Design', hi: 'अरेबिक डिज़ाइन' },
  { en: 'Rajasthani Design', hi: 'राजस्थानी डिज़ाइन' },
  { en: 'Bridal Full Hands', hi: 'दुल्हन पूरे हाथ' },
  { en: 'Bridal Full Hands & Feet', hi: 'दुल्हन हाथ और पैर' },
];

export default function AppointmentForm() {
  const { t, language } = useLanguage();
  const { mutateAsync, isPending } = useSubmitAppointment();
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', service: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time || !form.service) return;
    try {
      await mutateAsync(form);
      setSuccess(true);
      toast.success(t('appt.success'));
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gold/20 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl text-green-600">✓</span>
        </div>
        <p className="text-foreground font-medium text-base">{t('appt.success')}</p>
        <Button
          onClick={() => { setSuccess(false); setForm({ name: '', phone: '', date: '', time: '', service: '' }); }}
          className="mt-6 bg-crimson hover:bg-crimson-dark text-ivory rounded-sm"
        >
          {t('appt.cancel')}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gold/20 overflow-hidden">
      <div className="bg-crimson px-6 py-4">
        <h3 className="font-display text-xl font-bold text-ivory">{t('mehndi.booking.title')}</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-foreground/80 text-sm font-medium">{t('appt.name')}</Label>
            <Input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder={t('appt.name.placeholder')}
              required
              className="border-gold/30 focus:border-gold rounded-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-foreground/80 text-sm font-medium">{t('appt.phone')}</Label>
            <Input
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder={t('appt.phone.placeholder')}
              required
              type="tel"
              className="border-gold/30 focus:border-gold rounded-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-foreground/80 text-sm font-medium">{t('appt.date')}</Label>
            <Input
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="border-gold/30 focus:border-gold rounded-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-foreground/80 text-sm font-medium">{t('appt.time')}</Label>
            <Input
              value={form.time}
              onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
              type="time"
              required
              className="border-gold/30 focus:border-gold rounded-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-foreground/80 text-sm font-medium">{t('appt.service')}</Label>
          <Select value={form.service} onValueChange={val => setForm(f => ({ ...f, service: val }))}>
            <SelectTrigger className="border-gold/30 focus:border-gold rounded-sm">
              <SelectValue placeholder={t('appt.service.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((opt, i) => (
                <SelectItem key={i} value={opt.en}>
                  {language === 'hi' ? opt.hi : opt.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-crimson hover:bg-crimson-dark text-ivory rounded-sm font-semibold py-2.5 mt-2"
        >
          {isPending ? t('appt.submitting') : t('appt.submit')}
        </Button>
      </form>
    </div>
  );
}
