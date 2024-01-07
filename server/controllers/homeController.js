const homeController = {
	home: (req, res) => {
		res.status(200).json({ message: 'Welcome to Catnip Chronicles' });
	},
};

module.exports = homeController;