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

var publicPhotos = [];
var aPhoto = [];
var tag;
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



var marketId = []; //returned from the API
var allLatlng = []; //returned from the API
var allMarkers = []; //returned from the API
var marketName = []; //returned from the API
var infowindow = null;
var pos;
var userCords;
var tempMarkerHolder = [];
var addComment;



/* Document Ready */
$(document).ready(function() {
    document.getElementById("links").style.display = 'none';
                if (localStorage) {
                    console.log("LOCALSTORAGE OKAY"); 
                } else {
                    console.log("LOCALSTORAGE FAIL"); 
                }

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

            /*
              iterates through the defined photoset and pulls all the images from account
              */
            function(data) {
                var i = 0;
                for (; i < data.photoset.photo.length; i++) {
                    aPhoto[i] = 'http://farm' + data.photoset.photo[i].farm + '.static.flickr.com/' + data.photoset.photo[i].server + '/' + data.photoset.photo[i].id + '_' + data.photoset.photo[i].secret + '_m.jpg';
                    jQuery('<a href = ' + aPhoto[i] + '/>').attr('rel', 'lightbox').attr('id', 'photoset').attr('ondblclick', 'addToSlide(' + i + ')').html($('<img/>').attr('src', aPhoto[i])).appendTo('#pics');

                }
                // attr('dblclick','addToSlide('+i+')')
                // .attr('onClick','createMarker('+data.photoset.photo[i].id+','+i+')')
            });

    });

    // $( "#photoset" ).dblclick(function() {
    //      alert( "Handler for .dblclick() called." );

    //  });


    /* returns the tag of a type of photo we want to look for */
    getTag = function() {
        //clearPhoto(); 
        tag = document.getElementById("search").value;
        //console.log(document.getElementById("search").value); 

    }

    // adds photos to the array of slideshows
    addToSlide = function(photoNum) {
        var slideshowPhotos = [];
        slideshowPhotos.push(photoNum);
        var i = 0;
        for (; i < slideshowPhotos.length; i++) {
            console.log("Photo " + i + " added to slideshow");
        }

    }

    /* searches public photos with Geo data */
    $("#submit").click(function() {
        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + tag + '&has_geo=1&page=20&format=json&nojsoncallback=1',
            function(data) {
                var i;
                for (i = 0; i < data.photos.photo.length; i++) {

                    var tempID = data.photos.photo[i].id;
                    var tempFarm = data.photos.photo[i].farm;
                    var tempServer = data.photos.photo[i].server;
                    var tempSecret = data.photos.photo[i].secret;

                    publicPhotos[i] = 'http://farm' + tempFarm + '.static.flickr.com/' + tempServer + '/' + tempID + '_' + tempSecret + '_m.jpg';

                    jQuery('<a href/>').attr('id', tempID).attr('dblclick', 'addToSlide(' + tempID + ')').attr('onClick', 'createMarker(' + tempID + ')').html($('<img/>').attr('src', publicPhotos[i])).appendTo('#pics');

                    populateSlideShow(tempID, tempFarm, tempServer, tempSecret);


                }
                // .attr('dblclick','addToSlide('+i+')')

                playSlide();


            })


    })
 var imgTitle;
  getTitle = function(photoID) {
        
        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
            function(data) {
                imgTitle = data.photo.title._content;
                //console.log(imgTitle); 
                 
            });

        
    }

var count = 0;
populateSlideShow = function(photoID, photoFarm, photoServer, photoSecret) {

// $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
//     function(data){

        photo = 'http://farm' + photoFarm + '.static.flickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '_m.jpg';

        if (photoID !== -1) {
            photoArray.push(photo);
        }

        // imgTitle = data.photo.title._content;
        // console.log(imgTitle); 

        jQuery('<a href=' + photoArray[count] + ' title="TITLE HERE" data-gallery/>').appendTo('#links');
        count++;



      //  });

       

}
    

    playSlide = function() {
        jQuery('<a href=' + photoArray[0] + ' data-gallery/>').html("PLAY SLIDESHOW").appendTo('#imgHere');
        //jQuery('<a href=' + allLatlng[0] + ' data-gallery/>').html("PLAY SLIDESHOW").appendTo('#imgHere');

    }


    // attr('ondblclick','addToSlide('+i+')')
    showMarkers = function(photoID) {

            $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
                function(data) {

                    try {

                        newLat = data.photo.location.latitude;
                        newLng = data.photo.location.longitude;

                    } catch (err) {
                        alert("geolocation data unavailable");
                    }
                    var marker;
                    // create a google maps marker object with new location coordinates
                    var myLatlng = new google.maps.LatLng(newLat, newLng);

                    markers.push(marker);


                    addMarker(photoID);
                    // setPhoto(photoID);


                }); // end getJSON
        } // end getGeoLocation

