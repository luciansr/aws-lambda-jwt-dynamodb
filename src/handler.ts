import { APIGatewayProxyHandler, CustomAuthorizerHandler, CustomAuthorizerResult } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';

const SECRET = 'your-256-bit-semyasdiaushcret';
const AUDIENCE = 'AUDIENCE';

// Policy helper function
const generatePolicy: (principalId: string, effect: any, resource: any) => CustomAuthorizerResult = (principalId, effect, resource) => {
  const authResponse: CustomAuthorizerResult = <CustomAuthorizerResult>{};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument: any = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne: any = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};


// Reusable Authorizer function, set on `authorizer` field in serverless.yml
export const auth: CustomAuthorizerHandler = (event, _, callback) => {
  console.log('event', event);
  if (!event.authorizationToken) {
    return callback('Unauthorized');
  }

  const tokenParts = event.authorizationToken.split(' ');
  const tokenValue = tokenParts[1];

  if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
    // no auth token!
    return callback('Unauthorized');
  }
  const options = {
    audience: AUDIENCE,
  };

  try {
    jwt.verify(tokenValue, SECRET, options, (verifyError, decoded : any) => {
      if (verifyError) {
        console.log('verifyError', verifyError);
        // 401 Unauthorized
        console.log(`Token invalid. ${verifyError}`);
        return callback('Unauthorized');
      }
      // is custom authorizer function
      console.log('valid from customAuthorizer', decoded);
      return callback(null, generatePolicy(decoded.sub, 'Allow', event.methodArn));
    });
  } catch (err) {
    console.log('catch error. Invalid token', err);
    return callback('Unauthorized');
  }
}


export const privateEndpoint: APIGatewayProxyHandler = async (_, __) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Private Endpoint',
      // input: event,
    }),
  };
}