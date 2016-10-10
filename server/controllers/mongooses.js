var mongoose = require('mongoose');
var questionDB = mongoose.model('questionDB');
var userDB = mongoose.model('usersDB');
var scoreDB = mongoose.model('scoreDB');
var questionGroupDB = mongoose.model('questionGroupDB');

module.exports = (function() {
	return {

		addQuestion: function(req, res){
			console.log(req.body, 'THIS IS REQ BODY-addQuestion');
			question = new questionDB({question: req.body.question, answer: req.body.answer, num: req.body.num, _questionGroup: req.body._questionGroup, sound: req.body.sound});
			question.save(function(err, result){
				if(err){
						console.log(err);
						console.log('error creating a new post');
					} else {
						console.log("req.body._listId: ", req.body._questionGroup);
						questionGroupDB.findOne({_id: req.body._questionGroup}, function(err, group){
							console.log("***found the list for the video", group);
							group._questions.push(result._id);
							group.save(function(err){
								if(err){
									console.log("ERROR ADDING VIDEO TO LIST");
								}
								else{
									res.json(result);
								}
							})
						})
					}
			})
		},

		addQuestionGroup: function(req, res){
			console.log(req.body.questionGroup.title, "req.body.title\n\n\n\n\n");
			group = new questionGroupDB({title: req.body.questionGroup.title, module: req.body.questionGroup.module});
			group.save(function(err, result){
				if(err){
					console.log(err);
					console.log('error creating a new post');
				} else {
					console.log('this is our new list',result);
					res.json(result);

				}
			})
		},

		login: function(req,res){
			console.log("*********email - login*************", req.body.email);
			userDB.findOne({email: req.body.email}, function(err, user){
				console.log("************req.body.password*******", req.body.password);
				console.log("************user.password*******", user);
				if(!user){
					console.log("error: ", err);
					res.send({status:500, message: "Sorry, the user account does not exist. Please register", type:'internal'});
				}
				else if(user && req.body.password != user.password){
					console.log("second else if");
					res.send({status:500, message: "Password doesn't match our records", type:'internal'});
				}
				else{
					console.log("It's all good on login");
					res.send({status:200, message:"What up?", type:'internal'});
				}
			})
		},

		saveResults: function(req,res){
			console.log("***********req.body on saveResults: ", req.body);
			scoreDB.findOne({_user: req.body._user, _group: req.body._group}, function(err, score){
				// console.log("user.req.body.title: ", user.req.body.title);
				if(!score){
					newScore = new scoreDB(req.body);
					newScore.save(function(err,result){
						if(err){
							console.log(err);
							console.log('error creating a new post');
						} else {
							console.log('this is our new list',result);
							res.json(result);
						}
					})
				}
				else{
					score.right = req.body.right;
					score.total = req.body.total;
					score.save(function(err,result){
						if(err){
							console.log(err);
							console.log('error creating a new post');
						} else {
							console.log('this is our new list',result);
							res.json(result);

						}
					})
				}
			})
		},

		getGroups: function(req, res){
			console.log("at getGroups", req.params.id);
			scoreDB.find({_user: req.params.id}).populate('_group').exec(function(err, groups){
				if(err){
					console.log(err);
				} else {
					console.log("Groups****",groups);
					res.json(groups);
				}
			})
		},

		updateQuestion: function(req, res){
			console.log("at getGroups", req.body);
			questionDB.findOne({_id: req.body.id}, function(err, question){
				if(err){
					console.log(err);
				} else {
					console.log("question****", question);
					question.question = req.body.question;
					question.answer = req.body.answer;
					question.num = req.body.num;
					question.sound = req.body.sound;
					console.log("question ******", question);
					question.save(function(err, question){
						if(err){
							console.log(err);
						}
						else{
							res.json(question);
						}
					});
					
				}
			})
		},

		getQuestionGroupAt: function(req, res){
			console.log("at getQuestionGroupAt", req.params.title);
			questionGroupDB.find({title: req.params.title}).populate('_questions').exec(function(err, groups){
				if(err){
					console.log(err);
				} else {
					console.log("Groups****",groups);
					res.json(groups);
				}
			})
		},

		getGroupsToAddQuestion: function(req, res){
			console.log("at getGroupsToAddQuestion");
			questionGroupDB.find({}, function(err, groups){
				if(err){
					console.log(err);
				} else {
					console.log("Groups****",groups);
					res.json(groups);
				}
			})
		},

		getExercises: function(req, res){
			console.log("at getExercises");
			questionGroupDB.find({_id: req.params.id}, function(err, group){
				if(err){
					console.log(err);
				} else {
					console.log("Groups****",group);
					res.json(group);
				}
			})
		},

		getQuestions: function(req, res){
				console.log("***backend controller: getVideos", req.params.id);
				questionGroupDB.find({_id: req.params.id}).populate('_questions').exec(function(err, questions){
					if(err){
						console.log(err);
					} else {
						console.log("questions from getQuestions :" ,questions);
						res.json(questions);
					}
				})
			},
	}
})();