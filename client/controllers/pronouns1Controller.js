myApp.controller('pronouns1Controller', function($scope, $routeParams, dummyFactory){
	
	var user_id = $cookies.get('u_id');
 	console.log("u_id: ", user_id);
 	if(user_id){
 		usersFactory.getUser(user_id, function(data){
 			console.log("data from getUser: ", data);
 			if(data.user){
 				$scope.u = data.user;

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