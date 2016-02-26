    mainApp.controller('TicketBookingCtrl', function($scope,$location,MYSQL_URL,$http,$rootScope) {
        $rootScope.back = {url:'#/sport'};
        /* collecting price from sport Controller */
       
        $scope.price=sessionStorage.getItem("price");
               
        /* select multiple seats */
        var total=10;
         var range = [];
            for(var i=1;i<=total;i++) {
              range.push(i);
            }
            $scope.range = range;
        
        
        /* multiple seat selection Ends*/
         /* Getting stand url to fetch stand data according to event id */
         var quantity_user1=[];
        
         $http.get(MYSQL_URL+"/stand"+"/"+sessionStorage.getItem("eventId"))
        .then(function(response) {
           
        $scope.stand=response.data[0];
           
        });
        /* Select seat label gets remove when user selects seats */
        $scope.hideseat=function(obj){
                        document.getElementById(obj.SeatCat).innerHTML="";
        }
        /* Calling TicketSummary function from BuyNow Button */
        $scope.TicketSummary=function(obj){
            $scope.quantity_user=obj.quantity_user;
            /* storing random tokenid in database */
            var tokenid=Math.round(Math.random()*100000000);
            var standData={"eventID":obj.event_id,"tokend":tokenid,"quantity":obj.seatCount,"attributeId":obj.attribute_id};
            if($scope.quantity_user==0){
                 document.getElementById(obj.attribute_id).innerHTML = "Sold Out";
            }
           else if(!obj.seatCount) {
                    document.getElementById(obj.SeatCat).innerHTML="Select seats";
                   
                } 
           else if($scope.quantity_user<obj.seatCount)
                {
                    document.getElementById(obj.SeatCat).innerHTML="only"+" "+$scope.quantity_user+" "+"seats avilable";
                }
            
            else{
                /* calling service on BuyNow Button*/
                $http({
                    method:'POST',
                    url:'http://localhost:9090/api/BuyNow',
                    data:standData,
                    headers:{
                         'Content-Type': 'application/json'
                    }
                }).then(function(result) {
           
            }, function(error) {
           console.log(error);
       });
                    /* Stored SeatCount and Price and used on Ticket Summary page */
                    sessionStorage.setItem("seat_count",obj.seatCount);
                    sessionStorage.setItem("price",$scope.price);
                    $location.path('/ticketSummary');
            }
        }
          /* ticketSummary function ends */
        
        
               
       
    });