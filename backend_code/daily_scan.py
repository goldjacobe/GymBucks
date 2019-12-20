import json
import boto3
from boto3.dynamodb.conditions import Key
from datetime import datetime
from decimal import Decimal
session = boto3.Session(region_name="us-east-1")
sns_client = session.client('sns')

def change_userinfo(uid, fullfilled, amount,date, earning):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table_user = dynamodb.Table("userInfo")
    
    update_amount = 0
    completed = 0
    if fullfilled:
        update_amount = Decimal(earning)
        completed = Decimal(1)
    response = table_user.update_item(
        Key={
            'uid': uid
        },
        UpdateExpression="set curpollnum = curpollnum - :val, curpollbal = curpollbal - :bal, balance = balance+ :addbal, completed_workout = completed_workout + :w",
        ExpressionAttributeValues={
            ':val': 1,
            ':bal': amount,
            ':addbal':update_amount,
            ':w':completed
        }
    )
    
    #send text 
    phone = '1' + uid
    message = 'Hi your pool for %s is completed. ' \
              'Your earning today is %s.\n'  % (date, update_amount)
    response = sns_client.publish(
        PhoneNumber=phone,
        Message=message,
        MessageAttributes={
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': 'DailyPool'
            }
        }
    )
    
def scan():
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("pool")
    
    now = datetime.now()
    today_date = now.strftime("%m/%d/%Y")
    
    fe = Key("date").eq(today_date)
    response = table.scan(FilterExpression = fe)
    
    completion = 0
    pool_value = 0
    participants = 0
    poolparticipants = 0
    items = response['Items']
    
    total = 0
    for item in items:
        fullfill = item['fullfilled']
        if fullfill:
            poolparticipants +=1
        total += item['amount']
    if poolparticipants>0:    
        total = total/poolparticipants
    else:
        total = 0
        
    for item in items:
        participants +=1
        uid_date = item['uid_date']
        uid = item['uid']
        fullfilled = item['fullfilled']
        if fullfilled:
            completion+=1
        amount = item['amount']
        pool_value +=amount
        change_userinfo(uid,fullfilled,amount,today_date, total)

    
    #update pool info 
    if participants>0:
        completion = Decimal(completion/participants)
    completion = Decimal(completion)
    pool_value = Decimal(pool_value)
    participants = Decimal(participants)
    tablepool = dynamodb.Table("poolstat")
    tablepool.put_item(
        Item={
          'date' : today_date,
          'completion': completion,
          'pool_value':pool_value,
          'participants':participants
        })
    
def lambda_handler(event, context):
    scan()

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
