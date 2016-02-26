    /* sport Controller */
 mainApp.controller('SportCtrl', function($scope, $location, $http,MYSQL_URL,$rootScope) {
     /* bach button url to redirect to home page i.g. event page */
         $rootScope.back = {url:'#/'};
        
        /* BookNow function gets called from Sport View and redirecting to TicketBooking view */
            $scope.BookNow = function(event){
            /* Event Id gets from event controller */
                console.log(JSON.stringify(event));
                sessionStorage.setItem("eventId",event.event_id);
                $scope.dateformat=$scope.event.eventtime;
                sessionStorage.setItem("price",event.price);
                sessionStorage.setItem("match",event.name);
                sessionStorage.setItem("stadium",event.stadiumname);
                sessionStorage.setItem("eventTime",event.eventtime);
                                

                
            $location.path('/TicketBooking');
            
        }
            
        $http.get(MYSQL_URL+"/SingleSport"+"/"+sessionStorage.getItem("sportId"))
        .then(function(response) {
           
        $scope.event=response.data[0];
            
//        for(var i=0;i< $scope.event.length;i++)
//        {
//               //  console.log(JSON.stringify($scope.event[i].eventtime));
//                 $scope.dateformat=$scope.event[i].eventtime;
//                 sessionStorage.setItem("price",$scope.event[i].price);
//                 sessionStorage.setItem("match",$scope.event[i].name);
//                 sessionStorage.setItem("stadium",$scope.event[i].stadiumname);
//                 sessionStorage.setItem("eventTime",$scope.event[i].eventtime);
//                 
//        }
           /* showing more events  */
			var pagesShown = 1;
		    var pageSize = 3;
		    
		    $scope.paginationLimit = function(data) {
		        return pageSize * pagesShown;
		    };
        
		    $scope.hasMoreItemsToShow = function() {
		        return pagesShown < ($scope.event.length / pageSize);
		    };
        
		    $scope.showMoreItems = function() {
		        pagesShown = pagesShown + 1;       
		    };
        });
        
            
        

        });