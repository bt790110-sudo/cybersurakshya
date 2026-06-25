from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.alert import Alert


class AlertRepository:

    @staticmethod
    async def create(
        db: AsyncSession,
        alert: Alert
    ):
        db.add(alert)

        await db.commit()

        await db.refresh(alert)

        return alert

    @staticmethod
    async def get_all(
        db: AsyncSession
    ):
        result = await db.execute(
            select(Alert)
        )

        return result.scalars().all()

    @staticmethod
    async def get_by_id(
        db: AsyncSession,
        alert_id: int
    ):
        result = await db.execute(
            select(Alert).where(
                Alert.id == alert_id
            )
        )

        return result.scalar_one_or_none()

    @staticmethod
    async def delete(
        db: AsyncSession,
        alert: Alert
    ):
        await db.delete(alert)

        await db.commit()