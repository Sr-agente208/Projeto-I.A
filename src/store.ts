import { create } from 'zustand'
import type { Project, ChatMessage, User, AIModel, AppState, IAProject, Task } from './types'

interface MegaStore extends AppState {
  // IA HUB
  projects: Project[]
  chatMessages: ChatMessage[]
  
  // ASTRA 208
  aiModels: AIModel[]
  
  // Projeto-I.A
  iaProjects: IAProject[]
  
  // Actions
  setUser: (user: User) => void
  setCurrentModule: (module: AppState['currentModule']) => void
  setCurrentView: (view: string) => void
  addProject: (project: Project) => void
  addChatMessage: (message: ChatMessage) => void
  setAIModels: (models: AIModel[]) => void
  addIAProject: (project: IAProject) => void
  addTask: (projectId: string, task: Task) => void
}

const DEFAULT_AI_MODELS: AIModel[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: '🧠',
    status: 'online',
    specialties: ['Arquitetura', 'Programação'],
    color: '#00d9ff',
    description: 'Especialista em arquitetura',
    version: '4.0'
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: '📄',
    status: 'online',
    specialties: ['Documentação', 'Revisão'],
    color: '#7c3aed',
    description: 'Especialista em documentação',
    version: '3.0'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: '🔍',
    status: 'online',
    specialties: ['Pesquisa', 'Referências'],
    color: '#10b981',
    description: 'Especialista em pesquisa',
    version: '2.0'
  },
  {
    id: 'grok',
    name: 'Grok',
    icon: '⚡',
    status: 'online',
    specialties: ['Ideias', 'Criatividade'],
    color: '#f59e0b',
    description: 'Especialista em criatividade',
    version: '1.5'
  },
  {
    id: 'llama',
    name: 'Llama',
    icon: '🦙',
    status: 'online',
    specialties: ['Offline', 'Privacidade'],
    color: '#ec4899',
    description: 'Modelo local',
    version: '2.0'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: '🌊',
    status: 'online',
    specialties: ['Análise Profunda', 'Código'],
    color: '#06b6d4',
    description: 'Análise profunda',
    version: '1.0'
  },
  {
    id: 'manus',
    name: 'Manus',
    icon: '🚀',
    status: 'online',
    specialties: ['Execução', 'Automação'],
    color: '#8b5cf6',
    description: 'Execução de tarefas',
    version: '1.0'
  }
]

export const useMegaStore = create<MegaStore>((set) => ({
  isAuthenticated: false,
  currentModule: 'home',
  currentView: 'home',
  projects: [],
  chatMessages: [],
  aiModels: DEFAULT_AI_MODELS,
  iaProjects: [],

  setUser: (user: User) => {
    set({ user, isAuthenticated: true })
  },

  setCurrentModule: (module: AppState['currentModule']) => {
    set({ currentModule: module })
  },

  setCurrentView: (view: string) => {
    set({ currentView: view })
  },

  addProject: (project: Project) => {
    set((state) => ({
      projects: [...state.projects, project]
    }))
  },

  addChatMessage: (message: ChatMessage) => {
    set((state) => ({
      chatMessages: [...state.chatMessages, message]
    }))
  },

  setAIModels: (models: AIModel[]) => {
    set({ aiModels: models })
  },

  addIAProject: (project: IAProject) => {
    set((state) => ({
      iaProjects: [...state.iaProjects, project]
    }))
  },

  addTask: (projectId: string, task: Task) => {
    set((state) => ({
      iaProjects: state.iaProjects.map(p =>
        p.id === projectId
          ? { ...p, tasks: [...p.tasks, task] }
          : p
      )
    }))
  }
}))
