const controller = require("./../controllers/storys.controller")

module.exports = (app)=>{
    app.get('/alumni/v1/storys',controller.getStorys)
    app.post('/alumni/v1/storys',controller.createStorys)
    app.delete('/alumni/v1/storys/:storyId',controller.deleteStorys)
    app.put('/alumni/v1/storys/:storyId',controller.updateStorys)
}