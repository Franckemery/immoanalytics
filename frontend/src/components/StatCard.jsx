// frontend/src/components/StatCard.jsx

/**
 * Composant de carte statistique pour le dashboard Nexalyze.
 * Affiche une valeur clé avec une icône et un effet de lueur colorée.
 */
export default function StatCard({ title, value, icon: Icon, color = 'blue', subtitle }) {
  
  // Mapping des styles de bordures et d'ombres portées (glow effect)
  const colors = {
    blue:   'border-accent-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]',
    violet: 'border-accent-violet/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]',
    green:  'border-accent-green/30 shadow-[0_0_20px_rgba(63,185,80,0.1)]',
    yellow: 'border-accent-yellow/30 shadow-[0_0_20px_rgba(210,153,34,0.1)]',
  };

  // Mapping des couleurs d'icônes
  const iconColors = {
    blue:   'text-accent-blue', 
    violet: 'text-accent-violet',
    green:  'text-accent-green', 
    yellow: 'text-accent-yellow',
  };

  return (
    <div className={`card border ${colors[color]} animate-slide-in transition-all duration-300 hover:scale-[1.02] hover:bg-dark-card/80`}>
      <div className='flex items-start justify-between'>
        <div className="space-y-1">
          <p className='text-text-muted text-xs font-semibold uppercase tracking-wider'>{title}</p>
          <p className='text-3xl font-bold text-text-primary tracking-tight'>{value}</p>
          
          {subtitle && (
            <p className='text-text-muted text-[11px] italic flex items-center gap-1'>
              <span className="w-1 h-1 rounded-full bg-text-muted opacity-40"></span>
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`p-2 rounded-lg bg-dark-bg/50 ${iconColors[color]}`}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  );
}