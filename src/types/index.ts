// Here i declare all the types and interfaces
import { Request } from 'express';
import { Redis } from 'ioredis';

export interface Session extends Express.Session {
  userId?: string;
}

export interface Context {
  redis: Redis;
  url: string;
  session: Session;
  req: ContextRequest;
}

export type Resolver = (parent: any, args: any, context: Context, info: any) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

interface RequestBody {
  operationName: null;
  variables: object;
  query: string;
}

export interface ContextRequest extends Request {
  session: Session;
  body: RequestBody;
}
