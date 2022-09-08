"""
    ZIEM

    Description:

    Author:
        Bengart Zakhar
"""

#!/opt/ziem/venv/bin/python
import sys
import asyncio
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        prog='awssqs', 
        usage='%(prog)s [options]')
    parser.add_argument(
        "-r", 
        "--run", 
        help="Run AWS SQS service", 
        action="store_true")
    parser.add_argument(
        '--version', 
        action='version',
        version='%(prog)s ' + version, 
        help="View the version")
    args = parser.parse_args()
    if args.run:
        print('\n[*] Start AWS SQS Service\n----------------')
        sqs = Sqs(queue_in='Tickets_in', queue_out='Tickets_out', delay=20)
        asyncio.run((sqs.run(time_sleep=20)))
    else:
        parser.print_help()
        sys.exit(1)
