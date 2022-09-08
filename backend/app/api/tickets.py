"""
    AWSAPI
    Routers for tickets
    Copyright (C) 2022

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

    Author:
        Bengart Zakhar

    Description:
        Routers for operations with API
"""

from typing import List, Optional
from fastapi import APIRouter, HTTPException

from app.api.models import TicketOut, TicketIn, TicketUpdate, CommentOut
from app.api import db_manager

router = APIRouter()

@router.post('/', response_model=TicketOut, status_code=201)
async def create_ticket(payload: TicketIn):
    ticket_id = await db_manager.add_ticket(payload)
    response = {
        'ticket_id': ticket_id,
        **payload.dict()
    }
    return response

@router.get('/', response_model=List[TicketOut])
async def get_tickets():
    return await db_manager.get_all_tickets()

@router.get('/{id}', response_model=TicketOut)
async def get_ticket(id: int):
    ticket = await db_manager.get_ticket(id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.put('/{id}/', response_model=TicketOut)
async def update_ticket(id: int, payload: TicketUpdate):
    ticket = await db_manager.get_ticket(id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    update_data = payload.dict(exclude_unset=True)
    ticket_in_db = TicketIn(**ticket)
    updated_ticket = ticket_in_db.copy(update=update_data)
    return await db_manager.update_ticket(id, updated_ticket)

@router.delete('/{id}', response_model=None)
async def delete_ticket(id: int):
    ticket = await db_manager.get_ticket(id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return await db_manager.delete_ticket(id)

@router.get('/{id}/comments', response_model=List[CommentOut])
async def get_ticket_comments(id: int):
    comments = await db_manager.get_ticket_comments(id)
    print(comments)
    if not comments:
        raise HTTPException(status_code=404, detail="Ticket's comments not found")
    return comments
