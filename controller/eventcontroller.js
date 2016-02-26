    mainApp.controller('eventcontroller', function($scope,$location,$http,MYSQL_URL) {
        

	 $.getJSON("http://jsonip.com?callback=?", function (data) {
  //  alert("Your ip: " + data.ip);
         $scope.ip1=data.ip;
});
       
    /* connection to Sport URL */
    $http.get(MYSQL_URL+"/sport")
    .then(function(response) {
           
         $scope.sport=response.data[0];
           
     });
        
    /* Function gets call from Upcoming Events and redirect to ticket booking page */
	    $scope.BookTicket=function(eventId){
		    
		    sessionStorage.setItem("eventId",eventId);
            $location.path("/TicketBooking");
		    
	    }
    /* Function Gets call from Sport and redirecting to sport page*/
      $scope.evevtSelection=function(sport){
          
          sessionStorage.setItem("sportId",sport.sport_id);
          $location.path('/sport');
      }
        
    });