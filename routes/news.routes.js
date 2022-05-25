const controller = require("./../controllers/news.controller");
const authJwt = require("./../middleware/authJwt");

module.exports = (app) =>{
    app.get('/alumni/v1/news',controller.getNews)
    app.post('/alumni/v1/news',controller.createNews)
    app.delete('/alumni/v1/news/:newsId',controller.deleteNews)
    app.put('/alumni/v1/news/:newsId',controller.updateNews)
    
}