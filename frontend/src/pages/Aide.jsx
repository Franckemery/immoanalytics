// frontend/src/pages/Aide.jsx
import { useState } from 'react';

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
        <p className='text-text-muted text-sm leading-relaxed'>{children}</p>
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
        <p className='text-text-muted text-sm leading-relaxed'>{children}</p>
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
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${top[color]}`}
           style={{ boxShadow: `0 0 8px currentColor` }} />
      <p className='text-text-muted text-xs font-medium uppercase tracking-wider mb-2'>{title}</p>
      <p className={`text-3xl font-bold ${val[color]} mb-1`}>{value}</p>
      <p className='text-text-muted text-xs'>{desc}</p>
    </div>
  );
}

// ── CONTENU DE CHAQUE SECTION ─────────────────────────────────────────────────

function Overview() {
  return (
    <div>
      <SectionTitle num='1' title="Vue d'ensemble" subtitle='Les 5 pages et leur rôle' color='blue' />
      <p className='text-text-muted mb-6 leading-relaxed'>
        <strong className='text-text-primary'>ImmoAnalytics</strong> est divisée en <strong className='text-text-primary'>5 pages</strong> accessibles
        via la barre latérale gauche. Chaque page a un rôle précis dans le cycle d'analyse.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6'>
        {[
          { icon: '📊', title: 'Tableau de Bord', desc: 'Vue globale, graphiques et indicateurs clés' },
          { icon: '📝', title: 'Collecte',         desc: 'Saisir un nouveau bien immobilier' },
          { icon: '🗃',  title: 'Explorateur',      desc: 'Consulter, modifier et supprimer les données' },
          { icon: '🧠', title: 'Analyse IA',       desc: 'Régression linéaire et prédictions de prix' },
          { icon: '⚙️', title: 'Paramètres',       desc: 'Configuration de l\'application' },
          { icon: '❓', title: 'Aide',               desc: 'Ce guide que tu es en train de lire' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className='card hover:border-accent-blue/40 transition-all duration-200'>
            <span className='text-2xl mb-3 block'>{icon}</span>
            <h4 className='font-semibold text-text-primary text-sm mb-1'>{title}</h4>
            <p className='text-text-muted text-xs leading-relaxed'>{desc}</p>
          </div>
        ))}
      </div>
      <InfoBox type='tip' title='Par où commencer ?'>
        Si tu utilises l'app pour la première fois, commence par la page <strong>Collecte</strong> pour
        ajouter des biens. Le Tableau de Bord et l'Analyse IA s'enrichissent automatiquement à chaque
        nouveau bien. Il faut au minimum <strong>5 biens</strong> pour activer les prédictions.
      </InfoBox>
    </div>
  );
}

function Collecte() {
  return (
    <div>
      <SectionTitle num='2' title='Saisir des données' subtitle='Le formulaire en 3 étapes' color='violet' />
      <p className='text-text-muted mb-6 leading-relaxed'>
        La page Collecte utilise un formulaire guidé en <strong className='text-text-primary'>3 étapes</strong>.
        Une barre de progression lumineuse en haut indique où tu en es.
      </p>
      <Step num='1' title='Identité & Emplacement'>
        Donne un nom au bien (ex: "Villa Bastos 3"), choisis son type, le quartier, la distance au
        centre-ville en km et évalue le prestige du quartier de 1 à 10 avec le curseur lumineux.
      </Step>
      <Step num='2' title='Caractéristiques Physiques'>
        Renseigne la surface en m² (obligatoire — c'est la variable la plus importante), le nombre
        de pièces, chambres, salles de bain, l'étage et l'âge du bâtiment. Active les équipements
        présents (Jardin 🌿, Piscine 🏊, Garage 🚗…) — ils s'illuminent en bleu quand activés.
      </Step>
      <Step num='3' title='Valeur Marchande'>
        Saisis le prix de vente en FCFA. C'est cette donnée qui entraîne le modèle — plus tu ajoutes
        de biens avec leur prix réel, plus les prédictions futures seront précises.
      </Step>
      <InfoBox type='warn' title='Champs obligatoires'>
        Le <strong>nom du bien</strong>, la <strong>surface en m²</strong> et le <strong>prix de vente</strong> sont
        obligatoires. Sans eux, l'enregistrement sera refusé.
      </InfoBox>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <SectionTitle num='3' title='Tableau de Bord' subtitle='Lire les 4 indicateurs clés' color='green' />
      <p className='text-text-muted mb-6 leading-relaxed'>
        Le Tableau de Bord est la vue d'ensemble de ton marché. Il se met à jour automatiquement à
        chaque nouveau bien ajouté.
      </p>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6'>
        <StatCard title='Biens Total'    value='111'    desc='Unités enregistrées'           color='blue'   />
        <StatCard title='Prix Moyen'     value='85.7 M' desc='Millions de FCFA'              color='green'  />
        <StatCard title='Moyenne au m²'  value='497 k'  desc='FCFA / m²'                     color='violet' />
        <StatCard title='Fiabilité R²'   value='76.0%'  desc='Précision du modèle'           color='yellow' />
      </div>
      <InfoBox type='tip' title='Comment interpréter le Prix/m² ?'>
        C'est l'indicateur le plus utile pour <strong>comparer des biens de tailles différentes</strong>.
        Un appart à 50M pour 100m² = 500k/m². Une villa à 200M pour 300m² = 667k/m².
        Le second est plus cher au m² même si le premier coûte moins au total.
      </InfoBox>
    </div>
  );
}

function Analyse() {
  return (
    <div>
      <SectionTitle num='4' title='Analyse IA' subtitle='Prédictions & Simulateur de prix' color='yellow' />
      <h3 className='font-semibold text-text-primary mb-3'>Le panneau Régression Multiple</h3>
      <p className='text-text-muted mb-4 text-sm leading-relaxed'>
        Ce panneau affiche <strong className='text-text-primary'>l'influence de chaque variable sur le prix</strong> dans ImmoAnalytics.
      </p>
      <div className='card mb-6 overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-dark-border'>
              {['Variable','Coefficient exemple','Interprétation'].map(h => (
                <th key={h} className='text-left pb-3 text-text-muted font-medium text-xs uppercase tracking-wider pr-4'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Surface m²',        '+450 000 FCFA/m²',    'green',  'Chaque m² supplémentaire augmente le prix de 450 000 FCFA'],
              ['Prestige quartier', '+3 200 000 FCFA/pt',  'green',  'Passer d\'un score 5 à 6 ajoute ~3,2M au prix'],
              ['Âge du bâtiment',   '-800 000 FCFA/an',    'red',    'Chaque année d\'ancienneté diminue le prix de 800k'],
            ].map(([v, c, color, interp]) => (
              <tr key={v} className='border-b border-dark-border/40'>
                <td className='py-3 pr-4 font-medium text-text-primary text-xs'>{v}</td>
                <td className='py-3 pr-4'>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                    ${color === 'green' ? 'bg-accent-green/15 text-accent-green' : 'bg-accent-red/15 text-accent-red'}`}>
                    {c}
                  </span>
                </td>
                <td className='py-3 text-text-muted text-xs'>{interp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div>
      <SectionTitle num='5' title='Comprendre les Statistiques' subtitle='R², régression, coefficients' color='blue' />
      <div className='bg-dark-bg border border-accent-violet/30 rounded-xl p-5 text-center mb-6 shadow-[0_0_20px_rgba(139,92,246,0.08)]'>
        <p className='font-mono text-accent-violet text-lg'>
          Prix = β₀ + (β₁ × Surface) + (β₂ × Pièces) + ...
        </p>
      </div>
    </div>
  );
}

