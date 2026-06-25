from fastapi import FastAPI
from sqlalchemy import text

from app.core.database import engine

from app.models.base import Base

# IMPORTANT
# Import models so SQLAlchemy knows them
from app.models.alert import Alert
from app.models.analysis import Analysis
from app.models.blocked_ip import BlockedIP
from app.api.blocked_ips import (
    router as blocked_router
)

from app.models.agent import Agent

from app.api.agents import (
    router as agent_router
)

from app.api.alerts import router as alert_router
from app.api.analyses import router as analysis_router

app = FastAPI(
    title="Cyber Surakshya SOC Platform",
    version="1.0.0"
)

app.include_router(analysis_router)

app.include_router(alert_router)

app.include_router(blocked_router)

app.include_router(agent_router)



@app.on_event("startup")
async def startup_event():

    # Create tables automatically
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    print("Tables created successfully")

    # Test DB connection
    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))

    print("Database connected successfully")


@app.get(
    "/",
    tags=["System"],
    summary="Root Endpoint"
)
def root():
    return {
        "application": "Cyber Surakshya SOC Platform",
        "version": "1.0.0"
    }


@app.get(
    "/health",
    tags=["System"],
    summary="System Health Check"
)
async def health():

    try:

        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception:

        return {
            "status": "unhealthy",
            "database": "disconnected"
        }