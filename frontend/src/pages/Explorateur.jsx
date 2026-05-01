// frontend/src/pages/Explorateur.jsx
import { useEffect, useState } from 'react';
import { Trash2, RefreshCw, Database, Search, AlertCircle, X } from 'lucide-react';
import { getProperties, deleteProperty } from '../services/api';

export default function Explorateur() {
  const [properties, setProperties]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [deletingId, setDeletingId]   = useState(null);
  const [deleteModal, setDeleteModal] = useState(null); // { id, name }

  // ── Chargement des données ────────────────────────────────────────────────
  const load = async () => {
    setLoading(true);
    try {
      const res = await getProperties();
      setProperties(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des données', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // ── Gestion de la suppression ─────────────────────────────────────────────
  const askDelete = (id, name) => {
    setDeleteModal({ id, name });
  };

  const cancelDelete = () => {
    setDeleteModal(null);
  };

  const confirmDelete = async () => {
    if (!deleteModal) return;
    const id = deleteModal.id;
    setDeleteModal(null);
    setDeletingId(id);
    try {
      await deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression', err);
    } finally {
      setDeletingId(null);
    }
  };

  // ── Rendu ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Database className="text-accent-blue" />
            Explorateur de Données
          </h1>
          <p className="text-text-muted text-sm mt-1">
            {loading
              ? 'Synchronisation...'
              : `${properties.length} enregistrement${properties.length !== 1 ? 's' : ''} détecté${properties.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        <button
          onClick={load}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                     border border-dark-border bg-dark-card text-text-muted
                     hover:text-accent-blue hover:border-accent-blue
                     transition-all disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Actualiser le Dataset
        </button>
      </div>

      {/* Tableau */}
      <div className="card overflow-hidden p-0 -mx-4 md:mx-0 rounded-none md:rounded-xl border-dark-border">
        <div className="overflow-x-auto min-w-0">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-dark-bg/80 border-b border-dark-border">
                {['Désignation', 'Catégorie', 'Surface', 'Pièces', 'Prestige', 'Prix (FCFA)', 'Actions'].map(h => (
                  <th
                    key={h}
                    className="px-6 py-4 text-text-muted font-bold text-[10px] uppercase tracking-widest text-left"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-dark-border/40">

              {/* État : chargement */}
              {loading && properties.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-20">
                    <div className="flex flex-col items-center justify-center text-text-muted gap-3">
                      <RefreshCw className="animate-spin text-accent-blue" size={24} />
                      <p>Récupération des données immobilières...</p>
                    </div>
                  </td>
                </tr>
              )}

              {/* État : vide */}
              {!loading && properties.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-20">
                    <div className="flex flex-col items-center justify-center text-text-muted gap-3">
                      <Search size={32} className="opacity-20" />
                      <p className="font-medium">Aucun bien trouvé dans la base.</p>
                      <p className="text-xs">Utilisez le formulaire de Collecte pour commencer.</p>
                    </div>
                  </td>
                </tr>
              )}

              {/* État : données */}
              {properties.map(p => (
                <tr
                  key={p.id}
                  className="group hover:bg-accent-blue/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-text-primary whitespace-nowrap">
                    {p.property_name}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-dark-bg border border-dark-border text-[10px] uppercase font-bold text-text-muted">
                      {p.property_type}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-mono text-accent-blue whitespace-nowrap">
                    {p.surface_m2}
                    <span className="text-[10px] text-text-muted ml-1">m²</span>
                  </td>

                  <td className="px-6 py-4 text-text-muted font-medium">
                    {p.nb_rooms}
                    <span className="text-[10px] opacity-60 ml-1">pcs</span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }, (_, j) => (
                        <div
                          key={j}
                          className={`w-1 h-3 rounded-full transition-all duration-500
                            ${j < (p.neighborhood_prestige_score || 0)
                              ? 'bg-accent-violet shadow-[0_0_5px_rgba(139,92,246,0.3)]'
                              : 'bg-dark-border opacity-30'}`}
                        />
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-mono text-accent-green font-bold text-base">
                        {(p.price / 1000000).toFixed(2)}M
                      </span>
                      <span className="text-[9px] text-text-muted uppercase">Millions FCFA</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => askDelete(p.id, p.property_name)}
                      disabled={deletingId === p.id}
                      className="p-2 rounded-lg hover:bg-accent-red/10 text-text-muted
                                 hover:text-accent-red transition-all border border-transparent
                                 hover:border-accent-red/20 disabled:opacity-50"
                    >
                      {deletingId === p.id
                        ? <RefreshCw size={16} className="animate-spin" />
                        : <Trash2 size={16} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note de bas de page */}
      {!loading && properties.length > 0 && (
        <div className="flex items-center gap-2 p-4 bg-accent-blue/5 rounded-2xl border border-accent-blue/10">
          <AlertCircle size={16} className="text-accent-blue flex-shrink-0" />
          <p className="text-xs text-text-muted italic">
            Ces données sont utilisées pour entraîner le modèle de régression linéaire dans l'onglet Analyse.
          </p>
        </div>
      )}

      {/* ── MODALE DE CONFIRMATION ─────────────────────────────────────────── */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Overlay flouté */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={cancelDelete}
          />

          {/* Carte modale */}
          <div className="relative bg-dark-card border border-dark-border rounded-2xl
                          p-6 w-full max-w-md shadow-2xl z-10
                          shadow-[0_0_60px_rgba(248,81,73,0.08)]">

            {/* Bouton fermer */}
            <button
              onClick={cancelDelete}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted
                         hover:text-text-primary hover:bg-dark-border/50 transition-all"
            >
              <X size={16} />
            </button>

            {/* Icône */}
            <div className="w-14 h-14 rounded-full bg-accent-red/10 border border-accent-red/25
                            flex items-center justify-center mx-auto mb-5
                            shadow-[0_0_20px_rgba(248,81,73,0.15)]">
              <Trash2 size={24} className="text-accent-red" />
            </div>

            {/* Titre */}
            <h3 className="text-lg font-bold text-text-primary text-center mb-2">
              Supprimer ce bien ?
            </h3>

            {/* Nom du bien */}
            <p className="text-text-muted text-sm text-center mb-1">
              Tu es sur le point de supprimer définitivement
            </p>
            <p className="text-accent-red font-semibold text-center text-sm mb-4 truncate px-4">
              {deleteModal.name}
            </p>

            {/* Avertissement */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-accent-red/5
                            border border-accent-red/15 mb-6">
              <AlertCircle size={14} className="text-accent-red flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-muted leading-relaxed">
                Cette action est <strong className="text-text-primary">irréversible</strong>.
                Le bien sera retiré de la base de données et les statistiques
                seront automatiquement recalculées.
              </p>
            </div>

            {/* Boutons */}
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-2.5 rounded-xl border border-dark-border
                           text-text-muted hover:text-text-primary
                           hover:border-accent-blue/40 transition-all duration-200
                           font-medium text-sm"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-accent-red/10 border border-accent-red/30
                           text-accent-red font-medium text-sm
                           hover:bg-accent-red hover:text-white hover:border-accent-red
                           transition-all duration-200
                           shadow-[0_0_15px_rgba(248,81,73,0.15)]
                           hover:shadow-[0_0_25px_rgba(248,81,73,0.35)]"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
