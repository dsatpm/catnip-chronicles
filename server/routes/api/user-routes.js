const router = require('express').Router();
const {
  createUser,
  getUser,
  login,
  startGame
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getUser);

router.route('/game').get(authMiddleware, startGame);

module.exports = router;