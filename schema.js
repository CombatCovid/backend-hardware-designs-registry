const { gql } = require('apollo-server');

const typeDefs = gql`
  # Your schema will go here
  
  type Todo {
    task: String,
    completed: Boolean 
  }
  
  type QueryRoot{
    id: ID,
    getTodos:[Todo]
    completed: Boolean
  }
  
  schema {
    query: QueryRoot
  }
`;

module.exports = typeDefs;


