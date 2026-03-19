'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  FaArrowRight,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaShieldAlt,
  FaSignOutAlt,
  FaStar,
  FaUser,
} from 'react-icons/fa';
import BottomNavigation from '../components/BottomNavigation';
import EditProfileModal from '../components/EditProfileModal';
import userService, { UserData } from '../services/userService';

export default function Profile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    ra: '',
    phone: '',
    image: '',
    rating: 4.8,
    totalRides: 45,
    isDriver: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        router.push('/login');
        return;
      }

      const data = await userService.getUserData();
      setUserData(data);
      setIsLoading(false);
    };

    checkAuth();

    const handleUserUpdate = (newData: UserData) => {
      setUserData(newData);
    };

    userService.addListener(handleUserUpdate);
    return () => userService.removeListener(handleUserUpdate);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    localStorage.removeItem('userEmail');
    router.push('/login');
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
    <div className="min-h-screen bg-slate-50 pb-28 pt-20">
      <main className="px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="dark-panel overflow-hidden px-5 py-6 sm:px-7"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-white/12 shadow-[0_24px_44px_-30px_rgba(15,23,42,0.68)]">
                  {userData.image ? (
                    <Image
                      src={userData.image}
                      alt={userData.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-4xl text-white/72" />
                  )}
                </div>

                <div>
                  <div className="inline-flex rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-100/82">
                    Conta verificada UniFio
                  </div>
                  <h1 className="mt-3 text-3xl font-semibold text-white">
                    {userData.name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-blue-100/88">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
                      <FaStar className="text-amber-300" />
                      {userData.rating}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
                      {userData.totalRides} caronas registradas
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="btn-secondary whitespace-nowrap"
              >
                Editar perfil
              </button>
            </div>
          </motion.section>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="brand-panel px-5 py-5 sm:px-6"
            >
              <span className="section-kicker">Identidade da conta</span>
              <div className="grid gap-3">
                <InfoCard icon={FaEnvelope} label="Email institucional" value={userData.email} />
                <InfoCard icon={FaIdCard} label="RA" value={userData.ra} />
                <InfoCard icon={FaPhone} label="Telefone" value={userData.phone} />
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="soft-panel px-5 py-5 sm:px-6"
            >
              <span className="section-kicker">Leitura do perfil</span>
              <div className="space-y-4">
                <div className="rounded-[22px] border border-blue-100 bg-blue-50/80 px-4 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                    <FaShieldAlt />
                    Comunidade verificada
                  </div>
                  <p className="mt-2 text-sm leading-6 text-blue-700">
                    Esta conta ajuda a demonstrar como o UniGo pode operar com um
                    contexto fechado e mais confiavel dentro da UniFio.
                  </p>
                </div>

                {userData.isDriver ? (
                  <div className="rounded-[22px] border border-slate-200 bg-white/90 px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">
                      Presenca como motorista
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Seu perfil tambem reforca o lado de oferta do produto, mostrando
                      que o app consegue atender tanto quem procura quanto quem compartilha rota.
                    </p>
                  </div>
                ) : null}
              </div>
            </motion.section>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <button
              type="button"
              onClick={() => router.push('/ride-history')}
              className="feature-card p-5 text-left"
            >
              <div className="relative z-10">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Historico
                </div>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  Rever rotas e combinacoes anteriores
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Veja como a sua rotina de uso do app aparece para aluno e professor.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                  Abrir historico
                  <FaArrowRight className="text-xs" />
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push('/settings')}
              className="feature-card p-5 text-left"
            >
              <div className="relative z-10">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Preferencias
                </div>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  Ajustar visibilidade e notificacoes
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Mantenha a conta coerente com a experiencia que a landing promete.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                  Abrir configuracoes
                  <FaArrowRight className="text-xs" />
                </div>
              </div>
            </button>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="soft-panel mt-6 px-5 py-5 sm:px-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="section-kicker mb-0">Sessao</div>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  Encerrar acesso deste ambiente
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Use esta opcao para sair da conta e voltar ao fluxo publico do app.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
              >
                <FaSignOutAlt />
                Sair da conta
              </button>
            </div>
          </motion.section>
        </div>
      </main>

      <BottomNavigation />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
      />
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-[22px] border border-slate-200/75 bg-white/90 px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="feature-icon h-10 w-10 shrink-0 rounded-2xl">
          <Icon className="text-sm" />
        </div>
        <div className="min-w-0">
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
            {label}
          </div>
          <div className="mt-2 break-words text-sm font-semibold text-slate-900 sm:text-base">
            {value}
          </div>
        </div>
      </div>
    </article>
  );
}
