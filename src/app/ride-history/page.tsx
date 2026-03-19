'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCar,
  FaHistory,
  FaMoneyBillWave,
  FaRoute,
  FaUser,
} from 'react-icons/fa';
import BottomNavigation from '../components/BottomNavigation';

type PassengerRide = {
  id: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: string;
  status: 'Confirmada' | 'Concluida' | 'Cancelada';
  driver: {
    name: string;
    rating: number;
    image: string;
  };
};

type DriverRide = {
  id: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  earnings: string;
  status: 'Confirmada' | 'Concluida' | 'Cancelada';
};

const daysAgo = (days: number) =>
  new Date(Date.now() - days * 86400000).toISOString().split('T')[0];

const passengerRides: PassengerRide[] = [
  {
    id: 1001,
    origin: 'Praca Mello Peixoto, Centro',
    destination: 'UniFio - Campus principal',
    date: daysAgo(1),
    time: '07:30',
    price: 'R$ 4,00',
    status: 'Concluida',
    driver: {
      name: 'Carlos Souza',
      rating: 4.9,
      image: '/images/avatar2.jpg',
    },
  },
  {
    id: 1002,
    origin: 'Ourinhos Plaza Shopping',
    destination: 'UniFio - Campus principal',
    date: daysAgo(2),
    time: '07:15',
    price: 'R$ 5,00',
    status: 'Concluida',
    driver: {
      name: 'Ricardo Alves',
      rating: 4.8,
      image: '/images/avatar5.jpg',
    },
  },
  {
    id: 1003,
    origin: 'UniFio - Campus principal',
    destination: 'Terminal Rodoviario de Ourinhos',
    date: daysAgo(4),
    time: '18:05',
    price: 'R$ 4,00',
    status: 'Cancelada',
    driver: {
      name: 'Mariana Costa',
      rating: 4.7,
      image: '/images/avatar3.jpg',
    },
  },
];

const driverRides: DriverRide[] = [
  {
    id: 2001,
    origin: 'Praca Mello Peixoto, Centro',
    destination: 'UniFio - Campus principal',
    date: daysAgo(1),
    time: '07:30',
    passengers: 3,
    earnings: 'R$ 12,00',
    status: 'Concluida',
  },
  {
    id: 2002,
    origin: 'UniFio - Campus principal',
    destination: 'Terminal Rodoviario de Ourinhos',
    date: daysAgo(3),
    time: '18:00',
    passengers: 4,
    earnings: 'R$ 16,00',
    status: 'Concluida',
  },
  {
    id: 2003,
    origin: 'Santa Casa de Ourinhos',
    destination: 'UniFio - Campus principal',
    date: daysAgo(5),
    time: '07:15',
    passengers: 0,
    earnings: 'R$ 0,00',
    status: 'Cancelada',
  },
];

