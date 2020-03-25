import { gql } from 'apollo-server-express';

export const userTypeDef = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    avatar: String
    joinDate: String
    favorites: [Post]
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): User!
  }
`;
