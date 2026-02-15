import { useState } from 'react';
import Reveal from '../components/Reveal';
import { Send, Loader2, CheckCircle2, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const EMAIL = 'samsonchifamba@gmail.com';
const PHONE = '+258 848392340';
const PHONE_RAW = '258848392340';
const LOCATION = 'Vilankulos, Mozambique';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const serviceId = 'service_v9hnd3o';
  const templateId = 'template_0pmbmx9';
  const publicKey = 'WYBtiSordr0Zt8IqY';

  const sanitize = (s: string) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();

  const validate = () => {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = t('contact.nameError');
    if (!lastName.trim()) next.lastName = t('contact.lastNameError');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!email.trim() || !emailOk) next.email = t('contact.emailError');
    if (phone && !/^\+?[0-9\-()\s.]{6,}$/.test(phone)) next.phone = t('contact.phoneError');
    if (!message.trim()) next.message = t('contact.messageError');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    const templateParams = {
      user_name: `${firstName} ${lastName}`.trim(),
      user_email: email,
      user_subject: 'Portfolio contact – Samson Chifamba',
      user_message: message,
    };
    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 1800);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1800);
    }
  };

  const openEmail = () => {
    const subject = 'Contact from Portfolio – Samson Chifamba';
    const body = [
      'Hello Samson,',
      firstName || lastName ? `My name is ${firstName} ${lastName}`.trim() : '',
      phone ? `Phone: ${phone}` : '',
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const openWhatsApp = () => {
    const text = [
      'Hello Samson, I came through your portfolio.',
      firstName || lastName ? `My name is ${firstName} ${lastName}`.trim() : '',
      phone ? `Phone: ${phone}` : '',
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const inputBase =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <section id="contato" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 dark:hidden opacity-50" style={{ background: 'linear-gradient(to right, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 1) 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block opacity-40" style={{ background: 'linear-gradient(to right, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 100%)' }} />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-24 left-20 w-2 h-2 bg-[#00D9FF] rounded-full opacity-30 animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-[#00D9FF] rounded-full opacity-25 animate-float" style={{ animationDelay: '4s', animationDuration: '9s' }} />
        <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-[#00D9FF] rounded-full opacity-20 animate-float" style={{ animationDelay: '6s', animationDuration: '7s' }} />
      </div>

      <div className="absolute inset-0 z-0 opacity-25 dark:opacity-15">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s', animationDuration: '9s' }} />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">{t('contact.title')}</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">{t('contact.subtitle')}</p>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-6 md:gap-8 lg:grid-cols-[1fr_1fr] justify-items-center lg:justify-items-stretch">
          <form onSubmit={handleSubmit} className="group mz-card mz-card-md w-full max-w-xl mx-auto">
            <div className="mz-card-accent" />
            <div className="mz-card-accent-pulse" />
            <div className="mz-card-hover-bg" />
            <div className="mz-card-hover-shine" />

            <div className="grid gap-5 md:gap-6 relative z-10">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-foreground">{t('contact.firstName')}</span>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(sanitize(e.target.value))}
                    className={`${inputBase} ${errors.firstName ? 'border-destructive ring-destructive' : 'hover:border-primary/50'}`}
                    placeholder={t('contact.firstName')}
                  />
                  {errors.firstName && <span className="text-xs text-destructive">{errors.firstName}</span>}
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-foreground">{t('contact.lastName')}</span>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(sanitize(e.target.value))}
                    className={`${inputBase} ${errors.lastName ? 'border-destructive' : 'hover:border-primary/50'}`}
                    placeholder={t('contact.lastName')}
                  />
                  {errors.lastName && <span className="text-xs text-destructive">{errors.lastName}</span>}
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-foreground">{t('contact.email')}</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(sanitize(e.target.value))}
                    className={`${inputBase} ${errors.email ? 'border-destructive' : 'hover:border-primary/50'}`}
                    placeholder={t('contact.emailPlaceholder')}
                  />
                  {errors.email && <span className="text-xs text-destructive">{errors.email}</span>}
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-foreground">{t('contact.phone')} (optional)</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(sanitize(e.target.value))}
                    className={`${inputBase} ${errors.phone ? 'border-destructive' : 'hover:border-primary/50'}`}
                    placeholder={t('contact.phonePlaceholder')}
                  />
                  {errors.phone && <span className="text-xs text-destructive">{errors.phone}</span>}
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-foreground">{t('contact.message')}</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputBase} min-h-[140px] resize-y ${errors.message ? 'border-destructive' : 'hover:border-primary/50'}`}
                  placeholder={t('contact.messagePlaceholder')}
                />
                {errors.message && <span className="text-xs text-destructive">{errors.message}</span>}
              </label>
            </div>

            <div className="mt-6 md:mt-8 grid gap-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-primary-foreground font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'idle' && <Send size={20} />}
                {status === 'loading' && <Loader2 size={20} className="animate-spin" />}
                {status === 'success' && <CheckCircle2 size={20} />}
                {status === 'error' && <AlertCircle size={20} />}
                <span>
                  {status === 'idle' && t('contact.send')}
                  {status === 'loading' && t('contact.sending')}
                  {status === 'success' && t('contact.success')}
                  {status === 'error' && t('contact.error')}
                </span>
              </button>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={openEmail}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-5 py-2.5 text-foreground font-medium transition-all hover:bg-muted/50 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30"
                >
                  <Mail size={18} className="text-primary" />
                  {t('contact.emailButton')}
                </button>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-5 py-2.5 text-foreground font-medium transition-all hover:bg-muted/50 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                  {t('contact.whatsappButton')}
                </button>
              </div>
            </div>
          </form>

          <div className="group mz-card mz-card-md w-full max-w-lg mx-auto">
            <div className="mz-card-accent" />
            <div className="mz-card-accent-pulse" />
            <div className="mz-card-hover-bg" />
            <div className="mz-card-hover-shine" />

            <Reveal delayMs={100}>
              <h3 className="text-2xl font-bold text-foreground relative z-10">{t('contact.infoTitle')}</h3>
            </Reveal>
            <div className="mt-6 md:mt-8 space-y-6 relative z-10">
              <Reveal delayMs={150}>
                <div className="flex items-start gap-5">
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone size={26} />
                  </span>
                  <div>
                    <p className="text-muted-foreground">{t('contact.phone')}</p>
                    <a href={`tel:${PHONE_RAW}`} className="font-bold text-lg text-foreground hover:text-primary transition-colors">
                      {PHONE}
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="flex items-start gap-5">
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail size={26} />
                  </span>
                  <div>
                    <p className="text-muted-foreground">{t('contact.email')}</p>
                    <a href={`mailto:${EMAIL}`} className="font-bold text-lg text-foreground hover:text-primary transition-colors break-all">
                      {EMAIL}
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={250}>
                <div className="flex items-start gap-5">
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin size={26} />
                  </span>
                  <div>
                    <p className="text-muted-foreground">{t('contact.location')}</p>
                    <p className="font-bold text-lg text-foreground">{t('contact.locationValue')}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal delayMs={400}>
          <div className="mt-12 rounded-xl border border-primary/20 shadow-lg overflow-hidden">
            <h4 className="text-xl font-bold text-foreground p-4 bg-card text-center">{t('contact.mapTitle')}</h4>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                title="Vilankulos, Mozambique"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.0!2d35.3167!3d-22.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1bd66d36a35dfc3f%3A0x6b6e4a3e5e5e5e5e!2sVilankulo%2C%20Mozambique!5e0!3m2!1sen!2smz!4v1700000000000!5m2!1sen!2smz"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
