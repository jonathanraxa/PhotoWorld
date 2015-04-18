

$(document).ready(function(){
	$("#button").click(function(){
		$("#images").empty(); // empties all the tags there are inside
		$.getJSON("https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=433ad000f6c8f565418ae4bc51864f91&user_id=90085976%40N03&format=json&nojsoncallback=1&auth_token=72157649645806663-ada04bff8c9b8a74&api_sig=2d1630adbfdf333df03789de394db87d",
		   {
			format: "json"}, 

			function(data){ 
				//debugger;
				//console.log(data); 

				alert(data.photos.photo[4].title);
			// $.each(data.items, function(i, item){

			// 	$('<img/>').attr("src", item.photos.photo.title).appendTo('#images');

			// 	if(i == 5) return false; 
			// });

		});
	});
});



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


