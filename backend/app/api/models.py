"""
    AWSAPI
    Models to api-service
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
        Pydantic models to make docs and check types
"""

from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import ForeignKey

class TicketIn(BaseModel):
    name: str
    description: str


class TicketOut(TicketIn):
    ticket_id: int


class TicketUpdate(TicketIn):
    name: Optional[str] = None
    description: Optional[str] = None


class CommentIn(BaseModel):
    user: str
    value: str
    ticket_id: int


class CommentOut(CommentIn):
    comment_id: int


class CommentUpdate(CommentIn):
    user: Optional[str] = None
    value: Optional[str] = None