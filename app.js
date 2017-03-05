'use strict';


angular.module('blogApp', [
  'ngRoute',
  'blogApp.home',
  'blogApp.register',
  'blogApp.welcome',
  'blogApp.addPost'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {


  $routeProvider.otherwise({redirectTo: '/home'});
}]);
