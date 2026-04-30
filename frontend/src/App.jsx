// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Collecte from './pages/Collecte';
import Explorateur from './pages/Explorateur';
import Analyse from './pages/Analyse';

export default function App() {
  return (
    <BrowserRouter>
      <div className='flex min-h-screen bg-dark-bg text-text-primary font-sans antialiased selection:bg-accent-blue/30'>
        
        {/* Sidebar fixe à gauche */}
        <Sidebar />

        {/* Contenu principal */}
        <main className='ml-64 flex-1 relative min-h-screen overflow-x-hidden'>
          
          {/* Background FX: Dégradés radiaux pour l'esthétique "sombre et vivante" */}
          <div className='fixed inset-0 pointer-events-none z-0'
            style={{
              background: `
                radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 50% 90%, rgba(63, 185, 80, 0.05) 0%, transparent 40%)
              `,
            }} 
          />

          {/* Wrapper de contenu avec padding */}
          <div className='relative z-10 p-6 lg:p-10 max-w-[1400px] mx-auto'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/collecte' element={<Collecte />} />
              <Route path='/explorer' element={<Explorateur />} />
              <Route path='/analyse' element={<Analyse />} />
              
              {/* Route Paramètres stylisée */}
              <Route path='/settings' element={
                <div className='card border-dashed border-dark-border flex flex-col items-center justify-center py-20 text-center'>
                  <div className="w-16 h-16 bg-dark-bg rounded-full flex items-center justify-center mb-4 border border-dark-border">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h1 className='text-2xl font-bold'>Paramètres système</h1>
                  <p className='text-text-muted mt-2 max-w-xs'>
                    La configuration des clés API et des seuils de confiance du modèle sera disponible prochainement.
                  </p>
                </div>
              } />

              {/* Redirection automatique pour les routes inconnues */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}