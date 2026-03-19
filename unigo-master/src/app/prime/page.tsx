'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaUniversity,
  FaCheckCircle,
  FaUsers,
  FaShieldAlt,
  FaChartLine,
  FaRoute,
  FaMobileAlt,
  FaHandshake
} from 'react-icons/fa';

interface Plan {
  name: string;
  description: string;
  features: string[];
  highlight: boolean;
}

export default function PrimePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) { router.push('/login'); return; }
    setUserName(localStorage.getItem('userName') || 'Usuário');
  }, [router]);

  const plans: Plan[] = [
    {
      name: 'Essencial',
      description: 'Para instituições com até 500 alunos',
      features: [
        'Caronas avulsas e fixas',
        'Chat integrado entre alunos',
        'Painel de monitoramento básico',
        'Suporte por e-mail',
      ],
      highlight: false,
    },
    {
      name: 'Profissional',
      description: 'Para instituições com até 2.000 alunos',
      features: [
        'Tudo do plano Essencial',
        'Marca personalizada no app',
        'Relatórios de uso detalhados',
        'Painel administrativo avançado',
        'Suporte prioritário',
      ],
      highlight: true,
    },
    {
      name: 'Enterprise',
      description: 'Para grandes universidades',
      features: [
        'Tudo do plano Profissional',
        'Múltiplos campi',
        'Integração com sistemas acadêmicos',
        'API dedicada',
        'Gerente de conta exclusivo',
        'SLA garantido',
      ],
      highlight: false,
    },
  ];

  const benefits = [
    { icon: FaUsers, title: 'Mobilidade Sustentável', text: 'Reduza o trânsito e emissões no entorno do campus.' },
    { icon: FaShieldAlt, title: 'Segurança dos Alunos', text: 'Apenas usuários verificados com e-mail institucional.' },
    { icon: FaChartLine, title: 'Relatórios de Impacto', text: 'Dados de economia e sustentabilidade para a instituição.' },
    { icon: FaMobileAlt, title: 'App Gratuito', text: 'Sem custo nenhum para os estudantes.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaUniversity className="text-blue-700 text-xl sm:text-2xl" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Planos Institucionais</h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Sua instituição contrata, seus alunos usam gratuitamente. Confira os planos disponíveis, {userName}.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">✓</div>
          <p className="text-sm text-green-800">
            <strong>Você já tem acesso!</strong> Sua faculdade contratou o UniGo. Todos os recursos estão disponíveis para você sem nenhum custo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl shadow-md border overflow-hidden ${plan.highlight ? 'border-blue-400 ring-2 ring-blue-200' : 'border-slate-100'} bg-white`}
            >
              {plan.highlight && (
                <div className="bg-blue-700 text-white text-center text-xs font-semibold py-1.5">
                  Mais Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-5">{plan.description}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                      <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-center">
                  <span className="text-xs text-slate-400">Contratado pela instituição</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center flex items-center justify-center gap-2">
            <FaHandshake className="text-blue-600" /> Benefícios para a Instituição
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-start gap-4"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <b.icon className="text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">{b.title}</h4>
                  <p className="text-sm text-slate-500">{b.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-10 bg-slate-100 rounded-2xl p-6 text-center">
          <FaRoute className="text-blue-600 text-xl sm:text-2xl mx-auto mb-3" />
          <p className="text-slate-700 font-medium mb-1">Sua instituição ainda não tem o UniGo?</p>
          <p className="text-sm text-slate-500">Peça para a coordenação entrar em contato conosco para ativar o serviço.</p>
        </motion.div>
      </div>
    </div>
  );
}
