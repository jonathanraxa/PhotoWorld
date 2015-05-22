/**
 * Author: Jonathan Raxa
 * Description: The map.js methods are the functions that handle the map object and
 * marker objects for the user to interact with. 
 * 
 * 1. initialize(): sets up the map object and options
 * 2. setAllMap(): destroys the array of markers created on the map
 * 3. clearMarkers(): removes all the markers from the map by calling setAllMap() to destroy everything
 * 4. createMarker(): creates a marker on the map upon clicking a thumbnail
 */

/**
 * Inializes the map object onto the page on document start.
 * Sets up the map options that limit the user's interaction with 
 * Google maps.
 * Also handles the location finder
 */
function initialize() {
    startLatLng = new google.maps.LatLng(0, 0);
    var mapOptions = {
        zoom: 3,
        minZoom: 3,
        maxZoom: 5,
        scrollwheel: false,
        center: startLatLng,
        animation: google.maps.Animation.DROP,

        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },

        panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },

        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },

        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    // The map object
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    //var mc = new MarkerClusterer(map); 

    var input = /** @type {HTMLInputElement} */ (
        document.getElementById('pac-input'));

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

    var infowindow = new google.maps.InfoWindow();

    marker = new google.maps.Marker({
        map: map
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {

        infowindow.close();

        var place = autocomplete.getPlace();

        // I made this
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
}



/**
 * Destroys all the markers on the map
 * @param map (map set to 'null')
 */
function setAllMap(map) {


    for (var i = 0; i < allMarkers.length; i++) {
        allMarkers[i].setMap(null);
    }



    if (tempMarkerHolder == null) {
        return;
    } else {
        for (var i = 0; i < tempMarkerHolder.length; i++) {
            tempMarkerHolder[i].setMap(null);
        }
    }



    for (var j = 0; j < markers.length; j++) {
        markerCluster.removeMarker(markers[j]);
    }

    tempMarkerHolder = [];

}


/**
 * Removes the markers from the map, 
 * but keeps them in the array.
 */
function clearMarkers() {
    setAllMap(null);
}

/**
 * Display the marker upon clicking image 
 * Each image has a photoID that's passed into 
 * this function to create its marker 
 * @param photoID
 */
createMarker = function(photoID) {
    
    // Make a request to flickr to get information of a photo
    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
        function(data) {
            try {


                newLat = data.photo.location.latitude;
                newLng = data.photo.location.longitude;


                var myLatlng = new google.maps.LatLng(newLat, newLng);

            } catch (err) {

                console.log("Some location not available");
            }

            try {

                username = data.photo.owner.username;
                title = data.photo.title._content;
                description = data.photo.description._content;

                try {

                    region = data.photo.location.country._content;
                    locality = data.photo.location.region._content;

                } catch (err) {
                    console.log("Region or Locality unavailable");
                }

                if (description == '') {
                    description = 'N/A';
                }
                dateTaken = data.photo.dates.taken;
                url = data.photo.urls.url[0]._content;

                thePhoto = 'http://farm' + data.photo.farm + '.static.flickr.com/' + data.photo.server + '/' + data.photo.id + '_' + data.photo.secret + '_m.jpg';


                // The display of the information on the marker info window 
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
                    '<p><b># Tags:</b> ' + data.photo.tags.tag.length + '</p>' +
                    '<p><b>Tags:</b><div id="theTags"></div>' +
                    '<br />' +
                    '<button id="showTags" onClick="showTags(' + data.photo.tags.tag.length + ',' + photoID + ')">Show Tags</button>' +
                    '<br />' +
                    '<br />' +
                    '<p><textarea id="textarea" placeholder="comment" style="width:200px;"></textarea></p>' +
                    '<button id="addComment" onClick="addComment(' + photoID + ')">Add Comment</button>' +
                    '<br />' +
                    '<p><b>Comment:</b><div id="theComment"></div> "' + localStorage.getItem(photoID) + '"</p>' +
                    '<p>Photo URL: <a href="' + url + '">' +
                    '' + url + '</a></p> ' +
                    '<button onClick="addToSlide(' + photoID + ')">Add to slideshow</button>' +
                    '<br />' +
                    '<br />' +
                    '<br />' +
                    '<br />' +
                    '<br />' +
                    '<br />' +
                    '<br />' +
                    '</div>' +
                    '</div>' +
                    '</div>';


                allMarkers = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: icon,
                    html: contentString,
                    id: data.photo.id,
                    lat: newLat,
                    lng: newLng

                });



                //put all lat long in array
                allLatlng.push(myLatlng);

                //Put the marketrs in an array
                tempMarkerHolder.push(allMarkers);


                var infoWindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 500,
                    maxHeight: 150,
                    arrowStyle: 2,
                    borderRadius: 4,
                    //disableAutoPan: true,
                    scrollwheel: true,
                    borderColor: '#2c2c2c'
                });


                google.maps.event.addListener(allMarkers, 'click', function() {


                    infoWindow.setContent(this.html);
                    infoWindow.open(map, this);
                    map.panTo(myLatlng, this);


                });


            } catch (err) {
                console.log(err);
            }


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


}