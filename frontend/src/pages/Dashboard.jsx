// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Building2, TrendingUp, BarChart3, DollarSign } from 'lucide-react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, ComposedChart, Line, Cell 
} from 'recharts';
import StatCard from '../components/StatCard';
import { getDashboardStats, getProperties, getSimpleRegression } from '../services/api';

// Tooltip personnalisé optimisé pour le style sombre
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className='bg-dark-card border border-dark-border rounded-lg p-3 text-sm shadow-2xl'>
      <p className='text-accent-blue font-bold mb-1'>{d.name}</p>
      <div className='space-y-1'>
        <p className='text-text-muted'>Surface : <span className='text-text-primary'>{d.x} m²</span></p>
        <p className='text-text-muted'>Prix : <span className='text-accent-green'>{(d.y / 1000000).toFixed(1)} M FCFA</span></p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [scatterData, setScatterData] = useState([]);
  const [regrLine, setRegrLine] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, propsRes, regrRes] = await Promise.all([
          getDashboardStats(), getProperties(), getSimpleRegression()
        ]);

        setStats(statsRes.data);
        
        // Formater les points pour Recharts
        const points = propsRes.data.map(p => ({
          x: p.surface_m2, 
          y: p.price, 
          name: p.property_name
        }));
        setScatterData(points);

        // Calculer la ligne de tendance si la régression est valide
        if (regrRes.data && !regrRes.data.error) {
          const { intercept, coefficients } = regrRes.data;
          const surfaces = points.map(p => p.x);
          const mn = Math.min(...surfaces);
          const mx = Math.max(...surfaces);

          setRegrLine([
            { x: mn, y: intercept + coefficients.surface_m2 * mn },
            { x: mx, y: intercept + coefficients.surface_m2 * mx },
          ]);
        }
      } catch (e) {
        console.error("Erreur de chargement du Dashboard:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return (
    <div className='flex flex-col items-center justify-center h-96 gap-4'>
      <div className='w-10 h-10 border-4 border-accent-blue border-t-transparent rounded-full animate-spin'/>
      <p className='text-text-muted animate-pulse'>Analyse des données en cours...</p>
    </div>
  );

  return (
    <div className='space-y-8 animate-slide-in'>
      <div>
        <h1 className='text-3xl font-bold text-text-primary tracking-tight'>Tableau de Bord</h1>
        <p className='text-text-muted text-sm mt-1'>Intelligence du marché immobilier local [Cameroun]</p>
      </div>

      {/* Cartes Statistiques */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard 
          title='Biens Total' 
          value={stats?.total ?? 0} 
          icon={Building2} 
          color='blue' 
          subtitle='Unités enregistrées' 
        />
        <StatCard 
          title='Prix Moyen' 
          value={`${((stats?.avg_price ?? 0) / 1000000).toFixed(1)} M`} 
          icon={DollarSign} 
          color='green' 
          subtitle='Millions de FCFA' 
        />
        <StatCard 
          title='Moyenne au m²' 
          value={`${((stats?.avg_price_per_m2 ?? 0) / 1000).toFixed(0)} k`} 
          icon={TrendingUp} 
          color='violet' 
          subtitle='FCFA / m²' 
        />
        <StatCard 
          title='Fiabilité R²' 
          value={`${((stats?.r_squared ?? 0) * 100).toFixed(1)}%`} 
          icon={BarChart3} 
          color='yellow' 
          subtitle='Précision du modèle' 
        />
      </div>

      {/* Graphique de Régression */}
      <div className='card bg-dark-card border-dark-border'>
        <div className="mb-6">
          <h2 className='text-lg font-bold text-text-primary'>Analyse Prédictive : Prix / Surface</h2>
          <p className='text-text-muted text-xs uppercase tracking-widest'>Moteur de régression linéaire Nexalyze</p>
        </div>

        <div className='h-[400px] w-full'>
          <ResponsiveContainer>
            <ComposedChart margin={{ top: 10, right: 30, bottom: 20, left: 20 }}>
              <XAxis 
                dataKey='x' 
                type="number" 
                name='Surface' 
                unit="m²"
                stroke='#30363D' 
                tick={{ fill: '#8B949E', fontSize: 11 }}
                label={{ value: 'Surface (m²)', position: 'insideBottom', offset: -10, fill: '#8B949E', fontSize: 12 }}
              />
              <YAxis 
                dataKey='y' 
                type="number" 
                name='Prix' 
                stroke='#30363D' 
                tick={{ fill: '#8B949E', fontSize: 11 }}
                tickFormatter={v => `${(v / 1000000).toFixed(0)}M`}
                label={{ value: 'Prix (FCFA)', angle: -90, position: 'insideLeft', fill: '#8B949E', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Points de données (Scatter) */}
              <Scatter data={scatterData} name="Biens">
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill='#3B82F6' fillOpacity={0.6} stroke="#3B82F6" strokeWidth={1} />
                ))}
              </Scatter>

              {/* Ligne de régression (Line) */}
              {regrLine.length === 2 && (
                <Line
                  data={regrLine}
                  type="monotone"
                  dataKey="y"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                  legendType="none"
                  strokeDasharray="5 5"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}