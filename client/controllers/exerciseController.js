myApp.controller('exerciseController', function($scope, $sce, $location, $routeParams, $timeout, $cookies, ngAudio, dummyFactory, usersFactory){
	
	var i = 0;
	var wrongAns = [];
	var rightAns = [];
	var wordDelay = true;
	var shuffledArray;
	var sound;
	$scope.showTurnOffWordDelayButton = true;
	var problems;

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

	//Durstenfeld shuffle
	function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


	dummyFactory.getQuestions($routeParams.id, function(data){
		problems = data[0]._questions;
		console.log("data:", data[0].title);

		// $scope.show = data[0];

		$scope.title = data[0].title;
		shuffledArray = shuffleArray(data[0]._questions);
		console.log("shuffledArray", shuffledArray);
		$scope.problem = shuffledArray[i].question;
		$scope.answer = shuffledArray[i].answer;
		$scope.num = shuffledArray[i].num;
		sound = "sounds/" + shuffledArray[i].sound;
		$scope.audio = ngAudio.load(sound);
	})
// 	
// var problems = [
// 	{"q": "I", "a": "Yo", "num":1},
// 	{"q": "You (inf)", "a": "T&uacute;", "num":2},
// 	{"q": "He", "a": "&Eacute;l", "num":3},
// 	{"q": "She", "a": "Ella", "num":4}
// ];

	// console.log("problems: ", problems);
	

 //    var shuffledArray = shuffleArray(problems);
	
	
	// console.log("sees problem");
	// $scope.problem = shuffledArray[i].q;
	// $scope.answer = shuffledArray[i].a;
	// $scope.num = shuffledArray[i].num;

	// $scope.sound = ngAudio.load("sounds/hawaii.wav"); // returns NgAudioObject
	$scope.showAnswer = false;

	$scope.next = function(problem, answer, num){
		// console.log("problem, answer: ", problem, answer);

		var inWrongAns = false;
		console.log("wrongAns: ", wrongAns);
		for(var t=0; t<wrongAns.length; t++){
			console.log("in for loop", wrongAns[t], num);
			if(wrongAns[t][2] == num){
				inWrongAns = true;
			}
		}
		if(inWrongAns == false){
			var correct = [problem, answer];
			rightAns.push(correct);
		}


		// var prob = [problem, answer];
		// rightAns.push(prob);
		for(var m =0; m < shuffledArray.length-1; m ++){
		var temp = shuffledArray[m];
		shuffledArray[m] = shuffledArray[m+1];
		shuffledArray[m+1] = temp;
	}
		shuffledArray.pop();

		// console.log("shuffledArray: ", shuffledArray);
		if(shuffledArray.length > 0){
		console.log("shuffledArray: ", shuffledArray);
		$scope.problem = shuffledArray[0].question;
		$scope.answer = shuffledArray[0].answer;
		$scope.num = shuffledArray[0].num;
		sound = "sounds/" + shuffledArray[0].sound;
		$scope.audio = ngAudio.load(sound);
		$scope.showAnswer = false;
		}
		else{
			dummyFactory.saveReview({w: wrongAns, r:rightAns, t:$scope.title, g:$routeParams.id}, function(){
				console.log("returned from dummyFactory");
			})
			$location.url('/review');
		}
	}

	$scope.wrong = function(problem, answer, num){
		for(var m =0; m < shuffledArray.length-1; m ++){
		var temp = shuffledArray[m];
		shuffledArray[m] = shuffledArray[m+1];
		shuffledArray[m+1] = temp;
	}
		if(shuffledArray.length > 0){
		
		$scope.problem = shuffledArray[0].question;
		$scope.answer = shuffledArray[0].answer;
		$scope.num = shuffledArray[0].num;
		sound = "sounds/" + shuffledArray[0].sound;
		$scope.audio = ngAudio.load(sound);
		$scope.showAnswer = false;
		} else {
			console.log("There's an error at $scope.wrong line 63");
		}
		//Is below the reason why stuff keeps stacking up in "wrong"?
		var inWrongAns = false;
		console.log("**********wrongAns: ", wrongAns.length);
		for(var t=0; t<wrongAns.length; t++){
			console.log("8888888888888in for loop", wrongAns[t]);
			if(wrongAns[t][2] == num){
				console.log("checking wrongAns: ", wrongAns[t].num, num);
				inWrongAns = true;
			}
		}
		if(inWrongAns == false){
			var prob = [problem, answer, num];
			wrongAns.push(prob);
		}
	}

	console.log("sound: ", sound);
	// $scope.audio = ngAudio.load(sound);

	// "http://static1.grsites.com/archive/sounds/birds/birds007.wav"

	$scope.reveal = function(){
		
		if(wordDelay){
			$scope.audio.play();
			$timeout(function(){
			$scope.showAnswer = true;

			}, 500);
		}
		else{
			$scope.showAnswer = true;
			$scope.audio.play();
		}
		
	}

	$scope.wordDelayOff = function(){
		wordDelay = false;
		$scope.showTurnOffWordDelayButton = false;
	}

	$scope.wordDelayOn = function(){
		wordDelay = true;
		$scope.showTurnOffWordDelayButton = true;
	}
})