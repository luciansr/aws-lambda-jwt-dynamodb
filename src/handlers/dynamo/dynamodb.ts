import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import * as AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const client: DocumentClient = new AWS.DynamoDB.DocumentClient(options);

export default client;