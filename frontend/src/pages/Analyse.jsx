// frontend/src/pages/Analyse.jsx
import { useEffect, useState } from 'react';
import { Loader2, BrainCircuit, Target, Info } from 'lucide-react';
import { getMultipleRegression, predictPrice } from '../services/api';

export default function Analyse() {
  const [regression, setRegression] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [sim, setSim] = useState({
    surface_m2: 100, nb_rooms: 4, neighborhood_prestige_score: 7,
    building_age: 5, has_pool: false, has_garden: false,
    global_condition_score: 4
  });

  useEffect(() => {
    getMultipleRegression()
      .then(r => {
        setRegression(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSimulating(true);
    const timer = setTimeout(() => {
      predictPrice(sim)
        .then(r => {
          setPrediction(r.data);
          setSimulating(false);
        })
        .catch(() => setSimulating(false));
    }, 400); 
    return () => clearTimeout(timer);
  }, [sim]);

  const updateSim = (name, value) => setSim(s => ({...s, [name]: value}));

  const topFeatures = regression?.coefficients
    ? Object.entries(regression.coefficients)
        .sort(([,a],[,b]) => Math.abs(b) - Math.abs(a))
        .slice(0, 6)
    : [];

  const labels = {
    surface_m2: 'Surface (m²)', nb_rooms: 'Pièces',
    building_age: 'Âge du bâti', has_garden: 'Jardin',
    has_pool: 'Piscine', neighborhood_prestige_score: 'Prestige',
    global_condition_score: 'État général',
  };

  if (loading) return (
    <div className='flex flex-col items-center justify-center h-[60vh] gap-4'>
      <Loader2 className='w-10 h-10 text-accent-violet animate-spin' />
      <p className='text-text-muted animate-pulse'>Calcul des modèles de régression...</p>
    </div>
  );

  return (
    <div className='space-y-8 animate-slide-in'>
      <div>
        <h1 className='text-3xl font-bold flex items-center gap-3'>
          <BrainCircuit className="text-accent-violet" /> Analyse IA
        </h1>
        <p className='text-text-muted text-sm mt-1'>Régression multiple et estimation en temps réel</p>
      </div>

      {/* MODIFIÉ : Grille avec gap adaptatif */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6'>
        
        {/* SECTION 1: POIDS DES VARIABLES */}
        <div className='card space-y-6'>
          <div className='flex items-center justify-between border-b border-dark-border pb-4'>
            <h2 className='font-bold flex items-center gap-2'><Target size={18}/> Influence des Variables</h2>
            <div className={`px-3 py-1 rounded-full text-xs font-black
              ${(regression?.r_squared ?? 0) > 0.7 ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-yellow/10 text-accent-yellow'}`}>
              R² = {((regression?.r_squared ?? 0) * 100).toFixed(1)}%
            </div>
          </div>

          <p className='text-text-muted text-xs italic bg-dark-bg p-3 rounded-lg flex items-start gap-2'>
            <Info size={14} className="shrink-0 mt-0.5" />
            {regression?.r_squared > 0.7 
              ? "Modèle robuste : Les caractéristiques expliquent précisément les variations de prix."
              : "Modèle en cours d'apprentissage : Ajoutez plus de données pour affiner les coefficients."}
          </p>

          <div className='space-y-4'>
            {topFeatures.map(([name, coef]) => {
              const maxAbs = Math.max(...topFeatures.map(([,v]) => Math.abs(v)));
              const pct = (Math.abs(coef) / maxAbs) * 100;
              const isPos = coef > 0;
              return (
                <div key={name} className='space-y-1.5'>
                  <div className='flex justify-between text-xs font-medium'>
                    <span className='text-text-primary'>{labels[name] || name}</span>
                    <span className={isPos ? 'text-accent-green' : 'text-accent-red'}>
                      {isPos ? '+' : ''}{(coef/1000).toFixed(1)}k FCFA
                    </span>
                  </div>
                  <div className='w-full bg-dark-border rounded-full h-1.5 overflow-hidden'>
                    <div className={`h-full rounded-full transition-all duration-1000 ${isPos ? 'bg-accent-green' : 'bg-accent-red'}`}
                      style={{ width: `${pct}%`, boxShadow: `0 0 10px ${isPos ? '#3FB95044' : '#F8514944'}` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: SIMULATEUR PRÉDICTIF */}
        <div className='card border-accent-violet/20 bg-gradient-to-br from-dark-card to-dark-bg'>
          <h2 className='text-lg font-bold text-accent-violet mb-6'>🎮 Simulateur de Prix</h2>
          
          <div className='p-6 rounded-2xl bg-dark-bg border border-dark-border mb-8 text-center relative overflow-hidden'>
            {simulating && <div className="absolute inset-0 bg-dark-bg/40 backdrop-blur-[1px] flex items-center justify-center z-10">
              <Loader2 className="animate-spin text-accent-violet" />
            </div>}
            
            {prediction?.predicted_price ? (
              <div className="space-y-1">
                <p className='text-text-muted text-[10px] uppercase tracking-[0.2em]'>Estimation Nexalyze</p>
                <p className='text-4xl font-black text-text-primary'>
                  {(prediction.predicted_price / 1000000).toFixed(2)} <span className="text-xl text-accent-violet">M FCFA</span>
                </p>
                <div className='flex justify-center gap-4 mt-2'>
                  <span className='text-[10px] text-text-muted'>Min: <b className="text-text-primary">{(prediction.confidence_interval_low/1000000).toFixed(1)}M</b></span>
                  <span className='text-[10px] text-text-muted'>Max: <b className="text-text-primary">{(prediction.confidence_interval_high/1000000).toFixed(1)}M</b></span>
                </div>
              </div>
            ) : (
              <p className='text-text-muted text-sm py-4 italic'>Données insuffisantes pour prédire</p>
            )}
          </div>

          <div className='space-y-6'>
            {[
              { label: 'Surface (m²)', name: 'surface_m2', min: 20, max: 500, step: 5 },
              { label: 'Nombre de pièces', name: 'nb_rooms', min: 1, max: 15, step: 1 },
              { label: 'Prestige quartier', name: 'neighborhood_prestige_score', min: 1, max: 10, step: 1 },
              { label: 'Âge (années)', name: 'building_age', min: 0, max: 50, step: 1 },
            ].map(({ label, name, min, max, step }) => (
              <div key={name} className="space-y-2">
                <div className='flex justify-between text-xs font-bold uppercase tracking-tighter'>
                  <label className='text-text-muted'>{label}</label>
                  <span className='text-accent-blue'>{sim[name]}</span>
                </div>
                <input type='range' min={min} max={max} step={step} value={sim[name]}
                  onChange={e => updateSim(name, parseFloat(e.target.value))}
                  className='w-full accent-accent-blue cursor-pointer h-1.5 bg-dark-border rounded-lg appearance-none' />
              </div>
            ))}

            <div className='flex gap-3 pt-4 border-t border-dark-border'>
              {[
                { n: 'has_pool', l: 'Piscine', i: '🏊' },
                { n: 'has_garden', l: 'Jardin', i: '🌿' }
              ].map(({n, l, i}) => (
                <button key={n} type='button' onClick={() => updateSim(n, !sim[n])}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2
                  ${sim[n] ? 'border-accent-blue bg-accent-blue/10 text-accent-blue shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                  : 'border-dark-border text-text-muted opacity-60'}`}>
                  <span>{i}</span> {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
