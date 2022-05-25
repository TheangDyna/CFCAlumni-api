const controllers = require ('./../controllers/statuss.controller')

module.exports = (app) =>{
    app.get('/alumni/v1/status',controllers.getStatuss);
    app.post('/alumni/v1/status',controllers.createStatuss);
    app.delete('/alumni/v1/status/:statusId',controllers.deleteStatus);
    app.put('/alumni/v1/status/:statusId',controllers.updateStatus)
}