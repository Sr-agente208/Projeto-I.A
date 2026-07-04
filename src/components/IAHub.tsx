import { useState } from 'react'
import { useMegaStore } from '../store'
import { Plus, ArrowLeft, MessageCircle, Trash2 } from 'lucide-react'
import type { Project } from '../types'

export function IAHub() {
  const { projects, addProject, setCurrentModule, currentView, setCurrentView } = useMegaStore()
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [projectType, setProjectType] = useState<'solo' | 'team'>('solo')

  const filteredProjects = projects.filter(p => p.type === projectType)

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return

    const project: Project = {
      id: `${projectType}-${Date.now()}`,
      name: newProjectName,
      description: '',
      type: projectType,
      createdAt: new Date(),
      updatedAt: new Date(),
      archived: false,
      owner: 'user'
    }

    addProject(project)
    setNewProjectName('')
    setShowNewProject(false)
  }

  if (currentView === 'ia-hub-main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cosmic-bg via-cosmic-dark to-cosmic-bg">
        {/* Header */}
        <div className="border-b border-cosmic-cyan/20 bg-cosmic-dark/50 backdrop-blur px-4 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentModule('home')}
              className="p-2 hover:bg-cosmic-cyan/10 rounded-lg transition"
            >
              <ArrowLeft size={20} className="text-cosmic-cyan" />
            </button>
            <h1 className="text-2xl font-bold text-cosmic-cyan">IA HUB</h1>
          </div>
          <button
            onClick={() => setShowNewProject(true)}
            className="cosmic-button-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Novo
          </button>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Type Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setProjectType('solo')}
              className={`cosmic-button ${projectType === 'solo' ? 'cosmic-button-primary' : 'cosmic-button-secondary'}`}
            >
              🧍 Solo Lab
            </button>
            <button
              onClick={() => setProjectType('team')}
              className={`cosmic-button ${projectType === 'team' ? 'cosmic-button-primary' : 'cosmic-button-secondary'}`}
            >
              👥 Team Space
            </button>
          </div>

          {/* New Project Dialog */}
          {showNewProject && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="cosmic-card max-w-md w-full">
                <h2 className="text-xl font-bold text-cosmic-cyan mb-4">
                  Novo Projeto {projectType === 'solo' ? '(Solo Lab)' : '(Team Space)'}
                </h2>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Nome do projeto..."
                  className="cosmic-input mb-4"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowNewProject(false)}
                    className="cosmic-button-secondary flex-1"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateProject}
                    className="cosmic-button-primary flex-1"
                  >
                    Criar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">{projectType === 'solo' ? '🧍' : '👥'}</div>
              <p className="text-cosmic-cyan/70 mb-6">Nenhum projeto ainda</p>
              <button
                onClick={() => setShowNewProject(true)}
                className="cosmic-button-primary"
              >
                Criar Primeiro Projeto
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map(project => (
                <div key={project.id} className="cosmic-card group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-cosmic-cyan group-hover:text-cosmic-purple transition">
                      {project.name}
                    </h3>
                    <button className="p-2 hover:bg-cosmic-red/20 rounded-lg transition text-cosmic-red">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-cosmic-cyan/70 text-sm mb-4">
                    {project.description || 'Sem descrição'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cosmic-cyan/60">
                      {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    <button className="cosmic-button-secondary text-sm flex items-center gap-2">
                      <MessageCircle size={16} />
                      Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-bg via-cosmic-dark to-cosmic-bg flex flex-col items-center justify-center">
      <button
        onClick={() => {
          setCurrentView('ia-hub-main')
        }}
        className="cosmic-button-primary"
      >
        Acessar IA HUB
      </button>
    </div>
  )
}
