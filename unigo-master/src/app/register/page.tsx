/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaCheckCircle,
  FaComments,
  FaEnvelope,
  FaIdCard,
  FaLock,
  FaPhone,
  FaShieldAlt,
  FaUniversity,
  FaUser,
  FaWallet,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BrandLogo from '../components/BrandLogo';

const highlights = [
  {
    icon: FaUniversity,
    title: 'Entrada com contexto UniFio',
    text: 'O cadastro reforça que o projeto foi desenhado para a realidade da faculdade.',
  },
  {
    icon: FaWallet,
    title: 'Sem taxa de plataforma',
    text: 'A proposta institucional mantém o acesso gratuito para o aluno enquanto valida valor para a faculdade.',
  },
  {
    icon: FaComments,
    title: 'Da inscrição ao uso',
    text: 'Depois do cadastro, o aluno já entra em um ambiente pronto para conversar, buscar e combinar caronas.',
  },
  {
    icon: FaShieldAlt,
    title: 'Crescimento da comunidade',
    text: 'Cada novo cadastro ajuda o UniGo a nascer mais forte dentro da realidade da UniFio.',
  },
];

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ra: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.email.endsWith('@unifio.edu.br')) {
        throw new Error('Por favor, use seu email universitário @unifio.edu.br');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      if (formData.password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      if (!/^\d{8}$/.test(formData.ra)) {
        throw new Error('RA inválido. Deve conter 8 dígitos');
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        name: formData.name,
        email: formData.email,
        token: 'sim-jwt-token-' + Math.random().toString(36).substring(2),
        image: '',
      };

      localStorage.setItem('userToken', userData.token);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userImage', userData.image);

      setRegisterSuccess(true);

      setTimeout(() => {
        router.push('/dashboard');
      }, 1800);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28">
      <div className="absolute inset-0 hero-pattern" />
      <div className="absolute inset-0 wave-pattern opacity-65" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.section
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <span className="brand-badge">Cadastro UniFio</span>

            <div className="mt-6">
              <BrandLogo
                size="lg"
                caption="A porta de entrada da comunidade para o projeto"
              />
            </div>

            <h1 className="font-display mt-8 max-w-2xl text-5xl leading-[0.96] text-slate-950">
              Cadastre a comunidade UniFio em uma proposta que já nasce com cara
              de solução institucional.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              O cadastro não é só acesso ao produto. Ele coloca a comunidade
              dentro do UniGo desde o começo e ajuda a moldar uma solução útil
              para a rotina do campus.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
            className="brand-panel w-full p-6 sm:p-8 lg:ml-auto"
          >
            <div className="flex items-center justify-between gap-4">
              <BrandLogo size="sm" caption="Comunidade UniFio" />
              <button
                onClick={() => router.push('/')}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                Voltar ao site
              </button>
            </div>

            <div className="mt-6">
              <span className="brand-badge">Cadastro institucional</span>
              <h2 className="font-display mt-4 text-4xl text-slate-950">
                Crie sua conta
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Entre no UniGo x UniFio com seus dados acadêmicos e participe da
                validação do projeto dentro da faculdade.
              </p>
            </div>

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

              {registerSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-6 text-center"
                >
                  <FaCheckCircle className="mx-auto text-5xl text-emerald-500" />
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">
                    Cadastro realizado com sucesso
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Seu acesso está sendo redirecionado para o dashboard da
                    operação UniFio.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Nome completo
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                    </div>

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
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                          placeholder="seu.email@unifio.edu.br"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="ra"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        RA
                      </label>
                      <div className="relative">
                        <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          id="ra"
                          name="ra"
                          value={formData.ra}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                          placeholder="12345678"
                          maxLength={8}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Telefone
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                          placeholder="(18) 99999-9999"
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
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Confirmar senha
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className={`btn-primary mt-2 w-full ${loading ? 'cursor-not-allowed opacity-80' : ''}`}
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
                      Criar conta
                      <FaArrowRight />
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </form>

            {!registerSuccess ? (
              <div className="mt-6 text-center text-sm text-slate-600">
                Já tem uma conta?{' '}
                <button
                  onClick={() => router.push('/login')}
                  className="font-semibold text-blue-800 transition-colors hover:text-blue-600"
                >
                  Fazer login
                </button>
              </div>
            ) : null}
          </motion.section>
        </div>
      </div>
    </main>
  );
}
