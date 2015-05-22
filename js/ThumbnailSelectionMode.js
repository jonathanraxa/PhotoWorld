/**
* Author: Jonathan Raxa
* Description: Methods that pertain mainly to 
* the thumbnail display on the bottom of the page
* 
* 1. onClick "submit": handles all the  
* 2. getSearch: find searches after adding in filters
* 3. setPlace: get Flickr place ID for a specific location 
* 4. showTags: shows the tags on the infoWindow
* 5. getUserID: gets the user's ID
* 6. getPhotosetID: gets the photoset ID - public photos ONLY 
* 7. onClick "photosetSubmit": handles the user's photoset ID and username
*/

 
 
/**
* When the user clicks on the 'Submit' button, 
* all the arrays reset and then makes a new API call to Flickr
* with defined variables 
*/
$("#submit").click(function() {
        
        // These calls allow the user to ensure that everything is deleted
        // and we can make a new search without having to reload the page
        clearMarkers();

        $("#pics").empty();
        $("#imgHere").empty();
        $("#links").empty();


            allLatlng = []; 
            publicPhotoIDs = [];
            tempMarkerHolder = [];
            markers = [];
            photoArray = [];
            aPhoto = [];
            publicPhotos = [];
            slideshowPhotoID = [];
            allLatlng = []; 
            tagArray = [];
            slideshowPhotoID = [];
            photoInfo = [];


        map.setZoom(3);
        map.setCenter(startLatLng);


        marker.setVisible(false);
      
        getSearch(); 

         // Make a search request to Flickr with the following arguments
        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&has_geo=1&format=json&nojsoncallback=1', 
        {

            text: '' + search + '',
            min_upload_date: '' + min_upload_date + '',
            max_upload_date: '' + max_upload_date + '',
            place_id: placeID,
            geo_context: '' + geo_context + '',
            sort: '' + sort + '',
            per_page: ''+number+''


        }, function(data) {
 
            for (var i = 0; i < data.photos.photo.length; i++) {


                var tempID = data.photos.photo[i].id;
                var tempFarm = data.photos.photo[i].farm;
                var tempServer = data.photos.photo[i].server;
                var tempSecret = data.photos.photo[i].secret;

                publicPhotoIDs[i] = tempID;

                console.log("# of photos: " + data.photos.photo.length);

                // create an array of IDs
                publicPhotos[i] = 'http://farm' + tempFarm + '.static.flickr.com/' + tempServer + '/' + tempID + '_' + tempSecret + '_m.jpg';

                // create an <a href> link via DOM
                jQuery('<a href/>').attr('id', tempID).attr('onClick', 'createMarker(' + tempID + ')').html($('<img/>').attr('src', publicPhotos[i])).appendTo('#pics');
        
                populateSlideShow(tempID, tempFarm, tempServer, tempSecret);


            }

            playSlide();

        });

    });

   

     /* 
     *  Initializes the variables of each filter input and returns
     *  a defined variable 
     */
    getSearch = function() {
        
        search = document.getElementById("search").value;
        min_upload_date = document.getElementById("min_upload_date").value;
        max_upload_date = document.getElementById("max_upload_date").value;
        //bbox = document.getElementById("bbox").value;
        
       if(place_id = 'undefined'){
            placeID === '';
        } 


        geo_context = document.getElementById("geo_context").value;


        do {

            number = document.getElementById("number").value;

            

            if(number > 35){
            alert("Seach number cannot be greater than 35 - search number changed to 35");
            number = 35; 
            getOut = true;

        } else {
            getOut = true;
        }

        }while(!getOut);
        
        sort = document.getElementById("sort").value;

    }


/**
* Takes the place name from the Google API and makes a call
* to the Flickr API to convert it to a Flickr place ID
* @param place
*/
  setPlace = function(place) {

        // Make a request to Flickr to get the place ID, passing in from Google's place description 
        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.places.find&api_key=' + apiKey + '&query=' + place + '&format=json&nojsoncallback=1',
            function(data) {
                placeID = data.places.place[0].place_id;
                console.log(placeID); 
            })
    }

/**
* Defines the number of tags on each 
* infoWindow displayed on the map while putting
* all the tags into an array to display
* @param numberOfTags, photoID
*/
    showTags = function(numberOfTags, photoID) {

        // Making a request to get the information of a Flickr photo
        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
            function(data) {

                for (var i = 0; i < numberOfTags; i++) {
                    tagArray[i] = data.photo.tags.tag[i]._content;
                }

                var index;
                var text = "<div>";
                for (index = 0; index < tagArray.length; index++) {
                    if (index == tagArray.length - 1) {
                        text += tagArray[index];
                    }

                    text += tagArray[index] + ", ";


                }
                text += "</div>";
                document.getElementById("theTags").innerHTML = text;

            });

    }



   /* 
   * Allows a user to put in their own Username
   */
    getUserID = function() {

         var user_name = document.getElementById("userID").value;

         // Find the user's ID through the username
        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key='+apiKey+'&username='+user_name+'&format=json&nojsoncallback=1',
            function(data){

                userID = data.user.id;
                
                return userID;
            });
    }


   /* 
   * Allows a user to put in their own Photoset ID
   */
    getPhotosetID = function() {
        photoset_id = document.getElementById("photosetID").value;
    }


    /*
    * Return the images from the photoset
    * user has to paste in photoset ID
    */
    $("#photosetSubmit").click(function() {
        $("#pics").empty();
        $("#imgHere").empty();
        $("#links").empty(); 

        // resets the userID and photoset_id just in case there's a new input
        userID = '';
        photoset_id = '';

        var user_name = document.getElementById("userID").value;

        // Find the user's ID through the username
        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key='+apiKey+'&username='+user_name+'&format=json&nojsoncallback=1',
            function(data){

                userID = data.user.id;
                photoset_id = document.getElementById("photosetID").value;

                // With the username, find the photoset ID as well of the specific user
                $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + photoset_id + '&user_id=' + userID + '&format=json&nojsoncallback=1',

            /* iterates through the defined photoset and pulls all the images from account */
            function(data) {
                console.log(data); 
                var i = 0;

                for (; i < data.photoset.photo.length; i++) {

                    var tempID = data.photoset.photo[i].id;
                    var tempFarm = data.photoset.photo[i].farm;
                    var tempServer = data.photoset.photo[i].server;
                    var tempSecret = data.photoset.photo[i].secret;

             
                publicPhotos[i] = 'http://farm' + tempFarm + '.static.flickr.com/' + tempServer + '/' + tempID + '_' + tempSecret + '_m.jpg';
                jQuery('<a href/>').attr('id', tempID).attr('onClick', 'createMarker(' + tempID + ')').html($('<img/>').attr('src', publicPhotos[i])).appendTo('#pics');

          

                    populateSlideShow(tempID, tempFarm, tempServer, tempSecret);

                }

                playSlide();


            });

        });

    });



