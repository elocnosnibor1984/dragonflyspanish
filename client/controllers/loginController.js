myApp.controller('loginController', function($scope, $sce, $location, $cookies, ngAudio, dummyFactory, usersFactory){
	
	usersFactory.getMessage(function(data){
		$scope.msg = data;
	})

	$scope.register = function(){
	console.log($scope.registration);
	usersFactory.registration($scope.registration, function(data){
		console.log("data after registration: ", data);
		if(data.cCode){
			$scope.msg = data.msg;
			console.log("Message: ",$scope.msg);
			usersFactory.saveMessage(data.msg);
			$location.url('/login');
		}
		else{
			$scope.msg = data.error;
			usersFactory.saveMessage(data.msg);
		}
	})
}

$scope.loginUser = function(){
	console.log($scope.login);
	usersFactory.login($scope.login, function(data){
		console.log(data);
		if(data.cCode){
			$scope.msg = data.msg;
			$cookies.put('u_id', data.id);
			console.log("data.id", data.id);
			$location.url('/');
		}
		else{
			$scope.msg = data.error;
		}
	})
}

})