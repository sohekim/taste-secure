const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./Schema/typeDefs");
const resolvers = require("./Schema/resolver");
const mongoose = require('mongoose');
const url = require('./key');

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });
    console.log(url);
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongoose connected ...');

    await new Promise((resolve) => app.listen({ port: 4040 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4040${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);