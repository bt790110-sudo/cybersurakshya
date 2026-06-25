from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.models.base import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    alert_id: Mapped[int] = mapped_column(
        ForeignKey("alerts.id")
    )

    prediction: Mapped[str] = mapped_column(
        String(100)
    )

    confidence: Mapped[float]

    summary: Mapped[str] = mapped_column(
        String(500)
    )