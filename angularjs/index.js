  // create the module and name it myApp
  var myApp = angular.module('myApp', ['ngRoute','ngFacebook','ui.bootstrap','ui.utils']);

  // configure our routes
  myApp.config(function($routeProvider,$facebookProvider) {
    $routeProvider

      // route for the home page
      .when('/', {
        templateUrl : 'pages/home.html',  
        pageTitle :"Home",
        controller  : 'homeCtrl'
      })

      // route for the order page
      .when('/order', {
        templateUrl : 'pages/order.html',
        pageTitle :"Order",
        controller  : 'orderCtrl'
      })

      // route for the about page
      .when('/about', {
        templateUrl : 'pages/about.html',
        pageTitle :"About",
        controller  : 'aboutCtrl'
      })

      // route for the contact page
      .when('/contact', {
        templateUrl : 'pages/contact.html',
        pageTitle :"Contact",
        controller  : 'contactCtrl'
      });

    $facebookProvider.setAppId('828635717193830').setPermissions(['email'],['user_birthday']);
  
  });

  //run myApp
  myApp.run(['$rootScope', '$window','$location', function($rootScope, $window,$location) {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $rootScope.$on('fb.load','$routeChangeSuccess', function(event, current, previous) {
      $rootScope.title = current.$$route.pageTitle;
      $window.dispatchEvent(new Event('fb.load'));
    });
  }])

  // create the controller and inject Angular's $scope
  myApp.controller('mainCtrl', ['$scope', '$facebook','$location', function($scope, $facebook,$l) {
    $scope.$on('fb.auth.authResponseChange', function() {
      $scope.status = $facebook.isConnected();
      if($scope.status) {
        $facebook.api('/me').then(function(user) {
          $scope.user = user;
        });
      }
    });
    $scope.userid = '850227338356519'
    $scope.loginToggle = function() {
    if ($scope.status) {
        $facebook.logout();
    } else {
        $facebook.login();
    }
    };


  }]);


  myApp.controller('navController',function ($scope, $location) 
  { 
      $scope.isActive = function (viewLocation) { 
          return viewLocation === $location.path();
      };
  });
  
  myApp.controller('homeCtrl', function($scope) {

  });

  myApp.controller('orderCtrl', function($scope) {
    $scope.message = 'เชิญสั่งรายการอาหารครับ';
  });

  myApp.controller('aboutCtrl', function($scope) {
    $scope.message = 'Look! I am an about page.';
  });

  myApp.controller('contactCtrl', function($scope) {
    //$scope.message = 'Contact us! ChickyChef by Q. This is just a demo.';
  });


