const UserController = require('../controllers/user-controller');
const { authenticate } = require('../config/jwt.config');
 
module.exports = app => {
    app.get('/api/users', authenticate ,UserController.findAllUsers);
    app.get('/api/users/:id', UserController.findOneSingleUser);
    app.get('/api/users/jwt/:id', UserController.findUserWithJWT)
    app.patch('/api/users/:id', UserController.updateExistingUser);
    app.post('/api/users', UserController.createNewUser);
    app.delete('/api/users/:id', UserController.deleteAnExistingUser);
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout)
}