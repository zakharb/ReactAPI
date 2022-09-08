"""
    AWSAPI
    Manager to work with DB at ticket-service
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
        CRUD operations to work with DB
"""

from app.api.models import TicketIn, TicketOut, TicketUpdate, CommentIn
from app.api.db import tickets, database, comments

async def add_ticket(payload: TicketIn):
    query = tickets.insert().values(**payload.dict())
    return await database.execute(query=query)

async def get_all_tickets():
    query = tickets.select()
    return await database.fetch_all(query=query)

async def get_ticket(id):
    query = tickets.select(tickets.c.ticket_id==id)
    return await database.fetch_one(query=query)

async def delete_ticket(id: int):
    query = tickets.delete().where(tickets.c.ticket_id==id)
    return await database.execute(query=query)

async def update_ticket(id: int, payload: TicketIn):
    query = (
        tickets
        .update()
        .where(tickets.c.ticket_id == id)
        .values(**payload.dict())
    )
    return await database.execute(query=query)

async def add_comment(payload: CommentIn):
    query = comments.insert().values(**payload.dict())
    return await database.execute(query=query)

async def get_all_comments():
    query = comments.select()
    return await database.fetch_all(query=query)

async def get_comment(id):
    query = comments.select(comments.c.comment_id==id)
    return await database.fetch_one(query=query)

async def delete_comment(id: int):
    query = comments.delete().where(comments.c.comment_id==id)
    return await database.execute(query=query)

async def update_comment(id: int, payload: CommentIn):
    query = (
        comments
        .update()
        .where(comments.c.comment_id == id)
        .values(**payload.dict())
    )
    return await database.execute(query=query)

async def get_ticket_comments(ticket_id):
    query = comments.select(comments.c.ticket_id==ticket_id)
    return await database.fetch_all(query=query)
