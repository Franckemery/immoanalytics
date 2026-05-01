// frontend/src/pages/Aide.jsx
import { useState } from 'react';

const sections = [
  { id: 'overview', label: '🗺 Vue d\'ensemble', color: 'blue' },
  { id: 'collecte', label: '📝 Saisir des données', color: 'violet' },
  { id: 'dashboard', label: '📊 Tableau de Bord', color: 'green' },
  { id: 'analyse', label: '🧠 Analyse IA', color: 'yellow' },
  { id: 'stats', label: '📐 Les Statistiques', color: 'blue' },
  { id: 'faq', label: '❓ FAQ', color: 'violet' },
];

const colors = {
  blue: 'border-accent-blue/30 text-accent-blue bg-accent-blue/10',
  violet: 'border-accent-violet/30 text-accent-violet bg-accent-violet/10',
  green: 'border-accent-green/30 text-accent-green bg-accent-green/10',
  yellow: 'border-accent-yellow/30 text-accent-yellow bg-accent-yellow/10',
};

function InfoBox({ type = 'tip', title, children }) {
  const styles = {
    tip: 'border-accent-blue/25 bg-accent-blue/5 text-accent-blue',
    warn: 'border-accent-yellow/25 bg-accent-yellow/5 text-accent-yellow',
    good: 'border-accent-green/25 bg-accent-green/5 text-accent-green',
    danger: 'border-accent-red/25 bg-accent-red/5 text-accent-red',
  };

  const icons = {
    tip: '💡',
    warn: '⚠️',
    good: '✅',
    danger: '🚫',
  };

  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${styles[type]} mb-4`}>
      <span className='text-lg flex-shrink-0'>{icons[type]}</span>

      <div>
        <p className='font-semibold text-sm mb-1'>{title}</p>
        <p className='text-text-muted text-sm leading-relaxed'>{children}</p>
      </div>
    </div>
  );
}

function SectionTitle({ num, title, subtitle, color }) {
  return (
    <div className='flex items-center gap-4 mb-8 pb-5 border-b border-dark-border'>
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 border ${colors[color]}`}
      >
        {num}
      </div>

      <div>
        <h2 className='text-2xl font-bold text-text-primary'>{title}</h2>

        {subtitle && (
          <p className='text-text-muted text-sm mt-0.5'>{subtitle}</p>
        )}
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
        <p className='text-text-muted text-sm leading-relaxed'>{children}</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, desc, color }) {
  const top = {
    blue: 'bg-accent-blue',
    violet: 'bg-accent-violet',
    green: 'bg-accent-green',
    yellow: 'bg-accent-yellow',
  };

  const val = {
    blue: 'text-accent-blue',
    violet: 'text-accent-violet',
    green: 'text-accent-green',
    yellow: 'text-accent-yellow',
  };

  return (
    <div className='card relative overflow-hidden'>
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 ${top[color]}`}
        style={{ boxShadow: '0 0 8px currentColor' }}
      />

      <p className='text-text-muted text-xs font-medium uppercase tracking-wider mb-2'>
        {title}
      </p>

      <p className={`text-3xl font-bold ${val[color]} mb-1`}>
        {value}
      </p>

      <p className='text-text-muted text-xs'>{desc}</p>
    </div>
  );
}

function Overview() {
  return (
    <div>
      <SectionTitle
        num='1'
        title='Vue d\'ensemble'
        subtitle='Les 5 pages et leur rôle'
        color='blue'
      />

      <p className='text-text-muted mb-6 leading-relaxed'>
        ImmoAnalytics est divisée en{' '}
        <strong className='text-text-primary'>5 pages</strong>{' '}
        accessibles via la barre latérale gauche.
      </p>

      <InfoBox type='tip' title='Par où commencer ?'>
        Commence par la page <strong>Collecte</strong> pour ajouter
        des biens.
      </InfoBox>
    </div>
  );
}

function Collecte() {
  return (
    <div>
      <SectionTitle
        num='2'
        title='Saisir des données'
        subtitle='Le formulaire en 3 étapes'
        color='violet'
      />

      <Step num='1' title='Identité & Emplacement'>
        Nom du bien, quartier, distance, prestige.
      </Step>

      <Step num='2' title='Caractéristiques'>
        Surface, pièces, chambres, équipements.
      </Step>

      <Step num='3' title='Prix'>
        Saisis le prix de vente en FCFA.
      </Step>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <SectionTitle
        num='3'
        title='Tableau de Bord'
        subtitle='Indicateurs clés'
        color='green'
      />

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
        <StatCard
          title='Biens'
          value='24'
          desc='Total'
          color='blue'
        />

        <StatCard
          title='Prix Moyen'
          value='87M'
          desc='FCFA'
          color='green'
        />

        <StatCard
          title='Prix/m²'
          value='412k'
          desc='FCFA'
          color='violet'
        />

        <StatCard
          title='R²'
          value='78%'
          desc='Fiabilité'
          color='yellow'
        />
      </div>
    </div>
  );
}

function Analyse() {
  return (
    <div>
      <SectionTitle
        num='4'
        title='Analyse IA'
        subtitle='Simulation et prédictions'
        color='yellow'
      />

      <InfoBox type='warn' title='Important'>
        Les résultats dépendent de la qualité des données saisies.
      </InfoBox>
    </div>
  );
}

function Stats() {
  return (
    <div>
      <SectionTitle
        num='5'
        title='Comprendre les Statistiques'
        subtitle='R², coefficients, régression'
        color='blue'
      />

      <InfoBox type='good' title='Conseil'>
        Plus tu as de données, plus le modèle devient fiable.
      </InfoBox>
    </div>
  );
}

function FAQ() {
  const items = [
    {
      q: 'Le tableau affiche 0 biens',
      a: 'Recharge la page.',
    },
    {
      q: 'Pas assez de données',
      a: 'Ajoute au moins 5 biens.',
    },
    {
      q: 'Le prix semble faux',
      a: 'Tes données sont peut-être insuffisantes.',
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <div>
      <SectionTitle
        num='6'
        title='Questions Fréquentes'
        subtitle='Solutions rapides'
        color='violet'
      />

      <div className='space-y-3'>
        {items.map(({ q, a }, i) => (
          <div
            key={q}
            className={`card cursor-pointer transition-all duration-200 ${
              open === i
                ? 'border-accent-blue/40'
                : 'hover:border-dark-border/80'
            }`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className='flex items-start justify-between gap-3'>
              <p className='font-semibold text-text-primary text-sm'>
                {q}
              </p>

              <span
                className={`text-text-muted flex-shrink-0 transition-transform duration-200 ${
                  open === i
                    ? 'rotate-45 text-accent-blue'
                    : ''
                }`}
              >
                +
              </span>
            </div>

            {open === i && (
              <p className='text-text-muted text-sm leading-relaxed mt-3 pt-3 border-t border-dark-border'>
                {a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const sectionComponents = {
  overview: Overview,
  collecte: Collecte,
  dashboard: Dashboard,
  analyse: Analyse,
  stats: Stats,
  faq: FAQ,
};

export default function Aide() {
  const [active, setActive] = useState('overview');

  const ActiveSection = sectionComponents[active];

  return (
    <div className='flex gap-6 max-w-6xl'>
      <aside className='hidden lg:flex flex-col gap-1 w-56 flex-shrink-0'>
        <p className='text-text-muted text-xs font-medium uppercase tracking-wider px-3 mb-2'>
          Sommaire
        </p>

        {sections.map(({ id, label, color }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              active === id
                ? `${colors[color]} border font-medium`
                : 'text-text-muted hover:text-text-primary hover:bg-dark-card'
            }`}
          >
            {label}
          </button>
        ))}
      </aside>

      <div className='flex-1 min-w-0'>
        <div className='lg:hidden flex gap-2 flex-wrap mb-6'>
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                active === id
                  ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/30'
                  : 'bg-dark-card border border-dark-border text-text-muted'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className='card'>
          <ActiveSection />
        </div>
      </div>
    </div>
  );
}
