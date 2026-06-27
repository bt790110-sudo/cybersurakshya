import asyncio
import json
from datetime import datetime

from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from sqlalchemy import select

from app.core.database import AsyncSessionLocal
from app.models.alert import Alert

router = APIRouter(prefix="/feed", tags=["Live Feed"])

# Track the last alert ID sent to each client so we only push new ones
_last_sent: dict[str, int] = {}


async def _event_generator(request: Request):
    """
    Streams new alerts to the client as SSE events.
    Polls the database every 2 seconds and pushes any new alerts.
    """
    client_id = str(id(request))

    # Send the connection event
    yield "event: connected\ndata: {\"status\": \"connected\"}\n\n"

    # Find the current max alert id so we only stream NEW ones
    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(Alert.id).order_by(Alert.id.desc()).limit(1)
        )
        last_id = result.scalar_one_or_none() or 0

    try:
        while True:
            # Check client disconnected
            if await request.is_disconnected():
                break

            async with AsyncSessionLocal() as db:
                result = await db.execute(
                    select(Alert)
                    .where(Alert.id > last_id)
                    .order_by(Alert.id.asc())
                )
                new_alerts = result.scalars().all()

            for alert in new_alerts:
                payload = json.dumps({
                    "id": alert.id,
                    "attack_type": alert.attack_type,
                    "severity": alert.severity,
                    "source_ip": alert.source_ip,
                    "status": alert.status,
                    "created_at": alert.created_at.isoformat()
                })
                yield f"event: new_alert\ndata: {payload}\n\n"
                last_id = alert.id

            # Send a heartbeat ping every cycle to keep connection alive
            yield f"event: ping\ndata: {{\"ts\": \"{datetime.utcnow().isoformat()}\"}}\n\n"

            await asyncio.sleep(2)

    except asyncio.CancelledError:
        pass


@router.get("")
async def sse_feed(request: Request):
    """
    Server-Sent Events endpoint for the live alert feed.

    Frontend usage:
        const es = new EventSource("http://localhost:8000/feed");
        es.addEventListener("new_alert", (e) => {
            const alert = JSON.parse(e.data);
            // update dashboard
        });
    """
    return StreamingResponse(
        _event_generator(request),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"   # disable nginx buffering if behind proxy
        }
    )
