var myApp = angular.module('Myapp', ['ngRoute', 'ngMaterial', 'ngAudio', 'ngSanitize', 'ngCookies']);
// We instantiate our application and we inject ngrouter so that it's available
// and so that we can use it to set up our routes below. 



// this is our router. You can choose to set your controllers on the partial
// but I prefer to set my controllers here because it's cleaner
(function(){
	myApp.config(function($routeProvider){
		$routeProvider
			.when('/', 
			{
				controller: 'indexController',
				templateUrl: "partials/index.html"
			})
			.when('/login', 
			{
				controller: 'loginController',
				templateUrl: "partials/login.html"
			})
			.when('/registration', 
			{
				controller: 'loginController',
				templateUrl: "partials/registration.html"
			})
			.when('/main', 
			{
				controller: 'loginController',
				templateUrl: "partials/main.html"
			})
			.when('/profile', 
			{
				controller: 'profileController',
				templateUrl: "partials/profile.html"
			})
			.when('/logout', 
			{
				controller: 'logoutController',
				templateUrl: "partials/index.html"
			})
			.when('/exercise/:id', 
			{
				controller: 'exerciseController',
				templateUrl: "partials/exercise.html"
			})
			.when('/review', 
			{
				controller: 'reviewController',
				templateUrl: "partials/review.html"
			})
			.when('/addQuestion', 
			{
				controller: 'addQuestionController',
				templateUrl: "partials/addQuestion.html"
			})
			.when('/updateQuestions', 
			{
				controller: 'updateQuestionsController',
				templateUrl: "partials/updateQuestions.html"
			})

			.when('/teach/Pronouns1/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/pronouns1.html"
			})
			.when('/teach/Pronouns2/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/pronouns2.html"
			})
			.when('/teach/Pronouns3/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/pronouns3.html"
			})
			.when('/teach/Pronouns Review/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/pronouns_review.html"
			})
			.when('/teach/Intro to Conjugation/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/intro_to_conj.html"
			})
			.when('/teach/-ar, -er, -ir verbs/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/ar_er_ir.html"
			})
			.when('/teach/Present Tense -ar Conjugation/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/present_ar.html"
			})
			.when('/teach/Present Tense -er Conjugation/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/present_er.html"
			})
			.when('/teach/Present Tense -ir Conjugation/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/present_ir.html"
			})
			.when('/teach/Verbs & Conjugation Review/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/present_conj_review.html"
			})
			.when('/teach/el, la, los, las/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/el_la_los_las.html"
			})
			.when('/teach/un, una, unos, unas/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/un_una_unos_unas.html"
			})
			.when('/teach/Vocab - Nouns/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/nouns1.html"
			})
			.when('/teach/Plural Nouns/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/plural_nouns.html"
			})
			.when('/teach/Articles & Plural Nouns Review/:id', 
			{
				controller: 'teachController',
				templateUrl: "partials/art_nouns_review.html"
			})
	})
}());