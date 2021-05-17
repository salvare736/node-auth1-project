const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');

function restricted(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    next({ status: 401, message: 'You shall not pass!' });
  }
}

function checkUsernameFree(req, res, next) {
  const { username } = req.body;
  Users.findBy({ username })
    .then((users) => {
      if (users.length > 0) {
        next({ status: 422, message: 'Username taken' });
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    })
}

function checkUsernameExists(req, res, next) {
  const { username, password } = req.body;
  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) { // this step also verifies the password
        req.session.user = user;
        next();
      } else {
        next({ status: 401, message: 'Invalid credentials' });
      }
    })
    .catch(err => {
      next(err);
    })
}

function checkPasswordLength(req, res, next) {
  const { password } = req.body;
  if (password.length < 4) {
    next({ status: 422, message: 'Passwsord must be longer than 3 chars' });
  } else {
    next();
  }
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}
