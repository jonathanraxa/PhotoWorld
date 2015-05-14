/* Author: Jonathan Raxa */
var displayPhoto;
var getGeoLocation;

var locality;
var region;
var getPhotoInfo;
var contentString;
var getTag;

/* Photo information */
var username;
var title;
var description;
var dateTaken;

/* Get the lat and lng */
var newLat;
var newLon;

var infoWindow;
var apiKey = '0fd24d9d0411ede9c4d33d4c531bbc16';
var icon = 'https://9fbb502ccc8fe4116684f9d3b089fdf4cafd13d4-www.googledrive.com/host/0BxKqQx16djZ6fl9hYTAyYVhQRzc3dWMzZ3NzWmZpcmtXU3BON0JhLWQxNHg0b2did09KWnc/photo.png';

var publicPhotos = [];
var aPhoto = [];
var clearPhoto;
var setAllMap;
var deleteMarkers;
var i;
var addToSlide;
var photoNum;
var showMarkers;
var populateSlideShow;
var photoArray = [];
var playSlide;
var getTitle;
var setPlace;



var allLatlng = []; //returned from the API
var allMarkers = []; //returned from the API
var marketName = []; //returned from the API
var infowindow = null;
var pos;
var userCords;
var tempMarkerHolder = [];
var addComment;
var playSlidePhotoset;
var infoBubble;
var slideshowPhotoID = [];
var savedPhoto; 
var photoInfo = [];
var publicPhotoIDs = []; 
var photoInfoCount = 0; 
var urlObj; 
var stored;


