











/* Author: Jonathan Raxa */

var displayPhoto;
var createMarker;

var locality;
var region; 
var getPhotoInfo; 
var contentString;
var getTag;
var bindInfoWindow; 


/* Photo information */ 
var username;
var title;
var description; 
var dateTaken;

/* Get the lat and lng */
var newLat;
var newLon;

var infoWindow;

/* Document Ready */
$(document).ready(function(){




  /* Takes user to USER LOGIN at the FLICKR YAHOO page - if NOT already logged in */
//$('#sign_in').click(function(){
//   $.getJSON('https://api.flickr.com/services/rest/?method=flickr.auth.oauth.getAccessToken&api_key='+apiKey+'&format=json&nojsoncallback=1&auth_token='+FROB+'&api_sig='+api_sig+'',
// function(data){
//   console.log(data); 
// });

var oauthT; 
var oauthTS; 
var apiKey = '0fd24d9d0411ede9c4d33d4c531bbc16';

/* Allows users to sign-in and recieve an Oauth token */ 
$('#sign_in').click(function(){
OAuth.initialize('xNHSTIsum9Yfyk4bLHAvkO983Pg');
OAuth.popup('flickr').done(function(result) {

  console.log(result);


  oauthT =  result.oauth_token;
  oauthTS = result.oauth_token_secret; 

  api_sig = SHA1('api_key'+apiKey+'oauth_token='+oauthT);

  alert(api_sig); 

  getAccessToken(); 

  }); // end .done
}); // end '#sign_in'

function getAccessToken(){
var url = 'https://www.flickr.com/services/oauth/authorize?oauth_token='+oauthT+'';
request = new XDomainRequest();
request.open('GET', url);
request.onload = function() {
  callback(req.responseText);
};
request.send(data);
}

//var userEmail = prompt("Enter Email"); 
$("").click(function(){
$.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.findByEmail&api_key='+apiKey+'&find_email=jonathan_raxa%40yahoo.com&format=json&nojsoncallback=1',
  function(data){
    console.log(data); 
  });
});

/* Get user ID - Use this to get the user's ID to use for other methods */
$("#testUser").click(function(){
// var userName = prompt ("Enter username");
var userName = 'jonathan_raxa';  
$.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key='+apiKey+'&username='+userName+'&format=json&nojsoncallback=1',
  function(data){
    console.log(data); 
    console.log(userName); 
  });
});

  // $.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key='+apiKey+'&username='+userName+'&format=json&nojsoncallback=1',


    /* Testing USER LOGIN - currently NOT in production  */
    $("").click(function(){
  //$("#sign_in").empty(); // empties all the tags there are inside
  $.getJSON('https://api.flickr.com/services/rest/?method=flickr.test.login&api_key='+apiKey+'&format=json&nojsoncallback=1&auth_token=72157652053303902-5878d3c4131e4235&api_sig=b736b172694a8fab23cb68851c505287',
    function(data){
      alert(data.stat); 

    });
});


/* FORGET ALL THE ABOVE CODE */


var publicPhotos = []; 
var aPhoto = [];
var tag; 
var clearPhoto; 
var setAllMap;
var deleteMarkers;
var i; 
var addToSlide;
var createImage; 
var populateThumb;
var toggleBounce;
var getUserID;
var getPhotosetID;
var getIDs; 
var photoset_id; 
var user_id; 


/* clears out the array so that we can add in a new set */ 
clearPhoto = function(){
  publicPhotos = [];
}



/* Allows a user to put in their own User ID and Photoset */
getUserID = function(){
  user_id = document.getElementById("userID").value;
  console.log(user_id);


}
getPhotosetID = function(){
  photoset_id = document.getElementById("photosetID").value;
  console.log(photoset_id);
}



/*
Return the images from the photoset - user has to know the ID of the photoset prior to using
*/
$("#photosetSubmit").click(function(){
  jQuery('#a-link').remove();   

  // example userID and photosetID
  var userID = '90085976%40N03';
  var photosetID = '72157651980228016';

  getPhotosetID();
  getUserID();

  $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+apiKey+'&photoset_id='+photoset_id+'&user_id='+user_id+'&format=json&nojsoncallback=1',

  /*
    iterates through the defined photoset and pulls all the images from account
    */  
    function(data){
      

      var i; 
      for(i = 0; i < data.photoset.photo.length; i++){

        aPhoto[i] = 'http://farm' + data.photoset.photo[i].farm + '.static.flickr.com/' + data.photoset.photo[i].server + '/' + data.photoset.photo[i].id + '_' + data.photoset.photo[i].secret + '_m.jpg';
        
        jQuery('<a href = '+aPhoto[i]+'/>').attr('rel','lightbox').attr('id',data.photoset.photo[i].id).attr('dblclick','addToSlide('+i+')').html($('<img/>').attr('src',aPhoto[i])).appendTo('#pics');

      }

// .attr('onClick','createMarker('+data.photoset.photo[i].id+','+i+')')
    });

});

