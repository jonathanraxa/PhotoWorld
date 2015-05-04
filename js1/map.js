/* Pull local Farers market data from the USDA API and display on 
 ** Google Maps using GeoLocation or user input zip code. By Paul Dessert
 ** www.pauldessert.com | www.seedtip.com
 */


 var marketId = []; //returned from the API
    var allLatlng = []; //returned from the API
    var allMarkers = []; //returned from the API
    var marketName = []; //returned from the API
    var infowindow = null;
    var pos;
    var userCords;
    var tempMarkerHolder = [];
    var apiKey = '0fd24d9d0411ede9c4d33d4c531bbc16';


    var username;
    var title;
    var description;
    var dateTaken;
    var url;
    var thePhoto;
var theID;
    var contentString;
$(document).ready(function() {

    
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

    //End Geo location

    //map options
    var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(0, 0),
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: true

    };

    //Adding infowindow option
    infowindow = new google.maps.InfoWindow({
        content: "holding..."
    });

    //Fire up Google maps and place inside the map-canvas div
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    //var photoID = '16987304147';
    var tag = "dog";
    //grab form data
    $('#chooseZip').click(function() { // bind function to submit event of form



        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + tag + '&has_geo=1&page=20&format=json&nojsoncallback=1',


            function(data) {

                var i;
                for (i = 0; i < 20; i++) {

                    marketId[i] = data.photos.photo[i].id;
                    theID = marketId[i];
                    console.log(theID)
                //}


                //for (i = 0; i < 20; i++) {


                // var tempFarm = data.photos.photo[i].farm;
                // var tempServer = data.photos.photo[i].server;
                // var tempSecret = data.photos.photo[i].secret;




                var counter = 0;
                //Now, use the id to get detailed info
                // $.each(marketId, function(k, v) {
                	// var j = 0
                 // for (; j < 20; j++) {
                 	 

                    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=' + apiKey + '&photo_id=' + theID + '&format=json&nojsoncallback=1',
                        function(data) {

                            var latitude = data.photo.location.latitude;
                            var longitude = data.photo.location.longitude;

                            //console.log(marketId[i]);
                            //set the markers.	  
                            myLatlng = new google.maps.LatLng(latitude, longitude);
  	

                            $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + theID + '&format=json&nojsoncallback=1',
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
                                            '<ul style="list-style: none; color:black; float:left;"> ' +
                                            '<li><b>User:</b> ' + username + '</li>' +
                                            '<li><b>Date/Time:</b> ' + dateTaken + '</li>' +
                                            '<li><b>Description:</b> ' + description + '</li>' +
                                            '<li><b>Location:</b></li>' +
                                            '<li><textarea placeholder="comment" style="width:200px;"></textarea></li>' +
                                            '<li><b>Comment:</b></li>' +
                                            '</ul>' +
                                            '<p>Photo URL: <a href="' + url + '">' +
                                            '' + url + '</a> ' +
                                            '</p>' +
                                            '</div>' +
                                            '</div>';




                                        allMarkers = new google.maps.Marker({
                                            position: myLatlng,
                                            map: map,
                                            html: contentString
                                        })

                                        //put all lat long in array
                                        allLatlng.push(myLatlng);

                                        //Put the marketrs in an array
                                        tempMarkerHolder.push(allMarkers);

                                        counter++;
                                        console.log(counter);


                                        google.maps.event.addListener(allMarkers, 'click', function() {
                                            infowindow.setContent(this.html);
                                            infowindow.open(map, this);
                                        });
                                    } catch (err) {
                                        console.log(err);
                                    }

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
                        });


                } // end for loop


            });

        //return false; // important: prevent the form from submitting
    });
});