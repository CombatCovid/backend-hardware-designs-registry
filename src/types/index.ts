// Here i declare all the types and interfaces

export type Resolver = (parent: any, args: any, context: any, info: any) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