/* USER DEFINED VARIABLES */
var search;
var min_upload_date;
var max_upload_date;
var tags;
var bbox;
var place_id;
var geo_context;
var number; 
var sort;
var toggleBounce; 
var toggleBounceOff;
/* Document Ready */
$(document).ready(function() {

    document.getElementById("links").style.display = 'none';

    if (localStorage) {
        console.log("LOCALSTORAGE OKAY");
    } else {
        console.log("LOCALSTORAGE FAIL");
    }




    /* Clears all the comment data from the LocalStorage */
    $("#deleteComments").click(function() {
        localStorage.clear();
        alert("Local Storage cleared");
    });

    /* Deletes all the markers/images that were searched 
    *  so that we can start the search over and re-initializes each
    *  variable to a null value 
    */
    deleteMarkers = function(){



        search = '';
        min_upload_date ='';
        max_upload_date = '';
        //tag = document.getElementById("tag").value;
        tags = '';
        bbox = '';
        place_id = '';
        geo_context = '';


         newLat = '';
         newLng = '';
         locality = '';
         region = '';

    }
   
    var userComment;
    addComment = function(photoID) {

        userComment = document.getElementById("textarea").value;
        document.getElementById("theComment").innerHTML = userComment;
        localStorage.setItem(photoID, userComment);
        console.log(photoID + " - " + userComment);
        userComment = null;
        console.log(localStorage.getItem(photoID));

        //                localStorage.comment=JSON.stringify(comment);
        //                var commentObj = JSON.parse(localStorage.comment);

    }

    /* Add selected photos to a slide show */
    
addToSlide = function(photoID) {
   $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
    function(data){


        // array of photo IDs
       slideshowPhotoID.push(photoID);
        
        savedPhoto = 'http://farm' + data.photo.farm + '.static.flickr.com/' + data.photo.server + '/' + data.photo.id + '_' + data.photo.secret + '_m.jpg';
        
      
            console.log("Photo ID: " + photoID + " added to slideshow");
            console.log("Total Added: " + slideshowPhotoID.length); 

            photoInfo.push(savedPhoto); 

         /* save the photo into localStorage with photo ID as the key and the 
         * img URL as the value 
         */
            localStorage.setItem("photoURL", JSON.stringify(photoInfo)); 

     

    });

      
    }

var placeID; 
    setPlace = function(place){

        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.places.find&api_key='+apiKey+'&query='+place+'&format=json&nojsoncallback=1',
            function(data){
                placeID = data.places.place[0].place_id; 
            })
            

    } 


    /* display the geo coordinates when you click on a photo - the Start of displaying on map*/
    createMarker = function(photoID) {

 //infoBubble.close(); 
                    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
                        function(data) {
                            try{
                                

                                newLat = data.photo.location.latitude;
                                newLng = data.photo.location.longitude; 

                               
                                var myLatlng = new google.maps.LatLng(newLat, newLng);

                            } catch(err){

                                console.log("Some location not available");
                            }

                            console.log(data);
                          
                            try {

                                username = data.photo.owner.username;
                                title = data.photo.title._content;
                                description = data.photo.description._content;

                            try{

                                region = data.photo.location.country._content;
                                locality = data.photo.location.region._content;

                            } catch(err) {
                                console.log("Region or Locality unavailable"); 
                            }

                                if (description == '') {
                                    description = 'N/A';
                                }
                                dateTaken = data.photo.dates.taken;
                                url = data.photo.urls.url[0]._content;

                                thePhoto = 'http://farm' + data.photo.farm + '.static.flickr.com/' + data.photo.server + '/' + data.photo.id + '_' + data.photo.secret + '_m.jpg';


                                 //console.log("# of tags: " + data.photo.tags.tag.length);
                                      // data.photo.tags.tag[k]._content
                                    
                                contentString =

                                    '<div id="content">' +
                                    '<h4 id="firstHeading" class="firstHeading">' + title + '</h4>' +
                                    '<div id="bodyContent">' +
                                    '<img src="' + thePhoto + '"style="height:17.0em; width:"100px; float:left; padding-right:10px;">' +
                                    '<br />' +
                                    '<div style="list-style: none; color:black; float:left;"> ' +
                                    '<p><b>User:</b> ' + username + '</p>' +
                                    '<p><b>Date/Time:</b> ' + dateTaken + '</p>' +
                                    '<p><b>Description:</b> ' + description + '</p>' +
                                    '<p><b>Location:</b> ' + locality + ', ' + region + '</p>' +
                                    '<p><b># Tags:</b> '+ data.photo.tags.tag.length +'</p>'+                                
                                    '<p><textarea id="textarea" placeholder="comment" style="width:200px;"></textarea></p>' +
                                    '<button id="addComment" onClick="addComment(' + photoID + ')">Add Comment</button>' +
                                    '<br />' +
                                    '<p><b>Comment:</b><div id="theComment"></div> "' + localStorage.getItem(photoID) + '"</p>' +
                                    '<p>Photo URL: <a href="' + url + '">' +
                                    '' + url + '</a></p> ' +
                                    '<button onClick="addToSlide('+photoID+')">Add to slideshow</button>'+
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                                        

                                 allMarkers = new google.maps.Marker({
                                    position: myLatlng,
                                    map: map,
                                    animation: google.maps.Animation.DROP,
                                    icon: icon,
                                    html: contentString
                                });

                           

                                //put all lat long in array
                                allLatlng.push(myLatlng);

                                //Put the marketrs in an array
                                tempMarkerHolder.push(allMarkers);

                                console.log("tempMarker: " +tempMarkerHolder.length);
                          
      var infoWindow = new google.maps.InfoWindow({
                                    content: contentString,
                                    maxWidth: 400,
                                    maxHeight: 150,
                                    arrowStyle: 2,
                                    borderRadius: 4,
                                    disableAutoPan: true,
                                    scrollwheel: true,
                                    borderColor: '#2c2c2c'
                                });
                             
// google.maps.event.addListener(marker, 'click', function() {
    
//     infoBubble = new google.maps.InfoWindow();
    
// });
                                google.maps.event.addListener(allMarkers, 'click', function() {

                                    // if (infoBubble) {
                                    //     infoBubble.close();
                                    // }
                                  //  infowindow.setContent(contentString);
                                    //if (infoBubble) infoBubble.close();
                                    //infoBubble = new google.maps.InfoBubble({content: contentString});
                                  // infoBubble.close(map); 
                                    infoWindow.open(map, this);
                                    map.panTo(myLatlng,this);


                                });


                            } catch (err) {
                                console.log(err);
                            }

                            //var markerCluster = new MarkerClusterer(map, markers);


                            console.log(allLatlng);
                            //  Make an array of the LatLng's of the markers you want to show
                            //  Create a new viewpoint bound
                            var bounds = new google.maps.LatLngBounds();
                            //  Go through each...
                            for (var i = 0, LtLgLen = allLatlng.length; i < LtLgLen; i++) {
                                //  And increase the bounds to take this point
                                bounds.extend(allLatlng[i]);
                            }
                            //  Fit these bounds to the map
                            map.fitBounds(bounds);
                        });

                              google.maps.event.addListener(allMarkers, 'click', toggleBounce);


        } 


