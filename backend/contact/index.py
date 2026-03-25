import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохраняет обращение от пользователя в базу данных"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    email = (body.get('email') or '').strip()
    message = (body.get('message') or '').strip()

    if not name or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните имя и сообщение'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s) RETURNING id",
        (name, email or None, message)
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'id': row[0]})
    }
