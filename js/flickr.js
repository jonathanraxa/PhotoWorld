


http://flickr.com/services/auth/?api_key=0fd24d9d0411ede9c4d33d4c531bbc16&perms=write&api_sig=47ddcd2305b095f3be2bc2230f07396c

"http://www.flickr.com/services/auth/?api_key=0fd24d9d0411ede9c4d33d4c531bbc16&perms=write&api_sig=c9383302b56102b8"

$(document).ready(function(){
	$("#sign_in").click(function(){
		//$("#sign_in").empty(); // empties all the tags there are inside
		$.getJSON("https://api.flickr.com/services/rest/?method=flickr.test.login&api_key=c54a7cc806d1c5b32132db40c066f49f&format=json&nojsoncallback=1&auth_token=72157652013067791-a0a3be55c33baba6&api_sig=ef29ea1654235c4f0a3248339ceb432d",
		   {
			format: "json"}, 

			function(data){ 
				//debugger;
				//console.log(data); 
				//alert("hi");
				// if(data.stat == "fail"){
				// 	alert("Login Failed, please Login to Flickr account");
				// } else if(data.user.stat[0] == "ok"){
			    		//alert("You are signed in as: " + "'" +data.user.username["_content"]+"'");
			 //   		alert("hey");
				// }
				alert(data.user["stat"]);
			// $.each(data.items, function(i, item){

			// 	$('<img/>').attr("src", item.photos.photo.title).appendTo('#images');

			// 	if(i == 5) return false; 
			// });

		});
	});
});


/*
	We're trying to return the photoset here
*/
$(document).ready(function(){
	$("#photoset").click(function(){

		$.getJSON("https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=8c07bcd273239811ed3ecb979ca095eb&photoset_id=72157633227782713&user_id=90085976%40N03&format=json&nojsoncallback=1&auth_token=72157651625066180-3a808345a23a1133&api_sig=8291a99deafd4287e68e0ec4112e0f01",
		   {
			format: "json"}, 

			function(data){ 
				//debugger;
				// if user == success
				// enter photo set
				// pull photos

			
				alert(data.photoset.photo[0].title);
			  		$.each(data.items, function(i, item){

			 			$('<img/>').attr("src", item.photoset.photo[i].title).appendTo('#images');

			 		if(i == 5) return false; 
			 });

		});
	});
});


// var person = prompt("Please enter your name", "Harry Potter");
// if (person != null) {
//     document.getElementById("demo").innerHTML =
//     "Hello " + person + "! How are you today?";
// }

/*
	Will check if the user signed in, this will 
	be done in the background process.
*/
// $(document).ready(function(){
// 	$("#sign_in").click(function(){
// 			$.getJSON("https://api.flickr.com/services/rest/?method=flickr.test.login&api_key=e8ccf1cc1cbbae254459539e1cbf049c&format=json&nojsoncallback=1&auth_token=72157649673760944-12f9842b056ca8e9&api_sig=cd1a1aaf7895f9ed0e71505c2467d23e",
// 	{
// 		format: "json",
// 		function(data){
// 			alert("data.user.username.content");
// 		}
// 	});
// 	});
// });


// function checkSignin(){
// 	$.getJSON("https://api.flickr.com/services/rest/?method=flickr.test.login&api_key=e8ccf1cc1cbbae254459539e1cbf049c&format=json&nojsoncallback=1&auth_token=72157649673760944-12f9842b056ca8e9&api_sig=cd1a1aaf7895f9ed0e71505c2467d23e",
// 	{
// 		format: "json",
// 		function(data){
// 			alert(data.user.username.content);
// 		}
// 	});
// }


/*
	Checks if the user has signed in or not. If not, then
	the function will ask for credentials and then download the 
	photos from his library. 
*/
// boolean ready = true; 
// $(document).ready(function(){
// 	$("#sign_in").click(function(){

// 		if(ready = false){
// 		var username = prompt("Username", "username");
// 		var password = prompt("Password", "password");
// 		alert("Downloading " + username +"'s"+ " photos");
// 		} else if (ready = true){
// 			checkSignin(); 
// 		}
	
// 	});

// });


	





// $(document).ready(function() {
// SC.get('/tracks/293', function(track) {
//   SC.oEmbed(track.permalink_url, document.getElementById('player'));
// });
// });

// $(document).ready(function(){
// 	$("#button").click(function(){
// 		var xhr = new XMLHttpRequest(); 
// 		xhr.open("GET", 
// 			"https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=433ad000f6c8f565418ae4bc51864f91&user_id=90085976%40N03&format=json&nojsoncallback=1&auth_token=72157649645806663-ada04bff8c9b8a74&api_sig=2d1630adbfdf333df03789de394db87d", 
// 			false); 

// 		xhr.send(); 

// 		console.log(xhr.status); 
// 		console.log(xhr.statusText + " good, you're logged on!!!"); 

// 		alert()



// 	});
// });




// $(document).ready(function(){
// 	$("#button").click(function(){
// 		var info = $flickr.photos.getInfo("16324929259");
// 		console.log(info); 
// 	})
// })

// $('#button').click(function() {
// 	var string = $('#string').val(); //taking value of string

// 	$.get('./php/reverse.php', { input: string }, function(data) {
// 		$('#feedback').text(data); 
// 	});

// });

// $(function () {
// 	$.ajax({
// 		type: 'GET',
// 		url: '/api/orders',
// 		sucess: function(orders){
// 			$.each(orders, function(i,order){
// 				$orders.append('<li>myorder</li>'); 
// 			});
// 		}
// 	});
// });

// $('#button').click(function(data){

// 	var string = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=7bdc0a857bd273658f68d9dddfd22079&photo_id=16324929259&format=json&nojsoncallback=1&auth_token=72157651529668479-53f7076fcde493ff&api_sig=727174b0132d14d963930ff6882bb6af');

// 	alert($_GET); 
// });


// var demo = '{"pets": { "name": "Jeffrey", "species": "Giraffe"}}';
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "http://www.codecademy.com/", false);
// // Add your code below!
// xhr.send(); 
// alert(xhr.status + " " +xhr.statusText);
// console.log(xhr.statusText); 


// var json = JSON.parse(demo);
// alert(json.name);



// function(data){

// //loop through the results with the following function
// $.each(data.photoset.photo, function(i,item){

//     //build the url of the photo in order to link to it
//    // var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg'

//     //turn the photo id into a variable
//     var photoID = item.id;

//     //use another ajax request to get the geo location data for the image
//     $.getJSON('http://api.flickr.com/services/rest/?&amp;method=flickr.photos.geo.getLocation&amp;api_key=' + 0fd24d9d0411ede9c4d33d4c531bbc16 + '&amp;photo_id=' + 16324929259 + '&amp;format=json&amp;jsoncallback=?',
//     function(data){

//         //if the image has a location, build an html snippet containing the data
//         if(data.stat != 'fail') {
//             pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
//         }

//     });

// }


