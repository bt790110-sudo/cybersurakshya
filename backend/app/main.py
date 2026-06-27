from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.database import engine, AsyncSessionLocal
from app.models.base import Base

# Import all models so SQLAlchemy registers them before create_all
from app.models.alert import Alert        # noqa: F401
from app.models.analysis import Analysis  # noqa: F401
from app.models.blocked_ip import BlockedIP  # noqa: F401
from app.models.agent import Agent        # noqa: F401

# Routers
from app.api.alerts import router as alert_router
from app.api.analyses import router as analysis_router
from app.api.blocked_ips import router as blocked_router
from app.api.agents import router as agent_router
from app.api.simulation import router as simulation_router
from app.api.stats import router as stats_router
from app.api.feed import router as feed_router

app = FastAPI(
    title="Cyber Surakshya SOC Platform",
    description="Security Operations Center backend — alerts, analysis, response, live feed.",
    version="1.0.0"
)

# ---------------------------------------------------------------
# CORS — allow the React frontend (any origin in dev)
# ---------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # tighten to ["http://localhost:3000"] in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------
# Routers
# ---------------------------------------------------------------
app.include_router(alert_router)
app.include_router(analysis_router)
app.include_router(blocked_router)
app.include_router(agent_router)
app.include_router(simulation_router)
app.include_router(stats_router)
app.include_router(feed_router)


# ---------------------------------------------------------------
# Startup
# ---------------------------------------------------------------
@app.on_event("startup")
async def startup_event():
    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    print("✅  Tables created / verified")

    # Verify DB connection
    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))

    print("✅  Database connected")

    # Seed default agents if none exist
    async with AsyncSessionLocal() as db:
        from sqlalchemy import select
        result = await db.execute(select(Agent))
        if not result.scalars().first():
            default_agents = [
                Agent(agent_name="Detection Agent",  status="ONLINE"),
                Agent(agent_name="Analysis Agent",   status="ONLINE"),
                Agent(agent_name="Response Agent",   status="ONLINE"),
                Agent(agent_name="Database Agent",   status="ONLINE"),
            ]
            db.add_all(default_agents)
            await db.commit()
            print("✅  Default agents seeded")


# ---------------------------------------------------------------
# System endpoints
# ---------------------------------------------------------------
@app.get("/", tags=["System"], summary="Root")
def root():
    return {
        "application": "Cyber Surakshya SOC Platform",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health", tags=["System"], summary="Health Check")
async def health():
    try:
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}