// toggleBounce = function() {

//   if (allMarkers.getAnimation() != null) {

//     allMarkers.setAnimation(null);

//   } else {
//     allMarkers.setAnimation(google.maps.Animation.BOUNCE);

//     //  window.setTimeout(function() {
//     //   addMarker(allMarkers[i]);
//     // }, i * 200);
//   }

// }
// toggleBounceOff = function(){
//     if (allMarkers.getAnimation()){
//         allMarkers.setAnimation(null);
//     }
// }
    // function addTab() {
    //     var title = document.getElementById('tab-title').value;
    //     var content = document.getElementById('tab-content').value;

    //     if (title != '' && content != '') {
    //         infoBubble.addTab(title, content);
    //     }
    // }

    /* clears out the array so that we can add in a new set */
    clearPhoto = function() {
        publicPhotos = [];

    }


    /* Allows a user to put in their own User ID and Photoset */
    getUserID = function() {
        user_id = document.getElementById("userID").value;


    }
    getPhotosetID = function() {
        photoset_id = document.getElementById("photosetID").value;
    }


    
 


    /*
    Return the images from the photoset - user has to know the ID of the photoset prior to using
    */
    $("#photosetSubmit").click(function() {
        jQuery('#a-link').remove();

        // example userID and photosetID
        var userID = '90085976%40N03';
        var photosetID = '72157651980228016';

        getPhotosetID();
        getUserID();

        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + photosetID + '&user_id=' + userID + '&format=json&nojsoncallback=1',

            /* iterates through the defined photoset and pulls all the images from account */
            function(data) {
                var i = 0;

                for (; i < data.photoset.photo.length; i++) {

                    var tempID = data.photoset.photo[i].id;
                    var tempFarm = data.photoset.photo[i].farm;
                    var tempServer = data.photoset.photo[i].server;
                    var tempSecret = data.photoset.photo[i].secret;

                    aPhoto[i] = 'http://farm' + tempFarm + '.static.flickr.com/' + tempServer + '/' + tempID + '_' + tempSecret + '_m.jpg';
                    jQuery('<a href = ' + aPhoto[i] + '/>').attr('rel', 'lightbox').attr('id', 'photoset').attr('onClick', 'createMarker(' + tempID + ')').html($('<img/>').attr('src', aPhoto[i])).appendTo('#pics');
                    populateSlideShow(tempID, tempFarm, tempServer, tempSecret);

                }

                playSlidePhotoset();


              
            });

    });




    /* Initializes the variables of each filter input and returns
    *  a defined variable 
    */
    getSearch = function() {
        
        search = document.getElementById("search").value;
        min_upload_date = document.getElementById("min_upload_date").value; 
        max_upload_date = document.getElementById("max_upload_date").value;
        //tag = document.getElementById("tag").value;
        tags = document.getElementById("tags").value;
        //bbox = document.getElementById("bbox").value;
        place_id = placeID;
        console.log(place_id);
        geo_context = document.getElementById("geo_context").value;
        number = document.getElementById("number").value; 
        sort = document.getElementById("sort").value; 

    }

    


var search = '';
var min_upload_date = '';
var max_upload_date = '';
var tags = '';
var bbox = null;
var place_id = '';
var geo_context = '';
var sort = '';

