import json
import boto3
from boto3.dynamodb.conditions import Key
#db data 
#{
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
    part_of_log = []
    if len(items) != 0:
        item = items[0]
        name = item['name']
        username = item['username']
        profilepic = item['profilepic']
        
        part_of_log.append(name)
        part_of_log.append(username)
        part_of_log.append(profilepic)
        completion = True
    else:
        completion = False
    if completion:
        
        return part_of_log
    return completion, "User not found !!"
    
def search_user_log():
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    completion = False
    table = dynamodb.Table("userLog")
    response = table.scan()
    items = response['Items']
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])
    items = response['Items']
    if len(items) != 0:
        logs = []
        for item in items:
            log = {}
            uid = item['uid']
            content = item['content']
            post_pic = item['post_pic']
            time = item['time']
            part_of_log = search_user_info(uid)
            
            log["uid"] = uid
            log["content"] = content
            log["post_pic"] = post_pic
            log["time"] = time
            log["name"] = part_of_log[0]
            log["username"] = part_of_log[1]
            log["profilepic"] = part_of_log[2]
            
            logs.append(log)
        completion = True
    else:
        completion = False
        
    if completion:
        logs.sort(key=lambda x:x["time"], reverse=True)
        return logs
    return completion, "User not found !!"
    
def lambda_handler(event, context):

    return search_user_log()