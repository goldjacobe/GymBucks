import json
import boto3


#sample event: one pool value
# {
#   "uid" : "110531329144502040645",
#   "date" : "12/12/2019"
# }

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    log = event
    print(event)
    uid = log["uid"]
    date = log["date"]

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("pool")
    table.put_item(
        Item={
          'uid_date' : uid+'_'+date,
          'uid': uid,
          'date':date,
          'fullfilled':False,
          'amount': 10
        })
    
    table_user = dynamodb.Table("userInfo")
    response = table_user.update_item(
        Key={
            'uid': uid
        },
        UpdateExpression="set curpollnum = curpollnum + :val, curpollbal = curpollbal + :bal, balance = balance- :bal",
        ExpressionAttributeValues={
            ':val': 1,
            ':bal': 10
        },
        ReturnValues="UPDATED_NEW"
    )
    
    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps("success")
    }
