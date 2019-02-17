import { APIGatewayProxyHandler } from 'aws-lambda';

export const privateEndpoint: APIGatewayProxyHandler = async (_, __) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Private Endpoint',
      // input: event,
    }),
  };
}