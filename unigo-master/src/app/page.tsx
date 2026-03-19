'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaArrowRight,
  FaBus,
  FaComments,
  FaHome,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaRoute,
  FaShieldAlt,
  FaSync,
  FaUniversity,
} from 'react-icons/fa';
import BrandLogo from './components/BrandLogo';

const previewRides = [
  {
    origin: 'República Universitária',
    destination: 'UniFio',
    meta: 'Hoje, 18:10 • 2 vagas',
    status: 'Hoje',
  },
  {
    origin: 'Terminal Rodoviário',
    destination: 'UniFio',
    meta: 'Carona fixa • Segunda a sexta',
    status: 'Fixa',
  },
] as const;

const steps = [
  {
    icon: FaUniversity,
    title: 'Entre com sua conta UniFio',
    description:
      'A experiência começa no contexto do campus e deixa a comunidade mais clara desde o primeiro acesso.',
  },
  {
    icon: FaMapMarkedAlt,
    title: 'Encontre ou ofereça sua rota',
    description:
      'Veja quem faz um caminho parecido ou publique sua carona em poucos toques.',
  },
  {
    icon: FaComments,
    title: 'Combine tudo no chat',
    description:
      'Horário, valor e ponto de encontro ficam alinhados sem sair do app.',
  },
] as const;

const cityRoutes = [
  {
    icon: FaBus,
    eyebrow: 'Intermunicipal',
    origin: 'Terminal Rodoviario de Ourinhos',
    address: 'Rua Santa Catarina, 415 - Vila Perino',
    description:
      'Entrada natural para alunos que chegam de outras cidades e precisam completar o trecho ate a UniFio.',
    badge: 'Chegada frequente',
    badgeClass: 'bg-sky-50 text-sky-700',
  },
  {
    icon: FaHome,
    eyebrow: 'Residencial',
    origin: 'Nova Ourinhos',
    address: 'Av. Luiz Saldanha Rodrigues - Nova Ourinhos',
    description:
      'Eixo residencial que combina bem com caronas recorrentes para quem sai no mesmo horario de aula.',
    badge: 'Rota recorrente',
    badgeClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: FaMapMarkerAlt,
    eyebrow: 'Ponto urbano',
    origin: 'Vila Odilon',
    address: 'Rua Republica - Vila Odilon',
    description:
      'Origem util para combinar embarques curtos dentro da cidade antes do trajeto ate o campus.',
    badge: 'Encontro rapido',
    badgeClass: 'bg-amber-50 text-amber-700',
  },
] as const;

const campusReasons = [
  {
    icon: FaRoute,
    eyebrow: 'Uso real',
    title: 'Uma solução pensada para a rotina do campus',
    description:
      'O UniGo resolve uma necessidade concreta do dia a dia com fluxo simples, recorrente e nativo do mobile.',
  },
  {
    icon: FaComments,
    eyebrow: 'Comunidade',
    title: 'Conecta estudantes com mais clareza e pertencimento',
    description:
      'As caronas passam a nascer dentro do contexto UniFio, com mais alinhamento, conversa e sensação de comunidade.',
  },
  {
    icon: FaUniversity,
    eyebrow: 'Potencial',
    title: 'Cria uma base com leitura institucional forte',
    description:
      'Começa útil para o aluno e já se apresenta como uma frente que pode amadurecer com identidade própria.',
  },
] as const;

const pillars = [
  {
    title: 'Experiência estudantil',
    description:
      'Reduz o atrito do deslocamento e melhora a rotina de quem vive o campus todos os dias.',
  },
  {
    title: 'Inovação percebida',
    description:
      'Apresenta a UniFio ao aluno com uma solução digital útil, atual e fácil de entender.',
  },
  {
    title: 'Base institucional',
    description:
      'Começa forte dentro da comunidade e já nasce com estrutura para evoluir depois.',
  },
] as const;

