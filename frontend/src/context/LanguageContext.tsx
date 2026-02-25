import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = sessionStorage.getItem('sonu-lang');
    return (stored === 'hi' || stored === 'en') ? stored : 'en';
  });

  useEffect(() => {
    sessionStorage.setItem('sonu-lang', language);
  }, [language]);

  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'hi' : 'en');

  const t = (key: string): string => {
    const translations = language === 'hi' ? hi : en;
    return (translations as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

const en: Record<string, string> = {
  // Nav
  'nav.home': 'Home',
  'nav.clothing': 'Clothing',
  'nav.mehndi': 'Mehndi',
  'nav.about': 'About Us',
  'nav.contact': 'Contact',
  'nav.langToggle': 'हिंदी',

  // Hero
  'hero.tagline': 'Tradition Woven in Every Thread',
  'hero.sub': 'Exquisite clothing & beautiful mehndi designs for every occasion',
  'hero.cta.clothing': 'Shop Clothing',
  'hero.cta.mehndi': 'Book Mehndi',

  // Home sections
  'home.services.title': 'Our Services',
  'home.services.clothing.title': 'Clothing Collection',
  'home.services.clothing.desc': 'Explore our wide range of traditional and contemporary Indian clothing — sarees, lehengas, kurtas, and more.',
  'home.services.mehndi.title': 'Mehndi Art',
  'home.services.mehndi.desc': 'Beautiful henna designs for weddings, festivals, and special occasions by skilled artists.',
  'home.services.contact.title': 'Get in Touch',
  'home.services.contact.desc': 'Have questions? We\'d love to hear from you. Reach out for orders, bookings, or inquiries.',
  'home.services.clothing.btn': 'View Collection',
  'home.services.mehndi.btn': 'Book Appointment',
  'home.services.contact.btn': 'Contact Us',
  'home.why.title': 'Why Choose Us',
  'home.why.quality': 'Premium Quality',
  'home.why.quality.desc': 'Handpicked fabrics and authentic designs',
  'home.why.tradition': 'Rich Tradition',
  'home.why.tradition.desc': 'Rooted in Indian culture and craftsmanship',
  'home.why.service': 'Personal Service',
  'home.why.service.desc': 'Dedicated attention to every customer',
  'home.why.price': 'Best Prices',
  'home.why.price.desc': 'Affordable luxury for every budget',

  // Clothing
  'clothing.title': 'Clothing Collection',
  'clothing.subtitle': 'Discover our curated selection of traditional Indian garments',
  'clothing.order': 'Order Now',
  'clothing.price': 'Price',
  'clothing.loading': 'Loading products...',
  'clothing.empty': 'No products available at the moment.',

  // Order Form
  'order.title': 'Place Your Order',
  'order.product': 'Selected Product',
  'order.name': 'Your Name',
  'order.name.placeholder': 'Enter your full name',
  'order.phone': 'Phone Number',
  'order.phone.placeholder': 'Enter your phone number',
  'order.address': 'Delivery Address',
  'order.address.placeholder': 'Enter your full address',
  'order.submit': 'Place Order',
  'order.submitting': 'Placing Order...',
  'order.success': 'Order placed successfully! We will contact you soon.',
  'order.cancel': 'Cancel',

  // Mehndi
  'mehndi.title': 'Mehndi Designs',
  'mehndi.subtitle': 'Intricate henna art for every occasion',
  'mehndi.gallery.title': 'Design Gallery',
  'mehndi.pricing.title': 'Pricing & Services',
  'mehndi.booking.title': 'Book an Appointment',
  'mehndi.service': 'Service',
  'mehndi.price': 'Price',
  'mehndi.duration': 'Duration',
  'mehndi.loading': 'Loading designs...',

  // Appointment Form
  'appt.name': 'Your Name',
  'appt.name.placeholder': 'Enter your full name',
  'appt.phone': 'Phone Number',
  'appt.phone.placeholder': 'Enter your phone number',
  'appt.date': 'Preferred Date',
  'appt.time': 'Preferred Time',
  'appt.service': 'Service Type',
  'appt.service.placeholder': 'Select a service',
  'appt.submit': 'Book Appointment',
  'appt.submitting': 'Booking...',
  'appt.success': 'Appointment booked successfully! We will confirm shortly.',
  'appt.cancel': 'Cancel',

  // About
  'about.title': 'About Us',
  'about.subtitle': 'Our Story',
  'about.story': 'Sonu Textiles is a family-run business dedicated to bringing the finest Indian clothing and mehndi artistry to our valued customers. With years of experience and a deep passion for tradition, we offer an unmatched selection of garments and henna designs.',
  'about.clothing.title': 'Our Clothing',
  'about.clothing.desc': 'We stock a wide variety of traditional and contemporary Indian garments including sarees, lehengas, salwar suits, kurtas, and dupattas. Each piece is carefully selected for quality, craftsmanship, and beauty.',
  'about.mehndi.title': 'Our Mehndi Services',
  'about.mehndi.desc': 'Our skilled mehndi artists create stunning henna designs for weddings, festivals, and all special occasions. From simple floral patterns to elaborate bridal designs, we cater to every need.',
  'about.mission.title': 'Our Mission',
  'about.mission.desc': 'To preserve and celebrate the rich heritage of Indian textiles and mehndi art while making it accessible and affordable for everyone.',
  'about.values.title': 'Our Values',
  'about.values.quality': 'Quality',
  'about.values.tradition': 'Tradition',
  'about.values.trust': 'Trust',
  'about.values.service': 'Service',

  // Contact
  'contact.title': 'Contact Us',
  'contact.subtitle': 'We\'d love to hear from you',
  'contact.name': 'Your Name',
  'contact.name.placeholder': 'Enter your full name',
  'contact.phone': 'Phone Number',
  'contact.phone.placeholder': 'Enter your phone number',
  'contact.email': 'Email Address',
  'contact.email.placeholder': 'Enter your email address',
  'contact.message': 'Message',
  'contact.message.placeholder': 'Write your message here...',
  'contact.submit': 'Send Message',
  'contact.submitting': 'Sending...',
  'contact.success': 'Message sent successfully! We will get back to you soon.',
  'contact.info.title': 'Contact Information',
  'contact.info.phone': 'Phone',
  'contact.info.location': 'Location',
  'contact.info.hours': 'Business Hours',
  'contact.info.hours.val': 'Mon–Sat: 9:00 AM – 8:00 PM',
  'contact.loading': 'Loading contact info...',

  // Footer
  'footer.tagline': 'Tradition woven in every thread.',
  'footer.links': 'Quick Links',
  'footer.services': 'Services',
  'footer.services.clothing': 'Clothing',
  'footer.services.mehndi': 'Mehndi',
  'footer.services.booking': 'Appointment Booking',
  'footer.rights': 'All rights reserved.',
};

const hi: Record<string, string> = {
  // Nav
  'nav.home': 'होम',
  'nav.clothing': 'कपड़े',
  'nav.mehndi': 'मेहंदी',
  'nav.about': 'हमारे बारे में',
  'nav.contact': 'संपर्क',
  'nav.langToggle': 'English',

  // Hero
  'hero.tagline': 'हर धागे में बुनी परंपरा',
  'hero.sub': 'हर अवसर के लिए बेहतरीन कपड़े और सुंदर मेहंदी डिज़ाइन',
  'hero.cta.clothing': 'कपड़े देखें',
  'hero.cta.mehndi': 'मेहंदी बुक करें',

  // Home sections
  'home.services.title': 'हमारी सेवाएं',
  'home.services.clothing.title': 'कपड़ों का संग्रह',
  'home.services.clothing.desc': 'साड़ी, लहंगा, कुर्ता और बहुत कुछ — पारंपरिक और आधुनिक भारतीय कपड़ों की विस्तृत श्रृंखला।',
  'home.services.mehndi.title': 'मेहंदी कला',
  'home.services.mehndi.desc': 'शादी, त्योहार और खास मौकों के लिए कुशल कलाकारों द्वारा सुंदर मेहंदी डिज़ाइन।',
  'home.services.contact.title': 'संपर्क करें',
  'home.services.contact.desc': 'कोई सवाल है? ऑर्डर, बुकिंग या जानकारी के लिए हमसे संपर्क करें।',
  'home.services.clothing.btn': 'संग्रह देखें',
  'home.services.mehndi.btn': 'अपॉइंटमेंट बुक करें',
  'home.services.contact.btn': 'संपर्क करें',
  'home.why.title': 'हमें क्यों चुनें',
  'home.why.quality': 'उत्कृष्ट गुणवत्ता',
  'home.why.quality.desc': 'चुने हुए कपड़े और असली डिज़ाइन',
  'home.why.tradition': 'समृद्ध परंपरा',
  'home.why.tradition.desc': 'भारतीय संस्कृति और शिल्प में निहित',
  'home.why.service': 'व्यक्तिगत सेवा',
  'home.why.service.desc': 'हर ग्राहक पर विशेष ध्यान',
  'home.why.price': 'सर्वोत्तम मूल्य',
  'home.why.price.desc': 'हर बजट के लिए किफायती विलासिता',

  // Clothing
  'clothing.title': 'कपड़ों का संग्रह',
  'clothing.subtitle': 'पारंपरिक भारतीय परिधानों का हमारा चुनिंदा संग्रह',
  'clothing.order': 'अभी ऑर्डर करें',
  'clothing.price': 'मूल्य',
  'clothing.loading': 'उत्पाद लोड हो रहे हैं...',
  'clothing.empty': 'अभी कोई उत्पाद उपलब्ध नहीं है।',

  // Order Form
  'order.title': 'ऑर्डर दें',
  'order.product': 'चुना हुआ उत्पाद',
  'order.name': 'आपका नाम',
  'order.name.placeholder': 'अपना पूरा नाम दर्ज करें',
  'order.phone': 'फोन नंबर',
  'order.phone.placeholder': 'अपना फोन नंबर दर्ज करें',
  'order.address': 'डिलीवरी पता',
  'order.address.placeholder': 'अपना पूरा पता दर्ज करें',
  'order.submit': 'ऑर्डर दें',
  'order.submitting': 'ऑर्डर हो रहा है...',
  'order.success': 'ऑर्डर सफलतापूर्वक दिया गया! हम जल्द ही संपर्क करेंगे।',
  'order.cancel': 'रद्द करें',

  // Mehndi
  'mehndi.title': 'मेहंदी डिज़ाइन',
  'mehndi.subtitle': 'हर अवसर के लिए जटिल मेहंदी कला',
  'mehndi.gallery.title': 'डिज़ाइन गैलरी',
  'mehndi.pricing.title': 'मूल्य सूची और सेवाएं',
  'mehndi.booking.title': 'अपॉइंटमेंट बुक करें',
  'mehndi.service': 'सेवा',
  'mehndi.price': 'मूल्य',
  'mehndi.duration': 'समय',
  'mehndi.loading': 'डिज़ाइन लोड हो रहे हैं...',

  // Appointment Form
  'appt.name': 'आपका नाम',
  'appt.name.placeholder': 'अपना पूरा नाम दर्ज करें',
  'appt.phone': 'फोन नंबर',
  'appt.phone.placeholder': 'अपना फोन नंबर दर्ज करें',
  'appt.date': 'पसंदीदा तारीख',
  'appt.time': 'पसंदीदा समय',
  'appt.service': 'सेवा का प्रकार',
  'appt.service.placeholder': 'सेवा चुनें',
  'appt.submit': 'अपॉइंटमेंट बुक करें',
  'appt.submitting': 'बुकिंग हो रही है...',
  'appt.success': 'अपॉइंटमेंट सफलतापूर्वक बुक हुई! हम जल्द ही पुष्टि करेंगे।',
  'appt.cancel': 'रद्द करें',

  // About
  'about.title': 'हमारे बारे में',
  'about.subtitle': 'हमारी कहानी',
  'about.story': 'सोनू टेक्सटाइल्स एक पारिवारिक व्यवसाय है जो अपने मूल्यवान ग्राहकों को बेहतरीन भारतीय कपड़े और मेहंदी कला प्रदान करने के लिए समर्पित है। वर्षों के अनुभव और परंपरा के प्रति गहरे जुनून के साथ, हम परिधानों और मेहंदी डिज़ाइनों का अतुलनीय संग्रह प्रदान करते हैं।',
  'about.clothing.title': 'हमारे कपड़े',
  'about.clothing.desc': 'हम साड़ी, लहंगा, सलवार सूट, कुर्ता और दुपट्टे सहित पारंपरिक और समकालीन भारतीय परिधानों की विस्तृत विविधता रखते हैं। प्रत्येक वस्तु को गुणवत्ता, शिल्प कौशल और सुंदरता के लिए सावधानीपूर्वक चुना जाता है।',
  'about.mehndi.title': 'हमारी मेहंदी सेवाएं',
  'about.mehndi.desc': 'हमारे कुशल मेहंदी कलाकार शादियों, त्योहारों और सभी खास अवसरों के लिए शानदार मेहंदी डिज़ाइन बनाते हैं। सरल फूलों के पैटर्न से लेकर विस्तृत दुल्हन डिज़ाइन तक, हम हर ज़रूरत को पूरा करते हैं।',
  'about.mission.title': 'हमारा उद्देश्य',
  'about.mission.desc': 'भारतीय वस्त्र और मेहंदी कला की समृद्ध विरासत को संरक्षित और मनाना, साथ ही इसे सभी के लिए सुलभ और किफायती बनाना।',
  'about.values.title': 'हमारे मूल्य',
  'about.values.quality': 'गुणवत्ता',
  'about.values.tradition': 'परंपरा',
  'about.values.trust': 'विश्वास',
  'about.values.service': 'सेवा',

  // Contact
  'contact.title': 'संपर्क करें',
  'contact.subtitle': 'हम आपसे सुनना चाहते हैं',
  'contact.name': 'आपका नाम',
  'contact.name.placeholder': 'अपना पूरा नाम दर्ज करें',
  'contact.phone': 'फोन नंबर',
  'contact.phone.placeholder': 'अपना फोन नंबर दर्ज करें',
  'contact.email': 'ईमेल पता',
  'contact.email.placeholder': 'अपना ईमेल पता दर्ज करें',
  'contact.message': 'संदेश',
  'contact.message.placeholder': 'यहाँ अपना संदेश लिखें...',
  'contact.submit': 'संदेश भेजें',
  'contact.submitting': 'भेजा जा रहा है...',
  'contact.success': 'संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।',
  'contact.info.title': 'संपर्क जानकारी',
  'contact.info.phone': 'फोन',
  'contact.info.location': 'स्थान',
  'contact.info.hours': 'व्यापार के घंटे',
  'contact.info.hours.val': 'सोम–शनि: सुबह 9 बजे – शाम 8 बजे',
  'contact.loading': 'संपर्क जानकारी लोड हो रही है...',

  // Footer
  'footer.tagline': 'हर धागे में बुनी परंपरा।',
  'footer.links': 'त्वरित लिंक',
  'footer.services': 'सेवाएं',
  'footer.services.clothing': 'कपड़े',
  'footer.services.mehndi': 'मेहंदी',
  'footer.services.booking': 'अपॉइंटमेंट बुकिंग',
  'footer.rights': 'सर्वाधिकार सुरक्षित।',
};