/* Clears all the comment data from the LocalStorage */
$("#deleteComments").click(function(){
    localStorage.clear(); 
    alert("Local Storage cleared"); 
})

var comment = [];
var userComment; 
addComment = function(photoID){
   userComment = document.getElementById("textarea").value;

   localStorage.setItem(photoID, userComment);

   console.log(photoID + " - "+ userComment); 
   
   userComment = null; 
   // document.getElementById("comment").innerHTML = userComment;
   console.log(localStorage.getItem(photoID));

  //                localStorage.comment=JSON.stringify(comment);
  //                var commentObj = JSON.parse(localStorage.comment);


                //localStorage.clear(); 
 } 

    /* display the geo coordinates when you click on a photo - the Start of displaying on map*/
    createMarker = function(photoID) {
            $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
                function(data) {

                    try {
                        newLat = data.photo.location.latitude;
                        newLng = data.photo.location.longitude;
                        locality = data.photo.location.locality._content;
                        region = data.photo.location.region._content;
                    } catch (err) {
                        alert("Some or all geolocation data unavailable");
                    }



                    // create a google maps marker object with new location coordinates
                    var myLatlng = new google.maps.LatLng(newLat, newLng);
                    //addMarker(myLatlng);
                    //setPhoto(photoID);



                    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
                        function(data) {
                            console.log(data);
                            try {
                                username = data.photo.owner.username;
                                title = data.photo.title._content;
                                description = data.photo.description._content;
                                if (description == '') {
                                    description = 'N/A';
                                }
                                dateTaken = data.photo.dates.taken;
                                url = data.photo.urls.url[0]._content;

                                thePhoto = 'http://farm' + data.photo.farm + '.static.flickr.com/' + data.photo.server + '/' + data.photo.id + '_' + data.photo.secret + '_m.jpg';


                                contentString =

                                    '<div id="content">' +
                                    '<h4 id="firstHeading" class="firstHeading">' + title + '</h4>' +
                                    '<div id="bodyContent">' +
                                    '<img src="' + thePhoto + '"style="height:17.0em; width:"100px; float:left; padding-right:10px;">' +
                                    '<br>'+
                                    '<div style="list-style: none; color:black; float:left;"> ' +
                                    '<p><b>User:</b> ' + username + '</p>' +
                                    '<p><b>Date/Time:</b> ' + dateTaken + '</p>' +
                                    '<p><b>Description:</b> ' + description + '</p>' +
                                    '<p><b>Location:</b>' +
                                    '<p><textarea id="textarea" placeholder="comment" style="width:200px;"></textarea></p>' +
                                    '<button id="addComment" onClick="addComment('+photoID+')">Add Comment</button>' +
                                    '<p><b>Comment:</b> '+localStorage.getItem(photoID)+'</p>' +
                                    '<p>Photo URL: <a href="' + url + '">' +
                                    '' + url + '</a></p> ' +
                                    '</div>' +
                                    
                                    '</div>' +
                                    '</div>';



    //populateSlideShow = function(photoID, photoFarm, photoServer, photoSecret) {

                                allMarkers = new google.maps.Marker({
                                    position: myLatlng,
                                    map: map,
                                    html: contentString
                                })

                                //put all lat long in array
                                allLatlng.push(myLatlng);

                                //Put the marketrs in an array
                                tempMarkerHolder.push(allMarkers);

                                // counter++;
                                // console.log(counter);


                                // google.maps.event.addListener(allMarkers, 'click', function() {
                                //     infowindow.setContent(this.html);
                                //     infowindow.open(map, this);
                                // });

                                var infowindow = new google.maps.InfoWindow({
                                    content: contentString
                                });

                                google.maps.event.addListener(allMarkers, 'click', function() {
                                    //infowindow.setContent(contentString);
                                    infowindow.open(map, this);
                                    map.panTo(myLatlng,this);

                                });

                                // google.maps.event.addListener(allMarkers,'click',function(){
                                //     infowindow.close();
                                // })
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

                }); // end getJSON
        } // end getGeoLocation




    var map;
    var markers = [];
    var markerCluster;

    function initialize() {
        // var startLatLng = new google.maps.LatLng(37.7699298, -122.4469157); // San Francisco
        var startLatLng = new google.maps.LatLng(0, 0);
        var mapOptions = {
            zoom: 2,
            minZoom: 2,
            maxZoom: 7,
            scrollwheel: false,
            center: startLatLng,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        // The map object
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);


     
    }

    // var comment = [];
    // /* Photo ID gets passed in and information is then displayed */
    // setPhoto = function(photoID) {
    //     $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
    //         function(data) {


    //             var username = data.photo.owner.username;
    //             var title = data.photo.title._content;
    //             var description = data.photo.description._content;
    //             if (description == '') {
    //                 description = 'N/A';
    //             }
    //             var dateTaken = data.photo.dates.taken;
    //             var url = data.photo.urls.url[0]._content;

    //             var thePhoto = 'http://farm' + data.photo.farm + '.static.flickr.com/' + data.photo.server + '/' + data.photo.id + '_' + data.photo.secret + '_m.jpg';


            

    //             contentString =

    //                 '<div id="content">' +
    //                 '<h4 id="firstHeading" class="firstHeading">' + title + '</h4>' +
    //                 '<div id="bodyContent">' +
    //                 '<img src="' + thePhoto + '"style="height:17.0em; width:"100px; float:left; padding-right:10px;">' +
    //                 '<ul style="list-style: none; color:black; float:left;"> ' +
    //                 '<li><b>User:</b> ' + username + '</li>' +
    //                 '<li><b>Date/Time:</b> ' + dateTaken + '</li>' +
    //                 '<li><b>Description:</b> ' + description + '</li>' +
    //                 '<li><b>Location:</b> ' + locality + ', ' + region + '</li>' +
    //                 '<li><textarea placeholder="comment" style="width:200px;"></textarea></li>' +
    //                 '<li><b>Comment:</b> ' + getComment() + '</li>'
    //             '</ul>' +
    //             '<p>Photo URL: <a href="' + url + '">' +
    //                 '' + url + '</a> ' +
    //                 '</p>' +
    //                 '</div>' +
    //                 '</div>';


    //             setInfoWindow(contentString);

    //         })
    // }

    function getComment(myTextarea) {

        //var x = document.getElementById("myTextarea").value;

        return "This is a comment";
    }

    /* Clears the local storage object*/
    function clearLocalStorage() {
        localStorage.clear();
    }


    /* distinguishes content inside info window */
    function setInfoWindow(contentString) {

        // Instantiate the InfoWindow 
        // TODO: populate content with EXIF data!
        infoWindow = new google.maps.InfoWindow({
            content: contentString

        });

    }


    // Add a marker to the map and push to the array while panning to it
    var counter;

    function addMarker(theID) {



        //  var marker = new google.maps.Marker({
        //      position: location,
        //      map: map,
        //      title: 'Click for more details',
        //      icon: 'https://9fbb502ccc8fe4116684f9d3b089fdf4cafd13d4-www.googledrive.com/host/0BxKqQx16djZ6fl9hYTAyYVhQRzc3dWMzZ3NzWmZpcmtXU3BON0JhLWQxNHg0b2did09KWnc/photo.png'

        //  });


        //  markers.push(marker);
        // // var markerCluster = new MarkerClusterer(map, markers);


        //  //markers.push(marker);
        //  map.panTo(location);
        //  //var markerCluster = new MarkerClusterer(map, markers);

        //  // event handler for our InfoWindow 
        //  google.maps.event.addListener(marker, 'click', function() {
        //      infoWindow.open(map, marker);
        //  });




    }




    google.maps.event.addDomListener(window, 'load', initialize);




}); // END