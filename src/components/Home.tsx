import { useMegaStore } from '../store'
import { Zap, Users, Brain, Rocket, Settings } from 'lucide-react'

export function Home() {
  const { setCurrentModule } = useMegaStore()

  const modules = [
    {
      id: 'ia-hub',
      title: 'IA HUB',
      icon: '🧠',
      description: 'Solo Lab + Team Space + Chat IA',
      color: 'from-cyan-500 to-blue-500',
      features: ['Projetos Pessoais', 'Colaboração', 'Chat IA']
    },
    {
      id: 'astra',
      title: 'ASTRA 208',
      icon: '🌌',
      description: 'Orquestrador de 7 IAs Especializadas',
      color: 'from-purple-500 to-pink-500',
      features: ['7 IAs', 'Automático', 'Paralelo']
    },
    {
      id: 'projeto-ia',
      title: 'Projeto-I.A',
      icon: '🚀',
      description: 'Gerenciamento de Projetos com IA',
      color: 'from-green-500 to-emerald-500',
      features: ['Tarefas', 'Progresso', 'Equipe']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-bg via-cosmic-dark to-cosmic-bg overflow-y-auto">
      {/* Header */}
      <div className="text-center py-12 px-4 border-b border-cosmic-cyan/20">
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-cyan mb-4">
          IA HUB MEGA
        </div>
        <p className="text-cosmic-cyan/70 text-lg">
          Inteligência Artificial Completa e Integrada
        </p>
        <p className="text-cosmic-cyan/50 text-sm mt-2">
          v3.0 - Tudo que você precisa em um único app
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 pb-20">
        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {modules.map(module => (
            <div
              key={module.id}
              onClick={() => setCurrentModule(module.id as any)}
              className="cosmic-card cursor-pointer group hover:scale-105 transition-transform"
            >
              <div className="text-5xl mb-4">{module.icon}</div>
              <h3 className="text-2xl font-bold text-cosmic-cyan mb-2 group-hover:text-cosmic-purple transition">
                {module.title}
              </h3>
              <p className="text-cosmic-cyan/70 text-sm mb-4">
                {module.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {module.features.map(feature => (
                  <span key={feature} className="text-xs bg-cosmic-cyan/10 text-cosmic-cyan px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
              <button className="cosmic-button-secondary w-full text-sm">
                Acessar
              </button>
            </div>
          ))}
        </div>

        {/* Features Overview */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-cosmic-cyan text-center">
            ✨ Funcionalidades Completas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🧍', title: 'Solo Lab', desc: 'Projetos pessoais privados' },
              { icon: '👥', title: 'Team Space', desc: 'Colaboração em equipe' },
              { icon: '💬', title: 'Chat IA', desc: 'Múltiplas IAs integradas' },
              { icon: '🌌', title: 'ASTRA 208', desc: '7 IAs trabalhando juntas' },
              { icon: '📊', title: 'Projetos', desc: 'Gerenciamento completo' },
              { icon: '⚡', title: 'Automação', desc: 'Tarefas automáticas' }
            ].map((feature, i) => (
              <div key={i} className="cosmic-card">
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                    <h4 className="font-bold text-cosmic-cyan">{feature.title}</h4>
                    <p className="text-sm text-cosmic-cyan/70">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="cosmic-card">
            <div className="text-4xl font-bold text-cosmic-cyan">3</div>
            <p className="text-sm text-cosmic-cyan/70">Módulos</p>
          </div>
          <div className="cosmic-card">
            <div className="text-4xl font-bold text-cosmic-cyan">7</div>
            <p className="text-sm text-cosmic-cyan/70">IAs</p>
          </div>
          <div className="cosmic-card">
            <div className="text-4xl font-bold text-cosmic-cyan">∞</div>
            <p className="text-sm text-cosmic-cyan/70">Possibilidades</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentModule('ia-hub')}
            className="cosmic-button-primary text-lg px-8 py-4"
          >
            Começar Agora
          </button>
        </div>
      </div>
    </div>
  )
}
