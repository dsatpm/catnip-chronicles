const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {
	// signup a new user
	signup: async (req, res) => {
		try {
			const { username, password } = req.body;
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new User({ username, password: hashedPassword });
			await user.save();
			res.status(201).json({ message: 'User registered successfully' });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// login existing user
	login: async (req, res) => {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username });

			if (!user) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}

			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}

			const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
				expiresIn: '1h',
			});
			res.status(200).json({ token });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

module.exports = authController;
