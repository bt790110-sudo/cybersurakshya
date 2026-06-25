from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db

from app.models.agent import Agent

from app.schemas.agent import (
    AgentCreate,
    AgentResponse
)

from app.repositories.agent_repository import (
    AgentRepository
)

router = APIRouter(
    prefix="/agents",
    tags=["Agents"],
    responses={
        404: {
            "description": "Agent not found"
        }
    }
)



@router.post(
    "",
    response_model=AgentResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_agent(
    payload: AgentCreate,
    db: AsyncSession = Depends(get_db)
):

    existing = await AgentRepository.get_by_name(
        db,
        payload.agent_name
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Agent already exists"
        )

    agent = Agent(
        agent_name=payload.agent_name,
        status=payload.status
    )

    return await AgentRepository.create(
        db,
        agent
    )


@router.get(
    "",
    response_model=list[AgentResponse]
)
async def get_agents(
    db: AsyncSession = Depends(get_db)
):
    return await AgentRepository.get_all(db)


@router.get(
    "/status",
    response_model=list[AgentResponse]
)
async def get_agent_status(
    db: AsyncSession = Depends(get_db)
):
    return await AgentRepository.get_all(db)


@router.get(
    "/{agent_id}",
    response_model=AgentResponse
)
async def get_agent(
    agent_id: int,
    db: AsyncSession = Depends(get_db)
):

    agent = await AgentRepository.get_by_id(
        db,
        agent_id
    )

    if not agent:
        raise HTTPException(
            status_code=404,
            detail="Agent not found"
        )

    return agent


@router.delete(
    "/{agent_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete_agent(
    agent_id: int,
    db: AsyncSession = Depends(get_db)
):

    agent = await AgentRepository.get_by_id(
        db,
        agent_id
    )

    if not agent:
        raise HTTPException(
            status_code=404,
            detail="Agent not found"
        )

    await AgentRepository.delete(
        db,
        agent
    )