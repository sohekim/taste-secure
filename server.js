const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./Schema/typeDefs");
const resolvers = require("./Schema/resolver");
const mongoose = require('mongoose');

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });
    await mongoose.connect("mongodb+srv://soheekim:soheepassword@cluster0.dw1md.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongoose connected ...');

    let PORT = undefined;
    let baseUrl = undefined;
    console.log("process.env.Node_ENV is " + process.env.Node_ENV);
    if (process.env.Node_ENV === "production") {
        PORT = process.env.PORT || 31600;
        baseUrl = "http://cs-vm-04.cs.mtholyoke.edu";
    }
    // process.env.Node_ENV == development
    else {
        PORT = 4040;
        baseUrl = "http://localhost:";
    }

    await new Promise((resolve) => app.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at ${baseUrl}:${PORT}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);