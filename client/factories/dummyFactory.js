myApp.factory('dummyFactory', function($http){

	var wrong = []

	var factory = {}

	var route = "";

	factory.getQuestions = function(id, callback){
		$http.get('/questions/'+ id).then(function(data){
			callback(data.data);
		});
	}

	factory.getGroups = function(user_id, callback){
		// console.log("*********getGroups", user_id);
		$http.get("/getGroups/"+ user_id).then(function(data){
			callback(data.data);
		});
	}

	factory.getQuestionGroupAt = function(title, callback){
		// console.log("*********getQuestionGroupAt", title);
		$http.get("/getQuestionGroupAt/"+ title).then(function(data){
			callback(data.data);
		});
	}

	factory.updateQuestion = function(update, callback){
		// console.log("*********getQuestionGroupAt", update);
		$http.post("/updateQuestion/", update).then(function(data){
			callback(data.data);
		});
	}

	factory.getGroupsToAddQuestion = function(callback){
		// console.log("*********getGroupsToAddQuestion");
		$http.get("/getGroupsToAddQuestion").then(function(data){
			callback(data.data);
		});
	}

	factory.getExerciseId = function(id, callback){
		// console.log("getExerciseId");
		$http.get('/exercises/' + id).then(function(data){
			callback(data.data);
		});
	}

	factory.saveReview = function(data,callback){
		wrong = data;
	}

	factory.getWrong = function(callback){
		callback(wrong);
	}

	factory.register = function(data, callback){
		$http.post('/register', data).then(function(result){
			callback(result);
		})
	}

	factory.login = function(data, callback){
		$http.post('/login', data).then(function(result){
			callback(result);
		})
	}

	// the info parameter below is the the dummy that we're trying to add into our database

	// I added a test for myself below. I'm passing both a body element as well a params element
	// I use this as an initial test that I can pass information to my backend.
	// Check out your server console and you should see the body and the value we pass through 
	// the url. 
	factory.addQuestion = function(info, callback){
		console.log("addQuestion Factory: ", info);
		$http.post('/addQuestion', info).then(function(data){
			if(data.error){
				callback(data);
			} else {
				// mongooses.push(data)
				callback(data);
			}
		})
	}
	factory.addQuestionGroup = function(info, callback){
		$http.post('/addQuestionGroup', info).then(function(data){
			if(data.error){
				callback(data);
			} else {
				// mongooses.push(data)
				callback(data);
			}
		})
	}

	factory.saveResults = function(data, callback){
		console.log("saveResults: ", data);
		$http.post('/saveResults', data).then(function(result){
			callback(result);
		})
	}

	return factory;
})