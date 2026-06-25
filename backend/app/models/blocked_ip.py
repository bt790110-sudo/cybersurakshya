from datetime import datetime

from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import DateTime

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.models.base import Base


class BlockedIP(Base):
    __tablename__ = "blocked_ips"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    ip: Mapped[str] = mapped_column(
        String(50),
        unique=True
    )

    reason: Mapped[str] = mapped_column(
        String(255)
    )

    blocked_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )