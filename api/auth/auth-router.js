const router = require('express').Router();
const Users = require('../users/users-model');
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
} = require('./auth-middleware');

router.post('/register', checkPasswordLength, checkUsernameFree, (req, res, next) => {

});
/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */

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

module.exports = router;
