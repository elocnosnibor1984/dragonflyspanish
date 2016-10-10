myApp.controller('addQuestionController', function($scope, dummyFactory){

	console.log("addQuestionController");
	dummyFactory.getGroupsToAddQuestion(function(data){
		$scope.groups = data;
		console.log(data);
})

	$scope.addQuestion = function(){
		// console.log($scope.q);
		var question1 = {
			question: "some girls",
			answer: "unas chicas",
			num: 24,
			sound: "drum.wav",
			_questionGroup: "57f81f6b8f3103166c2a8a51"
		}
		console.log(question1);
		dummyFactory.addQuestion(question1, function(data){
		console.log(data);
	})
	}

	$scope.addQuestionGroup = function(){
		console.log($scope.qg);
		dummyFactory.addQuestionGroup({questionGroup: $scope.qg}, function(data){
		console.log(data);
	})
	}

	
})