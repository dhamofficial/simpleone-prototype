var myapp= angular.module('ngapp',['ngRoute','ngSanitize']);


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
            shown:'='
        },
        controller: ['$scope','$http',function ($scope,$http) {
            $scope.nav=function(mod){

            }
            $scope.save=function(){
                //call a webservice to save items

                var form=$scope.Form;
                $scope.list.push(form);
                localStorage.setItem('__tickets',JSON.stringify($scope.list));
                console.log('saved');
                $scope.clear();
                if(!$scope.createonemore)
                $('#divmodal1').modal('toggle');
                /*$http.post("http://localhost/so-enterprise-webapi/views/Index ")
                    .then(function(response){ $scope.details = response.data; });*/

            }

            $scope.clear=function(){
                $scope.Form={};
            }

            $scope.GetList=function()
            {
                var list = localStorage.getItem('__tickets');
                if(list && list.length>0)
                    $scope.list = JSON.parse(list);



                //to populate the list view
                /*$http.get("http://localhost/so-enterprise-webapi/views/Index ")
                .then(function(response){
                    console.log('success');
                    $scope.details = response.data;
                }
              ,function(){
              console.log('failure');
                });
                console.log('invoke end');*/
            }
            $scope.init=function(){
                $scope.list=[];
                $scope.clear();
                $scope.GetList();
                $scope.fn={save:$scope.save}
            }
            $scope.init();

        }]
    }
}])

.directive('tplServiceMgmtList', ['myutilities',function (utiles) {
    return {
        restrict: 'E',
        templateUrl: 'templates/tplServiceManagementList.html',
        scope: {
            module:'=',
            shown:'='
        },
        controller: ['$scope','$http',function ($scope,$http) {
            $scope.nav=function(mod){

            }

            $scope.GetList=function()
            {
                var list = localStorage.getItem('__tickets');
                if(list && list.length>0)
                    $scope.list = JSON.parse(list);
            }
            $scope.init=function(){
                $scope.GetList();
            }
            $scope.init();

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

}]);