$("#submit").click(function(){
    $("#pics").empty();
    
    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+apiKey+'&has_geo=1&format=json&nojsoncallback=1',
        {   

          
            text: ''+search+'',
            tags: ''+tags+'',
            min_upload_date: ''+min_upload_date+'', 
            max_upload_date: ''+max_upload_date+'', 
         
            //bbox: 2,
            geo_context: ''+geo_context+'',
            sort:''+sort+'',
            per_page:''+number+''
            

        },function(data){

              // if(place_id === undefined){
              //   place_id == null
              //   } else {
              //   place_id == placeID;
              //   }
            

                 var i;
                for (i = 0; i < data.photos.photo.length; i++) {

                    //for (i = 0; i < 50; i++){

                    var tempID = data.photos.photo[i].id;
                    var tempFarm = data.photos.photo[i].farm;
                    var tempServer = data.photos.photo[i].server;
                    var tempSecret = data.photos.photo[i].secret;

                    publicPhotoIDs[i] = tempID; 

                    console.log("# of photos: " + data.photos.photo.length); 
                    publicPhotos[i] = 'http://farm' + tempFarm + '.static.flickr.com/' + tempServer + '/' + tempID + '_' + tempSecret + '_m.jpg';
                    jQuery('<a href/>').attr('id', tempID).attr('onClick', 'createMarker(' + tempID + ')').html($('<img/>').attr('src', publicPhotos[i])).appendTo('#pics');
                    populateSlideShow(tempID, tempFarm, tempServer, tempSecret);
                }

                playSlide();

// .attr('onmouseover','toggleBounce()').attr('onmouseleave','toggleBounceOff()')
        });
});
    
    /* 
    *  Populate slideshow with the saved images by grabbing them from the localStorage first then
    *  telling the user that the saved photos are ready to be shown. With both populate methods, there is a hidden
    *  div tag that the photos links are populated in to allow the slide to play images from the DOM.
    */
    //var saveCount = 0; 
    populateSavedSlides = function() {


        photo = 'http://farm' + photoFarm + '.static.flickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '_m.jpg';
        for(var j = 0; j < photoArray.length; j++){
            jQuery('<a href=' + savedPhoto[j] + ' title="' + localStorage.getItem(savedPhoto[j]) + '" data-gallery/>').appendTo('#links');

        }

        
    }


   
    var count = 0;
    populateSlideShow = function(photoID, photoFarm, photoServer, photoSecret) {

        photo = 'http://farm' + photoFarm + '.static.flickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '_m.jpg';

        if (photoID !== -1) {
            photoArray.push(photo);
        }
        jQuery('<a href=' + photoArray[count] + ' title="' + localStorage.getItem(photoID) + '" data-gallery/>').appendTo('#links');
        count++;

    }



