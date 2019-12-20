import json
import boto3
import random
from boto3.dynamodb.conditions import Key


def insert_user_info(phone, password, name):
    # rename the current 'frame.jpg' to 'name-phone.jpg'
    
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("userSign")
    
    response = table.query(KeyConditionExpression=Key('phone').eq(phone))
    items = response['Items']
    if len(items) != 0:
        return False
    
    table.put_item(
        Item={
        'phone': phone,
        'password': password,
        'name': name
        })
    table2 = dynamodb.Table("userInfo")
    uid = phone+"aaa"+str(random.randint(10,50))
    table2.put_item(
        Item={
        'uid': phone,
        'balance': 10000,
        'completed_workout': 0,
        'curpollbal': 0,
        'curpollnum': 0,
        'email': name+"@columbia.edu",
        'name': name,
        'phone': phone,
        'password': password,
        'username': name+"n"+str(random.randint(10,50)),
        'profilepic': "default.png"
        }
    )
    return True
    
        
def lambda_handler(event, context):
    
    phone = event["phone"]
    password = event["password"]
    name = event["name"]
    if insert_user_info(phone, password, name):
        return 1
    return 0