function FAQ() {
  const items = [
    {
      q: 'La prédiction affiche "Pas assez de données"',
      a: 'Il faut au minimum 5 biens dans la base pour activer les prédictions. C\'est une contrainte mathématique.',
    }
  ];
  const [open, setOpen] = useState(null);
  return (
    <div>
      <SectionTitle num='6' title='Questions Fréquentes' subtitle='Problèmes courants' color='violet' />
      <div className='space-y-3'>
        {items.map(({ q, a }, i) => (
          <div key={i} className='card cursor-pointer' onClick={() => setOpen(open === i ? null : i)}>
            <p className='font-semibold text-text-primary text-sm'>{q}</p>
            {open === i && <p className='text-text-muted text-sm leading-relaxed mt-3 pt-3 border-t border-dark-border'>{a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── COMPOSANT PRINCIPAL ───────────────────────────────────────────────────────

const sectionComponents = { overview: Overview, collecte: Collecte, dashboard: Dashboard, analyse: Analyse, stats: Stats, faq: FAQ };

export default function Aide() {
  const [active, setActive] = useState('overview');
  const ActiveSection = sectionComponents[active];

  return (
    <div className='flex flex-col lg:flex-row gap-6 max-w-6xl'>
      {/* Sommaire latéral */}
      <aside className='hidden lg:flex flex-col gap-1 w-56 flex-shrink-0'>
        <p className='text-text-muted text-xs font-medium uppercase tracking-wider px-3 mb-2'>Sommaire</p>
        {sections.map(({ id, label, color }) => (
          <button key={id} onClick={() => setActive(id)}
            className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all
              ${active === id ? `${colors[color]} border font-medium` : 'text-text-muted hover:bg-dark-card'}`}>
            {label}
          </button>
        ))}
      </aside>

      {/* Contenu principal */}
      <div className='flex-1 min-w-0'>
        <div className='card'>
          <ActiveSection />
        </div>
      </div>
    </div>
  );
}
