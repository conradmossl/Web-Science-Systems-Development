//same basis of code that we used in Intro.
	//#throwback
$(document).ready(function() {
	var tweetNumber = -1;
	$.ajax({
	    type: "GET",
	   	url: "tweetsFromTwitter.json",
	   	dataType: "json",
	   	success: function(responseData, status){

	   		//first sets up the ticker
	   		initialize(responseData, $("#ticker"));

	   		//creates variables for the first and last items of the ticker
	   			//variables so that they're not called multiple times
			var first = $("#ticker li").first();
	   		var last = $("#ticker li").last();
	   		//count for iteratinf
	   		var count = 6;

	   		//setInterval is freakin' godsend. Tried doing this wth timeOut and a for loop. Almost died of stress
   			setInterval(function(){
   				console.log("Reach")
   				//function for the actual movement of the tweets
   				transition(first,last);
   				//function for the behind-the-scenes adding and hiding of a tweet so that it can keep looping
				change(responseData[count],last);

				//iterate
   				first = first.next();
   				last = last.next();

   				//little function that adds the top tweets cover photo to the header
   				information(responseData[count]);

   				//loops and once it reaches the max continues over again
   					//should work, I actually tested it
   				if (count == responseData.length-1) {
   					count = 0;
   				}
   				else {
   					count++;
   				}
   				//interval for the function, set at 3000 milliseconds which is 3 seconds
   					//as per directions
   			}, 3000 );

	   	},
	   	//usual failure message
	   	error: function(xhr, ajaxOptions, thrownError) {
      		alert("There was a problem: "+xhr.status+" "+thrownError);
    	}
	})
	//this was a tricky little bit that took some searching to get done
		//http://stackoverflow.com/questions/11288516/jquery-mouseover-not-working-with-dynamically-created-element
		//because they are dynmically created event, normal mouseenter and such won't pick up on the elements
		//Instead, a type of listener had to be put on the UL parent
	$("ul").on("mouseenter", "li", function() {
			active(this);
	});
	$("ul").on("mouseleave", "li", function() {
			unactive(this);
	});
})


//generally smaller functions below. Yes, I know, why make a fuction for two lines of code?
//I think it help the look of the code itself and allowed me to make changes in one place rather than throughout a few lines

function initialize (data, element) {
	//takes first 6 tweets
	for(var i = 0;i < 6;i++){
		//pulls out all the right data and makes it into a variable
		var tweet = data[i];
		var timeObject = new Date(tweet.user.created_at);
		var timeString = timeObject.getMonth() + "/" + timeObject.getDate() + "/" + timeObject.getYear() +" at " + timeObject.getHours() + ":" + timeObject.getMinutes();
		var add = "<li class='list-group-item tweet'>" + tweet.user.name +  " (screenname: " + tweet.user.screen_name + ") thinks that their " + tweet.user.followers_count + " followers should know that on " +  timeString + ' they said "' + tweet.text + '"</li>';
		//adds the created list item onto the head element which is passed to the function
			//very important to use append here. Trust me, I tried everything else.
		element.append(add);
		//hides the last element
		if (i==5) {
			$("#ticker li").last().hide();
		}
		//error checking to make sure the first tweet could have the cover photo appear like the others
		if (i==1) {
			information(tweet);
		}
   	}
}

//not totally needed, but it helped me break up the transition organization
function transition (first, last) {
	exit(first);
	enter(last);
}


function exit (element) {
	//slideUp and slideDown proved to be very helpful and were exactly what I was looking for
	$(element).slideUp(2000);
	var temp = element;
	element = element.next()
	//removes the list item after a bit of waiting to make sure that there's no memory problems
	setTimeout(function(){
		temp.remove();
	}, 2000);
}

function enter (element) {
	//simple. Animation for the list item
	$(element).slideDown(2000);
}

//function to create list items
function change (tweet, last) {
	//variable manipulation
	var timeObject = new Date(tweet.user.created_at);
	var timeString = timeObject.getMonth() + "/" + timeObject.getDate() + "/" + timeObject.getYear() +" at " + timeObject.getHours() + ":" + timeObject.getMinutes();
	var add = "<li class='list-group-item tweet'>" + tweet.user.name +  " (screenname: " + tweet.user.screen_name + ") thinks that their " + tweet.user.followers_count + " followers should know that on " +  timeString + ' they said "' + tweet.text + '"</li>';
	//logic and syling to make sure the last list item was hidden
	last.after(add);
	last = last.next();
	last.hide();
}

//function to create a header with their cover photo as the background
function information (tweet) {
	$("header").css("background","url(" + tweet.user.profile_banner_url+ ")");
}

//bit o' bootstrap to make the list a bit more interactive
function active (element) {
	element.classList.add("active");
}

function unactive (element) {
	element.classList.remove("active");
}