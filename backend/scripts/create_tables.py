from app.db.database import Base, SessionLocal, engine
from app.db.seed import seed_database


def main() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_database(db)
    print("Database tables created and seed data inserted.")


if __name__ == "__main__":
    main()
