// frontend/src/pages/Explorateur.jsx
import { useEffect, useState } from 'react';
import { Trash2, RefreshCw, Database, Search, AlertCircle } from 'lucide-react';
import { getProperties, deleteProperty } from '../services/api';

export default function Explorateur() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getProperties();
      // On s'assure de trier par les plus récents (si ton API renvoie des dates)
      setProperties(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des données", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Supprimer définitivement ce bien de la base Nexalyze ?')) return;
    
    setDeletingId(id);
    try {
      await deleteProperty(id);
      // Mise à jour optimiste de l'UI pour plus de fluidité
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className='space-y-6 animate-slide-in'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold flex items-center gap-3'>
            <Database className="text-accent-blue" /> Explorateur de Données
          </h1>
          <p className='text-text-muted text-sm mt-1'>
            {loading ? 'Synchronisation...' : `${properties.length} enregistrements détectés`}
          </p>
        </div>
        
        <button 
          onClick={load} 
          disabled={loading}
          className='flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-dark-border bg-dark-card text-text-muted hover:text-accent-blue hover:border-accent-blue transition-all disabled:opacity-50'
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''}/> 
          Actualiser le Dataset
        </button>
      </div>

      <div className='card overflow-hidden p-0 border-dark-border'>
        <div className='overflow-x-auto text-left'>
          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='bg-dark-bg/80 border-b border-dark-border'>
                {['Désignation', 'Catégorie', 'Surface', 'Pièces', 'Prestige', 'Prix (FCFA)', 'Actions'].map((h) => (
                  <th key={h} className='px-6 py-4 text-text-muted font-bold text-[10px] uppercase tracking-widest'>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/40">
              {loading && properties.length === 0 ? (
                <tr>
                  <td colSpan={7} className='py-20'>
                    <div className="flex flex-col items-center justify-center text-text-muted gap-3">
                      <RefreshCw className="animate-spin text-accent-blue" size={24} />
                      <p>Récupération des données immobilières...</p>
                    </div>
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={7} className='py-20'>
                    <div className="flex flex-col items-center justify-center text-text-muted gap-3">
                      <Search size={32} className="opacity-20" />
                      <p className="font-medium">Aucun bien trouvé dans la base.</p>
                      <p className="text-xs">Utilisez le formulaire de Collecte pour commencer.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                properties.map((p) => (
                  <tr key={p.id} className='group hover:bg-accent-blue/[0.02] transition-colors'>
                    <td className='px-6 py-4 font-semibold text-text-primary'>
                      {p.property_name}
                    </td>
                    <td className='px-6 py-4'>
                      <span className="px-2 py-1 rounded-md bg-dark-bg border border-dark-border text-[10px] uppercase font-bold text-text-muted">
                        {p.property_type}
                      </span>
                    </td>
                    <td className='px-6 py-4 font-mono text-accent-blue'>
                      {p.surface_m2} <span className="text-[10px] text-text-muted">m²</span>
                    </td>
                    <td className='px-6 py-4 text-text-muted font-medium'>
                      {p.nb_rooms} <span className="text-[10px] opacity-60">pcs</span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex gap-0.5'>
                        {Array.from({ length: 10 }, (_, j) => (
                          <div key={j} className={`w-1 h-3 rounded-full transition-all duration-500
                            ${j < (p.neighborhood_prestige_score || 0) 
                              ? 'bg-accent-violet shadow-[0_0_5px_rgba(139,92,246,0.3)]' 
                              : 'bg-dark-border opacity-30'}`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className="flex flex-col">
                        <span className="font-mono text-accent-green font-bold text-base">
                          {(p.price / 1000000).toFixed(2)}M
                        </span>
                        <span className="text-[9px] text-text-muted uppercase">Millions FCFA</span>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                        className='p-2 rounded-lg hover:bg-accent-red/10 text-text-muted hover:text-accent-red transition-all border border-transparent hover:border-accent-red/20 disabled:opacity-50'
                      >
                        {deletingId === p.id ? (
                          <RefreshCw size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16}/>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {!loading && properties.length > 0 && (
        <div className="flex items-center gap-2 p-4 bg-accent-blue/5 rounded-2xl border border-accent-blue/10">
          <AlertCircle size={16} className="text-accent-blue" />
          <p className="text-xs text-text-muted italic">
            Ces données sont utilisées pour entraîner le modèle de régression linéaire dans l'onglet Analyse.
          </p>
        </div>
      )}
    </div>
  );
}