from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db

from app.models.alert import Alert

from app.schemas.alert import (
    AlertCreate,
    AlertResponse
)

from app.repositories.alert_repository import (
    AlertRepository
)

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"],
    responses={
        404: {
            "description": "Alert not found"
        }
    }
)

@router.post(
    "",
    response_model=AlertResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_alert(
    payload: AlertCreate,
    db: AsyncSession = Depends(get_db)
):

    alert = Alert(
    attack_type=payload.attack_type,
    severity=payload.severity.value,
    source_ip=str(payload.source_ip),
    status=payload.status.value
      )

    return await AlertRepository.create(
        db,
        alert
    )


@router.get(
    "",
    response_model=list[AlertResponse]
)
async def get_alerts(
    db: AsyncSession = Depends(get_db)
):

    return await AlertRepository.get_all(db)


@router.get(
    "/{alert_id}",
    response_model=AlertResponse
)
async def get_alert(
    alert_id: int,
    db: AsyncSession = Depends(get_db)
):

    alert = await AlertRepository.get_by_id(
        db,
        alert_id
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found"
        )

    return alert


@router.delete(
    "/{alert_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete_alert(
    alert_id: int,
    db: AsyncSession = Depends(get_db)
):

    alert = await AlertRepository.get_by_id(
        db,
        alert_id
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found"
        )

    await AlertRepository.delete(
        db,
        alert
    )