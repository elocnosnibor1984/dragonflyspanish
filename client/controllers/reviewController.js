myApp.controller('reviewController', function($scope, $sce, $location, $cookies, ngAudio, dummyFactory, usersFactory){
	var group;


	//check if user is logged in
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




	dummyFactory.getWrong(function(data){
		$scope.wrong = data.w;
		$scope.right = data.r;
		$scope.title = data.t;
		group = data.g;
	})

	$scope.saveResults =function(){
		var right = $scope.right.length;
		var tot = $scope.right.length + $scope.wrong.length;
		var user = $cookies.get('u_id');
		console.log("user: ", user);
		var packet = {
			right: right,
			total: tot,
			_user: user,
			_group: group
		}
		console.log("packet: ", packet);
		dummyFactory.saveResults(packet, function(data){
			$location.url('/');
		})
	}

	$scope.redo =function(){
		$location.url('/exercise/'+group);
	}

})