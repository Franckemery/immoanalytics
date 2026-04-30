// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Collecte from './pages/Collecte';
import Explorateur from './pages/Explorateur';
import Analyse from './pages/Analyse';
import { useState } from 'react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className='flex min-h-screen bg-dark-bg text-text-primary'>
        {/* Barre latérale (Sidebar) */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Overlay sombre quand la sidebar est ouverte sur mobile */}
        {sidebarOpen && (
          <div 
            className='fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm'
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        <main className='flex-1 lg:ml-64 min-h-screen flex flex-col'>
          {/* Header Mobile avec Bouton burger */}
          <header className='lg:hidden flex items-center p-4 border-b border-dark-border bg-dark-bg/80 sticky top-0 z-30'>
            <button 
              onClick={() => setSidebarOpen(true)}
              className='p-2 rounded-lg border border-dark-border text-text-muted hover:text-text-primary transition-all'
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18"/>
              </svg>
            </button>
            <span className='ml-4 font-bold text-accent-blue'>Nexalyze</span>
          </header>

          {/* Contenu principal avec padding et largeur max */}
          <div className='relative z-10 p-4 md:p-8 lg:p-10 max-w-[1400px] mx-auto w-full'>
            <Routes>
              {/* Routes principales */}
              <Route path='/' element={<Dashboard />} />
              <Route path='/collecte' element={<Collecte />} />
              <Route path='/explorer' element={<Explorateur />} />
              <Route path='/analyse' element={<Analyse />} />
              
              {/* Route Paramètres stylisée */}
              <Route path='/settings' element={
                <div className='card border-dashed border-dark-border flex flex-col items-center justify-center py-20 text-center'>
                  <div className="w-16 h-16 bg-dark-card rounded-full flex items-center justify-center mb-4 border border-dark-border">
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
