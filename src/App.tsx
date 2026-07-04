import { useMegaStore } from './store'
import { Home } from './components/Home'
import { IAHub } from './components/IAHub'
import { ASTRA } from './components/ASTRA'
import { ProjetoIA } from './components/ProjetoIA'

function App() {
  const { currentModule } = useMegaStore()

  return (
    <div className="w-full h-screen overflow-hidden">
      {currentModule === 'home' && <Home />}
      {currentModule === 'ia-hub' && <IAHub />}
      {currentModule === 'astra' && <ASTRA />}
      {currentModule === 'projeto-ia' && <ProjetoIA />}
    </div>
  )
}

export default App
