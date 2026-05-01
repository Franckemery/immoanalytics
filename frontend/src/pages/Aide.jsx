// frontend/src/pages/Aide.jsx
import { useState } from 'react';
// Import des icônes si tu décides d'en utiliser plus tard au lieu des emojis
// import { Brain, Map, Database, LayoutDashboard, HelpCircle, Activity } from 'lucide-react';

const sections = [
  { id: 'overview', label: '🗺 Vue d\'ensemble',    color: 'blue'   },
  { id: 'collecte', label: '📝 Saisir des données', color: 'violet' },
  { id: 'dashboard',label: '📊 Tableau de Bord',    color: 'green'  },
  { id: 'analyse',  label: '🧠 Analyse IA',          color: 'yellow' },
  { id: 'stats',    label: '📐 Les Statistiques',    color: 'blue'   },
  { id: 'faq',      label: '❓ FAQ',                  color: 'violet' },
];

const colors = {
  blue:   'border-accent-blue/30 text-accent-blue bg-accent-blue/10',
  violet: 'border-accent-violet/30 text-accent-violet bg-accent-violet/10',
  green:  'border-accent-green/30 text-accent-green bg-accent-green/10',
  yellow: 'border-accent-yellow/30 text-accent-yellow bg-accent-yellow/10',
};

// --- COMPOSANTS INTERNES ---

function InfoBox({ type = 'tip', title, children }) {
  const styles = {
    tip:    'border-accent-blue/25   bg-accent-blue/5   text-accent-blue',
    warn:   'border-accent-yellow/25 bg-accent-yellow/5 text-accent-yellow',
    good:   'border-accent-green/25  bg-accent-green/5  text-accent-green',
    danger: 'border-accent-red/25    bg-accent-red/5    text-accent-red',
  };
  const icons = { tip: '💡', warn: '⚠️', good: '✅', danger: '🚫' };
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${styles[type]} mb-4`}>
      <span className='text-lg flex-shrink-0'>{icons[type]}</span>
      <div>
        <p className='font-semibold text-sm mb-1'>{title}</p>
        <div className='text-text-muted text-sm leading-relaxed'>{children}</div>
      </div>
    </div>
  );
}

function SectionTitle({ num, title, subtitle, color }) {
  return (
    <div className='flex items-center gap-4 mb-8 pb-5 border-b border-dark-border'>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 border ${colors[color]}`}>
        {num}
      </div>
      <div>
        <h2 className='text-2xl font-bold text-text-primary'>{title}</h2>
        {subtitle && <p className='text-text-muted text-sm mt-0.5'>{subtitle}</p>}
      </div>
    </div>
  );
}

function Step({ num, title, children }) {
  return (
    <div className='flex gap-4 pb-6 relative'>
      <div className='flex flex-col items-center'>
        <div className='w-9 h-9 rounded-full border-2 border-dark-border bg-dark-card flex items-center justify-center text-text-muted font-bold text-sm flex-shrink-0 z-10'>
          {num}
        </div>
        <div className='w-0.5 flex-1 bg-gradient-to-b from-dark-border to-transparent mt-1' />
      </div>
      <div className='pb-2'>
        <h4 className='font-semibold text-text-primary mb-1'>{title}</h4>
        <div className='text-text-muted text-sm leading-relaxed'>{children}</div>
      </div>
    </div>
  );
}

