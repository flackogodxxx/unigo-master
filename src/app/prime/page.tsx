'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaChartLine,
  FaLeaf,
  FaShieldAlt,
  FaUsers,
} from 'react-icons/fa';
import BrandLogo from '../components/BrandLogo';

const pillars = [
  {
    icon: FaUsers,
    eyebrow: 'Vida no campus',
    title: 'Uma rotina mais conectada para quem vive a UniFio',
    text: 'O UniGo parte de uma necessidade pratica do aluno: encontrar rotas parecidas e reduzir o atrito do deslocamento diario.',
  },
  {
    icon: FaShieldAlt,
    eyebrow: 'Comunidade validada',
    title: 'Acesso ligado ao contexto da faculdade',
    text: 'O produto ganha mais confianca quando nasce dentro da comunidade academica e fala com a realidade da UniFio.',
  },
  {
    icon: FaLeaf,
    eyebrow: 'Impacto local',
    title: 'Mobilidade mais leve ao redor do campus',
    text: 'A proposta ajuda a reduzir custo individual, reorganizar embarques e diminuir a sobrecarga do trajeto para a faculdade.',
  },
] as const;

const views = [
  {
    title: 'Leitura institucional',
    text: 'A faculdade passa a enxergar um produto que melhora experiencia, permanencia e conexao entre alunos.',
  },
  {
    title: 'Comeco local, visao escalavel',
    text: 'A UniFio vira o primeiro ambiente real de uso antes da expansao para outras instituicoes.',
  },
  {
    title: 'Produto, nao trabalho pontual',
    text: 'A apresentacao fica mais forte porque a ideia aparece como software vivo, com uso, linguagem e fluxo coerentes.',
  },
] as const;

const horizons = [
  'Consolidar a comunidade UniFio como primeira base real de uso.',
  'Medir adesao, impacto e padroes de deslocamento do campus.',
  'Transformar a experiencia em um plano institucional replicavel.',
] as const;

export default function PrimePage() {
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

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-20">
      <main className="px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dark-panel overflow-hidden px-5 py-6 sm:px-7 sm:py-7"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="brand-badge bg-white/10 text-blue-100">
                  Visao institucional UniFio
                </span>

                <div className="mt-5">
                  <BrandLogo
                    size="sm"
                    theme="light"
                    caption="Produto local com potencial institucional"
                  />
                </div>

                <h1 className="font-display mt-6 text-4xl text-white md:text-5xl">
                  Como o UniGo pode nascer dentro da UniFio e ganhar forca como produto.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/86 sm:text-base">
                  Esta area mostra o lado institucional da proposta: um software pensado
                  para melhorar a rotina do campus agora e amadurecer como solucao
                  replicavel depois.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-[26rem]">
                <div className="rounded-[22px] border border-white/10 bg-white/10 px-4 py-4">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-100/74">
                    Contexto
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Comunidade UniFio
                  </div>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/10 px-4 py-4">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-100/74">
                    Foco
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Mobilidade e rotina
                  </div>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/10 px-4 py-4">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-100/74">
                    Leitura
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Produto em desenvolvimento
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <section className="mt-8">
            <span className="section-kicker">Por que comeca aqui</span>
            <div className="grid gap-4">
              {pillars.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.06 }}
                  className="feature-card p-5"
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="feature-icon h-11 w-11 shrink-0 rounded-2xl">
                      <item.icon className="text-sm" />
                    </div>
                    <div>
                      <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                        {item.eyebrow}
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-slate-900">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="brand-panel px-5 py-5 sm:px-6"
            >
              <span className="section-kicker">O que a UniFio enxerga</span>
              <div className="space-y-4">
                {views.map((item, index) => (
                  <div
                    key={item.title}
                    className={`rounded-[22px] border border-slate-200/75 bg-white/88 px-4 py-4 ${
                      index === 0 ? 'shadow-[0_20px_40px_-30px_rgba(15,23,42,0.18)]' : ''
                    }`}
                  >
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              className="soft-panel px-5 py-5 sm:px-6"
            >
              <span className="section-kicker">Proximo horizonte</span>
              <div className="space-y-4">
                {horizons.map((item, index) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] border border-blue-100 bg-blue-50/70 px-4 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                  <FaChartLine />
                  Leitura para demonstracao
                </div>
                <p className="mt-2 text-sm leading-6 text-blue-700">
                  O valor aqui nao esta em vender um plano, e sim em mostrar que a
                  UniFio pode ser o primeiro ambiente real de um produto util, claro e escalavel.
                </p>
              </div>
            </motion.div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="mt-8 brand-panel px-5 py-5 sm:px-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <span className="section-kicker">Fechamento</span>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Produto local, leitura institucional e espaco real para crescer.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {userName}, esta tela existe para mostrar que o UniGo pode ser
                  percebido como tecnologia viva dentro da UniFio, sem perder a
                  clareza de que o foco segue sendo a experiencia do aluno.
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push('/wallet')}
                className="btn-secondary whitespace-nowrap"
              >
                Ver impacto do produto
                <FaArrowRight className="text-sm" />
              </button>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
