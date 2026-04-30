# backend/app/schemas.py
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict
from datetime import datetime

class PropertyBase(BaseModel):
    property_name: str = Field(..., min_length=1, max_length=150, json_schema_extra={"example": "Villa Soleil"})
    property_type: Optional[str] = None
    neighborhood_name: Optional[str] = None
    surface_m2: float = Field(..., gt=0, description='Surface > 0')
    nb_rooms: int = Field(..., ge=1)
    nb_bedrooms: Optional[int] = 1
    nb_bathrooms: Optional[int] = 1
    floor_level: Optional[int] = 0
    building_age: Optional[int] = None
    distance_city_center: Optional[float] = None
    services_proximity_min: Optional[int] = None
    global_condition_score: Optional[int] = Field(None, ge=1, le=5)
    energy_performance_score: Optional[int] = Field(None, ge=1, le=7)
    material_quality_score: Optional[int] = Field(None, ge=1, le=5)
    neighborhood_prestige_score: Optional[int] = Field(None, ge=1, le=10)
    noise_level_score: Optional[int] = Field(None, ge=1, le=5)
    view_quality_score: Optional[int] = Field(None, ge=1, le=3)
    has_garden: bool = False
    has_terrace: bool = False
    has_garage: bool = False
    has_security: bool = False
    has_air_con: bool = False
    has_pool: bool = False
    has_solar_power: bool = False
    price: float = Field(..., gt=0)
    monthly_charges: Optional[float] = 0

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(PropertyBase):
    # On pourrait ici rendre tous les champs optionnels si besoin
    pass

class PropertyResponse(PropertyBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    # Version Pydantic v2 pour permettre la conversion ORM (SQLAlchemy -> Pydantic)
    model_config = ConfigDict(from_attributes=True)

# --- SCHÉMAS POUR LA DATA SCIENCE ---

class RegressionResult(BaseModel):
    r_squared: float
    coefficients: Dict[str, float]
    intercept: float
    predictions: List[float]
    actuals: List[float]
    feature_names: List[str]

class PredictionRequest(BaseModel):
    surface_m2: float = Field(..., gt=0)
    nb_rooms: int = Field(..., ge=1)
    neighborhood_prestige_score: int = Field(..., ge=1, le=10)
    building_age: Optional[int] = 10
    has_pool: Optional[bool] = False
    has_garden: Optional[bool] = False
    global_condition_score: Optional[int] = Field(3, ge=1, le=5)

class PredictionResponse(BaseModel):
    predicted_price: float
    confidence_interval_low: float
    confidence_interval_high: float
    r_squared: float