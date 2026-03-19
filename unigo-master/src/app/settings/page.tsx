'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaBell,
  FaChevronLeft,
  FaLock,
  FaSave,
  FaShieldAlt,
  FaUserShield,
} from 'react-icons/fa';

type SettingsState = {
  notifications: boolean;
  profileVisible: boolean;
  rideReminders: boolean;
};

const SETTINGS_KEY = 'unigoSettings';

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    profileVisible: true,
    rideReminders: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/login');
      return;
    }

    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<SettingsState>;
        setSettings((current) => ({ ...current, ...parsed }));
      } catch {
        localStorage.removeItem(SETTINGS_KEY);
      }
    }

    setIsLoading(false);
  }, [router]);

  const toggleSetting = (key: keyof SettingsState) => {
    setSaved(false);
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-12 pt-20">
      <div className="container mx-auto max-w-4xl">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="brand-panel px-5 py-5 sm:px-6"
        >
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-900"
              aria-label="Voltar"
            >
              <FaChevronLeft />
            </button>

            <div className="min-w-0">
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Preferencias do app
              </div>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Configuracoes da sua conta
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Ajuste o que voce quer receber, o que aparece no seu perfil e como
                o app se comporta no uso diario.
              </p>
            </div>
          </div>
        </motion.section>

        <div className="mt-6 grid gap-4">
          <SettingCard
            icon={FaBell}
            eyebrow="Comunicacao"
            title="Notificacoes do app"
            description="Avisos de novas caronas, alteracoes de rota e confirmacoes importantes."
            enabled={settings.notifications}
            onToggle={() => toggleSetting('notifications')}
          />

          <SettingCard
            icon={FaShieldAlt}
            eyebrow="Rotina"
            title="Lembretes de carona"
            description="Receba alertas antes do horario combinado para reduzir esquecimentos."
            enabled={settings.rideReminders}
            onToggle={() => toggleSetting('rideReminders')}
          />

          <SettingCard
            icon={FaUserShield}
            eyebrow="Privacidade"
            title="Perfil visivel na comunidade"
            description="Mostra seu nome e dados basicos para outras pessoas da comunidade UniFio."
            enabled={settings.profileVisible}
            onToggle={() => toggleSetting('profileVisible')}
          />
        </div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="soft-panel mt-6 px-5 py-5 sm:px-6"
        >
          <div className="flex items-start gap-3">
            <div className="feature-icon h-11 w-11 shrink-0 rounded-2xl">
              <FaLock className="text-sm" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Leitura local das preferencias
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Estas configuracoes sao mantidas neste ambiente de demonstracao para
                deixar a experiencia do professor e dos alunos mais consistente.
              </p>
            </div>
          </div>
        </motion.section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={handleSave} className="btn-primary">
            <FaSave className="text-sm" />
            Salvar preferencias
          </button>

          {saved ? (
            <p className="text-sm font-medium text-emerald-600">
              Preferencias atualizadas com sucesso.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SettingCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  enabled,
  onToggle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-card p-5"
    >
      <div className="relative z-10 flex items-start gap-4">
        <div className="feature-icon h-11 w-11 shrink-0 rounded-2xl">
          <Icon className="text-sm" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
            {eyebrow}
          </div>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className={`mt-1 flex h-8 w-14 shrink-0 rounded-full p-1 transition-colors ${
            enabled ? 'bg-blue-600' : 'bg-slate-300'
          }`}
          aria-label={title}
        >
          <div
            className={`h-6 w-6 rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>
    </motion.article>
  );
}
