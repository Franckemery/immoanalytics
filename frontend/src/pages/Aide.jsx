// frontend/src/pages/Aide.jsx
import { useState } from 'react';

// ── DONNÉES DE NAVIGATION ──────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'overview',  label: '🗺 Vue d\'ensemble',     color: 'blue'   },
  { id: 'collecte',  label: '📝 Saisir des données',  color: 'violet' },
  { id: 'dashboard', label: '📊 Tableau de Bord',     color: 'green'  },
  { id: 'analyse',   label: '🧠 Analyse IA',           color: 'yellow' },
  { id: 'stats',     label: '📐 Les Statistiques',    color: 'blue'   },
  { id: 'faq',       label: '❓ FAQ',                  color: 'violet' },
];

// ── HELPERS DE COULEUR ─────────────────────────────────────────────────────────
function getBtnClass(color, isActive) {
  const active = {
    blue:   'bg-blue-500/10 text-blue-400 border border-blue-500/30',
    violet: 'bg-violet-500/10 text-violet-400 border border-violet-500/30',
    green:  'bg-green-500/10 text-green-400 border border-green-500/30',
    yellow: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
  };
  return isActive
    ? active[color]
    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800';
}

function getNumClass(color) {
  const map = {
    blue:   'bg-blue-500/10 text-blue-400 border border-blue-500/30',
    violet: 'bg-violet-500/10 text-violet-400 border border-violet-500/30',
    green:  'bg-green-500/10 text-green-400 border border-green-500/30',
    yellow: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
  };
  return map[color];
}

// ── COMPOSANTS RÉUTILISABLES ───────────────────────────────────────────────────

