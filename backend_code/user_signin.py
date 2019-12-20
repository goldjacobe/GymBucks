import json
import boto3
import random
from boto3.dynamodb.conditions import Key

def validate_user(phone, password):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    completion = False
    table = dynamodb.Table("userSign")
    response = table.query(KeyConditionExpression=Key('phone').eq(phone))
    items = response['Items']
    print(items)
    if len(items) != 0:
        # get faceid of the visitor
        item = items[0]
        uid = item['phone']
        password_in_table = item['password']
        if password == password_in_table:
            completion = True
        else:
            completion = False
    else:
        completion = False

    return completion

        
def lambda_handler(event, context):
    
    phone = event["phone"]
    password = event["password"]
    flag = validate_user(phone, password)
    if flag:
        return 1
    else:
        return 0
