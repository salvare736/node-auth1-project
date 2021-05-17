const router = require('express').Router();
const Users = require('../users/users-model');
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
} = require('./auth-middleware');
const bcrypt = require('bcryptjs');

router.post('/register', checkPasswordLength, checkUsernameFree, (req, res, next) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(
    password,
    8
  );
  Users.add({ username, password: hash })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      next(err);
    })
});

router.post('/login', checkUsernameExists, (req, res, next) => {
  const { username } = req.body;
  res.json({ status: 200, message: `Welcome ${username}!` });
});

router.get('/logout', (req, res, next) => {
  if (req.session.user) {
    const { username } = req.session.user
    req.session.destroy(err => {
      if (err) {
        res.json({ message: `you cannot leave, ${username}` });
      } else {
        res.json({ message: 'logged out' });
      }
    })
  } else {
    res.json({ message: 'no session' });
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
    customMessage: 'Something went wrong inside the auth router'
  });
});

module.exports = router;
