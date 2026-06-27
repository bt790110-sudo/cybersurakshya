from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.alert import Alert
from app.models.analysis import Analysis
from app.models.blocked_ip import BlockedIP

from app.repositories.alert_repository import AlertRepository
from app.repositories.analysis_repository import AnalysisRepository
from app.repositories.blocked_repository import BlockedRepository
from app.repositories.agent_repository import AgentRepository

from app.services.attack_generator import AttackGenerator
from app.services.analysis_generator import AnalysisGenerator
from app.services.response_generator import ResponseGenerator
from app.services.threat_scoring import ThreatScoring


class Coordinator:

    @staticmethod
    async def execute(
        db: AsyncSession
    ):

        # --------------------------
        # Generate Attack
        # --------------------------

        attack = AttackGenerator.generate_attack()

        # --------------------------
        # Threat Score
        # --------------------------

        score = ThreatScoring.calculate_score(
            attack["attack_type"]
        )

        # --------------------------
        # Save Alert
        # --------------------------

        alert = Alert(
            attack_type=attack["attack_type"],
            severity=attack["severity"],
            source_ip=attack["source_ip"],
            status="NEW"
        )

        alert = await AlertRepository.create(
            db,
            alert
        )

        # --------------------------
        # Analysis
        # --------------------------

        generated_analysis = AnalysisGenerator.generate(
            attack
        )

        analysis = Analysis(
            alert_id=alert.id,
            prediction=generated_analysis["prediction"],
            confidence=generated_analysis["confidence"],
            summary=generated_analysis["summary"]
        )

        analysis = await AnalysisRepository.create(
            db,
            analysis
        )

        # --------------------------
        # Response
        # --------------------------

        response = ResponseGenerator.generate(
            score
        )

        blocked = None

        if response["action"] == "Block IP":

            existing = await BlockedRepository.get_by_ip(
                db,
                attack["source_ip"]
            )

            if not existing:

                blocked = BlockedIP(
                    ip=attack["source_ip"],
                    reason=analysis.summary
                )

                blocked = await BlockedRepository.create(
                    db,
                    blocked
                )

            else:
                blocked = existing

        # --------------------------
        # Update Agent Heartbeat
        # --------------------------

        agents = await AgentRepository.get_all(db)

        for agent in agents:

            agent.heartbeat = datetime.utcnow()

        await db.commit()

        return {

            "alert": alert,

            "analysis": analysis,

            "score": score,

            "response": response,

            "blocked_ip": blocked
        }