function SectionHeader({ num, title, subtitle, color }) {
  return (
    <div className="flex items-center gap-4 mb-8 pb-5 border-b border-gray-800">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${getNumClass(color)}`}>
        {num}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
        {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function InfoBox({ type, title, children }) {
  const styles = {
    tip:  { box: 'border-blue-500/25 bg-blue-500/5',   title: 'text-blue-400',   icon: '💡' },
    warn: { box: 'border-yellow-500/25 bg-yellow-500/5', title: 'text-yellow-400', icon: '⚠️' },
    good: { box: 'border-green-500/25 bg-green-500/5',  title: 'text-green-400',  icon: '✅' },
  };
  const s = styles[type] || styles.tip;
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${s.box} mb-4`}>
      <span className="text-lg flex-shrink-0">{s.icon}</span>
      <div>
        <p className={`font-semibold text-sm mb-1 ${s.title}`}>{title}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Step({ num, title, children }) {
  return (
    <div className="flex gap-4 pb-6">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-9 h-9 rounded-full border-2 border-gray-700 bg-gray-900 flex items-center justify-center text-gray-400 font-bold text-sm">
          {num}
        </div>
        <div className="w-px flex-1 bg-gradient-to-b from-gray-700 to-transparent mt-1" />
      </div>
      <div className="pb-2 min-w-0">
        <h4 className="font-semibold text-gray-100 mb-1">{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, desc, color }) {
  const colors = {
    blue:   { bar: 'bg-blue-500',   val: 'text-blue-400'   },
    violet: { bar: 'bg-violet-500', val: 'text-violet-400' },
    green:  { bar: 'bg-green-500',  val: 'text-green-400'  },
    yellow: { bar: 'bg-yellow-500', val: 'text-yellow-400' },
  };
  const c = colors[color] || colors.blue;
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${c.bar}`} />
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">{title}</p>
      <p className={`text-3xl font-bold mb-1 ${c.val}`}>{value}</p>
      <p className="text-gray-500 text-xs">{desc}</p>
    </div>
  );
}

// ── SECTIONS DE CONTENU ────────────────────────────────────────────────────────

function SectionOverview() {
  const pages = [
    { icon: '📊', title: 'Tableau de Bord', desc: 'Vue globale, graphiques et indicateurs clés' },
    { icon: '📝', title: 'Collecte',         desc: 'Saisir un nouveau bien immobilier' },
    { icon: '🗃',  title: 'Explorateur',     desc: 'Consulter, modifier et supprimer les données' },
    { icon: '🧠', title: 'Analyse IA',       desc: 'Régression linéaire et prédictions de prix' },
    { icon: '⚙️', title: 'Paramètres',       desc: 'Configuration de l\'application' },
    { icon: '❓', title: 'Aide',             desc: 'Ce guide que tu es en train de lire' },
  ];
  return (
    <div>
      <SectionHeader num="1" title="Vue d'ensemble" subtitle="Les pages et leur rôle" color="blue" />
      <p className="text-gray-400 mb-6 leading-relaxed">
        ImmoAnalytics est divisée en <strong className="text-gray-200">5 pages</strong> accessibles
        via la barre latérale gauche. Chaque page a un rôle précis dans le cycle d'analyse.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {pages.map(function(page) {
          return (
            <div key={page.title} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-blue-500/40 transition-all duration-200">
              <span className="text-2xl mb-3 block">{page.icon}</span>
              <h4 className="font-semibold text-gray-100 text-sm mb-1">{page.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{page.desc}</p>
            </div>
          );
        })}
      </div>
      <InfoBox type="tip" title="Par où commencer ?">
        Si tu utilises l'app pour la première fois, commence par la page Collecte pour ajouter des biens.
        Le Tableau de Bord et l'Analyse IA s'enrichissent automatiquement. Il faut au minimum
        5 biens pour activer les prédictions.
      </InfoBox>
    </div>
  );
}

function SectionCollecte() {
  return (
    <div>
      <SectionHeader num="2" title="Saisir des données" subtitle="Le formulaire en 3 étapes" color="violet" />
      <p className="text-gray-400 mb-6 leading-relaxed">
        La page Collecte utilise un formulaire guidé en{' '}
        <strong className="text-gray-200">3 étapes</strong>. Une barre de progression lumineuse
        en haut indique où tu en es.
      </p>
      <Step num="1" title="Identité et Emplacement">
        Donne un nom au bien (ex: Villa Bastos 3), choisis son type, le quartier, la distance au
        centre-ville en km et évalue le prestige du quartier de 1 à 10 avec le curseur lumineux.
      </Step>
      <Step num="2" title="Caractéristiques Physiques">
        Renseigne la surface en m² (obligatoire — c'est la variable la plus importante), le nombre
        de pièces, chambres, salles de bain, l'étage et l'âge du bâtiment. Active les équipements
        présents (Jardin, Piscine, Garage) — ils s'illuminent en bleu quand activés.
      </Step>
      <Step num="3" title="Valeur Marchande">
        Saisis le prix de vente en FCFA. C'est cette donnée qui entraîne le modèle — plus tu ajoutes
        de biens avec leur prix réel, plus les prédictions futures seront précises.
      </Step>
      <InfoBox type="warn" title="Champs obligatoires">
        Le nom du bien, la surface en m² et le prix de vente sont obligatoires.
        Sans eux, l'enregistrement sera refusé par le serveur.
      </InfoBox>
      <InfoBox type="good" title="Astuce qualité des données">
        Saisis des biens variés : petites et grandes surfaces, quartiers différents, biens avec et
        sans jardin. Un modèle entraîné sur des données diversifiées est bien plus fiable.
      </InfoBox>
    </div>
  );
}

function SectionDashboard() {
  const points = [[70,125],[120,108],[175,95],[220,82],[270,70],[320,58],[370,48],[420,38],[110,118],[250,88],[340,72]];
  return (
    <div>
      <SectionHeader num="3" title="Tableau de Bord" subtitle="Lire les 4 indicateurs clés" color="green" />
      <p className="text-gray-400 mb-6 leading-relaxed">
        Le Tableau de Bord est la vue d'ensemble de ton marché. Il se met à jour automatiquement
        à chaque nouveau bien ajouté.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard title="Biens Total"    value="24"     desc="Dans la base"        color="blue"   />
        <StatCard title="Prix Moyen"     value="87.3M"  desc="En FCFA"             color="green"  />
        <StatCard title="Prix/m² Moyen"  value="412k"   desc="FCFA par m²"         color="violet" />
        <StatCard title="Coefficient R²" value="78.4%"  desc="Fiabilité du modèle" color="yellow" />
      </div>
      <InfoBox type="tip" title="Comment interpréter le Prix/m² ?">
        C'est l'indicateur le plus utile pour comparer des biens de tailles différentes.
        Un appart à 50M pour 100m² vaut 500k/m². Une villa à 200M pour 300m² vaut 667k/m².
        Le second est plus cher au m² même si le premier coûte moins au total.
      </InfoBox>
      <h3 className="font-semibold text-gray-100 mb-3 mt-6">Le graphique — Nuage de Points</h3>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4">
        <div className="bg-gray-950 rounded-lg p-4 mb-4 border border-gray-800">
          <svg viewBox="0 0 500 160" className="w-full">
            <line x1="35" y1="10" x2="35" y2="140" stroke="#374151" strokeWidth="1" />
            <line x1="35" y1="140" x2="480" y2="140" stroke="#374151" strokeWidth="1" />
            <text x="250" y="158" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="sans-serif">Surface (m²)</text>
            <line x1="50" y1="128" x2="460" y2="22" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="6,3" opacity="0.8" />
            {points.map(function(pt, i) {
              return <circle key={i} cx={pt[0]} cy={pt[1]} r="5" fill="#3B82F6" opacity="0.85" />;
            })}
            <text x="310" y="18" fill="#8B5CF6" fontSize="9" fontFamily="sans-serif">Ligne de régression</text>
          </svg>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Chaque <strong className="text-blue-400">point bleu</strong> représente un bien.
          La <strong className="text-violet-400">ligne violette pointillée</strong> est la tendance du marché.
          Les points au-dessus sont potentiellement surévalués, ceux en-dessous sont des opportunités.
          Survole un point pour voir ses détails.
        </p>
      </div>
    </div>
  );
}

function SectionAnalyse() {
  const coefficients = [
    { variable: 'Surface m²',        coef: '+450 000 FCFA/m²',   positive: true,  desc: 'Chaque m² supplémentaire augmente le prix de 450 000 FCFA' },
    { variable: 'Prestige quartier',  coef: '+3 200 000 FCFA/pt', positive: true,  desc: 'Passer d\'un score 5 à 6 ajoute environ 3,2M au prix' },
    { variable: 'Présence piscine',   coef: '+12 000 000 FCFA',   positive: true,  desc: 'Une piscine ajoute 12M toutes choses égales par ailleurs' },
    { variable: 'Age du bâtiment',    coef: '-800 000 FCFA/an',   positive: false, desc: 'Chaque année d\'ancienneté diminue le prix de 800 000 FCFA' },
    { variable: 'Présence jardin',    coef: '+7 500 000 FCFA',    positive: true,  desc: 'Un jardin privé ajoute 7,5M de valeur au bien' },
  ];
  return (
    <div>
      <SectionHeader num="4" title="Analyse IA" subtitle="Prédictions et Simulateur de prix" color="yellow" />
      <h3 className="font-semibold text-gray-100 mb-3">Le panneau Régression Multiple</h3>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed">
        Ce panneau affiche l'influence de chaque variable sur le prix. Les barres montrent quel
        critère pèse le plus dans la détermination du prix final.
      </p>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4 overflow-x-auto">
        <table className="w-full text-sm min-w-96">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left pb-3 text-gray-500 font-medium text-xs uppercase tracking-wider pr-4">Variable</th>
              <th className="text-left pb-3 text-gray-500 font-medium text-xs uppercase tracking-wider pr-4">Coefficient</th>
              <th className="text-left pb-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Interprétation</th>
            </tr>
          </thead>
          <tbody>
            {coefficients.map(function(row) {
              return (
                <tr key={row.variable} className="border-b border-gray-800/50">
                  <td className="py-3 pr-4 font-medium text-gray-200 text-xs">{row.variable}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.positive ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                      {row.coef}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400 text-xs">{row.desc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <InfoBox type="warn" title="Ces chiffres sont propres à TES données">
        Les coefficients ci-dessus sont des exemples illustratifs. Ton application calcule ses propres
        coefficients basés uniquement sur les biens que tu as saisis. Ils évoluent à chaque ajout.
      </InfoBox>
      <h3 className="font-semibold text-gray-100 mb-3 mt-6">Le Simulateur de Prix</h3>
      <Step num="1" title="Ajuste les curseurs">
        Déplace les curseurs pour définir la surface, le nombre de pièces, le prestige du quartier
        et l'état général. Le prix s'actualise automatiquement après chaque modification.
      </Step>
      <Step num="2" title="Active les options">
        Clique sur les boutons Piscine et Jardin pour voir exactement combien ces équipements
        ajoutent à la valeur estimée du bien.
      </Step>
      <Step num="3" title="Lis le résultat et l'intervalle">
        Le grand chiffre violet est le prix estimé. L'intervalle en dessous indique la fourchette
        de prix probable. Plus l'intervalle est étroit, plus le modèle est précis.
      </Step>
      <InfoBox type="good" title="Cas d'usage pratique">
        Tu veux acheter un appartement de 120m² au quartier Bastos (score 9) avec jardin.
        Place les curseurs sur ces valeurs — l'app te donne immédiatement une estimation du prix
        juste du marché. Si le vendeur demande bien plus, c'est un signal de négociation.
      </InfoBox>
    </div>
  );
}

function SectionStats() {
  const terms = [
    { symbol: 'β₀',    name: 'Ordonnée à l\'origine', desc: 'La valeur plancher théorique du bien avant toute variable.' },
    { symbol: 'β₁',    name: 'Coefficient Surface',    desc: 'Prix ajouté par chaque m² supplémentaire.' },
    { symbol: 'β₂ β₃', name: 'Autres coefficients',   desc: 'Influence de chaque variable (pièces, prestige, piscine) sur le prix.' },
    { symbol: 'ε',      name: 'Erreur résiduelle',      desc: 'La partie du prix que le modèle ne peut pas expliquer. Toujours présente.' },
  ];
  const levels = [
    { range: '0% à 50%', label: 'Modèle faible',   color: 'red',    desc: 'Ajoute plus de données variées.' },
    { range: '50% à 75%',label: 'Acceptable',       color: 'yellow', desc: 'Utilisable mais perfectible.' },
    { range: '75% et +', label: 'Modèle fiable',    color: 'green',  desc: 'Tu peux faire confiance aux prédictions.' },
  ];
  return (
    <div>
      <SectionHeader num="5" title="Comprendre les Statistiques" subtitle="R², régression et coefficients expliqués simplement" color="blue" />
      <h3 className="font-semibold text-gray-100 mb-3">La formule de régression</h3>
      <div className="bg-gray-950 border border-violet-500/30 rounded-xl p-5 text-center mb-6">
        <p className="font-mono text-violet-400 text-base sm:text-lg">
          Prix = β₀ + (β₁ × Surface) + (β₂ × Pièces) + (β₃ × Prestige) + ...
        </p>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6 overflow-x-auto">
        <table className="w-full text-sm min-w-80">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left pb-3 text-gray-500 font-medium text-xs uppercase tracking-wider pr-4">Terme</th>
              <th className="text-left pb-3 text-gray-500 font-medium text-xs uppercase tracking-wider pr-4">Nom</th>
              <th className="text-left pb-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Signification</th>
            </tr>
          </thead>
          <tbody>
            {terms.map(function(row) {
              return (
                <tr key={row.symbol} className="border-b border-gray-800/50">
                  <td className="py-3 pr-4 font-mono text-blue-400 font-bold">{row.symbol}</td>
                  <td className="py-3 pr-4 text-gray-200 text-xs font-medium">{row.name}</td>
                  <td className="py-3 text-gray-400 text-xs">{row.desc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h3 className="font-semibold text-gray-100 mb-4">Le Coefficient R² — La jauge de fiabilité</h3>
      <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
        <div className="h-2.5 rounded-full w-full" style={{ background: 'linear-gradient(90deg, #F85149, #D29922 50%, #3FB950)' }} />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mb-5">
        <span>0% — Inutile</span>
        <span>50%</span>
        <span>100% — Parfait</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {levels.map(function(level) {
          const colorMap = {
            red:    { box: 'border-red-500/20 bg-red-500/5',       val: 'text-red-400'    },
            yellow: { box: 'border-yellow-500/20 bg-yellow-500/5', val: 'text-yellow-400' },
            green:  { box: 'border-green-500/20 bg-green-500/5',   val: 'text-green-400'  },
          };
          const c = colorMap[level.color];
          return (
            <div key={level.range} className={`bg-gray-900 border rounded-xl p-4 text-center ${c.box}`}>
              <p className={`font-bold text-lg mb-1 ${c.val}`}>{level.range}</p>
              <p className="text-gray-200 text-sm font-medium mb-1">{level.label}</p>
              <p className="text-gray-500 text-xs">{level.desc}</p>
            </div>
          );
        })}
      </div>
      <InfoBox type="tip" title="Exemple concret de R²">
        Un R² de 78% signifie : 78% de la variation des prix est expliquée par la surface, le prestige,
        la piscine, etc. Les 22% restants viennent de facteurs non capturés comme la vue, la négociation
        ou l'urgence de vente. C'est normal et tout à fait acceptable.
      </InfoBox>
      <h3 className="font-semibold text-gray-100 mb-3 mt-6">Comment améliorer la précision ?</h3>
      <Step num="+" title="Ajoute plus de données">
        Vise au minimum 30 biens pour des prédictions vraiment fiables. Avec 5 à 10 biens,
        le R² sera naturellement bas — c'est normal et attendu.
      </Step>
      <Step num="+" title="Diversifie les types de biens">
        Si tu n'as que des appartements de 80m², le modèle sera mauvais pour prédire une villa de 300m².
        Inclus des biens variés en surface, type et quartier.
      </Step>
      <Step num="+" title="Remplis tous les champs">
        Plus tu renseignes de variables, plus le modèle est précis. Les champs vides sont remplacés
        par des valeurs par défaut qui peuvent biaiser les résultats.
      </Step>
    </div>
  );
}

function SectionFAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    {
      q: 'Le Tableau de Bord affiche 0 biens alors que j\'en ai saisi',
      a: 'Attends quelques secondes et recharge la page. Vérifie dans l\'Explorateur que l\'enregistrement a bien réussi — une confirmation verte s\'affiche après chaque sauvegarde réussie.',
    },
    {
      q: 'La prédiction affiche Pas assez de données',
      a: 'Il faut au minimum 5 biens dans la base pour activer les prédictions. C\'est une contrainte mathématique — la régression ne peut pas s\'entraîner sur moins de données que de variables.',
    },
    {
      q: 'Le R² est très bas, moins de 30% — est-ce normal ?',
      a: 'Oui, au début avec peu de données. Un R² de 30% avec 5 à 8 biens est tout à fait normal. Il augmente progressivement avec plus de données. Un R² bas ne t\'empêche pas d\'utiliser l\'app.',
    },
    {
      q: 'Le prix prédit semble irréaliste',
      a: 'Cela arrive si tes données ne contiennent pas de biens similaires. Si tu simules une villa de 500m² mais que ta base ne contient que des studios de 30m², l\'extrapolation sera peu fiable. Ajoute des biens similaires.',
    },
    {
      q: 'Comment supprimer un bien saisi par erreur ?',
      a: 'Va dans l\'Explorateur, trouve le bien dans le tableau et clique sur l\'icône corbeille à droite de la ligne. Une confirmation te sera demandée avant la suppression définitive.',
    },
  ];

  function toggle(i) {
    setOpen(open === i ? null : i);
  }

  return (
    <div>
      <SectionHeader num="6" title="Questions Fréquentes" subtitle="Problèmes courants et solutions" color="violet" />
      <div className="space-y-3">
        {items.map(function(item, i) {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`bg-gray-900 border rounded-xl p-4 cursor-pointer transition-all duration-200 ${isOpen ? 'border-blue-500/40' : 'border-gray-800 hover:border-gray-700'}`}
              onClick={function() { toggle(i); }}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-gray-100 text-sm">{item.q}</p>
                <span className={`text-gray-400 flex-shrink-0 text-lg leading-none transition-transform duration-200 ${isOpen ? 'rotate-45 text-blue-400' : ''}`}>
                  +
                </span>
              </div>
              {isOpen && (
                <p className="text-gray-400 text-sm leading-relaxed mt-3 pt-3 border-t border-gray-800">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── COMPOSANT PRINCIPAL ────────────────────────────────────────────────────────

const SECTION_MAP = {
  overview:  SectionOverview,
  collecte:  SectionCollecte,
  dashboard: SectionDashboard,
  analyse:   SectionAnalyse,
  stats:     SectionStats,
  faq:       SectionFAQ,
};

export default function Aide() {
  const [active, setActive] = useState('overview');
  const ActiveSection = SECTION_MAP[active];

  return (
    <div className="flex gap-6">

      {/* Sommaire latéral — visible uniquement sur grand écran */}
      <aside className="hidden lg:flex flex-col gap-1 w-52 flex-shrink-0">
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider px-3 mb-2">
          Sommaire
        </p>
        {SECTIONS.map(function(section) {
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              onClick={function() { setActive(section.id); }}
              className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${getBtnClass(section.color, isActive)}`}
            >
              {section.label}
            </button>
          );
        })}
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 min-w-0">

        {/* Menu mobile — visible uniquement sur petit écran */}
        <div className="lg:hidden flex gap-2 flex-wrap mb-6">
          {SECTIONS.map(function(section) {
            const isActive = active === section.id;
            return (
              <button
                key={section.id}
                onClick={function() { setActive(section.id); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'bg-gray-900 border border-gray-800 text-gray-400'}`}
              >
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Section active */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <ActiveSection />
        </div>

      </div>
    </div>
  );
}
