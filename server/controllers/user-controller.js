const { User } = require('../models');

const { signToken } = require('../utils/auth');

module.exports = {

	async getUser({ user = null, params }, res) {
		const foundUser = await User.findOne({
			$or: [{ _id: user._id }, { username: user.username }],
		});

		if (!foundUser) {
			return res
				.status(400)
				.json({ message: 'Cannot find a user with this id!' });
		}
		res.json(foundUser);
	},

	async createUser({ body }, res) {
		const user = await User.create(body);

		if (!user) {
			return res.status(400).json({ message: 'Something is wrong!' });
		}
		const token = signToken(user);
		res.json({ token, user });
	},

	async login({ body }, res) {
		const user = await User.findOne({
			$or: [{ username: body.username }, { email: body.email }],
		});
		if (!user) {
			return res.status(400).json({ message: "Can't find this user" });
		}

		const correctPw = await user.isCorrectPassword(body.password);

		if (!correctPw) {
			return res.status(400).json({ message: 'Wrong password!' });
		}
		const token = signToken(user);
		res.json({ token, user });
	},

	async startGame({ user }, res) {
  // Check if the user is already in a game
  const currentGame = await Game.findOne({ user: user._id, status: 'in progress' });
  if (currentGame) {
    return res.status(400).json({ message: 'You are already in a game!' });
  }

  // Create a new game
  const game = await Game.create({
    user: user._id,
    state: gameState,
    status: 'in progress',
  });

  // Notify the user
  res.json({ message: 'Game started!', game });
}
};
