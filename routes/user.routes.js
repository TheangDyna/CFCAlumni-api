const controller = require('./../controllers/user.controller');
module.exports = (app)=>{
    app.post('/api/v1/signup', controller.signup);
    app.post('/api/v1/signin', controller.signin);
    app.get('/api/v1/user', controller.getUser);
    app.put('/api/v1/user/:userId', controller.updateUser);
    app.delete('/api/v1/user/:userId', controller.deleteUser);
}