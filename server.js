const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./Schema/typeDefs");
const resolvers = require("./Schema/resolver");
const mongoose = require('mongoose');
const { devURL, prodURL } = require('./key');

async function startApolloServer(typeDefs, resolvers) {
    let PORT, baseURL, dbURL;

    if (process.env.NODE_ENV === "prod") {
        PORT = process.env.PORT || 31600;
        baseURL = "http://cs-vm-04.cs.mtholyoke.edu";
        dbURL = prodURL;
    } else {
        PORT = 4040;
        baseURL = "http://localhost";
        dbURL = devURL;
    }
    console.log("Running environment in " + process.env.NODE_ENV);

    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });
    await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongoose connected ...');

    await new Promise((resolve) => app.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at ${baseURL}:${PORT}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);