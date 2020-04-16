/**
 * narration-sd
 * 
 * Here we are doing schema stiching for our resolver
 */

import { gql } from 'apollo-server-express';

export const postTypeDef = gql`
  type Post {
    _id: ID
    title: String!
    imageUrl: String!
    categories: [String]!
    description: String!
    createdDate: String
    likes: Int
    createdBy: User
    messages: [Message]
  }

  type Message {
    _id: ID
    messageBody: String!
    messageDate: String
    messageUser: User!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    addPost(title: String!, imageUrl: String!, categories: [String]!, description: String!, createdBy: Int!): Post!
  }
`;
