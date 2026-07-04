// IA HUB Types
export interface Project {
  id: string
  name: string
  description: string
  type: 'solo' | 'team'
  createdAt: Date
  updatedAt: Date
  archived: boolean
  owner: string
}

export interface ChatMessage {
  id: string
  projectId?: string
  role: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
  aiModel?: string
}

export interface TeamMember {
  id: string
  userId: string
  projectId: string
  role: 'owner' | 'editor' | 'viewer'
  joinedAt: Date
}

// ASTRA 208 Types
export interface AIModel {
  id: string
  name: string
  icon: string
  status: 'online' | 'offline' | 'busy'
  specialties: string[]
  color: string
  description: string
  version?: string
}

export interface Task {
  id: string
  title: string
  description: string
  assignedTo: string[]
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  createdAt: Date
  completedAt?: Date
}

// Projeto-I.A Types
export interface IAProject {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'completed'
  progress: number
  tasks: Task[]
  createdAt: Date
}

// User & Auth
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
}

// App State
export interface AppState {
  user?: User
  isAuthenticated: boolean
  currentModule: 'home' | 'ia-hub' | 'astra' | 'projeto-ia' | 'settings'
  currentView: string
}
