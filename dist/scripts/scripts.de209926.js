"use strict";angular.module("swFrontApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/edges",{templateUrl:"views/edges.html",controller:"EdgesController",controllerAs:"edges"}).otherwise({redirectTo:"/"})}]),angular.module("swFrontApp").controller("MainCtrl",function(){}),angular.module("swFrontApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("swFrontApp").controller("EdgesController",function(){}),angular.module("swFrontApp").controller("NavigationController",["$scope","$location",function(a,b){a.isActive=function(a){var c=b.path().split("")[1];return c===a.split("")[1]}}]),angular.module("swFrontApp").directive("navbar",function(){return{restrict:"E",templateUrl:"views/navbar.html",controller:"NavigationController"}}),angular.module("swFrontApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="about">about</div>'),a.put("views/edges.html","<h1>Edges</h1>"),a.put("views/main.html",'<div class="main container-fluid"> <div class="row"> <div class="ingredients col-md-5 col-border"> <h1 class="text-center">Ingredients</h1> <ul class="list-group"> <li ng-repeat=""></li> </ul> </div> <div class="people col-md-5 col-md-offset-2 col-border"> <h1 class="text-center">People</h1> <ul class="list-group"> <li ng-repeat=""> <img class="img-circle" ng-src=""> <p>{{}}</p> </li> </ul> </div> </div> </div> <button class="btn btn-success btn-large center-block lets-go-button">Let\'s go</button> <div class="container-fluid"> <div class="row"> <img class="img-responsive center-block" src="images/map.078d7c85.jpeg"> </div> </div>'),a.put("views/navbar.html",'<nav class="navbar navbar-default"> <div class="container-fluid"> <!-- Brand and toggle get grouped for better mobile display --> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="app-title navbar-brand" href="#">Pot Luck</a> </div> <!-- Collect the nav links, forms, and other content for toggling --> <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> <ul class="nav navbar-nav navbar-right"> <li><a href="#">Sign in</a></li> <li><a href="#">Sign out</a></li> </ul> </div><!-- /.navbar-collapse --> </div><!-- /.container-fluid --> </nav>')}]);