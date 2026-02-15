import Reveal from '../components/Reveal';
import {
  Server,
  Database,
  Shield,
  Wifi,
  HardDrive,
  Building2,
  Lock,
  Camera,
  Fingerprint,
  Palette,
  FolderKanban,
  DatabaseBackup,
  GraduationCap,
  Router,
  Cloud,
  Monitor,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type SkillItem = { name: string; icon: React.ReactNode };

const infrastructureSkills: SkillItem[] = [
  { name: 'Windows Server 2008/2012/2022', icon: <Server size={22} /> },
  { name: 'SQL Server', icon: <Database size={22} /> },
  { name: 'Cisco Switches', icon: <Router size={22} /> },
  { name: 'Fortigate Firewall', icon: <Shield size={22} /> },
  { name: 'Ubiquiti NanoStation', icon: <Wifi size={22} /> },
  { name: 'WSUS', icon: <Cloud size={22} /> },
  { name: 'Veritas Backup', icon: <HardDrive size={22} /> },
  { name: 'Symantec Endpoint', icon: <Monitor size={22} /> },
];

const hospitalitySkills: SkillItem[] = [
  { name: 'Micros Opera v5 PMS', icon: <Building2 size={22} /> },
  { name: 'Micros Opera Cloud', icon: <Cloud size={22} /> },
  { name: 'Micros Symphony', icon: <Building2 size={22} /> },
  { name: 'Vingcard Door Lock', icon: <Lock size={22} /> },
  { name: 'Yeastar PABX', icon: <Monitor size={22} /> },
];

const securitySkills: SkillItem[] = [
  { name: 'Hikvision CCTV', icon: <Camera size={22} /> },
  { name: 'Biometric (FingerTec)', icon: <Fingerprint size={22} /> },
];

const otherSkills: SkillItem[] = [
  { name: 'Graphic Design', icon: <Palette size={22} /> },
  { name: 'Project Management', icon: <FolderKanban size={22} /> },
  { name: 'Database Backup & Security', icon: <DatabaseBackup size={22} /> },
  { name: 'Technical Training', icon: <GraduationCap size={22} /> },
];

const skillGroups = [
  { titleKey: 'skills.infrastructure', skills: infrastructureSkills, color: 'blue' },
  { titleKey: 'skills.hospitality', skills: hospitalitySkills, color: 'emerald' },
  { titleKey: 'skills.security', skills: securitySkills, color: 'amber' },
  { titleKey: 'skills.other', skills: otherSkills, color: 'violet' },
];

const colorClasses: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400' },
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 dark:hidden opacity-50" style={{ background: 'linear-gradient(to right, rgba(219, 234, 254, 0.5) 0%, rgba(255, 255, 255, 1) 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block opacity-40" style={{ background: 'linear-gradient(to right, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 100%)' }} />

      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">{t('skills.title')}</h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">{t('skills.subtitle')}</p>
          </Reveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {skillGroups.map((group, gi) => {
            const colors = colorClasses[group.color] || colorClasses.blue;
            return (
              <Reveal key={group.titleKey} delayMs={gi * 60 + 120}>
                <div className="group mz-card mz-card-md h-full flex flex-col">
                  <div className="mz-card-accent" />
                  <div className="mz-card-accent-pulse" />
                  <div className="mz-card-hover-bg" />
                  <div className="mz-card-hover-shine" />
                  <h3 className={`text-lg font-bold tracking-tight flex items-center gap-3 mb-4 relative z-10 ${colors.text}`}>
                    <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
                      {group.skills[0]?.icon}
                    </span>
                    {t(group.titleKey)}
                  </h3>
                  <div className="scrollbar-primary relative z-10 flex-1 min-h-[220px] max-h-[220px] overflow-y-auto pr-1">
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${colors.bg} ${colors.text} border border-transparent hover:border-current/30 transition-colors`}
                        >
                          {skill.icon}
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
