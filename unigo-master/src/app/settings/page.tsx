'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCog, FaBell, FaUserShield, FaChevronLeft, FaSave } from 'react-icons/fa';

type SettingsState = {
  notifications: boolean;
  profileVisible: boolean;
};

const SETTINGS_KEY = 'unigoSettings';

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    profileVisible: true
  });
  const [saved, setSaved] = useState(false);

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
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch {
        localStorage.removeItem(SETTINGS_KEY);
      }
    }

    setIsLoading(false);
  }, [router]);

  const updateSetting = (key: keyof SettingsState) => {
    setSaved(false);
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    // Dispatch event to update theme in real-time
    window.dispatchEvent(new Event('themechange'));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
            aria-label="Voltar"
          >
            <FaChevronLeft className="text-slate-600" />
          </button>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FaCog className="text-blue-600" />
            Configurações
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <SettingRow
            icon={<FaBell className="text-blue-600" />}
            title="Notificações"
            description="Avisos de carona, alterações e lembretes"
            enabled={settings.notifications}
            onToggle={() => updateSetting('notifications')}
          />

          <SettingRow
            icon={<FaUserShield className="text-blue-600" />}
            title="Perfil visível"
            description="Permitir que dados básicos apareçam para outros usuários"
            enabled={settings.profileVisible}
            onToggle={() => updateSetting('profileVisible')}
          />

          <div className="pt-2">
            <button
              onClick={handleSave}
              className="w-full md:w-auto px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FaSave />
              Salvar Preferências
            </button>
            {saved && <p className="text-sm text-green-600 mt-2">Configurações salvas localmente.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({
  icon,
  title,
  description,
  enabled,
  onToggle,
  disabled = false
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border border-slate-100 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center mt-1">{icon}</div>
        <div>
          <p className="font-semibold text-slate-800">{title}</p>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <button
        onClick={onToggle}
        disabled={disabled}
        className={`w-12 h-7 rounded-full p-1 transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-300'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        aria-label={title}
      >
        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}
