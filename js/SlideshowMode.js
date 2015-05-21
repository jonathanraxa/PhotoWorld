/**
* Author: Jonathan Raxa
* Description: Methods are called here once 
* the user wants to display a slideshow on the webpage
*/


    /* 
    * Add selected photos to a slide show 
    * @param photoID
    */
    addToSlide = function(photoID) {
        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
            function(data) {


                // create an array of photo IDs
                slideshowPhotoID.push(photoID);
                savedPhoto = 'http://farm' + data.photo.farm + '.static.flickr.com/' + data.photo.server + '/' + data.photo.id + '_' + data.photo.secret + '_m.jpg';
                alert("Photo ID: " + photoID + " added to saved slideshow" +"\n"+
                        "Total Added: " + slideshowPhotoID.length);
                photoInfo.push(savedPhoto);

                /* 
                 * save the photo into localStorage with photo ID as the key and the 
                 * img URL as the value 
                 */
                localStorage.setItem("photoURL", JSON.stringify(photoInfo));
            });
    }


   /* 
     *  Populate slideshow with the saved images by grabbing them from the localStorage first then
     *  telling the user that the saved photos are ready to be shown. With both populate methods, there is a hidden
     *  div tag that the photos links are populated in to allow the slide to play images from the DOM.
     */
    populateSavedSlides = function() {
        photo = 'http://farm' + photoFarm + '.static.flickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '_m.jpg';
        for (var j = 0; j < photoArray.length; j++) {
            jQuery('<a href=' + savedPhoto[j] + ' title="' + localStorage.getItem(savedPhoto[j]) + '" data-gallery/>').appendTo('#links');

        }

    }

    /* 
    * Populates the slideshow with details of the photo on the top 
    */
    populateSlideShow = function(photoID, photoFarm, photoServer, photoSecret) {

        photo = 'http://farm' + photoFarm + '.static.flickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '_m.jpg';

        if (photoID !== -1) {
            photoArray.push(photo);
        }

        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + photoID + '&format=json&nojsoncallback=1',
                function(data) {

                    try{
                        username = data.photo.owner.username;
                        title = data.photo.title._content;
                        description = data.photo.description._content;
                    }catch(err){
                        console.log(err); 
                    }
                    try{
                        region = data.photo.location.country._content;
                        locality = data.photo.location.region._content;
                    }catch(err){
                        console.log(err); 
                    }
                    

                    var content =
                        'Username: ' + username + ' || ' +
                        'Title: ' + title + ' || ' +
                        'Description: ' + description + ' || ' +
                        'Location: ' + locality + ', ' + region + ' || ' +
                        'Comment: ' + localStorage.getItem(photoID) + '';


                    jQuery('<a href=' + photoArray[count] + ' title="' + content + '" data-gallery/>').appendTo('#links');

                    count++;

                });

    }



     /* These next three methods allow for an <a href> to be hidden within the page so that 
     * the button may work. Without this, the plugin won't be able to start the slide 
     */

    /* 
    * plays the slideshow 
    * of the photoset - link is hidden 
    */
    playSlidePhotoset = function() {
           
            jQuery('<a href=' + photoArray[0] + ' data-gallery/>').html("PLAY SLIDESHOW").appendTo('#imgHere');

     }
    
    /* 
    * plays the slideshow of the searched tag 
    * link is hidden 
    */
    playSlide = function() {
            jQuery('<a href=' + photoArray[0] + ' data-gallery/>').html("PLAY SLIDESHOW").appendTo('#imgHere');
        }
     


    /* 
     * Plays the selected photos that were saved onto the local storage 
     * This is different than the other two because we want the photos that we had saved into
     * localStorage, not just what we got from Flickr API 
     */
    $('#playSaved').click(function() {

        var retrievedData = localStorage.getItem("photoURL");
        var URLS = JSON.parse(retrievedData);

        if(URLS == null){
            alert("There are no saved photos to display as a slideshow");
            return;

        } else {

         	clearMarkers();

            allMarkers = [];
            allLatlng = []; 
            publicPhotoIDs = [];
            tempMarkerHolder = [];
            markers = [];
            photoArray = [];
            aPhoto = [];

        map.setZoom(3);
        map.setCenter(startLatLng);


        marker.setVisible(false);
      
        $("#pics").empty();
        $("#imgHere").empty();
        $("#links").empty();

        }

        alert("Retrieving from local storage..." + "\n" +
                "Please remember click 'Clear Local Storage' when saved slideshow is no longer wanted");

        
        
        for (var i = 0; i < URLS.length; i++) {
            
            console.log("URLS: " + URLS[i]);
            
            savedSlideIDs[i] = URLS[i].substring(URLS[i].lastIndexOf("/")+1,URLS[i].indexOf("_"));

            console.log(savedSlideIDs[i]);


        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + savedSlideIDs[i] + '&format=json&nojsoncallback=1',
                function(data) {
 
                    console.log(savedSlideIDs[countSlide]);

                    username = data.photo.owner.username;
                    title = data.photo.title._content;
                    description = data.photo.description._content;
                    region = data.photo.location.country._content;
                    locality = data.photo.location.region._content;

                    var content =
                        'Username: ' + username + ' || ' +
                        'Title: ' + title + ' || ' +
                        'Description: ' + description + ' || ' +
                        'Location: ' + locality + ', ' + region + ' || ' +
                        'Comment: ' + localStorage.getItem(savedSlideIDs[countSlide]) + '';

                    jQuery('<a href=' + URLS[countSlide] + ' title="' + content +'" data-gallery/>').appendTo('#links');
                    
                    console.log(countSlide); 
                    countSlide++;
                    
                    
                })
      }
        

        jQuery('<a href=' + URLS[0] + ' data-gallery/>').html("PLAY SLIDESHOW").appendTo('#imgHere');


    })

