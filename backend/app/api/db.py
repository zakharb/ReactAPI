"""
    AWSAPI
    DB module for product-service
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
        Make engine, connection to DB and tables
"""

import os
import sqlalchemy
from databases import Database

DATABASE_URI = os.getenv('DATABASE_URI')
#DATABASE_URI = "postgresql://postgres:postgres@localhost:5432"
#2jQiq6sjNYHuBY4

#DATABASE_URI = "postgresql://postgres:2jQiq6sjNYHuBY4@tickets.cuyaylrdkttv.us-east-1.rds.amazonaws.com:5432"

engine = sqlalchemy.create_engine(DATABASE_URI)
metadata = sqlalchemy.MetaData()

tickets = sqlalchemy.Table(
    'tickets',
    metadata,
    sqlalchemy.Column('ticket_id', sqlalchemy.BigInteger, primary_key=True),
    sqlalchemy.Column('name', sqlalchemy.String(50)),
    sqlalchemy.Column('description', sqlalchemy.String(200)),
)

comments = sqlalchemy.Table(
    'comments',
    metadata,
    sqlalchemy.Column('comment_id', sqlalchemy.BigInteger, primary_key=True),
    sqlalchemy.Column('user', sqlalchemy.String(50)),
    sqlalchemy.Column('value', sqlalchemy.String(200)),
    sqlalchemy.Column('ticket_id', 
                      sqlalchemy.BigInteger, 
                      sqlalchemy.ForeignKey("tickets.ticket_id")),
)


#products.drop(engine)
#products.create(engine)

database = Database(DATABASE_URI)