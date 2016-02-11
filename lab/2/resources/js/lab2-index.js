$(document).ready(function() {
	if (navigator.geolocation) {
   		navigator.geolocation.getCurrentPosition(function(position) {
   			success(position.coords.latitude, position.coords.longitude);
   		},failure,options);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});


function success (lati,longi) {
	var apiKey="8e3fa80ff52a1ae48b6ecd5943c6f4ba";
	var time;
	url = "https://api.forecast.io/forecast/" + apiKey + "/" + lati + "," + longi;
	$.ajax({
	    type: "GET",
	   	url: url,
	   	dataType: "jsonp",
	   	success: function(responseData, status){
	   		
	   	},
	   	//usual failure message
	   	error: function(xhr, ajaxOptions, thrownError) {
      		alert("There was a problem: "+xhr.status+" "+thrownError);
    	}
    })
}

function failure () {
	alert("Geolocation is not supported by this browser.");
}

	//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
function options () {
	enableHighAccuracy: true;
	timeout: 5000;
	maximumAge: 0;
}

function today () {
	var text;

	$("first").
}