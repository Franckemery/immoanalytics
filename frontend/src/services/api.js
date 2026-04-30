// frontend/src/services/api.js
import axios from 'axios';

// URL de base de ton API backend (FastAPI)
const API_BASE = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Ajout d'un intercepteur pour capturer les erreurs proprement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API Nexalyze:", error.response?.data || error.message);
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