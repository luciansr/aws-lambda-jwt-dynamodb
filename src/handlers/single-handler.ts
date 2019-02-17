import { APIGatewayProxyHandler } from "aws-lambda";

export const hello: APIGatewayProxyHandler = async (_, __) => {

  var x = {teste: "asd"};

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...x,
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      // input: event,
    }),
  };
}