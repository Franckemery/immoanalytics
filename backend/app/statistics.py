# backend/app/statistics.py
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from typing import List, Dict, Any

def properties_to_dataframe(properties: List[Any]) -> pd.DataFrame:
    """Convertit une liste de propriétés SQLAlchemy en DataFrame pandas."""
    data = []
    for p in properties:
        data.append({
            'surface_m2': float(p.surface_m2 or 0),
            'nb_rooms': int(p.nb_rooms or 0),
            'nb_bedrooms': int(p.nb_bedrooms or 1),
            'nb_bathrooms': int(p.nb_bathrooms or 1),
            'floor_level': int(p.floor_level or 0),
            'building_age': int(p.building_age or 0),
            'distance_city_center': float(p.distance_city_center or 0),
            'neighborhood_prestige_score': int(p.neighborhood_prestige_score or 5),
            'global_condition_score': int(p.global_condition_score or 3),
            'material_quality_score': int(p.material_quality_score or 3),
            'noise_level_score': int(p.noise_level_score or 3),
            'has_garden': int(p.has_garden or False),
            'has_terrace': int(p.has_terrace or False),
            'has_garage': int(p.has_garage or False),
            'has_pool': int(p.has_pool or False),
            'has_air_con': int(p.has_air_con or False),
            'price': float(p.price or 0)
        })
    return pd.DataFrame(data)

def simple_regression(properties: List[Any]) -> Dict:
    """Régression linéaire simple : Prix ~ Surface."""
    if len(properties) < 3:
        return {'error': 'Minimum 3 biens requis pour la régression'}
    
    df = properties_to_dataframe(properties)
    X = df[['surface_m2']].values
    y = df['price'].values
    
    model = LinearRegression()
    model.fit(X, y)
    y_pred = model.predict(X)
    r2 = r2_score(y, y_pred)
    
    coef = model.coef_[0]
    return {
        'r_squared': round(float(r2), 4),
        'coefficients': {'surface_m2': round(float(coef), 2)},
        'intercept': round(float(model.intercept_), 2),
        'predictions': y_pred.tolist(),
        'actuals': y.tolist(),
        'feature_names': ['surface_m2'],
        'interpretation': f'Chaque m² supplémentaire ajoute {coef:,.0f} FCFA'
    }

def multiple_regression(properties: List[Any]) -> Dict:
    """Régression linéaire multiple avec toutes les variables disponibles."""
    if len(properties) < 5:
        return {'error': 'Minimum 5 biens requis pour la régression multiple'}
    
    df = properties_to_dataframe(properties)
    feature_cols = [
        'surface_m2', 'nb_rooms', 'nb_bedrooms', 'nb_bathrooms',
        'building_age', 'neighborhood_prestige_score',
        'global_condition_score', 'has_garden', 'has_pool',
        'has_garage', 'has_air_con', 'distance_city_center'
    ]
    
    X = df[feature_cols].values
    y = df['price'].values
    
    model = LinearRegression()
    model.fit(X, y)
    y_pred = model.predict(X)
    r2 = r2_score(y, y_pred)
    
    residuals = y - y_pred
    std_error = np.std(residuals)
    
    return {
        'r_squared': round(float(r2), 4),
        'coefficients': {col: round(float(val), 2) for col, val in zip(feature_cols, model.coef_)},
        'intercept': round(float(model.intercept_), 2),
        'predictions': y_pred.tolist(),
        'actuals': y.tolist(),
        'feature_names': feature_cols,
        'std_error': round(float(std_error), 2)
    }

def predict_price(properties: List[Any], prediction_input: Dict) -> Dict:
    """Prédit le prix d'un nouveau bien basé sur les données historiques."""
    if len(properties) < 5:
        return {'error': 'Pas assez de données pour faire une prédiction fiable'}
    
    df = properties_to_dataframe(properties)
    feature_cols = [
        'surface_m2', 'nb_rooms', 'nb_bedrooms', 'nb_bathrooms',
        'building_age', 'neighborhood_prestige_score',
        'global_condition_score', 'has_garden', 'has_pool',
        'has_garage', 'has_air_con', 'distance_city_center'
    ]
    
    X = df[feature_cols].values
    y = df['price'].values
    
    model = LinearRegression()
    model.fit(X, y)
    
    # Calcul de l'erreur pour l'intervalle de confiance
    y_pred_train = model.predict(X)
    std_error = np.std(y - y_pred_train)
    
    # Préparation du nouveau bien pour prédiction
    new_prop = np.array([[
        prediction_input.get('surface_m2', 80),
        prediction_input.get('nb_rooms', 3),
        prediction_input.get('nb_bedrooms', 2),
        prediction_input.get('nb_bathrooms', 1),
        prediction_input.get('building_age', 10),
        prediction_input.get('neighborhood_prestige_score', 5),
        prediction_input.get('global_condition_score', 3),
        int(prediction_input.get('has_garden', False)),
        int(prediction_input.get('has_pool', False)),
        int(prediction_input.get('has_garage', False)),
        int(prediction_input.get('has_air_con', False)),
        prediction_input.get('distance_city_center', 3.0)
    ]])
    
    predicted = model.predict(new_prop)[0]
    r2 = r2_score(y, y_pred_train)
    
    return {
        'predicted_price': round(float(predicted), 2),
        'confidence_interval_low': round(float(predicted - 1.96 * std_error), 2),
        'confidence_interval_high': round(float(predicted + 1.96 * std_error), 2),
        'r_squared': round(float(r2), 4)
    }

def dashboard_stats(properties: List[Any]) -> Dict:
    """Calcule les statistiques clés pour le Dashboard frontal."""
    if not properties:
        return {
            'total': 0, 'avg_price_per_m2': 0, 'avg_price': 0, 
            'r_squared': 0, 'min_price': 0, 'max_price': 0
        }
    
    df = properties_to_dataframe(properties)
    
    # Éviter la division par zéro si surface_m2 est mal renseigné
    df = df[df['surface_m2'] > 0]
    
    r2 = 0
    if len(properties) >= 3:
        reg = simple_regression(properties)
        r2 = reg.get('r_squared', 0)
        
    return {
        'total': len(properties),
        'avg_price': round(float(df['price'].mean()), 2),
        'avg_price_per_m2': round(float((df['price'] / df['surface_m2']).mean()), 2),
        'r_squared': float(r2),
        'min_price': round(float(df['price'].min()), 2),
        'max_price': round(float(df['price'].max()), 2)
    }