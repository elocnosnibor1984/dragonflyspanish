myApp.controller('indexController', function($scope,$location, $cookies, dummyFactory, usersFactory){

	var user_id = $cookies.get('u_id');
 	if(user_id){
 		usersFactory.getUser(user_id, function(data){
 			if(data.user){
 				$scope.u = data.user;
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

	$scope.goToTeach = function(title,id){
		$location.url('/teach/'+title+"/"+id);
	}

	
})