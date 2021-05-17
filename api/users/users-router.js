const router = require('express').Router();
const Users = require('./users-model');
const {
  restricted
} = require('../auth/auth-middleware');

router.get('/', restricted, (req, res, next) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(next);
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
    customMessage: 'Something went wrong inside the users router'
  });
});

module.exports = router;
