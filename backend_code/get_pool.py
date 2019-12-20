import json
import boto3
from boto3.dynamodb.conditions import Key
from decimal import Decimal
from datetime import datetime

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("poolstat")
    response = table.scan()
    items = response['Items']
    
    table2 = dynamodb.Table("pool")
    now = datetime.now()
    today_date = now.strftime("%m/%d/%Y")
    
    fe = Key("date").eq(today_date)
    response2 = table2.scan(FilterExpression = fe)
    completion2 = 0
    participants2 = 0
    pool_value2 = 0
    items2 = response2['Items']
    for item in items2:
        participants2 +=1
        fullfilled = item['fullfilled']
        if fullfilled:
            completion2+=1
        amount = item['amount']
        pool_value2 +=amount
   
    today = {}
    pool_value2 = Decimal(pool_value2)
    participants2 = Decimal(participants2)
    completion2 = Decimal(completion2)
    if participants2>0:
        completion2 = Decimal(completion2/participants2)
    
    today["pool_value"] = pool_value2
    today["participants"] = participants2
    today["completion"] = completion2
    today["date"] = today_date
    items.append(today)
    
    items.sort(key = lambda x: x["date"], reverse=True)
    
    return items
