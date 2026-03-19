/* eslint-disable @typescript-eslint/no-explicit-any */
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
    title: 'Acesso institucional',
    text: 'O login existe para a comunidade UniFio e reforça uma experiência mais confiável.',
  },
  {
    icon: FaComments,
    title: 'Fluxo completo',
    text: 'Quem entra já acessa busca de caronas, chat e rotinas recorrentes.',
  },
  {
    icon: FaChartLine,
    title: 'Dado para apresentação',
    text: 'Cada acesso fortalece a narrativa institucional do projeto diante da faculdade.',
  },
];

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
        throw new Error('Por favor, use seu email universitário @unifio.edu.br');
      }

      const userData = {
        name: email
          .split('@')[0]
          .replace('.', ' ')
          .split(' ')
          .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
          .join(' '),
        email,
        token: 'sim-jwt-token-' + Math.random().toString(36).substring(2),
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
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28">
      <div className="absolute inset-0 hero-pattern" />
      <div className="absolute inset-0 wave-pattern opacity-65" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.section
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <span className="brand-badge">Acesso institucional UniFio</span>

            <div className="mt-6">
              <BrandLogo
                size="lg"
                caption="Mobilidade universitária em desenvolvimento"
              />
            </div>

            <h1 className="font-display mt-8 max-w-2xl text-5xl leading-[0.96] text-slate-950">
              Entre no ambiente UniGo x UniFio e acompanhe a rotina da comunidade no app.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Este acesso conecta a comunidade UniFio a uma experiência completa
              de mobilidade acadêmica. Quanto melhor a jornada aqui, mais forte
              fica a apresentação institucional do projeto.
            </p>

            <div className="mt-8 space-y-4">
              {highlights.map((item) => (
                <div key={item.title} className="metric-card">
                  <div className="feature-icon">
                    <item.icon className="text-lg" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="brand-panel w-full max-w-lg p-6 sm:p-8 lg:ml-auto"
          >
            <div className="flex items-center justify-between gap-4">
              <BrandLogo size="sm" caption="Uso exclusivo UniFio" />
              <button
                onClick={() => router.push('/')}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                Voltar ao site
              </button>
            </div>

            <div className="mt-6">
              <span className="brand-badge">Login institucional</span>
              <h2 className="font-display mt-4 text-4xl text-slate-950">
                Acesse sua conta
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Entre com seu e-mail universitário para continuar no UniGo x
                UniFio.
              </p>
            </div>

            {loginSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-[24px] border border-emerald-200 bg-emerald-50 p-6 text-center"
              >
                <FaCheckCircle className="mx-auto text-5xl text-emerald-500" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  Login realizado com sucesso
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Redirecionando para o dashboard da operação UniFio.
                </p>
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
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email universitário
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
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
                      className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                      placeholder="••••••••"
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
                Ainda não tem uma conta?{' '}
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
