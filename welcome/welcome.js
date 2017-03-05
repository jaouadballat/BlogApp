'use strict';
angular.module('blogApp.welcome', ['firebase'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/welcome', {
				templateUrl: 'welcome/welcome.html',
				controller: 'WelcomeController'
			})
	}])
	.controller('WelcomeController', ['$scope','UserFactory', '$firebaseArray', '$location', '$firebaseAuth',
	 function($scope, UserFactory, $firebaseArray, $location, $firebaseAuth){
	 		$scope.auth = $firebaseAuth();
		var firebaseUser = $scope.auth.$getAuth();

		if (firebaseUser) {
		  console.log("Signed in as:", firebaseUser.uid);
			$scope.username = UserFactory.getUser();
			var ref = firebase.database().ref();
	    	$scope.articles = $firebaseArray(ref);

	    	$scope.showPost = function(id){
	    		$scope.article = $scope.articles.$getRecord(id);
	    	}
	 	   	$scope.updatePost = function(){
	 	   		$scope.articles.$save($scope.article).then(function(){
	 	   			$('#editPost').modal('hide');
	 	   		}, function(error){
	 	   			console.log(error);
	 	   		});
	 	   	}

	 	   	$scope.deletePost = function(){
	 	   		$scope.articles.$remove($scope.article).then(function(){
	 	   			$('#deletePost').modal('hide');
	 	   		}, function(error){
	 	   			console.log(error);
	 	   		})
	 	   	}
		} else {
		  $location.path('/home');
		}
	}])