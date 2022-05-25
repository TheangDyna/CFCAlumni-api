const controller = require('./../controllers/book.controller');
module.exports = (app)=>{
    app.post('/api/v1/book', controller.book);
    app.get('/api/v1/book', controller.getBook);
    app.put('/api/v1/book/:bookId', controller.updateBook);
    app.delete('/api/v1/book/:bookId', controller.deleteBook);
}