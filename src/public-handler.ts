import { APIGatewayProxyHandler } from "aws-lambda";

export const hello: APIGatewayProxyHandler = async (_, __) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      // input: event,
    }),
  };
}

export const publicEndpoint: APIGatewayProxyHandler = async (_, __) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Public Endpoint',
      // input: event,
    }),
  };
}
