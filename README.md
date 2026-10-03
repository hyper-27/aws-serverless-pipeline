# Serverless Event-Driven Document Ingestion Pipeline

An offline, zero-cost AWS serverless architecture simulating a real-world document processing backend. Built using Docker and LocalStack to emulate AWS cloud services locally.

## Architecture
**S3 (Event Source) $\rightarrow$ Lambda (Compute) $\rightarrow$ DynamoDB (State)**
* When a file is uploaded to the S3 bucket, an `s3:ObjectCreated:*` event is emitted.
* The event triggers a Node.js Lambda function asynchronously.
* The worker parses the S3 object metadata and saves the transaction state into a DynamoDB table.

## Proof of Work
### 1. S3 Bucket Upload
[Insert your terminal screenshot showing the s3 ls command and uploaded file here]

### 2. Lambda Execution Logs
[Insert your terminal screenshot showing the logs tail command with successful execution here]

### 3. DynamoDB State Persistence
[Insert your terminal screenshot showing the dynamodb scan command with the saved metadata here]

## Local Deployment
1. Start the LocalStack container: `docker compose up -d`
2. Run the deployment script to provision resources.
3. Upload a file to trigger the pipeline: `aws --endpoint-url=http://localhost:4566 s3 cp test.txt s3://incoming-documents-bucket/`
