var mongoose = require('mongoose');
var sessions = require('client-sessions');
var usersDB = mongoose.model('usersDB');
var scoreDB = mongoose.model('scoreDB');
var questionGroupDB = mongoose.model('questionGroupDB');

var bcrypt = require('bcryptjs');

module.exports = (function() {
	return {
		register: function(req,res){
			console.log("got to register on backend controller", req.body);
			var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
			var user = new usersDB({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hash
			})
			user.save(function(err){
				if(err){
					var error= "Something bad happened, try again";
					if(err.code === 11000){
						var error = "That email is already taken";
					}
					
					res.json({cCode: false, error: error});
				}
				else{
					console.log("managed to begin saving user");
					questionGroupDB.find({}, function(err, result){
						if(err){
							console.log("err populating score: ", err);
						}
						else{
							console.log("adding score reference to user");
							for(var i=0;i<result.length; i++){
								console.log("creating lots of scores", i);
								var score = new scoreDB({
									right: 0,
									total: result[i]._questions.length,
									_user: user._id,
									_group: result[i]._id
								})
								console.log("score: ", score);
								score.save(function(saveError, savedScore){
									if(saveError){
										console.log("saveError: ", saveError);
									}
									else{
										console.log("savedScore: ", savedScore);
									}
									console.log("user: ", user, "score: ", score);
									user._scores.push(score._id);
									user.save(function(err, result){
										if(err){
											console.log(err);
										}
										else{
											console.log("result: ", result);
											res.json({cCode: true , msg: "You are registered. Please login"});
										}
									});
								})
								// console.log("user: ", user, "score: ", score);
								// user._scores.push(score._id);
							}
						}
						// res.json({cCode: true , msg: "You are registered. Please login"});
					})
					// user.save(function(err){
					// 	if(err){
					// 		console.log(err)
					// 	}
					// })
					// res.json({cCode: true , msg: "You are registered. Please login"});
				}
					})
			},

			getUser: function(req,res){
				console.log("on getUser function", req.params.id);
				usersDB.findOne({_id: req.params.id}, function(err, user){
					if(!user){
						res.json({cCode: false});
					}
					else{
						console.log("******* getting user data", user);
						res.json({user});
						// res.json({cCode: true, userData: user});
				}
				})
			},

			updateUser: function(req, res){
			console.log(req.body, "req.body.title\n\n\n\n\n");
			//does UserDB need a {} ?
			usersDB.findOne({_id: req.body.id}, function(err, user){
				if(!user){
					console.log("Something's very wrong on updateUser");
				}
				else{
					user.firstName = req.body.firstName;
					user.lastName = req.body.lastName;
					user.email = req.body.email;
					user.avatar = req.body.avatar;
					user.save();
					res.json(user);
				}
			})
		},

			login: function(req,res){
			console.log("got to login on backend controller", req.body);
			usersDB.findOne({email: req.body.email}, function(err, user){
				if(!user){
					res.json({cCode: false, error: "Invalid password or login"});
				}
				else{
					console.log("******* first else", user);
					if(bcrypt.compareSync(req.body.password, user.password)){
						res.json({cCode: true, id: user._id});
						// req.session.user = user;
						//res.redirect('/dashboard');
					}
					else{
						res.json({cCode: false, error: "Invalid password or login"});
						// res.render('login.jade', {error: "Invalide password or login"});
					}
				}
					})
				}
	}
})();