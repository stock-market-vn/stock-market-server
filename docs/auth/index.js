const login = require('./login');
const register = require('./register');

module.exports = {
    '/users/register':{
        ...register,
    },
    '/users/login':{
        ...login,
    },
}