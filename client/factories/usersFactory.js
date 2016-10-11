myApp.factory('usersFactory', function($http){

	var factory = {};

	var message = "";

	factory.getUser = function(id, callback){
		// console.log("getUser: ", id);
		$http.get('/user/'+id).then(function(data){
			callback(data.data);
		});
	}

	factory.updateUser = function(userData, callback){
		// console.log("at updateUser");
		$http.post('/updateUser', userData).then(function(data){
			callback(data.data);
		})
	}

	factory.saveMessage =function(data){
		message = data;
		// console.log("Message on factory: ", data);
	}

	factory.getMessage =function(callback){
		callback(message);
		// console.log("Message on factory: ", message);
	}

	factory.registration = function(data, callback){
		// console.log("on usersFactory", data);
		$http.post('/register', data).then(function(data){
			callback(data.data);
		});
	}

	factory.login = function(data, callback){
		$http.post('/login', data).then(function(data){
			callback(data.data);
		});
	}

	factory.checkLogin = function(callback){
		$http.post('/login', data).then(function(data){
			callback(data.data);
		});
	}

	
	return factory;
})