export default function RideHistory() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'passenger' | 'driver'>('passenger');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/login');
      return;
    }

    setIsLoading(false);
  }, [router]);

  const passengerSummary = useMemo(() => {
    const completed = passengerRides.filter((ride) => ride.status === 'Concluida');
    return {
      rides: completed.length,
      totalSpent: 'R$ 9,00',
      lastStatus: passengerRides[0]?.status || 'Sem dados',
    };
  }, []);

  const driverSummary = useMemo(() => {
    const completed = driverRides.filter((ride) => ride.status === 'Concluida');
    return {
      rides: completed.length,
      totalPassengers: completed.reduce((sum, ride) => sum + ride.passengers, 0),
      totalEarnings: 'R$ 28,00',
    };
  }, []);

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
        <div className="container mx-auto max-w-6xl">
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
                <FaArrowLeft />
              </button>

              <div>
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Historico de uso
                </div>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Rotas que ja passaram pela sua rotina
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                  Esta tela ajuda a demonstrar frequencia de uso, padrao de trajetos
                  e o tipo de leitura que o UniGo pode gerar dentro da experiencia UniFio.
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('passenger')}
                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  activeTab === 'passenger'
                    ? 'bg-slate-950 text-white'
                    : 'bg-white text-slate-600'
                }`}
              >
                Como passageiro
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('driver')}
                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  activeTab === 'driver'
                    ? 'bg-slate-950 text-white'
                    : 'bg-white text-slate-600'
                }`}
              >
                Como motorista
              </button>
            </div>
          </motion.section>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              {activeTab === 'passenger'
                ? passengerRides.map((ride) => (
                    <motion.article
                      key={ride.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="feature-card p-5"
                    >
                      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div className="flex shrink-0 items-center gap-3">
                          <Image
                            src={ride.driver.image}
                            alt={ride.driver.name}
                            width={52}
                            height={52}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              {ride.driver.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              Nota {ride.driver.rating}
                            </div>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blue-700">
                            {new Date(ride.date).toLocaleDateString('pt-BR')} as {ride.time}
                          </div>
                          <h2 className="mt-2 text-base font-semibold leading-6 text-slate-900">
                            {ride.origin} {'>'} {ride.destination}
                          </h2>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <StatusPill status={ride.status} />
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                              {ride.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))
                : driverRides.map((ride) => (
                    <motion.article
                      key={ride.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="feature-card p-5"
                    >
                      <div className="relative z-10">
                        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blue-700">
                          {new Date(ride.date).toLocaleDateString('pt-BR')} as {ride.time}
                        </div>
                        <h2 className="mt-2 text-base font-semibold leading-6 text-slate-900">
                          {ride.origin} {'>'} {ride.destination}
                        </h2>
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <StatusPill status={ride.status} />
                          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                            {ride.passengers} passageiros
                          </span>
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            {ride.earnings}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="space-y-4"
            >
              <div className="soft-panel px-5 py-5 sm:px-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FaHistory className="text-blue-700" />
                  Resumo desta leitura
                </div>

                {activeTab === 'passenger' ? (
                  <div className="mt-4 grid gap-3">
                    <SummaryRow
                      icon={FaUser}
                      label="Caronas concluidas"
                      value={String(passengerSummary.rides)}
                    />
                    <SummaryRow
                      icon={FaMoneyBillWave}
                      label="Valor observado"
                      value={passengerSummary.totalSpent}
                    />
                    <SummaryRow
                      icon={FaCalendarAlt}
                      label="Ultimo status"
                      value={passengerSummary.lastStatus}
                    />
                  </div>
                ) : (
                  <div className="mt-4 grid gap-3">
                    <SummaryRow
                      icon={FaCar}
                      label="Rotas concluidas"
                      value={String(driverSummary.rides)}
                    />
                    <SummaryRow
                      icon={FaUser}
                      label="Passageiros atendidos"
                      value={String(driverSummary.totalPassengers)}
                    />
                    <SummaryRow
                      icon={FaMoneyBillWave}
                      label="Valor combinado"
                      value={driverSummary.totalEarnings}
                    />
                  </div>
                )}
              </div>

              <div className="brand-panel px-5 py-5 sm:px-6">
                <div className="section-kicker mb-0">O que esta tela prova</div>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  O historico ajuda a contar uma historia simples para o professor:
                  existe uso, existe recorrencia e existe valor percebido no deslocamento
                  da comunidade UniFio.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <FaRoute />
                  Produto com leitura real de jornada
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles =
    status === 'Concluida'
      ? 'border-green-200 bg-green-50 text-green-700'
      : status === 'Cancelada'
      ? 'border-red-200 bg-red-50 text-red-600'
      : 'border-blue-200 bg-blue-50 text-blue-700';

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white/90 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="feature-icon h-10 w-10 shrink-0 rounded-2xl">
          <Icon className="text-sm" />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
            {label}
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-900">{value}</div>
        </div>
      </div>
    </div>
  );
}