/* These next three methods allow for an <a href> to be hidden within the page so that 
* the button may work. Without this, the plugin won't be able to start the slide 
*/
    /* plays the slideshow of the photoset - link is hidden */
    playSlidePhotoset = function() {
        jQuery('<a href=' + aPhoto[0] + ' data-gallery/>').html("PLAY SLIDESHOW").appendTo('#imgHere');

    }
    /* plays the slideshow of the searched tag - link is hidden */
    playSlide = function() {
        jQuery('<a href=' + photoArray[0] + ' data-gallery/>').html("PLAY SLIDESHOW").appendTo('#imgHere');
    }
    /* plays the slideshow of the saved images - link is hidden */
    // playSaved = function(){
    //     jQuery('<a href=' + savedPhoto[0] + ' data-gallery/>').html("PLAY SLIDESHOW").appendTo('#imgHere');
    // }


    /* 
    * Plays the selected photos that were saved onto the local storage 
    * This is different than the other two because we want the photos that we had saved into
    * localStorage, not just what we got from Flickr API 
    */
    $('#playSaved').click(function(){

        var retrievedData = localStorage.getItem("photoURL");
        var URLS = JSON.parse(retrievedData);

        alert("Retrieving from local storage...");

        for(var i = 0; i < URLS.length; i++){

            console.log("URLS: " + URLS[i]);
            if(localStorage.getItem(photoID) === 'undefined'){
                localStorage.getItem(photoID) === '';
            }
            jQuery('<a href=' + URLS[i] + ' title="' + localStorage.getItem(photoID) + '" data-gallery/>').appendTo('#links');


        }

        jQuery('<a href=' + URLS[0] + ' data-gallery/>').html("PLAY SLIDESHOW").appendTo('#imgHere');

        
    })


    /*TODO: 
    * - check the coordinates and see if any of them are the same 
    * 
    */
     var lat;
     var lng; 
    /* show all the photos that were shown be the tag - make 50 limit */
    showMarkers = function() {

            console.log("Number of IDs: " + publicPhotoIDs.length); 
                               

                        
            for(var i = 0; i < publicPhotoIDs.length; i++){
               
                $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + publicPhotoIDs[i] + '&format=json&nojsoncallback=1',
                    function(data){

                        lat = data.photo.location.latitude;
                        lng = data.photo.location.longitude; 


                        var newLatLng = new google.maps.LatLng(lat, lng);



                        allMarkers = new google.maps.Marker({
                            position: newLatLng,
                            map: map,
                            icon: icon
                           // html: contentString
                        });



                                //put all lat long in array
                                allLatlng.push(newLatLng);

                                // console.log("allLatlng: " + allLatlng); 
                                // console.log("newLatLng: " + newLatLng); 

                                // console.log(allLatlng[i].A);
                                // console.log(allLatlng[i].F)

                               // console.log(allLatlng[i-1]);

                                if(allLatlng[i] == allLatlng[i-1]){
                                    console.log("OMG"); 
                                }

                                // console.log("Lat: " + allLatlng[0].A);
                                // console.log("Lng: " + allLatlng[0].F);

                     
                                // console.log(allLatlng[i].A);
                                // console.log(allLatlng[i].F);

                                //Put the marketrs in an array
                                tempMarkerHolder.push(allMarkers);

    
                                var infoWindow = new google.maps.InfoWindow({
                                    content: contentString,
                                    maxWidth: 400,
                                    maxHeight: 300,
                                    arrowStyle: 2,
                                    borderRadius: 4,
                                    disableAutoPan: true,
                                    scrollwheel: true,
                                    borderColor: '#2c2c2c'
                                });

                             

                                google.maps.event.addListener(allMarkers, 'click', function() {
                                    //infoWindow.setContent(contentString);
                                    //if (infoBubble) infoBubble.close();
                                    //infoWindow = new google.maps.InfoBubble({content: contentString});
                                    infoWindow.open(map, this);

                                });

                                


                    });

                
            }

                         // for(var j = 0; j < allLatlng.length; j++){
                                       
                                  
                         //        }

  // for(var k = 0; k < allLatlng.length; k++){
  //                                       if(allLatlng[k].A === newLatLng[j].A){
  //                                           console.log("Same: " + j); 
  //                                       }
  //                                   }


        } 



    var map;
    var markers = [];
    var markerCluster;

    function initialize() {
        // var startLatLng = new google.maps.LatLng(37.7699298, -122.4469157); // San Francisco
        var startLatLng = new google.maps.LatLng(0, 0);
        var mapOptions = {
            zoom: 2,
            minZoom: 2,
            maxZoom: 2,
            scrollwheel: false,
            center: startLatLng,
            animation: google.maps.Animation.DROP,

            streetViewControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_LEFT
            },

            panControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_LEFT
            },

            zoomControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_LEFT
            },

            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        // The map object
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);



  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
      setPlace(place.formatted_address); 

    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
    marker.setVisible(true);

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address);
    infowindow.open(map, marker);
  });



        //Start geolocation
        if (navigator.geolocation) {

            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            }

            function success(pos) {
                userCords = pos.coords;

                //return userCords;
            }

            // Get the user's current position
            navigator.geolocation.getCurrentPosition(success, error);
            //console.log(pos.latitude + " " + pos.longitude);
        } else {
            alert('Geolocation is not supported in your browser');
        }

    }





    /* Clears the local storage object*/
    function clearLocalStorage() {
        localStorage.clear();
    }




    google.maps.event.addDomListener(window, 'load', initialize);




}); // END