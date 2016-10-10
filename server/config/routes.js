
var mongooseController = require('../controllers/mongooses.js');
var usersController = require('../controllers/usersController.js');

module.exports = function(app){
	app.post('/addQuestion', function(req, res){
		console.log("*********req.body from addQuestion route:", req.body);
		// console.log(req.params.test)
		mongooseController.addQuestion(req, res);
	})
	app.post('/addQuestionGroup', function(req, res){
		console.log(req.body);
		// console.log(req.params.test)
		mongooseController.addQuestionGroup(req, res);
	})

	app.post('/saveResults', function(req, res){
		console.log(req.body);
		// console.log(req.params.test)
		mongooseController.saveResults(req, res);
	})

	app.post('/updateUser', function(req, res){
		console.log(req.body);
		// console.log(req.params.test)
		usersController.updateUser(req, res);
	})

	app.post('/saveResults', function(req, res){
		console.log(req.body);
		// console.log(req.params.test)
		mongooseController.saveResults(req, res);
	})



	app.get('/getGroups/:id', function(req, res){
		console.log("getGroups route***************", req.params.id);
		// console.log(req.params.test)
		mongooseController.getGroups(req, res);
	})

	app.get('/getQuestionGroupAt/:title', function(req, res){
		console.log("getQuestionGroupAt route***************", req.params.title);
		// console.log(req.params.test)
		mongooseController.getQuestionGroupAt(req, res);
	})

	app.get('/getGroupsToAddQuestion', function(req, res){
		// console.log("getGroups route***************");
		// console.log(req.params.test)
		mongooseController.getGroupsToAddQuestion(req, res);
	})

	app.post('/updateQuestion', function(req, res){
		console.log("********************/updateQuestion: ", req.body);
		mongooseController.updateQuestion(req, res);
	})

	app.get('/questions/:id', function(req, res){
		console.log(req.body);
		console.log(req.params.test)
		mongooseController.getQuestions(req, res);
	})
	app.post('/groups', function(req, res){
		console.log("***************************************/groups: ", req.body);
		mongooseController.getGroups(req, res);
	})

	app.get('/exercises/:id', function(req, res){
		mongooseController.getExercises(req, res);
	})

	// ************************** Login/Registration ***************

	app.post('/register', function(req, res){
		console.log("register route: req.body", req.body);
		usersController.register(req, res);
	})
	app.post('/login', function(req, res){
		// console.log("login route: req.body", req.body);
		usersController.login(req, res);
	})
	app.get('/user/:id', function(req, res){
		console.log("getUser route: req.params", req.params.id);
		usersController.getUser(req, res);
	})
}