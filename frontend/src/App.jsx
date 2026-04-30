// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Collecte from './pages/Collecte';
import Explorateur from './pages/Explorateur';
import Analyse from './pages/Analyse';
import { useState } from 'react';

// Remplace tout le return par :
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className='flex min-h-screen bg-dark-bg'>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Overlay sombre quand sidebar ouverte sur mobile */}
        {sidebarOpen && (
          <div className='fixed inset-0 bg-black/50 z-40 lg:hidden'
               onClick={() => setSidebarOpen(false)} />
        )}

        <main className='flex-1 lg:ml-64 p-4 md:p-8 min-h-screen'>
            {/* Bouton burger visible uniquement sur mobile */}
            <button onClick={() => setSidebarOpen(true)}
              className='lg:hidden mb-4 p-2 rounded-lg border border-dark-border
                         text-text-muted hover:text-text-primary transition-all'>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h14M3 12h14M3 18h14"/>
              </svg>
            </button>

            <div className='relative z-10'>
              <Routes>
                <Route path='/'         element={<Dashboard />} />
                <Route path='/collecte' element={<Collecte />} />
                <Route path='/explorer' element={<Explorateur />} />
                <Route path='/analyse'  element={<Analyse />} />
                <Route path='/settings' element={<div className='card'><h1 className='text-xl font-bold'>Paramètres</h1></div>} />
              </Routes>
            </div>
          </main>
      </div>
    </BrowserRouter>
  );
}

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
