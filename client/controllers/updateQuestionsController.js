myApp.controller('updateQuestionsController', function($scope, dummyFactory){


$scope.getQuestionGroupAt = function(){
	console.log("getQuestionGroupAt", $scope.gqg.title);
		dummyFactory.getQuestionGroupAt($scope.gqg.title, function(data){
		$scope.questions = data[0];
		console.log(data[0]);
})
}

$scope.updateQuestion = function(id, question, answer, num, sound){
	var update = {
		id: id,
		question: question,
		answer: answer,
		num: num,
		sound: sound
	}
	console.log("update: ", update);
	dummyFactory.updateQuestion(update, function(data){
		console.log("Update complete!");
		console.log(data[0]);
})
}

})