import { APIGatewayProxyHandler } from "aws-lambda";
import * as jwt from 'jsonwebtoken';
const SECRET = 'your-256-bit-semyasdiaushcret';
const AUDIENCE = 'AUDIENCE';

export const getToken: APIGatewayProxyHandler = async (_, __) => {
  var token = jwt.sign({}, SECRET, {
    audience: AUDIENCE
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      token: token,
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      // input: event,
    }),
  };
}