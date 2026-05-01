// frontend/src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Plus, Table, Brain, Settings, HelpCircle, X } from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Tableau de Bord' },
  { path: '/collecte', icon: Plus, label: 'Collecte' },
  { path: '/explorer', icon: Table, label: 'Explorateur' },
  { path: '/analyse', icon: Brain, label: 'Analyse IA' },
  { path: '/aide',     icon: HelpCircle,  label: 'Aide' },
  { path: '/settings', icon: Settings, label: 'Paramètres' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay pour mobile : ferme la sidebar quand on clique en dehors */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-dark-card
                        border-r border-dark-border flex flex-col z-50
                        transition-transform duration-300 ease-in-out
                        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                        lg:translate-x-0`}>
        
        {/* Logo — Mis à jour avec le nom Nexalyze */}
        <div className='p-6 border-b border-dark-border flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-bold tracking-tight'>
              <span className='text-accent-blue'>Immo</span>
              <span className='text-accent-violet'>Analytics</span>
            </h1>
            <p className='text-text-muted text-[10px] uppercase tracking-widest mt-1'>
              Analyse prédictive
            </p>
          </div>
          
          {/* Bouton fermer optimisé pour mobile */}
          <button onClick={onClose}
            className='lg:hidden p-2 rounded-lg hover:bg-dark-bg text-text-muted transition-colors'>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-4 space-y-1.5 mt-4 overflow-y-auto'>
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={onClose} // Ferme automatiquement la sidebar après un clic sur mobile
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive
                  ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                  : 'text-text-muted hover:text-text-primary hover:bg-dark-bg border border-transparent'
                }`
              }
            >
              <Icon 
                size={20} 
                className='transition-transform duration-200 group-hover:scale-110' 
              />
              <span className='text-sm font-semibold'>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer avec versioning */}
        <div className='p-4 border-t border-dark-border bg-dark-card/50'>
          <div className='bg-dark-bg/40 border border-dark-border/50 rounded-xl p-3'>
            <p className='text-text-muted text-[9px] text-center uppercase tracking-tighter'>
              © 2026 Nexalyze Engine v1.0.4
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
