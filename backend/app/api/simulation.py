from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db

from app.services.coordinator import Coordinator
from app.services.workflow_engine import WorkflowEngine

router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"]
)


@router.post("/simulate-attack")
async def simulate_attack(
    db: AsyncSession = Depends(get_db)
):
    """
    Execute the complete SOC workflow.

    Workflow:
    1. Generate Attack
    2. Calculate Threat Score
    3. Create Alert
    4. Generate Analysis
    5. Save Analysis
    6. Generate Response
    7. Block IP (if required)
    8. Update Agent Heartbeat
    """

    return await WorkflowEngine.execute(
        lambda: Coordinator.execute(db)
    )