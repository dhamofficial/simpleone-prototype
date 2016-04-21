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

}]);
(function(){
        var $button = $("<div id='source-button' class='btn btn-floating-mini btn-primary'><i class='md  md-developer-mode'></i></div>").click(function(){
          // Clean ripple
          $(this).parent().find('.mtr-ripple-wrapper').remove();
          $(this).parent().find('.mtr-btn').removeClass('mtr-btn');
          var html = $(this).parent().html();
          html = cleanSource(html);
          $("#source-modal pre").text(html);
          $("#source-modal").modal();
        });

        $('.bs-component [data-toggle="popover"]').popover();
        $('.bs-component [data-toggle="tooltip"]').tooltip();

        $(".bs-component").hover(function(){
          $(this).append($button);
          $button.show();
        }, function(){
          $button.hide();
        });

        function cleanSource(html) {
          var lines = html.split(/\n/);

          lines.shift();
          lines.splice(-1, 1);

          var indentSize = lines[0].length - lines[0].trim().length,
              re = new RegExp(" {" + indentSize + "}");

          lines = lines.map(function(line){
            if (line.match(re)) {
              line = line.substring(indentSize);
            }

            return line;
          });

          lines = lines.join("\n");

          return lines;
        }

      })();

$(function() {

      $('.btn, .dropdown-menu a, .navbar a, .navbar-panel a, .toolbar a, .nav-pills a, .nav-tabs a, .pager a, .pagination a, .list-group a').mtrRipple({live: true}).on('click', function(e) {
        e.preventDefault();
      });

      // Special case for checkbox / radio (no prevented event)
      $('input[type=radio], input[type=checkbox]').mtrRipple({live: true});

      // code snippet to add the valued class for input (for label positioning)
      $('.form-control').on('blur input', function() {
        var $this = $(this);
        var v = $(this).val();
        if (v && v != '') $this.addClass('valued');
        else $this.removeClass('valued');
      }).trigger('blur');

      // Navbar panel
      $('.navbar-panel').mtrPanel({toggle: '.toolbar .menu-toggle'});

      $('#topbar').mtrHeader();

      var $body = $('body');
      var $headerTitle = $('.header-title');
      $(window).on('scroll', function(e) {
        var top = $body.scrollTop();
        if (top > 275)
          $headerTitle.addClass('small')
        else
          $headerTitle.removeClass('small');
      });

    });
