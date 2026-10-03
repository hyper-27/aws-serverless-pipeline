const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  try {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    
    const params = {
      TableName: "DocumentMetadata",
      Item: {
        DocumentId: key,
        BucketName: bucket,
        UploadTime: new Date().toISOString(),
        Status: "PROCESSED"
      }
    };

    await docClient.send(new PutCommand(params));
    console.log(`[Success] Saved metadata for ${key} to DynamoDB`);
    
    return { statusCode: 200, body: "Success" };
  } catch (error) {
    console.error(`[Error] Failed to process document:`, error);
    throw error;
  }
};