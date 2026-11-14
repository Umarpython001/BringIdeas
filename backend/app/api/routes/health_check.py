from fastapi import ( 
    APIRouter, 
    Depends, 
    HTTPException, 
    status
    )



from sqlalchemy.orm import Session
from sqlalchemy import (
    select,
    exists,
    text,
)


from app.db.session import get_db

health_router = APIRouter(
    tags=["health"]
)

@health_router.get("/db-health-check")
def check_db_connection(db: Session = Depends(get_db)):

    try:
        # Execute a lightweight ping query (SELECT 1)
        result = db.execute(text("SELECT 1")).scalar()
        
        
    except Exception as e:
        # If Supabase is down, credentials are wrong, or network fails
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database connection failed: {str(e)}"
        )

    finally:
        return {
            "status": "success",
            "message": "Successfully connected to Supabase PostgreSQL!",
            "ping_result": result  # Should return 1
        }