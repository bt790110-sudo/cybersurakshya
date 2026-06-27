# tests/test_threat_scoring.py

from app.services.threat_scoring import (
    ThreatScoring
)


def test_ddos_score():

    result = (
        ThreatScoring.calculate_score(
            "DDoS"
        )
    )

    assert result["score"] == 95

    assert result["risk"] == "CRITICAL"

    assert result["priority"] == "P1"