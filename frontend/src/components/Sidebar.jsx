// frontend/src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Plus, Table, Brain, Settings } from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Tableau de Bord' },
  { path: '/collecte', icon: Plus, label: 'Collecte' },
  { path: '/explorer', icon: Table, label: 'Explorateur' },
  { path: '/analyse', icon: Brain, label: 'Analyse IA' },
  { path: '/settings', icon: Settings, label: 'Paramètres' },
];

export default function Sidebar() {
  return (
    // Sidebar reçoit maintenant deux props : isOpen et onClose
export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`fixed left-0 top-0 h-screen w-64 bg-dark-card
                      border-r border-dark-border flex flex-col z-50
                      transition-transform duration-300
                      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                      lg:translate-x-0`}>
      {/* Logo — ajoute un bouton fermer sur mobile */}
      <div className='p-6 border-b border-dark-border flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-bold'>
            <span className='text-accent-blue'>Immo</span>
            <span className='text-accent-violet'>Analytics</span>
          </h1>
          <p className='text-text-muted text-xs mt-1'>Analyse prédictive</p>
        </div>
        <button onClick={onClose}
          className='lg:hidden text-text-muted hover:text-text-primary'>
          ✕
        </button>
      </div>
      {/* ... le reste de ton code Sidebar ne change pas ... */}

      {/* Navigation */}
      <nav className='flex-1 p-4 space-y-2 mt-4'>
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
              ${isActive
                ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                : 'text-text-muted hover:text-text-primary hover:bg-dark-bg'
              }`
            }
          >
            <Icon 
              size={20} 
              className='transition-transform duration-200 group-hover:scale-110' 
            />
            <span className='text-sm font-medium'>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className='p-4 border-t border-dark-border'>
        <div className='bg-dark-bg/50 rounded-lg p-3'>
          <p className='text-text-muted text-[10px] text-center'>
            © 2026 Nexalyze Engine
          </p>
        </div>
      </div>
    </aside>
  );
}