function StatCard({ title, value, desc, color }) {
  const top = {
    blue:   'bg-accent-blue',
    violet: 'bg-accent-violet',
    green:  'bg-accent-green',
    yellow: 'bg-accent-yellow',
  };
  const val = {
    blue:   'text-accent-blue',
    violet: 'text-accent-violet',
    green:  'text-accent-green',
    yellow: 'text-accent-yellow',
  };
  return (
    <div className='card relative overflow-hidden'>
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${top[color]}`} />
      <p className='text-text-muted text-xs font-medium uppercase tracking-wider mb-2'>{title}</p>
      <p className={`text-3xl font-bold ${val[color]} mb-1`}>{value}</p>
      <p className='text-text-muted text-xs'>{desc}</p>
    </div>
  );
}

// --- SECTIONS DE CONTENU ---

function Overview() {
  return (
    <div className="animate-in fade-in duration-500">
      <SectionTitle num='1' title='Vue d’ensemble' subtitle='Structure de Nexalyze' color='blue' />
      <p className='text-text-muted mb-6 leading-relaxed'>
        Nexalyze est conçu pour simplifier l'analyse immobilière. Chaque page correspond à une étape de ton workflow.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6'>
        {[
          { icon: '📊', title: 'Tableau de Bord', desc: 'Visualisation globale et indicateurs de performance.' },
          { icon: '📝', title: 'Collecte',         desc: 'Saisie structurée des caractéristiques des biens.' },
          { icon: '🗃',  title: 'Explorateur',      desc: 'Gestion complète de ta base de données.' },
          { icon: '🧠', title: 'Analyse IA',       desc: 'Modèle de régression et simulateur de prix.' },
          { icon: '⚙️', title: 'Paramètres',       desc: 'Personnalisation de l’expérience.' },
          { icon: '❓', title: 'Aide',               desc: 'Documentation technique de l’outil.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className='card hover:border-accent-blue/40 transition-all cursor-pointer'>
            <span className='text-2xl mb-3 block'>{icon}</span>
            <h4 className='font-semibold text-text-primary text-sm mb-1'>{title}</h4>
            <p className='text-text-muted text-xs leading-relaxed'>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Les fonctions Collecte, Dashboard, Analyse, Stats, FAQ restent structurellement les mêmes que ton code initial 
// mais j'ai corrigé l'erreur "Brain" dans Analyse.

function Analyse() {
  return (
    <div className="animate-in fade-in duration-500">
      <SectionTitle num='4' title='Analyse IA' subtitle='Comprendre les prédictions' color='yellow' />
      <h3 className='font-semibold text-text-primary mb-3'>La Régression Multiple</h3>
      {/* Correction ici : suppression de la référence à Brain non importé */}
      <p className='text-text-muted mb-4 text-sm leading-relaxed'>
        Nexalyze utilise un algorithme de <strong>Régression Linéaire Multiple</strong> pour estimer la valeur des biens en fonction de plusieurs variables simultanées.
      </p>
      <div className='card mb-6 overflow-x-auto'>
         {/* ... (Tableau des coefficients identique à ton code) */}
      </div>
    </div>
  );
}

// ... Les autres sections (Collecte, Stats, FAQ) doivent être incluses ici ...

// --- COMPOSANT PRINCIPAL ---

const sectionComponents = { 
  overview: Overview, 
  collecte: () => <div className="p-4">Contenu Collecte...</div>, // À remplacer par tes fonctions
  dashboard: () => <div className="p-4">Contenu Dashboard...</div>, 
  analyse: Analyse, 
  stats: () => <div className="p-4">Contenu Stats...</div>, 
  faq: () => <div className="p-4">Contenu FAQ...</div> 
};

export default function Aide() {
  const [active, setActive] = useState('overview');
  const ActiveSection = sectionComponents[active] || Overview;

  return (
    <div className='flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto'>
      {/* Sommaire latéral */}
      <aside className='hidden lg:flex flex-col gap-1 w-64 flex-shrink-0'>
        <p className='text-text-muted text-xs font-medium uppercase tracking-wider px-3 mb-2'>
          Documentation
        </p>
        {sections.map(({ id, label, color }) => (
          <button 
            key={id} 
            onClick={() => setActive(id)}
            className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 border
              ${active === id 
                ? `${colors[color]} font-bold shadow-lg shadow-accent-blue/5` 
                : 'border-transparent text-text-muted hover:text-text-primary hover:bg-dark-card'}`}
          >
            {label}
          </button>
        ))}
      </aside>

      {/* Menu mobile */}
      <div className='lg:hidden flex gap-2 overflow-x-auto pb-2 no-scrollbar'>
        {sections.map(({ id, label }) => (
          <button 
            key={id} 
            onClick={() => setActive(id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border
              ${active === id 
                ? 'bg-accent-blue text-white border-accent-blue' 
                : 'bg-dark-card border-dark-border text-text-muted'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Contenu principal */}
      <div className='flex-1 min-w-0'>
        <div className='card min-h-[500px] border-dark-border/50 bg-dark-card/30 backdrop-blur-sm'>
          <ActiveSection />
        </div>
      </div>
    </div>
  );
}
