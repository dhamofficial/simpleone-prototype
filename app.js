var myapp= angular.module('ngapp',['ngRoute']);


myapp .config(['$routeProvider',  function($routeProvider) {
    $routeProvider.
      when('/ticket', {
        templateUrl: 'templates/ticket.html',
        controller: 'Controller1'
      }).
      when('/serviceticket', {
        templateUrl: 'templates/servicerequest.html',
        controller: 'Controller1'
      }).
    when('/project', {
        templateUrl: 'templates/project.html',
        controller: 'Controller1'
      }).
      otherwise({
        redirectTo: '/ticket'
      });
  }]);


  
myapp.directive('tplServiceMgmt', ['myutilities',function (utiles) {
    return {
        restrict: 'E',
        templateUrl: 'templates/tplServiceManagement.html',
        scope: {
            module:'=',
        },
        controller: ['$scope','$http',function ($scope,$http) {
           
            $scope.Save=function(){
                //call a webservice to save items
                
                $http.get("http://localhost/so-enterprise-webapi/views/Index ")
                    .then(function(response){ $scope.details = response.data; });
                
            }
            
            $scope.clear=function(){
                
            }
            
            $scope.GetList=function()
            {
                //to populate the list view
                console.log('first invoke');
                $http.get("http://localhost/so-enterprise-webapi/views/Index ")
                .then(function(response){ 
                    console.log('success');
                    $scope.details = response.data; 
                }
              ,function(){
              console.log('failure');      
                });
                console.log('invoke end');
            }
            
            $scope.GetList();
            
        }]
    }
}])

myapp.factory('myutilities',function(){
    
    var util={};
    util.GetList=function()
            {
                //to populate the list view
                
            }
    return util;
});

myapp.controller('Controller1',['$scope',function(sc){
    
    sc.title='AngularJS Training Session';
    sc.Ticket={}; 
    sc.selectedIndex=undefined;
    sc.TicketList=[];
    
    sc.SaveTicket=function(){
        console.log(sc.selectedIndex);
        if(sc.selectedIndex!=undefined){
            //edit
        }else{
        var ticketNo = sc.TicketList.length+1;
        var t = sc.Ticket;
        t.TicketNo = ticketNo;
        sc.TicketList.push(t);
        }
        sc.Ticket={};
        sc.selectedIndex=undefined;
    }
    
    sc.edit=function(selectedIndex)
    {
        sc.selectedIndex = selectedIndex;
        sc.Ticket = sc.TicketList[selectedIndex];
    }
    
    sc.delete=function(selectedIndex)
    {
         sc.TicketList.splice(selectedIndex, 1); 
    }
    
}])