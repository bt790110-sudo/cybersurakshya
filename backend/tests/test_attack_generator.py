# tests/test_attack_generator.py

from app.services.attack_generator import (
    AttackGenerator
)


def test_generate_attack():

    attack = (
        AttackGenerator.generate_attack()
    )

    assert attack["attack_type"]

    assert attack["source_ip"]

    assert attack["severity"]