'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.rank',
  'myApp.services',
  'myApp.version',
  'ngCookies',
  'ngSanitize'
]).
//config(['$routeProvider', function($routeProvider) {
config(['$routeProvider','$locationProvider', '$httpProvider', function($routeProvider,$locationProvider, $httpProvider) {  

  

   $routeProvider.when('/github/:user/', {
            templateUrl: 'partials/user-page.html'
        });
   $routeProvider.when('/github/:user/:repo/', {
            templateUrl: 'partials/repo-page.html'
        });	
   
  $routeProvider.otherwise({redirectTo: '/rank'});

 

}])   
.run(['$rootScope', '$injector', function($rootScope,$injector) { 
      
      //$rootScope.oauth.access_token='ffddd87bc8d3605dbecafffaa40e4a89514b57c8'; 
    
      $injector.get("$http").defaults.transformRequest = function(data, headersGetter) { 
          //if ($rootScope.oauth) headersGetter()['Authorization'] = "Bearer "+$rootScope.oauth.access_token; 
          
          //if ($rootScope.oauth) 
          //{
            
            headersGetter()['Authorization'] = "Bearer "+'ffddd87bc8d3605dbecafffaa40e4a89514b57c8'; 
          //}  

          if (data) 
          { return angular.toJson(data); 
          } 
      }; 
}]);  