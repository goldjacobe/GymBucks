import json
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    target = event['uid']
    
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("pool")
    response = table.scan()
    items = response['Items']
    # while 'LastEvaluatedKey' in response:
    #     response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
    #     items.extend(response['Items'])
    # response = table.query(KeyConditionExpression=Key('uid').eq(uid))
    items = response['Items']
    if len(items) != 0:
        logs = []
        for item in items:
            log = {}
            
            uid = item['uid']
            if uid != target:
                continue
            
            date = item['date']
            fullfilled = item['fullfilled']

            log["date"] = date
            log["fullfilled"] = fullfilled
            logs.append(log)            
    logs.sort(key=lambda x: x["date"], reverse=True)
    return logs
