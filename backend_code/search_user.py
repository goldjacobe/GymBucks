import json
import boto3
from boto3.dynamodb.conditions import Key
# returned
# {
#   "uid" : "110531329144502040645",
#   "name" : "Ashley",
#   "username" : "ashleywu",
#   "phone" : "3106223581",
#   "email" : "tw2725@columbia.edu",
#   "profilepic":"default.png",
#   "balance" : 10000,
#   "completed_workout" : 100,
#   "curpollnum":0,
#   "curpollbal":0
# }

# event 
# {
#     "uid":"110531329144502040645"
# }
def search_user_info(uid):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    completion = False
    table = dynamodb.Table("userInfo")
    response = table.query(KeyConditionExpression=Key('uid').eq(uid))
    items = response['Items']
    if len(items) != 0:
        item = items[0]
        completion = True
    else:
        completion = False
        
    if completion:
        return item
    return "User not found !!"
    
def lambda_handler(event, context):
    
    params = event["uid"]
    return search_user_info(params)