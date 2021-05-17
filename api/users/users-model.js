const db = require('../../data/db-config');

function find() {
  return db('users').select('user_id', 'username').orderBy('user_id');
}

function findBy(filter) {
  return db('users').where(filter).orderBy('user_id');
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {

}

/**
  resolves to the newly inserted user { user_id, username }
 */
function add(user) {

}

module.exports = {
  find,
  findBy,
  findById,
  add
}
