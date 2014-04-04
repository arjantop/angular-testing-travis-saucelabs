'use strict';

var angular = require('angular');
require('angular-route');

var app = angular.module('app', ['ngRoute', 'templates']);

app.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'src/app/view1.tpl.html',
      controller: 'MyCtrl1'
    }).when('/view2', {
      templateUrl: 'src/app/view2.tpl.html',
      controller: 'MyCtrl2'
    }).otherwise({redirectTo: '/view1'});
  }
]);

var MyCtrl1 = function($scope) {
  $scope.message = 'controller 1';
};

var MyCtrl2 = function($scope) {
  $scope.message = 'controller 2';
};

app.controller('MyCtrl1', ['$scope', MyCtrl1]);
app.controller('MyCtrl2', ['$scope', MyCtrl2]);
