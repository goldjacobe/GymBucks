import json
import boto3
from boto3.dynamodb.conditions import Key
from datetime import datetime
#sample event
# {
#   "uid" : "110531329144502040645",
#   "content" : "new log yayyyyyyyyyyyyyyy",
#   "post_pic" : "post1.png"
# }
def update_log(uid, date):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    completion = False
    table = dynamodb.Table("pool")
    uid_date = uid+'_'+date
    response = table.query(KeyConditionExpression=Key('uid_date').eq(uid_date))
    items = response['Items']
    if len(items) != 0:
        table.update_item(
            Key={
                'uid_date': uid_date
            },
            UpdateExpression="set fullfilled = :r",
            ExpressionAttributeValues={
                ':r': True
            },
            ReturnValues="UPDATED_NEW"
            )
        completion = True
    else:
        completion = False
        
    if completion:
        return "Update success"
    return completion, "No Update"

def lambda_handler(event, context):
    userinfo = event
    print(userinfo)
    uid = userinfo["uid"]
    content = userinfo["content"]
    post_pic = userinfo["post_pic"]
    
    now = datetime.now()
    dt_string = now.strftime("%m/%d/%Y-%H:%M:%S")
    d_string = now.strftime("%m/%d/%Y")
    
    update_log(uid, d_string)
    
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("userLog")
    table.put_item(
        Item={
          'uid_date':uid+"_"+dt_string,
          'uid' : uid,
          'content': content,
          'post_pic':post_pic,
          'time': dt_string
        })


    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps("success")
    }
