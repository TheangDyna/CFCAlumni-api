const controller = require("./../controllers/users.controller")
const authJwt = require("./../middleware/authJwt")

module.exports = (app) =>{
    app.get('/alumni/v1/users',
    [authJwt.verifyToken,authJwt.isAdmin,authJwt.isTeacher],
    controller.getUsers,
    )
    app.post('/alumni/v1/users',controller.createUsers)
    app.post('/alumni/v1/users/signin',controller.signin)
    app.put('/alumni/v1/users/:usersId',controller.updateUsers)
    app.delete('/alumni/v1/users/:usersId',controller.deleteUsers)
}