/* returns the tag of a type of photo we want to look for */ 
getTag = function(){
  //clearPhoto(); 
  tag = document.getElementById("search").value;
  //console.log(document.getElementById("search").value); 

}


function Photo(farm, server, photoID, secret,lat,lng){
  this.farm = farm; 
  this.server = server;
  this.photoID = photoID;
  this.secret = secret;
  this.lat = lat;
  this.lng = lng;
}



var publicPhotos = new Array();
var locations = [];

/* searches public photos with Geo data */ 
$("#submit").click(function(){
    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+apiKey+'&tags='+tag+'&has_geo=1&page=2&format=json&nojsoncallback=1',
      function(data){
      var i; 
      var addToSlide;

      var farm;
      var server;
      var photoID; 
      var secret; 
      var size = data.photos.photo.length; 
     


      // create an array of objects
      
 
      // populates the public photo object needed to create a photo 
      for(i = 0; i < size; i++){

  
        farm = data.photos.photo[i].farm;
        server = data.photos.photo[i].server;
        photoID = data.photos.photo[i].id;
        secret =  data.photos.photo[i].secret;

        publicPhotos[i] = new Photo(farm, server, photoID, secret);

        // populate the DOM 
        publicPhotos[i] = 'http://farm' + publicPhotos[i].farm + '.static.flickr.com/' + publicPhotos[i].server + '/' + publicPhotos[i].photoID + '_' + publicPhotos[i].secret + '_m.jpg';
        jQuery('<a href = '+publicPhotos[i]+'/>').attr('id',publicPhotos[i].photoID).attr('rel','lightbox').attr('title','my caption').attr('onClick','createMarker('+photoID+','+i+')').html($('<img/>').attr('src',publicPhotos[i])).appendTo('#pics');


     

      }

     

// .attr('onmouseover','addToSlide('+publicPhotos[i].photoID+')')

      })

})

$("#photo").dblclick(function() {
                alert( "Handler for .dblclick() called." );
                
          });


addToSlide = function(photoNum){
  console.log("hello"); 
  console.log("Photo: " + photoNum + " added to slideshow"); 

}






/* on hover, the photo will appear in a container on the side of the*/

//TODO: What should happen here is this method is called on hover 
// and then it appends to the div tag
/* on hover, the photo will appear in a container on the side of the page */
displayPhoto = function(photoNum){

jQuery('<img/>').attr('src', aPhoto[photoNum]).appendTo('#img').hide();

}


var marker; 
var map;
var markers = [];
var myLatlng;
var infos = [];

 


/* Create and display marker on specified coordinates */
createMarker = function(photoID,num){


$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key='+apiKey+'&photo_id='+photoID+'&format=json&nojsoncallback=1',
  function(data){


  
   try{ 
      newLat = data.photo.location.latitude;
      newLng = data.photo.location.longitude;
      locality = data.photo.location.locality._content;
      region = data.photo.location.region._content; 
    } catch(err) {
      alert("geolocation data unavailable");
    }
  


     // create a google maps marker object with new location coordinates
     // myLatlng = new google.maps.LatLng(newLat,newLng);
    //  addMarker(myLatlng);

    /* sets the contents of the info window */ 

    //var content = setPhoto(photoID);




    }); // end getJSON

$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key='+apiKey+'&photo_id='+photoID+'&format=json&nojsoncallback=1',
  function(data){
   
    var username = data.photo.owner.username;
    var title = data.photo.title._content;
    var description = data.photo.description._content; 
    if (description == ''){
      description = 'N/A';
    }
    var dateTaken = data.photo.dates.taken;
    var url = data.photo.urls.url[0]._content;

    var thePhoto = 'http://farm' + data.photo.farm + '.static.flickr.com/' + data.photo.server + '/' + data.photo.id + '_' + data.photo.secret + '_m.jpg';
    

  // Checks for local storage   
   if (localStorage) {
      console.log("LOCALSTORAGE OKAY"); 
    } else {
      console.log("LOCALSTORAGE FAIL"); 
    }


    var userComment = "A default comment";

    var comment = {
        comment:userComment
    }

    localStorage.comment=JSON.stringify(comment);

    var commentObj = JSON.parse(localStorage.comment);


    // stores the comment for that particular photo
    localStorage.setItem(photoID, userComment);

    //comment[photoID] = window.localStorage.getItem(photoID); 
    
    // clear the Local storage
    //localStorage.clear(); 

     contentString = 

   '<div id="content">'+
    '<h4 id="firstHeading" class="firstHeading">'+title+'</h4>'+
    '<div id="bodyContent">'+
    '<img src="'+thePhoto+'"style="height:17.0em; width:"100px; float:left; padding-right:10px;">'+
    '<ul style="list-style: none; color:black; float:left; padding-right:10px; "> ' +
      '<li><b>User:</b> '+username+'</li>'+
      '<li><b>Date/Time:</b> '+dateTaken+'</li>'+
      '<li><b>Description:</b> '+description+'</li>'+
      '<li><b>Location:</b> '+locality+', '+region+'</li>'+
      '<li><textarea placeholder="comment" style="width:200px;"></textarea></li>'+
      '<li><b>Comment:</b> '+comment.comment+'</li>'
    '</ul>'+
    '<p>Photo URL: <a href="'+url+'">'+
    ''+url+'</a> '+
    '</p>'+
    '</div>'+
    '</div>';

    

  })



