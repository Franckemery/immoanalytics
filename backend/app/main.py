# backend/app/main.py
import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import create_engine # Import manquant ajouté
from typing import List

from . import crud, schemas, models, statistics
from .database import engine, get_db

# 1. INITIALISATION DE LA DB
# On s'assure que les tables existent au démarrage
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ImmoAnalytics API",
    description="API de collecte et analyse de données immobilières pour Nexalyze",
    version="1.0.0"
)

# 2. CONFIGURATION CORS UNIQUE (Local + Production)
# Remplace 'ton-projet-vercel.vercel.app' par ton vrai lien Vercel une fois créé
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ton-projet-vercel.vercel.app", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# ── ROUTES DE SANTÉ ──────────────────────────────────────────
@app.get('/', tags=['Health'])
def read_root():
    return {
        "status": "ImmoAnalytics API en ligne", 
        "version": "1.0.0",
        "database": "Connected" if engine else "Error"
    }

# ── ROUTES CRUD ────────────────────────────────────────────────
@app.post('/properties/', response_model=schemas.PropertyResponse, tags=['Propriétés'])
def create_property(prop: schemas.PropertyCreate, db: Session = Depends(get_db)):
    return crud.create_property(db=db, prop=prop)

@app.get('/properties/', response_model=List[schemas.PropertyResponse], tags=['Propriétés'])
def read_properties(skip: int = 0, limit: int = 500, db: Session = Depends(get_db)):
    return crud.get_properties(db, skip=skip, limit=limit)

@app.get('/properties/{property_id}', response_model=schemas.PropertyResponse, tags=['Propriétés'])
def read_property(property_id: int, db: Session = Depends(get_db)):
    prop = crud.get_property(db, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail='Bien non trouvé')
    return prop

@app.put('/properties/{property_id}', response_model=schemas.PropertyResponse, tags=['Propriétés'])
def update_property(property_id: int, prop: schemas.PropertyUpdate, db: Session = Depends(get_db)):
    db_prop = crud.update_property(db=db, property_id=property_id, prop=prop)
    if not db_prop:
        raise HTTPException(status_code=404, detail='Bien non trouvé pour mise à jour')
    return db_prop

@app.delete('/properties/{property_id}', tags=['Propriétés'])
def delete_property(property_id: int, db: Session = Depends(get_db)):
    db_prop = crud.delete_property(db=db, property_id=property_id)
    if not db_prop:
        raise HTTPException(status_code=404, detail='Bien non trouvé')
    return {"message": "Bien supprimé avec succès"}

# ── ROUTES STATISTIQUES (NEXALYZE) ──────────────────────────────────
@app.get('/stats/dashboard', tags=['Statistiques'])
def get_dashboard_stats(db: Session = Depends(get_db)):
    props = crud.get_properties(db, limit=1000)
    return statistics.dashboard_stats(props)

@app.get('/stats/regression/simple', tags=['Statistiques'])
def get_simple_regression(db: Session = Depends(get_db)):
    props = crud.get_properties(db, limit=1000)
    result = statistics.simple_regression(props)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post('/stats/predict', response_model=schemas.PredictionResponse, tags=['Statistiques'])
def predict_price(request: schemas.PredictionRequest, db: Session = Depends(get_db)):
    props = crud.get_properties(db, limit=1000)
    result = statistics.predict_price(props, request.model_dump())
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.get('/stats/correlation', tags=['Statistiques'])
def get_correlation(db: Session = Depends(get_db)):
    props = crud.get_properties(db, limit=1000)
    return statistics.correlation_matrix(props)