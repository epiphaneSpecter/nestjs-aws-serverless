import { Controller, Get, INestApplication, Module } from '@nestjs/common';
import { executionAsyncId } from 'async_hooks';
import { lambda } from './index';

@Controller()
export class HelloWorldController {

  @Get()
  getHello(): { msg: string } {
    return { msg: 'Hello World!' };
  }
}

@Module({
  controllers: [HelloWorldController],
})
export class HelloWorldModule {
}

const AWS_BATCH_WARMUP_EVENT = {
  "source": "serverless-plugin-warmup"
};

const AWS_HTTP_EVENT = {
  'resource': '/',
  'path': '/',
  'httpMethod': 'GET',
  'headers': {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': 's_fid=7AAB6XMPLAFD9BBF-0643XMPL09956DE2; regStatus=pre-register',
    'Host': '70ixmpl4fl.execute-api.us-east-2.amazonaws.com',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'upgrade-insecure-requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
    'X-Amzn-Trace-Id': 'Root=1-5e66d96f-7491f09xmpl79d18acf3d050',
    'X-Forwarded-For': '52.255.255.12',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
  },
  'multiValueHeaders': {
    'accept': [
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    ],
    'accept-encoding': [
      'gzip, deflate, br',
    ],
    'accept-language': [
      'en-US,en;q=0.9',
    ],
    'cookie': [
      's_fid=7AABXMPL1AFD9BBF-0643XMPL09956DE2; regStatus=pre-register;',
    ],
    'Host': [
      '70ixmpl4fl.execute-api.ca-central-1.amazonaws.com',
    ],
    'sec-fetch-dest': [
      'document',
    ],
    'sec-fetch-mode': [
      'navigate',
    ],
    'sec-fetch-site': [
      'none',
    ],
    'upgrade-insecure-requests': [
      '1',
    ],
    'User-Agent': [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
    ],
    'X-Amzn-Trace-Id': [
      'Root=1-5e66d96f-7491f09xmpl79d18acf3d050',
    ],
    'X-Forwarded-For': [
      '52.255.255.12',
    ],
    'X-Forwarded-Port': [
      '443',
    ],
    'X-Forwarded-Proto': [
      'https',
    ],
  },
  'queryStringParameters': null,
  'multiValueQueryStringParameters': null,
  'pathParameters': null,
  'stageVariables': null,
  'requestContext': {
    'resourceId': '2gxmpl',
    'resourcePath': '/',
    'httpMethod': 'GET',
    'extendedRequestId': 'JJbxmplHYosFVYQ=',
    'requestTime': '10/Mar/2020:00:03:59 +0000',
    'path': '/Prod/',
    'accountId': '123456789012',
    'protocol': 'HTTP/1.1',
    'stage': 'Prod',
    'domainPrefix': '70ixmpl4fl',
    'requestTimeEpoch': 1583798639428,
    'requestId': '77375676-xmpl-4b79-853a-f982474efe18',
    'identity': {
      'cognitoIdentityPoolId': null,
      'accountId': null,
      'cognitoIdentityId': null,
      'caller': null,
      'sourceIp': '52.255.255.12',
      'principalOrgId': null,
      'accessKey': null,
      'cognitoAuthenticationType': null,
      'cognitoAuthenticationProvider': null,
      'userArn': null,
      'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
      'user': null,
    },
    'domainName': '70ixmpl4fl.execute-api.us-east-2.amazonaws.com',
    'apiId': '70ixmpl4fl',
  },
  'body': null,
  'isBase64Encoded': false,
};

describe('HelloWorldModule', () => {

  describe('Express', () => {
    it('should return "Hello World!"', async (done) => {
      const handler = lambda(HelloWorldModule);
      const context = {};
      const callback = () => {};

      const res = await handler(AWS_HTTP_EVENT, context as any, callback);

      expect(res).toBeDefined();
      expect(res).toHaveProperty('body', '{"msg":"Hello World!"}');
      expect(res).toHaveProperty('headers.x-powered-by', 'Express');
      done();
    });
  });

  describe('Fastify', () => {
    it('should return "Hello World!" with binaryMimeTypes', async (done) => {
      const handler = lambda(HelloWorldModule, {
        engine: 'fastify',
        fastify: { binaryTypes: ['application/octet-stream'] },
      });
      const context = {};
      const callback = () => {};

      const res = await handler(AWS_HTTP_EVENT, context as any, callback);

      expect(res).toBeDefined();
      expect(res).toHaveProperty('body', '{"msg":"Hello World!"}');
      done();
    });

    it('should return "Hello World!"', async (done) => {
      const handler = lambda(HelloWorldModule, { engine: 'fastify' });
      const context = {};
      const callback = () => {};

      const res = await handler(AWS_HTTP_EVENT, context as any, callback);

      expect(res).toBeDefined();
      expect(res).toHaveProperty('body', '{"msg":"Hello World!"}');
      done();
    });
  });

  describe('Warmup Event', () => {
    it('should return "Lambda is warm!"', async (done) => {
      const handler = lambda(HelloWorldModule);
      const context = {};
      const callback = () => {};

      const res = await handler(AWS_BATCH_WARMUP_EVENT, context as any, callback);

      expect(res).toBeDefined();
      expect(res).toBe('Lambda is warm!');
      done();
    });
  });

  describe('onBeforeInit & onAfterInit', () => {
    it('should set before and after variables!"', async (done) => {

      let opt = 1;

      const nestjs = {
        onBeforeInit: (app: INestApplication) => {
          opt++;
          app.enableCors({
            origin: "localhost"
          });
        },
        onAfterInit: (app: INestApplication) => {
          if(opt != 2) {
            throw new Error("onBeforeInit not called");
          }
        }
      }

      const handler = lambda(HelloWorldModule, { engine: 'express', nestjs });
      const context = {};
      const callback = () => {};

      const res = await handler(AWS_HTTP_EVENT, context as any, callback);

      expect(res).toBeDefined();
      expect(res).toHaveProperty('body', '{"msg":"Hello World!"}');
      expect(res).toHaveProperty('headers.access-control-allow-origin', 'localhost');

      done();
    });
  });
});
