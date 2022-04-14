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
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongoose connected ...');

    let PORT;
    let baseUrl;

    console.log("Running environment in " + process.env.NODE_ENV);

    if (process.env.Node_ENV === "prod") {
        PORT = process.env.PORT || 31600;
        baseUrl = "http://cs-vm-04.cs.mtholyoke.edu";
    } else {
        PORT = 4040;
        baseUrl = "http://localhost:";
    }

    await new Promise((resolve) => app.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at ${baseUrl}:${PORT}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);