import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import * as path from 'path';
import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import * as glob from 'glob';
import { GraphQLSchema } from 'graphql';

export const genSchema = (): GraphQLSchema => {
  const pathComponents = path.join(__dirname, '../components');
  const graphqlTypes = glob.sync(`${pathComponents}/**/*.graphql`).map((x) => fs.readFileSync(x, { encoding: 'utf8' }));

  const resolvers = glob.sync(`${pathComponents}/**/resolvers.?s`).map((resolver) => require(resolver).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers)
  });
};
