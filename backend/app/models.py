# backend/app/models.py
from sqlalchemy import Column, Integer, Float, String, Boolean, DateTime, CheckConstraint
from sqlalchemy.sql import func
from .database import Base

class Property(Base):
    __tablename__ = "properties"

    # IDENTIFIANTS
    id = Column(Integer, primary_key=True, index=True)
    property_name = Column(String(150), nullable=False)
    property_type = Column(String(50))
    neighborhood_name = Column(String(100))

    # VARIABLES PRÉDICTRICES CONTINUES (X)
    surface_m2 = Column(Float, nullable=False)
    nb_rooms = Column(Integer, nullable=False)
    nb_bedrooms = Column(Integer, default=1)
    nb_bathrooms = Column(Integer, default=1)
    floor_level = Column(Integer, default=0)
    building_age = Column(Integer)
    distance_city_center = Column(Float)
    services_proximity_min = Column(Integer)

    # SCORES QUALITATIFS (Avec contraintes de validation)
    global_condition_score = Column(Integer, CheckConstraint('global_condition_score BETWEEN 1 AND 5'))
    energy_performance_score = Column(Integer, CheckConstraint('energy_performance_score BETWEEN 1 AND 7'))
    material_quality_score = Column(Integer, CheckConstraint('material_quality_score BETWEEN 1 AND 5'))
    neighborhood_prestige_score = Column(Integer, CheckConstraint('neighborhood_prestige_score BETWEEN 1 AND 10'))
    noise_level_score = Column(Integer, CheckConstraint('noise_level_score BETWEEN 1 AND 5'))
    view_quality_score = Column(Integer, CheckConstraint('view_quality_score BETWEEN 1 AND 3'))

    # VARIABLES BINAIRES
    has_garden = Column(Boolean, default=False)
    has_terrace = Column(Boolean, default=False)
    has_garage = Column(Boolean, default=False)
    has_security = Column(Boolean, default=False)
    has_air_con = Column(Boolean, default=False)
    has_pool = Column(Boolean, default=False)
    has_solar_power = Column(Boolean, default=False)

    # VARIABLE CIBLE (Y)
    price = Column(Float, nullable=False)
    monthly_charges = Column(Float, default=0)

    # TIMESTAMPS
    # server_default=func.now() utilise l'heure du serveur de base de données
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    # onupdate=func.now() met à jour automatiquement la date lors d'une modification
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())