myApp.controller('logoutController', function($scope, $cookies, $location, $routeParams, dummyFactory){
	
	$cookies.remove('u_id');

	$location.url('/login');

	console.log('logoutController');
})