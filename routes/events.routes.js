const controller = require("./../controllers/events.controller");

module.exports = (app) =>{
    app.get('/alumni/v1/events',controller.getEvents)
    app.post('/alumni/v1/events',controller.createEvents)
    app.delete('/alumni/v1/events/:eventId',controller.deleteEvents)
    app.put('/alumni/v1/events/:eventId',controller.updateEvents)

}