var map;
var markers = [];

function initialize() {
   // var startLatLng = new google.maps.LatLng(37.7699298, -122.4469157); // San Francisco
   var startLatLng = new google.maps.LatLng(0,0); 
   var mapOptions = {
    zoom: 2,
    center: startLatLng,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };


// var infowindow =  new google.maps.InfoWindow({
//     content: contentString
// });

// marker = new google.maps.Marker({
//   position: myLatlng,
//   // s: google.maps.Animation.DROP,
//   // map: map,
//   // clickable: true,
//   // title: 'Click for more details'
// });

// marker.info = new google.maps.InfoWindow({
//   content: contentString
// });

// markers.push(marker);
// //map.panTo(myLatlng); 


// google.maps.event.addListener(marker, 'click', function() {
//   marker.info.open(map, this);
// });





} // end 




  


function setMarkers(map,lat,lng){

  var marker, i

  for (i = 0; i < 10; i++)
    {  


 latlngset = new google.maps.LatLng(newLat, newLng);

  var marker = new google.maps.Marker({  
          map: map, 
          title: "See here" , 
          position: latlngset  
        });


  map.setCenter(marker.getPosition());

  var infowindow = new google.maps.InfoWindow();
        
       
google.maps.event.addListener(marker,'click', (function(marker,contentString,infowindow){ 
        return function() {
        
        /* close the previous info-window */
       closeInfos();
        
           infowindow.setContent(contentString);
           infowindow.open(map,marker);
        
        /* keep the handle, in order to close it on next click event */
   infos[0]=infowindow;
        
        };
    })(marker,contentString,infowindow)); 

   } // end for

  }

function closeInfos(){
 
   if(infos.length > 0){
 
      /* detach the info-window from the marker ... undocumented in the API docs */
      infos[0].set("marker", null);
 
      /* and close it */
      infos[0].close();
 
      /* blank the array */
      infos.length = 0;
   }
}






   
   (function(window, google, mapster){


    var options = mapster.MAP_OPTIONS, 
    element = document.getElementById('map-canvas'),
    map = mapster.create(element, options); 

  

    var marker2 = map.addMarker({
      id:2,
      lat:37.791350,
      lng:-122.435883,
      content:'hi',
      icon: 'https://9fbb502ccc8fe4116684f9d3b089fdf4cafd13d4-www.googledrive.com/host/0BxKqQx16djZ6fl9hYTAyYVhQRzc3dWMzZ3NzWmZpcmtXU3BON0JhLWQxNHg0b2did09KWnc/photo.png'
    });
    
for(var i = 0; i < 40; i++){
    map.addMarker({
      id: 2,
      lat:37.781350+ Math.random(),
      lng:-122.485883+ Math.random(),
      content: 'contentString',
      icon: 'https://9fbb502ccc8fe4116684f9d3b089fdf4cafd13d4-www.googledrive.com/host/0BxKqQx16djZ6fl9hYTAyYVhQRzc3dWMzZ3NzWmZpcmtXU3BON0JhLWQxNHg0b2did09KWnc/photo.png'
    });


   var marker = map.addMarker({
      lat:37.781350 + Math.random(),
      lng:-122.485883 + Math.random(),
      content: 'contentString',
      icon: 'https://9fbb502ccc8fe4116684f9d3b089fdf4cafd13d4-www.googledrive.com/host/0BxKqQx16djZ6fl9hYTAyYVhQRzc3dWMzZ3NzWmZpcmtXU3BON0JhLWQxNHg0b2did09KWnc/photo.png'
    });
 }
    map.removeBy(function(marker){
      console.log(marker); 
      return marker.id === 2; 
    })
   


   }(window,google,window.Mapster));



 /* Clears the local storage object*/ 
function clearLocalStorage(){
  localStorage.clear(); 
}




//google.maps.event.addDomListener(window, 'load', initialize);






//}); // END




















