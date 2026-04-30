// frontend/src/pages/Collecte.jsx
import { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { createProperty } from '../services/api';

const steps = ['Identité & Emplacement', 'Caractéristiques Physiques', 'Valeur Marchande'];

const initialForm = {
  property_name: '', property_type: 'Appartement', neighborhood_name: '',
  distance_city_center: 0, neighborhood_prestige_score: 5, noise_level_score: 3,
  surface_m2: '', nb_rooms: 1, nb_bedrooms: 1, nb_bathrooms: 1,
  floor_level: 0, building_age: '', services_proximity_min: '',
  global_condition_score: 3, material_quality_score: 3, energy_performance_score: 4,
  has_garden: false, has_terrace: false, has_garage: false,
  has_security: false, has_air_con: false, has_pool: false, has_solar_power: false,
  price: '', monthly_charges: '',
};

function StepIndicator({ current, total, steps }) {
  return (
    <div className='flex items-center justify-between mb-8'>
      {steps.map((label, i) => (
        <div key={i} className='flex-1 flex items-center'>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 shrink-0
            ${i < current ? 'bg-accent-green border-accent-green text-white' 
            : i === current ? 'border-accent-blue text-accent-blue bg-accent-blue/10' 
            : 'border-dark-border text-text-muted'}`}>
            {i < current ? <Check size={14}/> : i + 1}
          </div>
          <span className={`ml-2 text-[10px] font-semibold uppercase tracking-wider hidden lg:block
            ${i === current ? 'text-accent-blue' : 'text-text-muted'}`}>
            {label}
          </span>
          {i < total - 1 && (
            <div className={`flex-1 h-0.5 mx-3 ${i < current ? 'bg-accent-green' : 'bg-dark-border'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function LuminousSlider({ label, name, min, max, value, onChange, suffix='' }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className='text-xs font-semibold text-text-muted uppercase tracking-tighter'>{label}</label>
        <span className='text-accent-blue font-bold text-sm bg-accent-blue/10 px-2 py-0.5 rounded'>{value}{suffix}</span>
      </div>
      <input type='range' min={min} max={max} value={value} 
        onChange={e => onChange(name, parseInt(e.target.value))}
        className='w-full accent-accent-blue cursor-pointer h-1.5 bg-dark-border rounded-lg appearance-none' />
    </div>
  );
}

function Toggle({ label, name, value, onChange, icon }) {
  return (
    <button type='button'
      onClick={() => onChange(name, !value)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 font-medium
        ${value 
          ? 'border-accent-blue bg-accent-blue/10 text-accent-blue shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
          : 'border-dark-border text-text-muted hover:border-text-muted/40'}`}>
      <span className="text-lg">{icon}</span> {label}
    </button>
  );
}

export default function Collecte() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (nameOrEvt, val) => {
    if (typeof nameOrEvt === 'string') {
      setForm(f => ({ ...f, [nameOrEvt]: val }));
    } else {
      const { name, value, type, checked } = nameOrEvt.target;
      setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const isStepValid = () => {
    if (step === 0) return form.property_name && form.neighborhood_name;
    if (step === 1) return form.surface_m2 && form.nb_rooms;
    if (step === 2) return form.price;
    return true;
  };

  const handleSubmit = async () => {
    if (!isStepValid()) {
      setError('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }
    setLoading(true); setError('');
    try {
      await createProperty({
        ...form,
        surface_m2: parseFloat(form.surface_m2),
        price: parseFloat(form.price),
        building_age: parseInt(form.building_age) || 0,
        monthly_charges: parseFloat(form.monthly_charges) || 0,
        services_proximity_min: parseInt(form.services_proximity_min) || null,
      });
      setSuccess(true);
      setForm(initialForm);
      setStep(0);
    } catch(e) {
      setError('Erreur lors de la sauvegarde. Vérifiez votre connexion au serveur.');
    } finally { setLoading(false); }
  };

  if (success) return (
    <div className='flex flex-col items-center justify-center h-[60vh] space-y-6 animate-slide-in'>
      <div className='w-20 h-20 rounded-full bg-accent-green/20 flex items-center justify-center shadow-[0_0_40px_rgba(63,185,80,0.3)]'>
        <Check size={40} className='text-accent-green' />
      </div>
      <div className="text-center">
        <h2 className='text-2xl font-bold text-text-primary'>Bien enregistré !</h2>
        <p className='text-text-muted mt-2'>Les données ont été intégrées au moteur Nexalyze.</p>
      </div>
      <button onClick={() => setSuccess(false)} className='btn-primary px-8'>
        Ajouter un autre bien
      </button>
    </div>
  );

  return (
    <div className='max-w-3xl mx-auto animate-slide-in'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Collecte de Données</h1>
        <p className='text-text-muted text-sm mt-1'>Enrichissez la base de données pour améliorer les prédictions.</p>
      </div>

      <div className='card p-8'>
        <StepIndicator current={step} total={steps.length} steps={steps} />

        {/* ÉTAPE 1 : Identité & Emplacement */}
        {step === 0 && (
          <div className='space-y-6'>
            <div className="flex items-center gap-2 text-accent-blue border-b border-dark-border pb-2 mb-4">
              <span className="text-xl">🏠</span>
              <h2 className='font-bold uppercase tracking-widest text-sm'>Identité & Emplacement</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className="space-y-2">
                <label className='label'>Nom du bien *</label>
                <input className='input-dark' name='property_name' placeholder='Ex: Villa Bastos' value={form.property_name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className='label'>Type de bien</label>
                <select className='input-dark' name='property_type' value={form.property_type} onChange={handleChange}>
                  {['Appartement','Villa','Studio','Immeuble','Bureau'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className='label'>Quartier *</label>
                <input className='input-dark' name='neighborhood_name' placeholder='Ex: Akwa' value={form.neighborhood_name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className='label'>Distance Centre (km)</label>
                <input className='input-dark' type='number' name='distance_city_center' step='0.1' value={form.distance_city_center} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <LuminousSlider label='Prestige quartier' name='neighborhood_prestige_score' min={1} max={10} value={form.neighborhood_prestige_score} onChange={handleChange} suffix='/10' />
              <LuminousSlider label='Niveau sonore' name='noise_level_score' min={1} max={5} value={form.noise_level_score} onChange={handleChange} suffix='/5' />
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : Caractéristiques Physiques */}
        {step === 1 && (
          <div className='space-y-6'>
            <div className="flex items-center gap-2 text-accent-violet border-b border-dark-border pb-2 mb-4">
              <span className="text-xl">📐</span>
              <h2 className='font-bold uppercase tracking-widest text-sm'>Caractéristiques Physiques</h2>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              <div className="space-y-2">
                <label className='label'>Surface (m²) *</label>
                <input className='input-dark' type='number' name='surface_m2' value={form.surface_m2} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className='label'>Pièces *</label>
                <input className='input-dark' type='number' name='nb_rooms' value={form.nb_rooms} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className='label'>Chambres</label>
                <input className='input-dark' type='number' name='nb_bedrooms' value={form.nb_bedrooms} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <LuminousSlider label='État général' name='global_condition_score' min={1} max={5} value={form.global_condition_score} onChange={handleChange} suffix='/5' />
              <LuminousSlider label='Qualité matériaux' name='material_quality_score' min={1} max={5} value={form.material_quality_score} onChange={handleChange} suffix='/5' />
            </div>
            <div className="space-y-3">
              <label className='label text-xs uppercase opacity-60'>Équipements inclus</label>
              <div className='flex flex-wrap gap-2'>
                <Toggle name='has_garden' value={form.has_garden} onChange={handleChange} label='Jardin' icon='🌿'/>
                <Toggle name='has_terrace' value={form.has_terrace} onChange={handleChange} label='Terrasse' icon='🌅'/>
                <Toggle name='has_garage' value={form.has_garage} onChange={handleChange} label='Garage' icon='🚗'/>
                <Toggle name='has_security' value={form.has_security} onChange={handleChange} label='Sécurité' icon='🔒'/>
                <Toggle name='has_solar_power' value={form.has_solar_power} onChange={handleChange} label='Solaire' icon='☀️'/>
                <Toggle name='has_air_con' value={form.has_air_con} onChange={handleChange} label='Clim' icon='❄️'/>
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : Valeur Marchande */}
        {step === 2 && (
          <div className='space-y-8 py-4'>
            <div className="flex items-center gap-2 text-accent-green border-b border-dark-border pb-2 mb-4">
              <span className="text-xl">💰</span>
              <h2 className='font-bold uppercase tracking-widest text-sm'>Valeur Marchande</h2>
            </div>
            <div className="bg-dark-bg p-6 rounded-2xl border border-accent-green/20">
              <label className='label text-accent-green mb-2 block'>Prix de vente final (FCFA) *</label>
              <input className='w-full bg-transparent text-4xl font-black text-text-primary focus:outline-none' 
                type='number' name='price' placeholder='0' value={form.price} onChange={handleChange} autoFocus />
              <p className='text-text-muted text-[10px] uppercase mt-4 tracking-widest'>Impact direct sur l'algorithme de régression</p>
            </div>
            <div className="space-y-2">
              <label className='label'>Charges mensuelles estimées (FCFA)</label>
              <input className='input-dark' type='number' name='monthly_charges' value={form.monthly_charges} onChange={handleChange} />
            </div>
          </div>
        )}

        {error && <div className='mt-6 p-4 bg-accent-red/10 border border-accent-red/20 rounded-xl text-accent-red text-sm font-medium animate-shake'>{error}</div>}

        {/* Navigation */}
        <div className='flex justify-between mt-10 pt-6 border-t border-dark-border'>
          <button onClick={() => setStep(s => s - 1)} disabled={step === 0 || loading}
            className='flex items-center gap-2 px-6 py-3 rounded-xl border border-dark-border text-text-muted hover:text-text-primary hover:bg-dark-bg disabled:opacity-20 transition-all'>
            <ChevronLeft size={20}/> Retour
          </button>
          
          {step < steps.length - 1 ? (
            <button onClick={() => { setError(''); setStep(s => s + 1); }}
              className='btn-primary flex items-center gap-2 px-8 py-3'>
              Suivant <ChevronRight size={20}/>
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading}
              className='btn-primary flex items-center gap-2 px-8 py-3 shadow-[0_0_20px_rgba(59,130,246,0.4)]'>
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
              {loading ? 'Traitement...' : 'Finaliser la saisie'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}