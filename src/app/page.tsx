/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaArrowRight,
  FaComments,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaRoute,
  FaUniversity,
  FaWhatsapp,
} from 'react-icons/fa';
import BrandLogo from './components/BrandLogo';

const steps = [
  {
    icon: FaUniversity,
    title: 'Entre com sua conta UniFio',
    description:
      'O acesso comeca no contexto da comunidade academica e deixa a experiencia mais clara desde o primeiro toque.',
  },
  {
    icon: FaMapMarkedAlt,
    title: 'Encontre ou ofereca sua rota',
    description:
      'Veja quem faz um trajeto parecido com o seu ou publique uma carona em poucos passos.',
  },
  {
    icon: FaComments,
    title: 'Converse e combine com liberdade',
    description:
      'Depois do match, motorista e passageiro podem alinhar horario, ponto de encontro e valor com mais praticidade.',
  },
] as const;

const cityRoutes = [
  {
    icon: FaUniversity,
    eyebrow: 'Moradias',
    origin: 'Republicas e moradias estudantis',
    shortLabel: 'Republicas',
    address: 'Bairros universitarios e entorno',
    description:
      'Uma base natural para caronas recorrentes, com alunos que costumam seguir horarios parecidos durante a semana.',
    markerPosition: 'left-[69%] top-[27%]',
    toneClass: 'bg-sky-500',
  },
  {
    icon: FaMapMarkerAlt,
    eyebrow: 'Centro',
    origin: 'Centro de Ourinhos',
    shortLabel: 'Centro',
    address: 'Avenidas, pracas e eixos centrais',
    description:
      'Ponto estrategico para encontros rapidos, embarques e conexoes entre bairros antes da chegada ao campus.',
    markerPosition: 'left-[47%] top-[72%]',
    toneClass: 'bg-emerald-500',
  },
  {
    icon: FaRoute,
    eyebrow: 'Bairros',
    origin: 'Zonas residenciais',
    shortLabel: 'Bairros',
    address: 'Zonas leste, oeste e sul',
    description:
      'Ajuda a aproximar alunos que saem de regioes proximas e podem dividir o trajeto de ida e volta com mais economia.',
    markerPosition: 'left-[78%] top-[76%]',
    toneClass: 'bg-amber-500',
  },
] as const;

const campusReasons = [
  {
    icon: FaRoute,
    eyebrow: 'Economia real',
    title: 'Menos custo para quem vai ao campus todos os dias',
    description:
      'O UniGo ajuda a dividir despesas de deslocamento e torna a rotina academica mais viavel para quem depende do trajeto ate a UniFio.',
  },
  {
    icon: FaComments,
    eyebrow: 'Experiencia do aluno',
    title: 'Uma rotina mais simples, conectada e organizada',
    description:
      'A carona deixa de ser improviso e passa a acontecer em um fluxo mais claro, rapido e facil de combinar.',
  },
  {
    icon: FaUniversity,
    eyebrow: 'Potencial institucional',
    title: 'Uma ferramenta funcional testada no campus',
    description:
      'Uma estrutura tecnológica sólida que moderniza a vida no campus e reitera o espírito de inovação sustentável da UniFio.',
  },
] as const;

const pillars = [
  {
    title: 'Economia no trajeto',
    description:
      'Ajuda alunos a reduzir custos no deslocamento sem depender de combinacoes informais e espalhadas.',
  },
  {
    title: 'Experiencia estudantil',
    description:
      'Torna a ida ao campus mais leve, mais previsivel e mais conectada com a rotina real da UniFio.',
  },
  {
    title: 'Valor institucional',
    description:
      'Une engenharia de software e utilidade social imediata, entregando à coordenação uma ferramenta viva de altíssimo impacto diário.',
  },
] as const;

