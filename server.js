const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require("./resolvers");

require('dotenv').config({ path: 'variables.env' });
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to mongo atlas database
mongoose
    .connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true}
        )
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

    
// Create Apollo/Graphql server using typedefs, resolver, and context object
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:{
        User, Post
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});