const previewHighlights = [
  { label: 'Chat', icon: FaComments },
  { label: 'Segura', icon: FaShieldAlt },
  { label: 'Recorrente', icon: FaSync },
] as const;

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55 },
  viewport: { once: true, amount: 0.2 },
} as const;

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem('userToken')));
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCreateAccount = () => {
    router.push(isLoggedIn ? '/dashboard' : '/register');
  };

  const handleAccountLink = () => {
    router.push(isLoggedIn ? '/dashboard' : '/login');
  };

  return (
    <main className="min-h-screen overflow-x-clip">
      <section className="relative isolate px-4 pb-14 pt-24 md:pb-20 md:pt-32">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 wave-pattern opacity-70" />
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_62%)]" />

        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.82fr)] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="max-w-2xl"
            >
              <span className="brand-badge">Feito para a rotina da comunidade UniFio</span>

              <div className="mt-6">
                <BrandLogo size="lg" caption="Caronas universitárias na UniFio" />
              </div>

              <h1 className="font-display mt-8 max-w-[13ch] text-[2.85rem] leading-[0.95] text-slate-950 sm:text-[3.75rem]">
                A forma mais simples de ir para a UniFio.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                O UniGo conecta estudantes que fazem rotas parecidas, organiza a
                carona pelo chat e deixa o trajeto até o campus mais leve.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Ele começa resolvendo a mobilidade do aluno, mas já comunica uma
                solução com valor claro para a experiência da comunidade UniFio.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('app-preview')}
                >
                  Ver como funciona
                  <FaArrowRight className="h-4 w-4" />
                </motion.button>

                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateAccount}
                >
                  {isLoggedIn ? 'Abrir dashboard' : 'Criar conta'}
                </motion.button>
              </div>

              <button
                onClick={handleAccountLink}
                className="mt-4 text-sm font-semibold text-blue-800 transition-colors hover:text-blue-600"
              >
                {isLoggedIn ? 'Ir para minha conta' : 'Já tenho uma conta'}
              </button>
            </motion.div>

            <motion.div
              id="app-preview"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="brand-panel scroll-mt-24 mx-auto w-full max-w-sm overflow-hidden p-3 sm:max-w-md sm:p-5 lg:ml-auto"
            >
              <div className="rounded-[30px] bg-slate-950 p-2 shadow-[0_28px_60px_-32px_rgba(15,31,77,0.86)]">
                <div className="rounded-[26px] bg-white px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <BrandLogo size="sm" showWordmark={false} />
                      <div className="min-w-0 max-w-[9.75rem] sm:max-w-none">
                        <div className="text-[1.28rem] font-semibold leading-none text-slate-950">
                          UniGo
                        </div>
                        <div className="mt-1 text-[0.76rem] leading-5 text-slate-500">
                          Comunidade UniFio
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-blue-700">
                      Ao vivo
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Acesso UniFio', 'Sem taxa mensal'].map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-blue-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3">
                    {previewRides.map((ride) => (
                      <div key={`${ride.origin}-${ride.destination}`} className="soft-panel p-4">
                        <div className="flex items-start gap-3">
                          <div className="feature-icon h-11 w-11 shrink-0 rounded-2xl">
                            <FaRoute className="h-4 w-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-[1.05rem] font-semibold leading-7 text-slate-900">
                                  {ride.origin}
                                </div>
                                <div className="mt-0.5 flex items-center gap-2 text-[1.05rem] font-semibold leading-7 text-slate-900">
                                  <FaArrowRight className="h-3.5 w-3.5 shrink-0 text-blue-700" />
                                  <span className="truncate">{ride.destination}</span>
                                </div>
                              </div>

                              <div className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                {ride.status}
                              </div>
                            </div>

                            <div className="mt-2 text-sm leading-6 text-slate-500">
                              {ride.meta}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {previewHighlights.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[18px] border border-slate-100 bg-slate-50/90 px-3 py-3 text-center"
                      >
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-[0_12px_26px_-18px_rgba(15,23,42,0.45)]">
                          <item.icon className="h-4 w-4 text-blue-700" />
                        </div>
                        <div className="mt-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="rotas-unifio" className="scroll-mt-24 px-4 py-14 md:py-18">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="section-kicker">Rotas ate a UniFio</span>
            <h2 className="font-display text-4xl text-slate-950 md:text-5xl">
              Um mapa que conecta pontos reais da cidade ao campus.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Inspirado na logica de mapa de produto, o UniGo pode mostrar rotas
              urbanas e intermunicipais chegando a um destino central: a UniFio.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-start">
            <div className="brand-panel overflow-hidden p-4 sm:p-5">
              <div className="relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.92))] px-4 pb-4 pt-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(15,31,77,0.08),transparent_28%)]" />
                <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:26px_26px]" />

                <div className="relative z-10 flex flex-wrap gap-2">
                  <div className="rounded-full bg-slate-950 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white">
                    Destino central
                  </div>
                  <div className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    3 origens de exemplo
                  </div>
                </div>

                <div className="relative z-10 mt-5 h-[22rem] sm:h-[24rem]">
                  <svg
                    viewBox="0 0 340 360"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <path
                      d="M44 88C108 92 142 122 180 148C217 173 248 180 286 176"
                      fill="none"
                      stroke="rgba(59,130,246,0.68)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="8 10"
                    />
                    <path
                      d="M54 286C108 268 152 232 198 180C228 146 250 120 286 176"
                      fill="none"
                      stroke="rgba(16,185,129,0.62)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="8 10"
                    />
                    <path
                      d="M232 296C228 258 238 232 256 214C271 198 278 188 286 176"
                      fill="none"
                      stroke="rgba(245,158,11,0.72)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="8 10"
                    />
                  </svg>

                  <div className="absolute left-[9%] top-[16%] w-[8.4rem] rounded-2xl border border-white/80 bg-white/92 p-3 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)]">
                    <div className="flex items-center gap-2">
                      <div className="feature-icon h-9 w-9 rounded-2xl">
                        <FaBus className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[0.78rem] font-semibold leading-5 text-slate-900">
                          Terminal
                        </div>
                        <div className="text-[0.68rem] leading-4 text-slate-500">
                          Santa Catarina, 415
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[8%] top-[69%] w-[8.8rem] rounded-2xl border border-white/80 bg-white/92 p-3 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)]">
                    <div className="flex items-center gap-2">
                      <div className="feature-icon h-9 w-9 rounded-2xl">
                        <FaHome className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[0.78rem] font-semibold leading-5 text-slate-900">
                          Nova Ourinhos
                        </div>
                        <div className="text-[0.68rem] leading-4 text-slate-500">
                          Luiz Saldanha Rodrigues
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[58%] top-[72%] w-[7.6rem] rounded-2xl border border-white/80 bg-white/92 p-3 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)]">
                    <div className="flex items-center gap-2">
                      <div className="feature-icon h-9 w-9 rounded-2xl">
                        <FaMapMarkerAlt className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[0.78rem] font-semibold leading-5 text-slate-900">
                          Vila Odilon
                        </div>
                        <div className="text-[0.68rem] leading-4 text-slate-500">
                          Rua Republica
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[66%] top-[22%] w-[8.7rem] rounded-[1.35rem] border border-blue-200 bg-slate-950/96 p-3 text-white shadow-[0_28px_52px_-28px_rgba(15,31,77,0.8)]">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/12 text-white">
                        <FaUniversity className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[0.82rem] font-semibold leading-5">
                          Campus UniFio
                        </div>
                        <div className="text-[0.68rem] leading-4 text-blue-100/78">
                          BR-153, km 338+420m
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 rounded-full bg-white/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-blue-100/86">
                      Agua do Cateto
                    </div>
                  </div>

                  <div className="absolute left-[18%] top-[28%] h-3.5 w-3.5 rounded-full border-[3px] border-white bg-sky-500 shadow-[0_0_0_8px_rgba(14,165,233,0.14)]" />
                  <div className="absolute left-[18%] top-[78%] h-3.5 w-3.5 rounded-full border-[3px] border-white bg-emerald-500 shadow-[0_0_0_8px_rgba(16,185,129,0.14)]" />
                  <div className="absolute left-[72%] top-[78%] h-3.5 w-3.5 rounded-full border-[3px] border-white bg-amber-500 shadow-[0_0_0_8px_rgba(245,158,11,0.14)]" />
                  <div className="absolute left-[78%] top-[42%] h-4 w-4 rounded-full border-[4px] border-white bg-blue-600 shadow-[0_0_0_10px_rgba(37,99,235,0.16)]" />
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {cityRoutes.map((route) => (
                <article key={route.origin} className="feature-card p-5">
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="feature-icon h-11 w-11 shrink-0 rounded-2xl">
                      <route.icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                            {route.eyebrow}
                          </div>
                          <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-900">
                            {route.origin}
                          </h3>
                        </div>

                        <div
                          className={`rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${route.badgeClass}`}
                        >
                          {route.badge}
                        </div>
                      </div>

                      <div className="mt-2 text-sm font-medium leading-6 text-slate-700">
                        {route.address}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {route.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}

              <div className="soft-panel px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="feature-icon h-10 w-10 shrink-0 rounded-2xl">
                    <FaMapMarkedAlt className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
                      Endereco de destino
                    </div>
                    <div className="mt-2 text-base font-semibold text-slate-900">
                      Rodovia BR-153, km 338+420m - Agua do Cateto
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-500">
                      Assim a landing deixa claro que o UniGo pode organizar caronas
                      usando referencias reais da rotina de Ourinhos e da chegada ao
                      campus.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="valor-unifio" className="scroll-mt-24 px-4 py-14 md:py-18">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="section-kicker">Valor para a UniFio</span>
            <h2 className="font-display text-4xl text-slate-950 md:text-5xl">
              Pensado para alunos. Relevante para o campus.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              O UniGo nasce como produto de uso real para estudantes, mas também
              ajuda a traduzir cuidado, inovação e visão de futuro dentro da
              experiência universitária.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            {campusReasons.map((reason) => (
              <article key={reason.title} className="feature-card p-5">
                <div className="relative z-10 flex items-start gap-4">
                  <div className="feature-icon h-11 w-11 shrink-0 rounded-2xl">
                    <reason.icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                      {reason.eyebrow}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-900">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-24 px-4 py-14 md:py-18">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="section-kicker">Como funciona</span>
            <h2 className="font-display text-4xl text-slate-950 md:text-5xl">
              Poucos passos, clareza total no mobile.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              O fluxo foi pensado para o que realmente importa: entrar rápido,
              encontrar uma rota útil e alinhar a carona sem atrito.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="soft-panel p-5">
                <div className="flex items-start gap-4">
                  <div className="feature-icon h-11 w-11 shrink-0 rounded-2xl">
                    <step.icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                      Passo {index + 1}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="mais-que-uma-carona"
        className="scroll-mt-24 px-4 pb-20 pt-2 md:pb-24"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeInUp} className="dark-panel overflow-hidden p-6 sm:p-8">
            <span className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-100/78">
              Mais que uma carona
            </span>

            <h2 className="font-display mt-3 max-w-3xl text-4xl text-white md:text-5xl">
              Uma camada nova de mobilidade para a vida no campus.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100/88">
              O UniGo melhora a rotina do aluno agora, reforça a percepção de
              cuidado com a comunidade e abre espaço para a UniFio evoluir essa
              experiência com identidade própria.
            </p>

            <div className="mt-8 grid gap-3 lg:grid-cols-3">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-[22px] border border-white/12 bg-white/8 px-4 py-4"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-100/74">
                    {pillar.title}
                  </div>
                  <div className="mt-3 text-sm leading-6 text-blue-50/88">
                    {pillar.description}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
