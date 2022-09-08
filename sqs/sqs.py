"""
    SQS API
    Manager to work with SQS
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
        
"""

import boto3

class Sqs:
    """
    Class for work with SQS AWS Service
    """
    def __init__(self, queue_in, queue_out, delay=20):
        self.sqs = boto3.resource('sqs')
        self.queue_in = self.sqs.get_queue_by_name(QueueIn=queue_in)
        self.queue_out = self.sqs.get_queue_by_name(QueueOut=queue_out)
        self.delay = delay

    async def send_sqs_message(self, message_attributes, message_body):
        response = self.queue.send_message(
            QueueUrl=self.queue_out,
            DelaySeconds=self.delay,
            MessageAttributes=message_attributes,
            MessageBody=message_body
        )

    async def receive_sqs_messages(self):
        messages = []
        for message in self.queue_in.receive_messages():
            messages.append(message.body)
            message.delete()        
        return messages

    async def write_db(message):
        #TODO write messages to DB

    async def read_db(message):
        #TODO read messages from DB

    async def run(self, sleep_time=20):
        try:
            await self.get_time()
            while True:
                await asyncio.sleep(sleep_time)
                data = {}
                time = datetime.now() - timedelta(seconds=sleep_time)

                #TODO read last messages from DB
                messages = await self.read_db()
                for message in messages:
                    attr = message['attributes']
                    body = message['body']
                    await self.send_sqs_message(attr, body)

                #TODO write last messages to DB
                messages = receive_messages()
                await write_db(messages)

                await self.update_time()
        except Exception as e:
            print(e)
            
    async def get_time(self):
        # TODO get last time from DB
        time = await self.db.find_one()
        if time:
            self.time = doc['time']
        else:
            self.time = datetime.now()

    async def update_time(self):
        # TODO update last time in DB
        await self.db.update_one()


if __name__ == "__main__":
    attr = {
        'Title': {
            'DataType': 'String',
            'StringValue': 'The Whistler'
        },
        'Author': {
            'DataType': 'String',
            'StringValue': 'John Grisham'
        },
    }
    body = 'Information about current NY Times fiction bestseller for'

    sqs = SQS('Tickets')
    sqs.send_sqs_message(attr, body)

    messages = sqs.receive_sqs_messages()
    for m in messages:
        print(m)

    def __init__(self):
        super(Transmitter, self).__init__()
        self.db = get_db()
        self.UDP_IP = "192.168.98.110"
        self.UDP_PORT = 514
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
