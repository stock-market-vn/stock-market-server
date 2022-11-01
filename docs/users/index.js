const getUsers = require('./getUsers');
const getUser = require('./getUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');

module.exports = {
  '/users':{
      ...getUsers,
  },
  '/users/{_id}':{
      ...getUser,
      ...updateUser,
      ...deleteUser
  }
}