import { gql } from 'apollo-server-express';

export const designTypeDef = gql`
  type Design {
    _id: ID
    author: String
    gitRepo: String!
    imageUrl: String
    stars: Int
    # comment: [Comment]
    date: String
    version: Int
    license: String
    createdBy: User
  }

  #  type Comment {
  #   _id: ID
  # }

  extend type Query {
    getDesigns: [Design]
  }

  extend type Mutation {
    addDesign(author: String, gitRepo: String!, imageUrl: String, stars: Int, date: String, version: Int, license: String, createdBy: Int): Design!
  }
`;
