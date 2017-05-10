console.log("js sourced");

var myApp=angular.module( 'myApp', [] );

myApp.controller( 'WhereMyPeeps', [ '$http', function( $http ){
  var vm = this;

  var records = [];

  vm.addRecord = function(){
    console.log("in add record route on client");

    var objectToSend ={
      name : vm.nameIn,
      location: vm.locationIn
    };

    $http({
      method: 'POST',
      url: '/testPost',
      data: objectToSend
    }).then ( function(response){
      console.log(response);
    });

    vm.nameIn ='';
    vm.locationIn='';
  };


  vm.getRecords = function(){
    console.log("in getrecords route on client");

    $http({
      method: 'GET',
      url: '/getRecords',
    }).then( function( response ){
      console.log(response.data);
      records.push(response.data);
      vm.allTheRecords = response.data;
      console.log( vm.allTheRecords );
    // }), function myError( response ){
    //   console.log( response.statusText );

      //some issue i dont understand here, so i took out the error stuff
    });
  };

  vm.getRecords();


}]);
