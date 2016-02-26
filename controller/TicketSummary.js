 mainApp.controller('TicketSummary', function($scope,$location,$http,$rootScope) {
     //$scope.display="display";
     
     $scope.showfarebut1=true;
     $rootScope.back = {url:'#/TicketBooking'};
     /* gets the no of seats and price from ticket booking view*/
     $scope.seatCount=sessionStorage.getItem("seat_count");
     $scope.price=sessionStorage.getItem("price");
     
     /* total amount of no of seats selected by user */
     $scope.SubTotal=$scope.seatCount*$scope.price;
     
     /* collecting match,stadium name,time from sport controller */
      $scope.matchName=sessionStorage.getItem("match");
      $scope.stadiumName=sessionStorage.getItem("stadium");
      $scope.eventTime=sessionStorage.getItem("eventTime");
     
     /* forverding total amut, match name on payment gateway page */
     sessionStorage.setItem("totalamut",$scope.SubTotal);
     sessionStorage.setItem("matchname", $scope.matchName);
     
     
     
       $scope.change = function(object1) {
       if(object1){
           document.getElementById("fname").innerHTML=" ";
           document.getElementById("mail").innerHTML=" ";
           document.getElementById("mob").innerHTML="";
           document.getElementById("add").innerHTML="";
           document.getElementById("Postcode").innerHTML ="";
        }
           //else document.getElementById("fname").innerHTML="Please Enter your name";
      }
     
     /* Bolling Detail Validation */
     $scope.custvalidation=function(customer){
       // 
	 /* First name field validation */
	 var firstname=document.getElementById("fullName").value;//alert(firstname);
	 var patt=/^[a-zA-Z ]/;
     if(firstname==""){
         
         document.getElementById("fname").innerHTML="Please Enter your name";
         return false;
     }
	 else if(patt.test(firstname))
	 {
	   
     }	 
     else{
         document.getElementById("fname").innerHTML="Please Enter Character Only";
	  return false;
     }
    
         /* Email field validation */
     var email=document.getElementById("inputEmail").value;
	 var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
	 if(email==""){
          document.getElementById("mail").innerHTML="Please Enter Your Email ID";
         return false;
     }
     else if(pattern.test(email))
	 {   
		 
	    
		
     }
     else{
         document.getElementById("mail").innerHTML="Invalid Email Id";
         return false;
     }
        /* mobile number validation */
     var mob=document.getElementById("mobileNum").value;
	 var patt=/^\d{10}$/;
     if(mob==""){
         document.getElementById("mob").innerHTML="Please Enter Your Mobile No";
	    return false;
     }
	 else if(patt.test(mob))
	 {
	   
		 
    }
     else{
         document.getElementById("mob").innerHTML="Enter 10 Digit Mobile number Only";
	    return false;
     }
     
         /* address field validation */
     var address=document.getElementById("address").value;
	 var patt=/^[a-zA-Z]/;
     if(address==""){
         document.getElementById("add").innerHTML="Please Enter Your address";
         return false;
     }
	else if(patt.test(address))
	 {
		 
	     
	 }
    else{
        document.getElementById("add").innerHTML="Please Enter character only address";
        return false;
    }
         
    var PIN = document.getElementById("PIN").value;
         
       var pat1 =  /^([1-9])([0-9]){5}$/;
    if(PIN == "")
     {
        document.getElementById("Postcode").innerHTML = "Please Enter PIN";
        return false;
    }
    else if(!(pat1.test(PIN)))
     {
        document.getElementById("Postcode").innerHTML = "Please Enter six digit no Only";
        return false;
     }  
         
    $scope.customerId = [];
    $http({
    method: 'POST',
    url: 'http://localhost:9090/api/customerDetails',
     data: customer,
    headers: {
        'Content-Type': 'application/json'
    }}).then(function(result) {
           console.log("Result"+JSON.stringify(result));
           //console.log("Data"+JSON.stringify(result.data[1]));
             $scope.customerId = result.data[1];
             $scope.customerId[0];
             
             console.log("customerId"+JSON.stringify($scope.customerId[0]['@customerId']));
       }, function(error) {
           console.log(error);
       });
        
        // alert(JSON.stringify(customer));
         $location.path('/PaymentConfirnationScreen');
         
        
 }
     
 });