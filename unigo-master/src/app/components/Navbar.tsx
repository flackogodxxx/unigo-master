'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaAngleDown,
  FaBars,
  FaBell,
  FaCog,
  FaHistory,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import BrandLogo from './BrandLogo';
import userService, { UserData } from '../services/userService';

const landingLinks = [
  { href: '#rotas-unifio', label: 'Rotas' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#valor-unifio', label: 'Valor UniFio' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLandingPage = pathname === '/';
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isPublicPage = isLandingPage || isAuthPage;

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setHasToken(Boolean(localStorage.getItem('userToken')));
  }, [pathname]);

  useEffect(() => {
    if (isPublicPage) {
      setUserData(null);
      return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
      setUserData(null);
      return;
    }

    const loadUserData = async () => {
      const data = await userService.getUserData();
      setUserData(data);
    };

    loadUserData();

    const handleUserUpdate = (newData: UserData) => {
      setUserData(newData);
    };

    userService.addListener(handleUserUpdate);

    return () => {
      userService.removeListener(handleUserUpdate);
    };
  }, [isPublicPage]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    localStorage.removeItem('userEmail');
    setHasToken(false);
    setUserData(null);
    router.push('/login');
  };

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/passenger-dashboard', label: 'Buscar Carona' },
    { href: '/driver-dashboard', label: 'Oferecer Carona' },
    { href: '/prime', label: 'Institucional' },
  ];

  const publicLinks = isLandingPage
    ? landingLinks
    : landingLinks.map((item) => ({ ...item, href: `/${item.href}` }));

  const primaryHref = hasToken
    ? '/dashboard'
    : isAuthPage
      ? pathname === '/login'
        ? '/register'
        : '/login'
      : '/register';

  const primaryLabel = hasToken
    ? 'Abrir dashboard'
    : isAuthPage
      ? pathname === '/login'
        ? 'Criar conta'
        : 'Entrar'
      : 'Criar conta';

  const secondaryHref = isAuthPage ? '/' : '/login';
  const secondaryLabel = isAuthPage ? 'Voltar ao site' : 'Entrar';

  const isActive = (href: string) =>
    pathname === href || (href !== '/dashboard' && pathname.startsWith(`${href}/`));

  if (isPublicPage) {
    return (
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/70 bg-white/78 shadow-sm backdrop-blur-xl">
        <div className="container mx-auto flex h-[4.6rem] items-center justify-between px-4 md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <BrandLogo size="sm" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {publicLinks.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href={secondaryHref} className="btn-secondary">
              {secondaryLabel}
            </Link>
            <Link href={primaryHref} className="btn-primary">
              {primaryLabel}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href={secondaryHref}
              className="px-1 text-[0.83rem] font-semibold text-slate-700 transition-colors hover:text-blue-800"
            >
              {isAuthPage ? 'Voltar' : secondaryLabel}
            </Link>

            <Link
              href={primaryHref}
              className="inline-flex h-10 items-center justify-center rounded-full bg-slate-950 px-3.5 text-[0.75rem] font-semibold text-white shadow-[0_18px_36px_-24px_rgba(15,23,42,0.7)] transition-colors hover:bg-blue-900"
            >
              <span className="hidden min-[380px]:inline">{primaryLabel}</span>
              <span className="min-[380px]:hidden">{hasToken ? 'App' : 'Criar'}</span>
            </Link>

            {isLandingPage ? (
              <button
                onClick={() => setIsMenuOpen((current) => !current)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/84 text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-900"
                aria-label="Abrir menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            ) : null}
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && isLandingPage ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="border-t border-slate-200/80 bg-white/92 px-4 py-5 backdrop-blur-xl md:hidden"
            >
              <div className="container mx-auto space-y-3">
                {publicLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href={primaryHref}
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-[0_18px_36px_-24px_rgba(15,23,42,0.7)] transition-colors hover:bg-blue-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {primaryLabel}
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    );
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-slate-200/70 bg-white/92 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <BrandLogo size="sm" caption="UniFio" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-700'
                    : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="hidden xl:inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Comunidade UniFio
            </div>

            <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100">
              <FaBell />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((current) => !current)}
                className="flex items-center gap-3 rounded-full px-2 py-1 transition-colors hover:bg-slate-50"
              >
                <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-200">
                  {userData?.image ? (
                    <Image
                      src={userData.image}
                      alt={userData.name || 'Usuário'}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUser className="h-full w-full p-2 text-slate-400" />
                  )}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-800">
                    {userData?.name || 'Usuário'}
                  </div>
                  <div className="text-xs text-slate-500">Comunidade UniFio</div>
                </div>
                <FaAngleDown
                  className={`text-slate-400 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-xl"
                  >
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-50"
                    >
                      <FaUser className="text-slate-400" />
                      <span>Meu Perfil</span>
                    </Link>
                    <Link
                      href="/ride-history"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-50"
                    >
                      <FaHistory className="text-slate-400" />
                      <span>Histórico</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-50"
                    >
                      <FaCog className="text-slate-400" />
                      <span>Configurações</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      <FaSignOutAlt className="text-red-500" />
                      <span>Sair</span>
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="border-t border-slate-200 bg-white md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="mb-4 flex items-center gap-3 rounded-[22px] bg-slate-50 p-4">
                <div className="h-11 w-11 overflow-hidden rounded-full bg-slate-200">
                  {userData?.image ? (
                    <Image
                      src={userData.image}
                      alt={userData.name || 'Usuário'}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUser className="h-full w-full p-2 text-slate-400" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {userData?.name || 'Usuário'}
                  </div>
                  <div className="text-sm text-slate-500">
                    {userData?.email || 'usuario@unifio.edu.br'}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/profile"
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meu Perfil
                </Link>
                <Link
                  href="/ride-history"
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Histórico
                </Link>
                <Link
                  href="/settings"
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Configurações
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Sair
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
