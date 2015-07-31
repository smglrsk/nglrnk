
angular.module('myApp.services', ['ngResource'])
    .factory('githubResource', function ($resource) {
        return $resource('https://api.github.com/:query/:user/:repo/:spec', {
            'query': 'users',
            'user': 'angular',
            'repo': 'repos',
            'spec': '',
            'callback': 'JSON_CALLBACK',
            'per_page': 100
        }, {
            'get': {
                'method': 'JSONP'
            }
        });
    })


     .factory('ReposListHttpFactory', function ($http) { 
    return function(page, per_page){
         return $http({
            method: 'GET',
            url: 'https://api.github.com/users/angular/repos',
            params: { page: page, per_page:per_page}
         });

    }
})


.factory('RepoContributorsHttpFactory', function ($http) { 
    return function(contributors_url){
         return $http({
            method: 'GET',
            url: contributors_url,
            
         });

    }
})

.factory('UserHttpFactory', function ($http) { 
    return function(url){
         return $http({
            method: 'GET',
            url: url,
            
         });

    }
})
//

.factory('CountReposHttpFactory', function ($http) { 
    return function(url){
         return $http({
            method: 'GET',
            url: url,
            
         });

    }
})


.factory('ContributorsService', function () { 
    var contributorsService = {} ;
        contributorsService.contributors = [] ;

         contributorsService.setContributors = function (value) {
               
                contributorsService.contributors = value;
                
            };



        return contributorsService;
})




    ;
