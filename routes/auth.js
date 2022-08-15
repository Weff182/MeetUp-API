const Router = require('express');

const router = new Router();
const passport = require('passport');
require('../passport-setup');
const cookieSession = require('cookie-session');
const isLoggedIn = require('../middleware/isLoggedIn');

router.use(cookieSession({
  name: 'Maxim',
  keys: ['key1', 'key2'],
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => res.send('You are not logged in'));
router.get('/failed', (req, res) => res.send('You failed to login'));
router.get('/good', isLoggedIn, (req, res) => res.send(JSON.stringify({ token: req.user.token })));

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'api/auth/failed' }),
  (req, res) => {
    res.redirect('/api/auth/good');
  },
);

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/api/auth');
});

module.exports = router;
