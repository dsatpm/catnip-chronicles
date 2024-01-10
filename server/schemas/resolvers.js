const { User } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },
        users: async (parent, { username }) => {
            return User.findOne({ username });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        addScore: async (parent, { username, score }) => {
            const updatedUser = await User.findOneAndUpdate(
                { username: username },
                { $inc: { userscore: score } },
                { new: true }
            );
            return updatedUser;
        },

}};

module.exports = resolvers;
