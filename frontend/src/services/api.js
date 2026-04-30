// frontend/src/services/api.js
import axios from 'axios';

/**
 * CONFIGURATION DE L'URL DE BASE
 * En production (Vercel), il utilisera la variable d'environnement VITE_API_URL.
 * En développement local, il utilisera http://localhost:8000 par défaut.
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Ajout d'un intercepteur pour capturer les erreurs proprement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log plus détaillé pour t'aider à déboguer dans la console du navigateur
    console.error("Erreur API Nexalyze:", {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// ── CRUD Propriétés ──────────────────────────────────────────────
export const getProperties = () => api.get('/properties/');
export const getProperty = (id) => api.get(`/properties/${id}`);
export const createProperty = (data) => api.post('/properties/', data);
export const updateProperty = (id, data) => api.put(`/properties/${id}`, data);
export const deleteProperty = (id) => api.delete(`/properties/${id}`);

// ── Statistiques et IA ──────────────────────────────────────────
export const getDashboardStats = () => api.get('/stats/dashboard');
export const getSimpleRegression = () => api.get('/stats/regression/simple');
export const getMultipleRegression = () => api.get('/stats/regression/multiple');
export const getCorrelation = () => api.get('/stats/correlation');
export const predictPrice = (data) => api.post('/stats/predict', data);

export default api;
