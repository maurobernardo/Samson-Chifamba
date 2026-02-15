import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="inicio" className="relative overflow-hidden min-h-screen flex items-start pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: 'linear-gradient(to right, rgba(219, 234, 254, 1) 0%, rgba(239, 246, 255, 0.8) 30%, rgba(248, 250, 252, 0.6) 60%, rgba(255, 255, 255, 1) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: 'linear-gradient(to right, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 50%, rgb(0, 0, 0) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] dark:hidden z-0"
        style={{
          backgroundImage: "url('/patterns/hero-network.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '400px',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08] hidden dark:block z-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse at right, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#00D9FF] rounded-full opacity-20 animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#00D9FF] rounded-full opacity-25 animate-float" style={{ animationDelay: '1.5s', animationDuration: '10s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-[#00D9FF] rounded-full opacity-20 animate-float" style={{ animationDelay: '3s', animationDuration: '9s' }} />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[#00D9FF] rounded-full opacity-30 animate-float" style={{ animationDelay: '4.5s', animationDuration: '7s' }} />
      </div>

      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s', animationDuration: '8s' }} />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-center lg:text-left">
            <Reveal delayMs={0}>
              <p className="text-lg font-medium text-primary mb-2">{t('hero.welcome')}</p>
            </Reveal>
            <Reveal delayMs={80}>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl" style={{ lineHeight: '1.3' }}>
                {t('hero.greeting')}{' '}
                <span className="text-primary">{t('hero.name')}</span>
              </h1>
            </Reveal>
            <Reveal delayMs={160}>
              <p className="mt-3 text-xl font-semibold text-foreground">{t('hero.title')}</p>
            </Reveal>
            <Reveal delayMs={200}>
              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-muted-foreground">
                <a href={`mailto:${t('hero.email')}`} className="inline-flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail size={18} /> {t('hero.email')}
                </a>
                <a href={`tel:${t('hero.phone').replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone size={18} /> {t('hero.phone')}
                </a>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={18} /> {t('hero.location')}
                </span>
              </div>
            </Reveal>
            <Reveal delayMs={240}>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground mx-auto lg:mx-0">
                {t('hero.description')}
              </p>
            </Reveal>
            <Reveal delayMs={280}>
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="/CV-Samson-Chifamba.pdf" download="CV-Samson-Chifamba.pdf" className="rounded-full bg-primary px-8 py-4 text-primary-foreground font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-px active:translate-y-px">
                  {t('hero.downloadCV')}
                </a>
                <a href="#contato" className="rounded-full border border-input px-8 py-4 font-semibold text-foreground transition-all hover:bg-muted hover:text-primary hover:shadow-sm hover:-translate-y-px">
                  {t('hero.contactMe')}
                </a>
              </div>
            </Reveal>
            <Reveal delayMs={320}>
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                <span className="h-8 w-8 flex items-center justify-center rounded-full border border-muted-foreground/30 text-sm animate-bounce">↓</span>
                <span>{t('hero.scrollDown')}</span>
              </div>
            </Reveal>
          </div>

          <div className="relative flex-shrink-0 mt-8 lg:mt-0">
            <Reveal delayMs={400} className="relative z-10">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-[#00D9FF] to-primary rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />
                <div className="relative h-72 w-72 lg:h-80 lg:w-80 rounded-full border-4 border-primary/50 shadow-2xl shadow-primary/30 overflow-hidden bg-card">
                  <img
                    src="/Samson.png"
                    alt="Samson Chifamba"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = 'none';
                      const fallback = el.nextElementSibling as HTMLElement;
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center text-5xl font-bold text-primary/80 bg-muted">
                    SC
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
