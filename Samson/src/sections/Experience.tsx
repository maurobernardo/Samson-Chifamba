import Reveal from '../components/Reveal';
import { BookOpen, Briefcase, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const educationData = [
  { institutionKey: 'education.0.institution', periodKey: 'education.0.period', degreeKey: 'education.0.degree', descriptionKey: 'education.0.description' },
];

const experiencesData = [
  { companyKey: 'experience.0.company', roleKey: 'experience.0.role', periodKey: 'experience.0.period', locationKey: 'experience.0.location', bulletCount: 7 },
  { companyKey: 'experience.1.company', roleKey: 'experience.1.role', periodKey: 'experience.1.period', locationKey: null, bulletCount: 5 },
  { companyKey: 'experience.2.company', roleKey: 'experience.2.role', periodKey: 'experience.2.period', locationKey: null, bulletCount: 5 },
];

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experiencia" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 dark:hidden opacity-50" style={{ background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 0.9) 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block opacity-40" style={{ background: 'linear-gradient(to right, rgb(2, 6, 23) 0%, rgb(15, 23, 42) 100%)' }} />

      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">{t('experience.title')}</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">{t('experience.subtitle')}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Educação – coluna esquerda */}
          <div>
            <Reveal delayMs={120}>
              <h3 className="text-2xl font-bold tracking-tight text-primary mb-8">{t('experience.education')}</h3>
            </Reveal>
            <ol className="relative border-l-2 border-primary/30 pl-8 space-y-6">
              {educationData.map((edu, i) => (
                <li key={i} className="relative">
                  <Reveal delayMs={160}>
                    <span className="absolute -left-[2.1rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                      <BookOpen size={18} className="text-primary-foreground" />
                    </span>
                    <div className="group mz-card mz-card-md relative z-10">
                      <div className="mz-card-accent" />
                      <div className="mz-card-accent-pulse" />
                      <div className="mz-card-hover-bg" />
                      <div className="mz-card-hover-shine" />
                      <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{t(edu.degreeKey)}</h3>
                        <time className="text-sm font-medium text-muted-foreground">{t(edu.periodKey)}</time>
                      </div>
                      <p className="text-base text-muted-foreground mt-2 relative z-10">{t(edu.institutionKey)}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed relative z-10">{t(edu.descriptionKey)}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Experiência profissional – coluna direita */}
          <div>
            <Reveal delayMs={120}>
              <h3 className="text-2xl font-bold tracking-tight text-primary mb-8">{t('experience.experience')}</h3>
            </Reveal>
            <ol className="relative border-l-2 border-primary/30 pl-8 space-y-6">
              {experiencesData.map((exp, i) => {
                const bullets = Array.from({ length: exp.bulletCount }, (_, idx) => t(`experience.${i}.bullet${idx}`));
                return (
                  <li key={i} className="relative">
                    <Reveal delayMs={180 + i * 80}>
                      <span className="absolute -left-[2.1rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                        <Briefcase size={18} className="text-primary-foreground" />
                      </span>
                      <div className="group mz-card mz-card-md relative z-10">
                        <div className="mz-card-accent" />
                        <div className="mz-card-accent-pulse" />
                        <div className="mz-card-hover-bg" />
                        <div className="mz-card-hover-shine" />
                        <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{t(exp.roleKey)}</h3>
                          <time className="text-sm font-medium text-muted-foreground">{t(exp.periodKey)}</time>
                        </div>
                        <p className="text-base text-muted-foreground mt-1 relative z-10">{t(exp.companyKey)}</p>
                        {exp.locationKey && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1 relative z-10">
                            <MapPin size={16} /> {t(exp.locationKey)}
                          </p>
                        )}
                        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground list-disc list-inside relative z-10">
                          {bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
