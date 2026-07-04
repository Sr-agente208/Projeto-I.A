import { useState } from 'react'
import { useMegaStore } from '../store'
import { Plus, ArrowLeft, CheckCircle2, Circle } from 'lucide-react'
import type { IAProject, Task } from '../types'

export function ProjetoIA() {
  const { iaProjects, addIAProject, addTask, setCurrentModule } = useMegaStore()
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return

    const project: IAProject = {
      id: `projeto-${Date.now()}`,
      name: newProjectName,
      description: '',
      status: 'active',
      progress: 0,
      tasks: [],
      createdAt: new Date()
    }

    addIAProject(project)
    setNewProjectName('')
    setShowNewProject(false)
  }

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
          <h1 className="text-2xl font-bold text-cosmic-cyan">Projeto-I.A</h1>
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
        {/* New Project Dialog */}
        {showNewProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="cosmic-card max-w-md w-full">
              <h2 className="text-xl font-bold text-cosmic-cyan mb-4">Novo Projeto</h2>
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

        {/* Projects List */}
        {iaProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-cosmic-cyan/70 mb-6">Nenhum projeto ainda</p>
            <button
              onClick={() => setShowNewProject(true)}
              className="cosmic-button-primary"
            >
              Criar Primeiro Projeto
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {iaProjects.map(project => (
              <div key={project.id} className="cosmic-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-cosmic-cyan">{project.name}</h3>
                    <p className="text-xs text-cosmic-cyan/60">
                      {project.tasks.length} tarefas
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.status === 'active' ? 'bg-cosmic-green/20 text-cosmic-green' :
                    project.status === 'paused' ? 'bg-cosmic-orange/20 text-cosmic-orange' :
                    'bg-cosmic-cyan/20 text-cosmic-cyan'
                  }`}>
                    {project.status === 'active' ? '🟢 Ativo' :
                     project.status === 'paused' ? '⏸️ Pausado' :
                     '✅ Completo'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-cosmic-cyan/60 mb-1">
                    <span>Progresso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-cosmic-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cosmic-cyan to-cosmic-purple transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Tasks Preview */}
                {project.tasks.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {project.tasks.slice(0, 3).map(task => (
                      <div key={task.id} className="flex items-center gap-2 text-sm">
                        {task.status === 'completed' ? (
                          <CheckCircle2 size={16} className="text-cosmic-green" />
                        ) : (
                          <Circle size={16} className="text-cosmic-cyan" />
                        )}
                        <span className={task.status === 'completed' ? 'line-through text-cosmic-cyan/50' : 'text-cosmic-cyan'}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                    {project.tasks.length > 3 && (
                      <p className="text-xs text-cosmic-cyan/50">
                        +{project.tasks.length - 3} mais tarefas
                      </p>
                    )}
                  </div>
                )}

                <button className="cosmic-button-secondary w-full text-sm">
                  Abrir Projeto
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
