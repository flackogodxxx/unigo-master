'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaChartLine,
  FaLeaf,
  FaRoute,
  FaWallet,
} from 'react-icons/fa';
import BottomNavigation from '../components/BottomNavigation';

interface Activity {
  id: string;
  type: 'ride' | 'fixed';
  description: string;
  date: string;
  saved: number;
}

const activitiesSeed: Activity[] = [
  {
    id: '1',
    type: 'ride',
    description: 'Carona com Ana Silva entre a Praca Mello Peixoto e a UniFio',
    date: new Date().toISOString(),
    saved: 12.0,
  },
  {
    id: '2',
    type: 'fixed',
    description: 'Participacao em rota recorrente do centro durante a semana',
    date: new Date(Date.now() - 86400000).toISOString(),
    saved: 80.0,
  },
  {
    id: '3',
    type: 'ride',
    description: 'Carona com Carlos Souza saindo do Ourinhos Plaza Shopping',
    date: new Date(Date.now() - 172800000).toISOString(),
    saved: 8.5,
  },
  {
    id: '4',
    type: 'ride',
    description: 'Retorno da UniFio para a rodoviaria em rota compartilhada',
    date: new Date(Date.now() - 259200000).toISOString(),
    saved: 6.0,
  },
] as const;

export default function WalletPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/login');
      return;
    }

    setUserName(localStorage.getItem('userName') || 'Comunidade UniFio');
  }, [router]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(new Date(value));

  return (
    <div className="min-h-screen bg-slate-50 pb-28 pt-20">
      <main className="px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="brand-panel px-5 py-5 sm:px-6"
          >
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Impacto do uso
            </div>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
              O que o UniGo representa na sua rotina
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              {userName}, esta tela resume economia, recorrencia e leitura de impacto
              do uso do produto. Os indicadores abaixo servem como demonstracao do
              valor que a experiencia pode gerar para aluno e instituicao.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <div className="stat-chip px-3 py-2 text-[0.78rem]">
                Leitura demonstrativa
              </div>
              <div className="stat-chip px-3 py-2 text-[0.78rem]">
                Comunidade UniFio
              </div>
              <div className="stat-chip px-3 py-2 text-[0.78rem]">
                Foco em mobilidade
              </div>
            </div>
          </motion.section>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={FaWallet}
              label="Economia acumulada"
              value={formatCurrency(186.5)}
              detail="Estimativa da diferenca entre caronas e deslocamentos individuais."
            />
            <MetricCard
              icon={FaLeaf}
              label="Reducao de impacto"
              value="42 kg"
              detail="Leitura visual do potencial ambiental quando a rota e compartilhada."
            />
            <MetricCard
              icon={FaRoute}
              label="Rotas compartilhadas"
              value="28"
              detail="Quantidade de experiencias usadas para construir este panorama."
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
                <FaChartLine className="text-sm" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Leitura que ajuda a apresentacao
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Em vez de parecer uma carteira financeira isolada, esta area passa a
                  comunicar impacto do produto: economia do aluno, repeticao de uso e
                  relevancia do trajeto no dia a dia da UniFio.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="brand-panel mt-6 overflow-hidden px-5 py-5 sm:px-6"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="section-kicker mb-0">Linha do tempo</div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Historico de economia percebida
                </h2>
              </div>
              <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                4 registros
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {activitiesSeed.map((activity) => (
                <article
                  key={activity.id}
                  className="rounded-[22px] border border-slate-200/80 bg-white/92 px-4 py-4 shadow-[0_18px_38px_-32px_rgba(15,23,42,0.22)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blue-700">
                        {activity.type === 'fixed' ? 'Rota recorrente' : 'Carona avulsa'}
                      </div>
                      <h3 className="mt-2 text-sm font-semibold leading-6 text-slate-900 sm:text-base">
                        {activity.description}
                      </h3>
                      <div className="mt-2 text-sm text-slate-500">
                        {formatDate(activity.date)}
                      </div>
                    </div>

                    <div className="rounded-[18px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-left sm:min-w-[9rem] sm:text-right">
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                        Economia
                      </div>
                      <div className="mt-2 text-base font-semibold text-emerald-700">
                        {formatCurrency(activity.saved)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-card p-5"
    >
      <div className="relative z-10">
        <div className="feature-icon h-11 w-11 rounded-2xl">
          <Icon className="text-sm" />
        </div>
        <div className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
          {label}
        </div>
        <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
        <p className="mt-3 text-sm leading-6 text-slate-500">{detail}</p>
      </div>
    </motion.article>
  );
}
