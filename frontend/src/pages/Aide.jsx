// frontend/src/pages/Aide.jsx
import { useState } from 'react';

const sections = [
  { id: 'overview', label: '🗺 Vue d\'ensemble',    color: 'blue'   },
  { id: 'collecte', label: '📝 Saisir des données', color: 'violet' },
  { id: 'dashboard',label: '📊 Tableau de Bord',    color: 'green'  },
  { id: 'analyse',  label: '🧠 Analyse IA',          color: 'yellow' },
  { id: 'stats',    label: '📐 Les Statistiques',    color: 'blue'   },
  { id: 'faq',      label: '❓ FAQ',                 color: 'violet' },
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
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center
                       font-bold text-lg flex-shrink-0 border ${colors[color]}`}>
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
        <div className='w-9 h-9 rounded-full border-2 border-dark-border bg-dark-card
                        flex items-center justify-center text-text-muted font-bold
                        text-sm flex-shrink-0 z-10'>
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
      <SectionTitle num='1' title='Vue d\'ensemble' subtitle='Les 5 pages et leur rôle' color='blue' />
      <p className='text-text-muted mb-6 leading-relaxed'>
        ImmoAnalytics est divisée en <strong className='text-text-primary'>5 pages</strong> accessibles
        via la barre latérale gauche. Chaque page a un rôle précis dans le cycle d'analyse.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6'>
        {[
          { icon: '📊', title: 'Tableau de Bord', desc: 'Vue globale, graphiques et indicateurs clés' },
          { icon: '📝', title: 'Collecte',         desc: 'Saisir un nouveau bien immobilier' },
          { icon: '🗃',  title: 'Explorateur',     desc: 'Consulter, modifier et supprimer les données' },
          { icon: '🧠', title: 'Analyse IA',       desc: 'Régression linéaire et prédictions de prix' },
          { icon: '⚙️', title: 'Paramètres',       desc: 'Configuration de l\'application' },
          { icon: '❓', title: 'Aide',             desc: 'Ce guide que tu es en train de lire' },
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
      <InfoBox type='good' title='Astuce qualité des données'>
        Saisis des biens <strong>variés</strong> : petites et grandes surfaces, quartiers différents,
        biens avec et sans jardin. Un modèle entraîné sur des données diversifiées est bien plus fiable.
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
        <StatCard title='Biens Total'    value='24'     desc='Biens dans la base'           color='blue'   />
        <StatCard title='Prix Moyen'     value='87.3M'  desc='En FCFA'                      color='green'  />
        <StatCard title='Prix/m² Moyen'  value='412k'   desc='FCFA par m²'                  color='violet' />
        <StatCard title='Coefficient R²' value='78.4%'  desc='Fiabilité du modèle'          color='yellow' />
      </div>
      <InfoBox type='tip' title='Comment interpréter le Prix/m² ?'>
        C'est l'indicateur le plus utile pour <strong>comparer des biens de tailles différentes</strong>.
        Un appart à 50M pour 100m² = 500k/m². Une villa à 200M pour 300m² = 667k/m².
        Le second est plus cher au m² même si le premier coûte moins au total.
      </InfoBox>
      <h3 className='font-semibold text-text-primary mb-3 mt-6'>Le graphique — Nuage de Points</h3>
      <div className='card'>
        <div className='bg-dark-bg rounded-lg p-4 mb-4 border border-dark-border'>
          <svg viewBox='0 0 500 160' className='w-full'>
            <line x1='35' y1='10' x2='35' y2='140' stroke='#30363D' strokeWidth='1'/>
            <line x1='35' y1='140' x2='480' y2='140' stroke='#30363D' strokeWidth='1'/>
            <text x='250' y='158' textAnchor='middle' fill='#8B949E' fontSize='10' fontFamily='sans-serif'>Surface (m²) →</text>
            <line x1='50' y1='128' x2='460' y2='22' stroke='#8B5CF6' strokeWidth='2' strokeDasharray='6,3' opacity='0.8'/>
            {[[70,125],[120,108],[175,95],[220,82],[270,70],[320,58],[370,48],[420,38],[110,118],[250,88],[340,72]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r='5' fill='#3B82F6' opacity='0.85'/>
            ))}
            <text x='320' y='18' fill='#8B5CF6' fontSize='9' fontFamily='sans-serif'>← Ligne de régression</text>
            <text x='140' y='115' fill='#3B82F6' fontSize='9' fontFamily='sans-serif'>● Point de données</text>
          </svg>
        </div>
        <p className='text-text-muted text-sm leading-relaxed'>
          Chaque <strong className='text-accent-blue'>point bleu</strong> = un bien immobilier.
          La <strong className='text-accent-violet'>ligne violette pointillée</strong> = la tendance générale du marché.
          Les points <strong className='text-text-primary'>au-dessus</strong> de la ligne sont potentiellement surévalués,
          ceux <strong className='text-text-primary'>en-dessous</strong> sont des opportunités.
          <strong className='text-text-primary'> Survole</strong> un point pour voir ses détails.
        </p>
      </div>
    </div>
  );
}

function Analyse() {
  return (
    <div>
      <SectionTitle num='4' title='Analyse IA' subtitle='Prédictions & Simulateur de prix' color='yellow' />
      <h3 className='font-semibold text-text-primary mb-3'>Le panneau Régression Multiple</h3>
      <p className='text-text-muted mb-4 text-sm leading-relaxed'>
        Ce panneau affiche <strong className='text-text-primary'>l'influence de chaque variable sur le prix</strong>.
        Les barres montrent quel critère pèse le plus dans la détermination du prix.
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
              ['Présence piscine',  '+12 000 000 FCFA',    'green',  'Une piscine ajoute 12M toutes choses égales'],
              ['Âge du bâtiment',   '-800 000 FCFA/an',    'red',    'Chaque année d\'ancienneté diminue le prix de 800k'],
              ['Présence jardin',   '+7 500 000 FCFA',     'green',  'Un jardin privé ajoute 7,5M de valeur'],
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
      <InfoBox type='warn' title='Ces chiffres sont propres à TES données'>
        Les coefficients ci-dessus sont des exemples illustratifs. Ton application calcule ses propres
        coefficients basés uniquement sur les biens que tu as saisis. Ils évoluent à chaque nouveau bien ajouté.
      </InfoBox>
      <h3 className='font-semibold text-text-primary mb-3 mt-6'>Le Simulateur de Prix</h3>
      <Step num='1' title='Ajuste les curseurs'>
        Déplace les curseurs pour définir la surface, le nombre de pièces, le prestige du quartier et
        l'état général. Le prix s'actualise automatiquement après chaque modification.
      </Step>
      <Step num='2' title='Active les options'>
        Clique sur les boutons Piscine et Jardin pour voir exactement combien ces équipements
        ajoutent à la valeur estimée.
      </Step>
      <Step num='3' title='Lis le résultat et l\'intervalle'>
        Le grand chiffre violet = le <strong>prix estimé</strong>. L'intervalle [X — Y] en dessous
        = la fourchette de prix probable. Plus l'intervalle est étroit, plus le modèle est précis.
      </Step>
      <InfoBox type='good' title='Cas d\'usage pratique'>
        Tu veux acheter un appartement de 120m² au quartier Bastos (score 9) avec jardin.
        Place les curseurs sur ces valeurs — l'app te donne immédiatement une estimation du prix juste.
        Si le vendeur demande bien plus, c'est un signal de négociation.
      </InfoBox>
    </div>
  );
}

function Stats() {
  return (
    <div>
      <SectionTitle num='5' title='Comprendre les Statistiques' subtitle='R², régression, coefficients — expliqués simplement' color='blue' />
      <h3 className='font-semibold text-text-primary mb-3'>La formule de régression</h3>
      <div className='bg-dark-bg border border-accent-violet/30 rounded-xl p-5 text-center mb-6
                      shadow-[0_0_20px_rgba(139,92,246,0.08)]'>
        <p className='font-mono text-accent-violet text-lg'>
          Prix = β₀ + (β₁ × Surface) + (β₂ × Pièces) + (β₃ × Prestige) +{' '}
          <span className='text-accent-green'>...</span>
        </p>
      </div>
      <div className='card mb-6 overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-dark-border'>
              {['Terme','Nom','Signification'].map(h => (
                <th key={h} className='text-left pb-3 text-text-muted font-medium text-xs uppercase tracking-wider pr-4'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['β₀', 'Ordonnée à l\'origine', 'La valeur plancher théorique du bien. C\'est la base avant toute variable.'],
              ['β₁', 'Coefficient Surface',    'Prix ajouté par chaque m² supplémentaire.'],
              ['β₂, β₃…', 'Autres coefficients', 'Influence de chaque variable (pièces, prestige, piscine…) sur le prix.'],
              ['ε', 'Erreur résiduelle', 'La partie du prix que le modèle ne peut pas expliquer. Toujours présente.'],
            ].map(([t, n, s]) => (
              <tr key={t} className='border-b border-dark-border/40'>
                <td className='py-3 pr-4 font-mono text-accent-blue font-bold'>{t}</td>
                <td className='py-3 pr-4 text-text-primary text-xs font-medium'>{n}</td>
                <td className='py-3 text-text-muted text-xs'>{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className='font-semibold text-text-primary mb-4'>Le Coefficient R² — La jauge de fiabilité</h3>
      <div className='w-full bg-dark-border rounded-full h-2.5 mb-2'>
        <div className='h-2.5 rounded-full w-full'
             style={{ background: 'linear-gradient(90deg, #F85149, #D29922 50%, #3FB950)',
                      boxShadow: '0 0 8px rgba(63,185,80,0.4)' }} />
      </div>
      <div className='flex justify-between text-xs text-text-muted mb-4'>
        <span>0% — Inutile</span><span>50%</span><span>100% — Parfait</span>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6'>
        {[
          { range: '0% → 50%', label: 'Modèle faible', color: 'red',    desc: 'Ajoute plus de données variées.' },
          { range: '50% → 75%',label: 'Acceptable',    color: 'yellow', desc: 'Utilisable mais perfectible.' },
          { range: '75%+',      label: '✅ Fiable',     color: 'green',  desc: 'Tu peux faire confiance aux prédictions.' },
        ].map(({ range, label, color, desc }) => (
          <div key={range} className={`card text-center border
            ${color === 'red'    ? 'border-accent-red/20    bg-accent-red/5'    : ''}
            ${color === 'yellow' ? 'border-accent-yellow/20 bg-accent-yellow/5' : ''}
            ${color === 'green'  ? 'border-accent-green/20  bg-accent-green/5'  : ''}`}>
            <p className={`font-bold text-lg mb-1
              ${color === 'red' ? 'text-accent-red' : color === 'yellow' ? 'text-accent-yellow' : 'text-accent-green'}`}>
              {range}
            </p>
            <p className='text-text-primary text-sm font-medium mb-1'>{label}</p>
            <p className='text-text-muted text-xs'>{desc}</p>
          </div>
        ))}
      </div>
      <InfoBox type='tip' title='Exemple concret de R²'>
        Un R² de <strong>78%</strong> signifie : "78% de la variation des prix est expliquée par
        la surface, le prestige, la piscine, etc." Les 22% restants viennent de facteurs non capturés
        (vue, négociation, urgence de vente…). C'est normal et acceptable.
      </InfoBox>
      <h3 className='font-semibold text-text-primary mb-3 mt-6'>Comment améliorer la précision ?</h3>
      <Step num='+' title='Ajoute plus de données'>
        Vise au minimum <strong>30 biens</strong> pour des prédictions vraiment fiables.
        Avec 5-10 biens, le R² sera naturellement bas — c'est normal.
      </Step>
      <Step num='+' title='Diversifie les types de biens'>
        Si tu n'as que des appartements de 80m², le modèle sera mauvais pour prédire une villa de 300m².
        Inclus des biens variés en surface, type et quartier.
      </Step>
      <Step num='+' title='Remplis tous les champs'>
        Plus tu renseignes de variables, plus le modèle a de données pour être précis.
        Les champs vides sont remplacés par des valeurs par défaut.
      </Step>
    </div>
  );
}

function FAQ() {
  const items = [
    {
      q: 'Le Tableau de Bord affiche "0 biens" alors que j\'en ai saisi',
      a: 'Attends quelques secondes et recharge la page. Vérifie dans l\'Explorateur que l\'enregistrement a bien réussi — une confirmation verte s\'affiche après chaque sauvegarde réussie.',
    },
    {
      q: 'La prédiction affiche "Pas assez de données"',
      a: 'Il faut au minimum 5 biens dans la base pour activer les prédictions. C\'est une contrainte mathématique — la régression ne peut pas s\'entraîner sur moins de données que de variables.',
    },
    {
      q: 'Le R² est très bas (moins de 30%) — est-ce normal ?',
      a: 'Oui, au début avec peu de données. Un R² de 30% avec 5-8 biens est normal. Il augmente progressivement. Un R² bas ne t\'empêche pas d\'utiliser l\'app — il t\'indique juste de ne pas trop te fier aux prédictions pour l\'instant.',
    },
    {
      q: 'Le prix prédit semble irréaliste',
      a: 'Cela arrive si tes données ne contiennent pas de biens similaires. Si tu simules une villa de 500m² mais que ta base ne contient que des studios de 30m², l\'extrapolation sera peu fiable. Ajoute des biens similaires au type recherché.',
    },
    {
      q: 'Comment supprimer un bien saisi par erreur ?',
      a: 'Va dans l\'Explorateur, trouve le bien dans le tableau et clique sur l\'icône corbeille 🗑 à droite. Une confirmation te sera demandée avant la suppression définitive.',
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <div>
      <SectionTitle num='6' title='Questions Fréquentes' subtitle='Problèmes courants et solutions' color='violet' />
      <div className='space-y-3'>
        {items.map(({ q, a }, i) => (
          <div key={i}
               className={`card cursor-pointer transition-all duration-200
                 ${open === i ? 'border-accent-blue/40' : 'hover:border-dark-border/80'}`}
               onClick={() => setOpen(open === i ? null : i)}>
            <div className='flex items-start justify-between gap-3'>
              <p className='font-semibold text-text-primary text-sm'>{q}</p>
              <span className={`text-text-muted flex-shrink-0 transition-transform duration-200
                ${open === i ? 'rotate-45 text-accent-blue' : ''}`}>+</span>
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

// ── COMPOSANT PRINCIPAL ───────────────────────────────────────────────────────

const sectionComponents = { overview: Overview, collecte: Collecte, dashboard: Dashboard, analyse: Analyse, stats: Stats, faq: FAQ };

export default function Aide() {
  const [active, setActive] = useState('overview');
  const ActiveSection = sectionComponents[active];

  return (
    <div className='flex gap-6 max-w-6xl'>
      {/* Sommaire latéral */}
      <aside className='hidden lg:flex flex-col gap-1 w-56 flex-shrink-0'>
        <p className='text-text-muted text-xs font-medium uppercase tracking-wider px-3 mb-2'>
          Sommaire
        </p>
        {sections.map(({ id, label, color }) => (
          <button key={id} onClick={() => setActive(id)}
            className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200
              ${active === id
                ? `${colors[color]} border font-medium`
                : 'text-text-muted hover:text-text-primary hover:bg-dark-card'}`}>
            {label}
          </button>
        ))}
      </aside>

      {/* Contenu principal */}
      <div className='flex-1 min-w-0'>
        {/* Menu mobile */}
        <div className='lg:hidden flex gap-2 flex-wrap mb-6'>
          {sections.map(({ id, label }) => (
            <button key={id} onClick={() => setActive(id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${active === id
                  ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/30'
                  : 'bg-dark-card border border-dark-border text-text-muted'}`}>
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
