myApp.controller('logoutController', function($scope, $cookies, $location, $routeParams, dummyFactory){
	
	// console.log("routeParams: ", $routeParams.id);

	// dummyFactory.get_id("Pronouns1", function(data){
	// 	$scope.exercise_link = data;
	// })
	$cookies.remove('u_id');

	$location.url('/login');

	console.log('logoutController');
})