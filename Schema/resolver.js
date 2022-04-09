const Post = require("../models/Post.model");

const resolvers = {
    Query: {
        hello: () => {
            return "Hello World";
        },
        // or use promises
        getAllPosts: async() => {
            return await Post.find();
        },
        getPost: async(_, { id }) => {
            return await Post.findById(id);
        },
    },

    Mutation: {
        createPost: async(parent, args) => {
            const { title, description } = args.post;
            const newPost = {
                title: title,
                description: description,
            };

            const post = await new Post(newPost).save();
            return post;
        },

        deletePost: async(_, { id }) => {
            await Post.findByIdAndDelete(id);
            return "Ok, post deleted";
        },

        updatePost: async(_, { id, post }) => {
            const { title, description } = post;
            const newPost = {
                title: title,
                description: description,
            };

            const updatedpost = await Post.findByIdAndUpdate(id, newPost, { new: true });
            return updatedpost;
        },
    },
};

module.exports = resolvers;