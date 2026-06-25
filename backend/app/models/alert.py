from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import Integer

from datetime import datetime

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.models.base import Base


class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    attack_type: Mapped[str] = mapped_column(
        String(100)
    )

    severity: Mapped[str] = mapped_column(
        String(50)
    )

    source_ip: Mapped[str] = mapped_column(
        String(50)
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="NEW"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )