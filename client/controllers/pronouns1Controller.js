myApp.controller('pronouns1Controller', function($scope, $routeParams, dummyFactory){
	
	// console.log("routeParams: ", $routeParams.id);

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

	dummyFactory.get_id("Pronouns1", function(data){
		$scope.exercise_link = data;
	})

	console.log('I am able to load my teachController along with my index partial');
})