# backend/app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

def get_properties(db: Session, skip: int = 0, limit: int = 500):
    """Récupère une liste de propriétés avec pagination."""
    return db.query(models.Property).offset(skip).limit(limit).all()

def get_property(db: Session, property_id: int):
    """Récupère une propriété spécifique par son ID."""
    return db.query(models.Property).filter(models.Property.id == property_id).first()

def create_property(db: Session, prop: schemas.PropertyCreate):
    """Crée une nouvelle propriété dans la base de données."""
    # model_dump() est la méthode Pydantic v2 pour convertir le schéma en dictionnaire
    db_prop = models.Property(**prop.model_dump())
    db.add(db_prop)
    db.commit()
    db.refresh(db_prop)
    return db_prop

def update_property(db: Session, property_id: int, prop: schemas.PropertyUpdate):
    """Met à jour une propriété existante."""
    db_prop = get_property(db, property_id)
    if db_prop:
        # exclude_unset=True permet de ne mettre à jour que les champs 
        # envoyés dans la requête, sans écraser les autres par du None.
        update_data = prop.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_prop, key, value)
        
        db.commit()
        db.refresh(db_prop)
    return db_prop

def delete_property(db: Session, property_id: int):
    """Supprime une propriété de la base de données."""
    db_prop = get_property(db, property_id)
    if db_prop:
        db.delete(db_prop)
        db.commit()
    return db_prop