myApp.controller('profileController', function($scope,$location, $cookies, dummyFactory, usersFactory){

	var user_id = $cookies.get('u_id');
 	// console.log("u_id: ", user_id);
 	if(user_id){
 		usersFactory.getUser(user_id, function(data){
 			// console.log("data from getUser: ", data);
 			if(data.user){
 				data.user.password = "";
 				$scope.updateUser = data.user;
 			}
 			else{
 				$location.url('/login');
 			}
 		})
 	}
 	else{
 		$location.url('/login');
 	}

	
	$scope.submitUpdateUser = function(){
		console.log($scope.updateUser);
		// if(!$scope.updateUser.password){
		// 	$scope.updateUser.password = pwd;
		// }
		var userData = {
			id: user_id,
			firstName: $scope.updateUser.firstName,
			lastName: $scope.updateUser.lastName,
			email: $scope.updateUser.email,
			password: $scope.updateUser.password,
			avatar: $scope.updateUser.avatar
		}
		usersFactory.updateUser(userData, function(data){
			console.log("back from updating user");
			$location.url('/');
		})
	}
	
})