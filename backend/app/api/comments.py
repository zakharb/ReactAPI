"""
    AWSAPI
    Routers for comments
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

from app.api.models import CommentOut, CommentIn, CommentUpdate
from app.api import db_manager

router = APIRouter()

@router.post('/', response_model=CommentOut, status_code=201)
async def create_comment(payload: CommentIn):
    comment_id = await db_manager.add_comment(payload)
    response = {
        'comment_id': comment_id,
        **payload.dict()
    }
    return response

@router.get('/', response_model=List[CommentOut])
async def get_all_comments():
    return await db_manager.get_all_comments()

@router.get('/{id}/', response_model=CommentOut)
async def get_comment(id: int):
    comment = await db_manager.get_comment(id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

@router.put('/{id}', response_model=CommentOut)
async def update_comment(id: int, payload: CommentUpdate):
    comment = await db_manager.get_comment(id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    update_data = payload.dict(exclude_unset=True)
    comment_in_db = CommentIn(**comment)
    updated_comment = comment_in_db.copy(update=update_data)
    return await db_manager.update_comment(id, updated_comment)

@router.delete('/{id}', response_model=None)
async def delete_comment(id: int):
    comment = await db_manager.get_comment(id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return await db_manager.delete_comment(id)
