var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionGroupSchema = new mongoose.Schema({
	title: String,
    module: String,
    _questions: [{type: Schema.Types.ObjectId, ref: 'questionDB'}],
    _scores: [{type: Schema.Types.ObjectId, ref: 'questionGroupDB'}]
},{timestamps:true});
mongoose.model('questionGroupDB', questionGroupSchema);

var questionSchema = new mongoose.Schema({
     question: String,
     answer: String,
     sound: String,
     num: Number,
     _questionGroup: {type: Schema.Types.ObjectId, ref: 'questionGroupDB'}
});
mongoose.model('questionDB', questionSchema);

var userSchema = new mongoose.Schema({
     firstName: String,
     lastName: String,
     email: String,
     password: String,
     avatar: String,
     _scores: [{type: Schema.Types.ObjectId, ref: 'scoresDB'}],
     
}, {timestamps:true});

mongoose.model('usersDB', userSchema);

var scoreSchema = new mongoose.Schema({
     right: Number,
     total: Number,
     _user: {type: Schema.Types.ObjectId, ref: 'usersDB'},
     _group: {type: Schema.Types.ObjectId, ref: 'questionGroupDB'}
},{timestamps:true});
mongoose.model('scoreDB', scoreSchema);


// for userSchema after testing the login
//_scores: [{type: Schema.Types.ObjectId, ref: 'questionGroupDB'}]