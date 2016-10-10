myApp.controller('indexController', function($scope,$location, $cookies, dummyFactory, usersFactory){

	var user_id = $cookies.get('u_id');
 	// console.log("u_id: ", user_id);
 	if(user_id){
 		usersFactory.getUser(user_id, function(data){
 			// console.log("data from getUser: ", data);
 			if(data.user){
 				$scope.u = data.user;
 				// console.log("data before getting groups: ", data.user._id);
 				dummyFactory.getGroups(data.user._id, function(data){
				$scope.groups = data;
				var totRight = 0;
				var totTotal = 0;
				for(var i=0; i<data.length; i++){
					totRight += data[i].right;
					totTotal += data[i].total;
				}
				console.log("totRight: ", totRight);
				console.log("totTotal: ", totTotal);
				console.log(Math.floor((totRight/totTotal) * 100));
				$scope.progressBar = Math.floor((totRight/totTotal)*100) + "%";
				// console.log("getGroups: ", data);
	})

 			}
 			else{
 				$location.url('/login');
 			}
 		})
 	}
 	else{
 		$location.url('/login');
 	}

	// dummyFactory.getGroups(user_id, function(data){
	// 	$scope.groups = data;
	// 	console.log("getGroups: ", data);
	// })

	// $scope.progressBar = "25%";

	$scope.goToTeach = function(title,id){
		$location.url('/teach/'+title+"/"+id);
	}

	// console.log('I am able to load my indexController along with my index partial');

	
})