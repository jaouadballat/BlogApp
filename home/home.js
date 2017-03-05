'use strict';

angular.module('blogApp.home', ['ngRoute', 'firebase'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/home', {
				templateUrl : 'home/home.html',
				controller: 'HomeController'
			});
	}])

	.controller('HomeController', ['$scope', '$firebaseAuth', '$location', 'UserFactory',
	 function($scope, $firebaseAuth, $location, UserFactory){

		$scope.singIn = function(){
			$scope.auth = $firebaseAuth();
			$scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password)
				.then(function(){
					UserFactory.setUser($scope.user.email);

					$location.path('/welcome');
					$scope.showErrorMessage = false;

					console.log('success');
				}).catch(function(error){
					$scope.showErrorMessage = true;
					$scope.errorMessage = error.message;
				});

		}
	}])
	.factory('UserFactory', [ function () {
		var user = '';
	
		return {
			getUser: function(){
				return user;
			},
			setUser: function(value){
				user = value;
			}
		}
	}]);