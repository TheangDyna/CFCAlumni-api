const UserModel = require('./user.model');
const ProductModel = require('./product.model');
const BookModel = require('./book.model');

let db = {};
db.users = UserModel;
db.products = ProductModel;
db.books = BookModel;


module.exports = db;