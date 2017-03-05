"use strict"
angular.module('blogApp.addPost', ['firebase'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/addPost', {
				templateUrl: 'addPost/addPost.html',
				controller: 'AddPostController'
			})
	}])
	.controller('AddPostController', ['$scope', '$firebaseArray','$location','$firebaseAuth',
	 	function($scope, $firebaseArray, $location, $firebaseAuth){
            $scope.auth = $firebaseAuth();
        var firebaseUser = $scope.auth.$getAuth();

            if (firebaseUser) {
              var ref = firebase.database().ref();
                $scope.articles = $firebaseArray(ref);
                $scope.createPost = function(){
                    var title = $scope.article.title;
                    var description  =$scope.article.description;
                    $scope.articles.$add({
                        title : title,
                        description : description
                    }).then(function(success){
                        $scope.article.title = '';
                        $scope.article.description = '';
                        $scope.postForm.title.$setUntouched();
                        $scope.postForm.description.$setUntouched();
                        $location.path('/welcome');
                    }, function(error){
                        console.log(error);
                    });
                }
            } else {
              $location.path('/home');
            }
		
	}])