'use strict';

angular.module('blogApp.register', ['ngRoute', 'firebase'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/register', {
				templateUrl : 'register/register.html',
				controller: 'RegisterController'
			});
	}])

	.controller('RegisterController', ['$scope','$firebaseAuth', '$location' ,
		 function($scope, $firebaseAuth, $location){
		
		$scope.signUp = function(){
			$scope.create = $firebaseAuth();
			$scope.create.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
				.then(function(success){
					$location.path('/home');
					console.log('success');
				}).catch(function(error){
					$scope.showErrorMessage = true;
					$scope.errorMessage = error.message;
					console.log(error);
				});
		}
	}]); 