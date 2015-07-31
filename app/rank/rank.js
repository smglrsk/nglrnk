'use strict';

angular.module('myApp.rank', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rank', {
    templateUrl: 'rank/rank.html',
    controller: 'RankCtrl'
  });
}])






.controller('RankCtrl', ['$scope','$rootScope','$http','$location','$filter','ReposListHttpFactory','RepoContributorsHttpFactory','UserHttpFactory','CountReposHttpFactory','ContributorsService',function($scope,$rootScope,$http,$location,$filter,ReposListHttpFactory,RepoContributorsHttpFactory,UserHttpFactory,CountReposHttpFactory,ContributorsService) {

	 
	
  $scope.reposList=[];
	
  $scope.ii=0 ;
  $scope.iiLen=0 ;
  $scope.isDisabled = false ;
	var allRepos=false;
	var page = 0;
	var aaa = {} ;
	var per_page= 100;

	var orderBy = $filter('orderBy');


   $scope.contributors = ContributorsService.contributors;       

    console.log(ContributorsService.contributors) ;
    console.log(Object.keys($scope.contributors).length);
    console.log(Object.keys(ContributorsService.contributors).length);


   if (Object.keys($scope.contributors).length > 0 )
   {
     $scope.finished=true;
   }
   else
   {
      $scope.finished=false;
   }
                                     
    //staticticsFireUp();

    

                                     
                                        
   
   

   function staticticsFireUp()
   {

              
              $scope.isDisabled = true ;   //button disabled

              var processingMessage=setInterval(function () {toastr.info("Please wait...Data is being processed")}, 5000);


              toastr.info("Let's start the calculation processings! Please wait... ");


               CountReposHttpFactory("https://api.github.com/search/repositories?q=org:angular")  
              .success(function (data) { 
              
                          var per_page=100;
                          var pages=data.total_count ;

                          //toastr.info("We've got  <b>"+pages+ " </b>repositories to get through...");
                               
                          pages= Math.ceil(pages/per_page) ;

                          //console.log("pages= "+pages);

                        

                          var i=1;
                          for (i = 1; i <=  pages; i++) {


                                  //fetches repos list taking per_page at one iteration ( default per_page=100)
                                  // and builds repos list in $scope.reposList
                                  ReposListHttpFactory(i,per_page)
                                  .success(function (data) { 
                              
                                              var i=0;
                                              var len = Object.keys(data).length;
                                              
                                              
                                              for (i = 0; i < len; i++) {
                                                    $scope.reposList.push(data[i]);
                                              }
                                               
                                              
                                              var i=0;
                                              var len = Object.keys($scope.reposList).length;   //Three
                                              var repName="";
                                              $scope.iiLen=len;
                                              for (i = 0; i < len; i++) {
                                                                
                                                                      $scope.ii=i;
                                                                       repName =  $scope.reposList[i].name ;       
                                                                       RepoContributorsHttpFactory($scope.reposList[i].contributors_url)
                                                                           .success((function(i, len,repName,processingMessage) {
                                                                                 //.success(function (data) { 
                                                                                  return function(data) {
                                                                                    
                                                                                           copy2ContributorsModel(data, i, len,repName,processingMessage);
                                                                                           
                                                                                           if (i==(len-1))      
                                                                                           {
                                                                                           
                                                                                            ;
                                                                                           }  
                                                                                           
                                                                                     

                                                                                                                                            
                                                                                    
                                                                                 //});
                                                                                 } 
                                                                          })(i, len, repName,processingMessage));   

                                              };
                                        

                         
                                    }); 
                          };  //end for loop for (i = 1; i <= count; i++) {
                }); 
    


   }

             
     function JSONEmpty(obj){
     	
    	return !obj.length || 
           !obj.filter(function(a){return Object.keys(a).length;}).length;
		} 

	function copy2ContributorsModel(contributors,ind, cnt,repName,processingMessage){
    //toastr.info("Processing...");
		 //console.log("-----copy2ContributorsModel  "+ind+"/"+cnt);
       var i=0;
	   var len = Object.keys(contributors).length;
	   for (i = 0; i < len; i++) { 
             //toastr.warning("Processing contributor <b>"+contributors[i].login+ "</b>  - "+contributors[i].contributions+" contributions");
             if (!doesContributorsModelContainUser(contributors[i]))
              {
              	addUserToContributorsModel(contributors[i]);
              }
              else
              {
              	correctContributionsAttribute(contributors[i]);
              }
                                   
                                      
            													UserHttpFactory(contributors[i].url)
                                              .success((function(i, len,ind, cnt) {
                	 							   									 //.success(function (data) { 
                                                      return function(data) {


                              	 							   									  correctFollowersPublicReposPublicGistsAttributtes(data)	;

                                                                    //toastr.warning("Processing... "+data.login);   

                                                                                          if ((ind == (cnt-1))   &&  (i==(len-1)))
                                                                                           {
                                                                                                   toastr.clear; 
                                                                                                   clearInterval(processingMessage);
                                                                                                   toastr.clear;
                                                                                                   //toastr.success("Finished! "+data.login+" "+ind+"/"+cnt+" "+repName);        
                                                                                                   //console.log("Finished! "+data.login+" "+ind+"/"+cnt+" "+repName);                
                                                                                                   toastr.success("Finished!") ;
                                                                                                   
                                                                                                   $scope.finished=true;

                                                                                                   ContributorsService.setContributors($scope.contributors);
                                                                                                   $scope.isDisabled = false ;
                                                                                                   
                                                                                           }                             
                                                   


                	 							   									//});	
                                                     }
                                              })(i, len, ind, cnt));          
                	 							   								

                                   
                                                 

         


	   };
       
     
	}	
	
    function doesContributorsModelContainUser(user)
    { 
      //toastr.info("Processing...");
    	var isFound= false;
    	var i=0;
	   	var len = Object.keys($scope.contributors).length;
	   				for (i = 0; i < len; i++) { 
                         if( $scope.contributors[i].login === user.login)
                         {
                         	isFound = true;
                          //toastr.info("Processing... <b>"+$scope.contributors[i].login+"</b>");   
                         	break;
                         }	
	   				}	

    	return isFound;
    }
    function  addUserToContributorsModel(user)
    {
      //toastr.info("Processing...");
    	$scope.contributors.push(user);
    }


    function correctContributionsAttribute(user)
    {
      //toastr.info("Processing...");
    	var i=0;
	   	var len = Object.keys($scope.contributors).length;
	   				for (i = 0; i < len; i++) { 
                         if( $scope.contributors[i].login === user.login)
                         {
                         	$scope.contributors[i].contributions= $scope.contributors[i].contributions+user.contributions;
                         	//toastr.info("Processing... <b>"+$scope.contributors[i].login+"</b>");   
                         	break;
                         }	
	   				}	


    }

    function correctFollowersPublicReposPublicGistsAttributtes(user)
    {
      //toastr.info("Processing...");
    	var i=0;
	   	var len = Object.keys($scope.contributors).length;
	   				for (i = 0; i < len; i++) { 
                         if( $scope.contributors[i].login === user.login)
                         {
                         	//$scope.contributors[i].contributions= $scope.contributors[i].contributions+user.contributions;
                         	if (typeof $scope.contributors[i].followers === "undefined") {
 								   $scope.contributors[i].followers =0
							};
							if (typeof $scope.contributors[i].public_repos === "undefined") {
 								   $scope.contributors[i].public_repos =0
							};
							if (typeof $scope.contributors[i].public_gists === "undefined") {
 								   $scope.contributors[i].public_gists =0
							};
							if (typeof $scope.contributors[i].name === "undefined") {
 								   $scope.contributors[i].name =""
							};

							$scope.contributors[i].followers= user.followers;
							$scope.contributors[i].public_repos= user.public_repos;
							$scope.contributors[i].public_gists= user.public_gists;

							$scope.contributors[i].name= user.name;
              //toastr.info("Processing... <b>"+$scope.contributors[i].name+"</b>");   
                         	
                         	break;
                         }	
	   				}	


    }

	
	 $scope.onContributorClicked= function(contributor)
	 {
	 	
	 	
	 	$rootScope.login = contributor.login;
	 	
	 	$location.path( "/github/"+contributor.login+"/" );

	 }
	 $scope.onRefreshStatisticsClicked= function()
	 {
        $scope.finished=false;
	 	    $scope.contributors=[];
	 	    staticticsFireUp();
	 }
     //
      $scope.order = function(predicate, reverse) {
    			$scope.contributors = orderBy($scope.contributors, predicate, reverse);
  		};
  		$scope.order('name',false);

     //
    


     //

}]);