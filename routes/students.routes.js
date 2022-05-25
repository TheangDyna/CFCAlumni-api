const controller = require("./../controllers/students.controller")


module.exports = (app)=>{
    app.get('/alumni/v1/students',controller.getStudents)
    app.post('/alumni/v1/students',controller.createStudents)
    app.delete('/alumni/v1/students/:studentId',controller.deleteStudents)
    app.put('/alumni/v1/students/:studentId',controller.updateStudents)
    app.post('/alumni/v1/signin',controller.signin)
}