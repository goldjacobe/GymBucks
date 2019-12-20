import json
import boto3

# sample event
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

def lambda_handler(event, context):
    userinfo = event
    print(userinfo)
    uid = userinfo["uid"]
    name = userinfo["name"]
    username = userinfo["username"]
    phone = userinfo["phone"]
    profilepic = userinfo["profilepic"]
    email = userinfo["email"]
    balance = userinfo["balance"]
    completed_workout = userinfo["completed_workout"]
    curpollnum = userinfo["curpollnum"]
    curpollbal = userinfo["curpollbal"]
    
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("userInfo")
    table.put_item(
        Item={
          'uid' : uid,
          'name' : name,
          'username' : username,
          'phone' : phone,
          'profilepic':profilepic,
          'email' : email,
          'balance' : balance,
          'completed_workout' : completed_workout,
          'curpollnum':curpollnum,
          'curpollbal':curpollbal
        })


    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps("success")
    }
