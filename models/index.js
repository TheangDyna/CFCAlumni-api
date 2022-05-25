const UsersModel = require('./users.model');
const NewsModel = require('./news.model');
const EventsModel = require('./events.model');
const StatussModel = require('./status.model');
const StorysModel = require('./story.model')
const StudentsModel = require('./students.model')

let db={}

db.users = UsersModel;
db.news = NewsModel;
db.events = EventsModel;
db.statuss = StatussModel;
db.storys = StorysModel;
db.students = StudentsModel;
module.exports=db