const heroHighlights = [
  {
    icon: FaRoute,
    title: 'Mais economia',
    description: 'Divida custos no trajeto e reduza o peso do deslocamento na rotina academica.',
  },
  {
    icon: FaMapMarkedAlt,
    title: 'Mapeamento real e tático',
    description: 'Acompanhamos o real fluxo logístico de Ourinhos, garantindo embarques orgânicos e seguros sem depender de rodízios externos.',
  },
  {
    icon: FaUniversity,
    title: 'Exclusividade UniFio',
    description: 'Desenvolvido focado na proteção: garante que você divida o combustível apenas com membros verificados pela instituição.',
  },
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

        <div className="container relative z-10 mx-auto max-w-5xl">
          <div className="grid gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="mx-auto max-w-4xl"
            >
              <div className="flex justify-center md:justify-start">
                <span className="brand-badge">Feito para a rotina da comunidade UniFio</span>
              </div>

              <div className="mt-6">
                <BrandLogo size="lg" caption="Mobilidade universitaria para a UniFio" />
              </div>

              <h1 className="font-display mt-8 max-w-[17ch] text-[2.85rem] leading-[0.95] text-slate-950 sm:text-[3.75rem]">
                Caronas universitarias para a UniFio, com mais economia e menos estresse.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                O UniGo conecta alunos que fazem trajetos parecidos em Ourinhos para
                dividir custos, organizar a ida ao campus e tornar a rotina mais simples.
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                Nascido e arquitetado do zero na UniFio, a plataforma processa a geografia da cidade. Uma tecnologia invisível focada exclusivamente em salvar horas produtivas que eram desperdiçadas na região.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateAccount}
                >
                  {isLoggedIn ? 'Acessar Rotas (Painel)' : 'Começar a economizar grátis'}
                </motion.button>

                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('rotas-unifio')}
                >
                  Ver rotas da UniFio
                  <FaArrowRight className="h-4 w-4" />
                </motion.button>
              </div>

              <div className="soft-panel mt-5 max-w-3xl px-4 py-4 sm:px-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-[0_18px_34px_-22px_rgba(16,185,129,0.65)]">
                    <FaWhatsapp className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                      Continue no WhatsApp
                    </div>
                    <div className="mt-1 text-sm font-semibold leading-6 text-slate-900 sm:text-[1rem]">
                      Comece no UniGo. Continue no WhatsApp.
                    </div>
                    <div className="mt-1 text-sm leading-6 text-slate-500">
                      O app ajuda a encontrar a rota. Depois do match, motorista e
                      passageiro podem alinhar horario, ponto de encontro e valor com
                      mais liberdade.
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAccountLink}
                className="mt-4 text-sm font-semibold text-blue-800 transition-colors hover:text-blue-600"
              >
                {isLoggedIn ? 'Ir para minha conta' : 'Ja tenho uma conta'}
              </button>
            </motion.div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {heroHighlights.map((item) => (
                <div key={item.title} className="soft-panel px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="feature-icon h-10 w-10 shrink-0 rounded-2xl">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-500">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="rotas-unifio" className="scroll-mt-24 px-4 py-14 md:py-18">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="section-kicker">Rotas ate a UniFio</span>
            <h2 className="font-display text-4xl text-slate-950 md:text-5xl">
              Pontos reais de Ourinhos conectados ao campus.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Uma leitura visual de como o UniGo pode organizar caronas entre
              moradias estudantis, bairros e o trajeto ate a UniFio.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <div className="stat-chip px-3 py-2 text-[0.78rem]">3 origens de exemplo</div>
              <div className="stat-chip px-3 py-2 text-[0.78rem]">Destino UniFio</div>
              <div className="stat-chip px-3 py-2 text-[0.78rem]">Leitura mobile</div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="brand-panel overflow-hidden p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Mapa de exemplo
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">
                    Fluxos da cidade ate o Campus UniFio.
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="rounded-full border border-slate-200 bg-white/92 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-slate-700">
                    3 pontos reais
                  </div>
                  <div className="rounded-full border border-blue-100 bg-blue-50/90 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-blue-700">
                    Destino UniFio
                  </div>
                </div>
              </div>

              <div className="relative mt-4 h-[18.5rem] overflow-hidden rounded-[26px] border border-white/80 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.96),rgba(248,250,252,0.82)_38%,rgba(236,242,249,0.92)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] sm:h-[21rem] md:h-[22rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.12),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(15,31,77,0.12),transparent_18%),radial-gradient(circle_at_18%_82%,rgba(16,185,129,0.1),transparent_18%),radial-gradient(circle_at_82%_78%,rgba(245,158,11,0.12),transparent_18%)]" />
                <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(148,163,184,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.11)_1px,transparent_1px)] [background-size:30px_30px]" />

                <svg
                  viewBox="0 0 340 360"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M257 120C229 115 201 116 176 122C166 124 158 128 152 132"
                    fill="none"
                    stroke="rgba(59,130,246,0.68)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="8 10"
                  />
                  <path
                    d="M182 281C173 247 165 216 159 186C156 169 154 150 152 132"
                    fill="none"
                    stroke="rgba(16,185,129,0.62)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="8 10"
                  />
                  <path
                    d="M287 296C267 271 245 244 223 214C198 180 178 152 152 132"
                    fill="none"
                    stroke="rgba(245,158,11,0.72)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="8 10"
                  />
                </svg>

                {cityRoutes.map((route) => (
                  <div key={route.origin} className={`absolute ${route.markerPosition}`}>
                    <div className="relative flex h-11 w-11 items-center justify-center">
                      <div className={`absolute inset-0 rounded-full opacity-20 blur-[9px] ${route.toneClass}`} />
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-[4px] border-white bg-white shadow-[0_22px_34px_-24px_rgba(15,23,42,0.38)]">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${route.toneClass}`}>
                          <route.icon className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="absolute left-4 top-4 w-[9.35rem] max-w-[calc(100%-1.5rem)]">
                  <div className="relative rounded-[21px] border border-blue-200/70 bg-[linear-gradient(180deg,rgba(15,31,77,0.98),rgba(20,48,122,0.95))] px-2.5 py-2.5 text-white shadow-[0_24px_42px_-28px_rgba(15,31,77,0.82)] backdrop-blur-sm">
                    <div className="absolute bottom-[-5px] right-7 h-3 w-3 rotate-45 rounded-[3px] border-r border-b border-blue-200/55 bg-[rgb(20,48,122)]" />

                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-[4.2rem] shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.09] px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                        <img
                          src="https://www.unifio.edu.br/wp-content/uploads/2020/03/Unifio-Logo-Branco-300x97.png"
                          alt="Logo oficial da UniFio"
                          className="h-4.5 w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[0.54rem] font-semibold uppercase tracking-[0.18em] text-blue-100/74">
                          Destino
                        </div>
                        <div className="mt-1 text-[0.84rem] font-semibold leading-4 text-white">
                          Campus UniFio
                        </div>
                        <div className="mt-1 text-[0.64rem] leading-4 text-blue-100/82">
                          Agua do Cateto
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {cityRoutes.map((route) => (
                  <article
                    key={route.origin}
                    className="rounded-[22px] border border-slate-200/75 bg-white/92 p-4 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.22)]"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.36)] ${route.toneClass}`}
                      >
                        <route.icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className={`h-2.5 w-2.5 rounded-full ${route.toneClass}`} />
                          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                            {route.eyebrow}
                          </div>
                        </div>
                        <h3 className="mt-2 text-base font-semibold leading-6 text-slate-900">
                          {route.origin}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/90 px-3 py-3 text-sm leading-6 text-slate-700">
                      {route.address}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {route.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="soft-panel px-5 py-5">
              <div className="flex items-start gap-3">
                <div className="feature-icon h-10 w-10 shrink-0 rounded-2xl">
                  <FaMapMarkedAlt className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
                    Destino final
                  </div>
                  <div className="mt-2 text-base font-semibold text-slate-900">
                    Rodovia BR-153, s/n - Agua do Cateto
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-500">
                    O mapa mostra como diferentes pontos da rotina local podem
                    convergir para o campus com mais organizacao e economia.
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
            <span className="section-kicker">Feito por alunos</span>
            <h2 className="font-display text-4xl text-slate-950 md:text-5xl">
              Pensado a partir da rotina real da UniFio.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              O UniGo nasce para resolver um problema concreto de deslocamento e,
              ao mesmo tempo, mostrar como uma iniciativa local pode melhorar a
              experiencia da comunidade academica.
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
              Simples para o aluno. Natural no mobile.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              O fluxo foi desenhado para resolver o que mais importa: encontrar
              uma rota compativel, validar a comunidade e combinar a carona sem
              atrito.
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
                    {index === 2 ? (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                        <FaWhatsapp className="h-3.5 w-3.5" />
                        WhatsApp tambem
                      </div>
                    ) : null}
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
              Uma solucao local com potencial real para a vida no campus.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100/88">
              O UniGo ajuda alunos a economizar no trajeto agora e abre espaco
              para uma experiencia universitaria mais conectada, moderna e
              organizada dentro da UniFio.
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
