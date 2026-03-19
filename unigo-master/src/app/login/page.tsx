'use client';

import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaChartLine,
  FaCheckCircle,
  FaComments,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BrandLogo from '../components/BrandLogo';

const highlights = [
  {
    icon: FaShieldAlt,
    title: 'Comunidade validada',
    text: 'O acesso com e-mail @unifio.edu.br deixa a experiencia mais segura e mais confiavel.',
  },
  {
    icon: FaComments,
    title: 'Rotas e conversa no mesmo lugar',
    text: 'Buscar, combinar e acompanhar sua rotina fica mais simples dentro do mesmo app.',
  },
  {
    icon: FaChartLine,
    title: 'Pronto para uso real',
    text: 'A experiencia foi pensada para parecer produto de verdade desde o primeiro acesso.',
  },
] as const;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!email.endsWith('@unifio.edu.br')) {
        throw new Error('Por favor, use seu email universitario @unifio.edu.br');
      }

      const userData = {
        name: email
          .split('@')[0]
          .replace('.', ' ')
          .split(' ')
          .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
          .join(' '),
        email,
        token: `sim-jwt-token-${Math.random().toString(36).substring(2)}`,
        image: '',
      };

      localStorage.setItem('userToken', userData.token);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userImage', userData.image);

      setLoginSuccess(true);

      setTimeout(() => {
        router.push('/dashboard');
      }, 1400);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <div className="absolute inset-0 hero-pattern" />
      <div className="absolute inset-0 wave-pattern opacity-65" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.section
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <span className="brand-badge">Acesso UniFio</span>

            <div className="mt-6">
              <BrandLogo size="lg" caption="Mobilidade universitaria para quem vive o campus" />
            </div>

            <h1 className="font-display mt-8 max-w-2xl text-5xl leading-[0.96] text-slate-950">
              Entre e continue sua rotina ate a UniFio com mais clareza.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Use seu e-mail universitario para acessar um ambiente feito para combinar
              caronas com economia, conversa facil e leitura clara no mobile.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {highlights.map((item) => (
                <div key={item.title} className="auth-highlight">
                  <div className="feature-icon">
                    <item.icon className="text-lg" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="auth-card w-full max-w-lg lg:ml-auto"
          >
            <div>
              <span className="brand-badge">Entrar</span>
              <h2 className="font-display mt-4 text-[2.25rem] leading-[0.98] text-slate-950 sm:text-4xl">
                Acesse sua conta UniGo
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Entre com seu e-mail da UniFio para continuar no app e ver suas rotas.
              </p>
            </div>

            {loginSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-[24px] border border-emerald-200 bg-emerald-50 p-6 text-center"
              >
                <FaCheckCircle className="mx-auto text-5xl text-emerald-500" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">Entrada confirmada</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Abrindo seu painel agora.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {error ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </motion.div>
                ) : null}

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                    Email da UniFio
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="auth-input"
                      placeholder="seu.email@unifio.edu.br"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Senha
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="auth-input"
                      placeholder="Sua senha"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className={`btn-primary w-full ${loading ? 'cursor-not-allowed opacity-80' : ''}`}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  disabled={loading}
                >
                  {loading ? (
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>
                      Entrar
                      <FaArrowRight />
                    </>
                  )}
                </motion.button>
              </form>
            )}

            {!loginSuccess ? (
              <div className="mt-6 text-center text-sm text-slate-600">
                Ainda nao tem uma conta?{' '}
                <button
                  onClick={() => router.push('/register')}
                  className="font-semibold text-blue-800 transition-colors hover:text-blue-600"
                >
                  Criar conta
                </button>
              </div>
            ) : null}
          </motion.section>
        </div>
      </div>
    </main>
  );
}
