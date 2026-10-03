# Serverless Event-Driven Document Ingestion Pipeline

An offline, zero-cost AWS serverless architecture simulating a real-world document processing backend. Built using Docker and LocalStack to emulate AWS cloud services locally.

## Architecture
**S3 (Event Source) $\rightarrow$ Lambda (Compute) $\rightarrow$ DynamoDB (State)**
* When a file is uploaded to the S3 bucket, an `s3:ObjectCreated:*` event is emitted.
* The event triggers a Node.js Lambda function asynchronously.
* The worker parses the S3 object metadata and saves the transaction state into a DynamoDB table.

## Proof of Work
### 1. S3 Bucket Upload
### 2. Lambda Execution Logs
<img width="1635" height="900" alt="image" src="https://github.com/user-attachments/assets/35bd1c60-d492-4d55-9791-a71aeb544688" />


### 3. DynamoDB State Persistence
<img width="1650" height="581" alt="image" src="https://github.com/user-attachments/assets/b5986548-e674-414a-9d0f-e25a1e748bfb" />


## Local Deployment
1. Start the LocalStack container: `docker compose up -d`
2. Run the deployment script to provision resources.
3. Upload a file to trigger the pipeline: `aws --endpoint-url=http://localhost:4566 s3 cp test.txt s3://incoming-documents-bucket/`
