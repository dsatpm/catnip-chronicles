const router = require('express').Router();
const {
  createUser,
  getUser,
  login,
  startGame,
  bossBattle,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser);

router.route('/game').post(authMiddleware, startGame);

router.route('/boss-battle').post(authMiddleware, bossBattle);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getUser);

module.exports = router;