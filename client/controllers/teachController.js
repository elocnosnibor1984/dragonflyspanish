myApp.controller('teachController', function($scope,$location, $cookies, $routeParams, usersFactory, dummyFactory){
	
	console.log("routeParams: ", $routeParams.id);


	//check if user is logged in
	var user_id = $cookies.get('u_id');
 	console.log("u_id: ", user_id);
 	if(user_id){
 		usersFactory.getUser(user_id, function(data){
 			console.log("data from getUser: ", data);
 			if(data.user){
 				$scope.u = data.user;
 			// 	console.log("data before getting groups: ", data.user._id);
 			// 	dummyFactory.getGroups(data.user._id, function(data){
				// $scope.groups = data;
				// console.log("getGroups: ", data);
	// })

 			}
 			else{
 				$location.url('/login');
 			}
 		})
 	}
 	else{
 		$location.url('/login');
 	}




	var excercise_id;

	dummyFactory.getExerciseId($routeParams.id, function(data){
		console.log(data[0]._id);
		excercise_id = data[0]._id;
		$scope.excercise_id = data[0]._id;
	})

	$scope.goToExercises = function(){
		$location.url('/exercise/'+ excercise_id);
	}

	console.log('I am able to load my indexController along with my index partial');
})