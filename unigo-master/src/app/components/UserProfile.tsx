'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FaChevronDown,
  FaCog,
  FaHistory,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';

type UserProfileProps = {
  userName: string;
  userImage?: string;
};

const initialsFromName = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

export default function UserProfile({
  userName,
  userImage,
}: UserProfileProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userImage');
    setIsMenuOpen(false);
    router.push('/login');
  };

  const quickLinks = [
    {
      label: 'Minha conta',
      description: 'Identidade e dados da comunidade',
      icon: FaUser,
      action: () => router.push('/profile'),
    },
    {
      label: 'Historico',
      description: 'Rotas e caronas anteriores',
      icon: FaHistory,
      action: () => router.push('/ride-history'),
    },
    {
      label: 'Configuracoes',
      description: 'Preferencias do app',
      icon: FaCog,
      action: () => router.push('/settings'),
    },
  ] as const;

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        type="button"
        onClick={() => setIsMenuOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/92 px-2.5 py-2 shadow-[0_18px_36px_-28px_rgba(15,23,42,0.32)] transition-colors hover:border-blue-200"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white bg-blue-100 text-sm font-semibold text-blue-800 shadow-[0_14px_28px_-22px_rgba(37,99,235,0.6)]">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            initialsFromName(userName)
          )}
        </div>

        <div className="hidden min-w-0 text-left sm:block">
          <div className="max-w-[10rem] truncate text-sm font-semibold text-slate-900">
            {userName}
          </div>
          <div className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-blue-700">
            Comunidade UniFio
          </div>
        </div>

        <FaChevronDown
          className={`text-sm text-slate-500 transition-transform ${
            isMenuOpen ? 'rotate-180' : ''
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 mt-3 w-[19rem] overflow-hidden rounded-[24px] border border-white/70 bg-white/94 shadow-[0_30px_60px_-34px_rgba(15,23,42,0.38)] backdrop-blur-xl"
          >
            <div className="border-b border-slate-200 px-4 py-4">
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Conta verificada
              </div>
              <div className="mt-2 text-base font-semibold text-slate-900">
                {userName}
              </div>
              <div className="mt-1 text-sm leading-6 text-slate-500">
                Acesso liberado para a comunidade UniFio.
              </div>
            </div>

            <div className="space-y-2 px-3 py-3">
              {quickLinks.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    item.action();
                  }}
                  className="flex w-full items-start gap-3 rounded-[18px] px-3 py-3 text-left transition-colors hover:bg-blue-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <item.icon className="text-sm" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {item.label}
                    </div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-slate-200 px-3 py-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-[18px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
              >
                <FaSignOutAlt />
                Sair da conta
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
