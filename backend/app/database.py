# backend/app/database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# 1. Charger les variables d'environnement
load_dotenv()

# 2. Récupérer l'URL de la base de données
# Il est prudent d'ajouter une valeur par défaut ou une vérification
DATABASE_URL = os.getenv('DATABASE_URL')

if not DATABASE_URL:
    # Rappel : format "postgresql://user:password@localhost:5432/dbname"
    raise ValueError("DATABASE_URL n'est pas définie dans le fichier .env")

# 3. Créer le moteur de connexion
# Note : Pour PostgreSQL, on n'a pas besoin de 'check_same_thread' (c'est pour SQLite)
engine = create_engine(DATABASE_URL)

# 4. Créer une session locale
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 5. Base pour les modèles (Nouvelle syntaxe SQLAlchemy 2.0 recommandée)
Base = declarative_base()

# 6. Dépendance pour obtenir la session (utilisée par FastAPI)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()