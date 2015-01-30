  // create the module and name it myApp
  var myApp = angular.module('myApp', ['ngRoute','ngFacebook']);

  // configure our routes
  myApp.config(function($routeProvider,$facebookProvider) {
    $routeProvider

      // route for the home page
      .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'homeCtrl'
      })

      // route for the about page
      .when('/about', {
        templateUrl : 'pages/about.html',
        controller  : 'aboutCtrl'
      })

      // route for the contact page
      .when('/contact', {
        templateUrl : 'pages/contact.html',
        controller  : 'contactCtrl'
      });

    $facebookProvider.setAppId('828635717193830').setPermissions(['email'],['user_birthday']);
  
  });
  myApp.run(['$rootScope', '$window', function($rootScope, $window) {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    $rootScope.$on('fb.load', function() {
      $window.dispatchEvent(new Event('fb.load'));
    });
  }])

  // create the controller and inject Angular's $scope
  
  myApp.controller('mainCtrl', function($scope,$location){
        $scope.isActive = function(route) {
        return route === $location.path();
    };
  });
  
  myApp.controller('aboutCtrl', function($scope) {
    $scope.message = 'Look! I am an about page.';
  });

  myApp.controller('contactCtrl', function($scope) {
    $scope.message = 'Contact us! ChickyChef by Q. This is just a demo.';
  });

  myApp.controller('homeCtrl', ['$scope', '$facebook', function($scope, $facebook) {
    $scope.$on('fb.auth.authResponseChange', function() {
      $scope.status = $facebook.isConnected();
      if($scope.status) {
        $facebook.api('/me').then(function(user) {
          $scope.user = user;
        });
      }
    });

    $scope.loginToggle = function() {
      if($scope.status) {
        $facebook.logout();
      } else {
        $facebook.login();
      }
    };

  }]);

