/**
 * Author: Jonathan Raxa
 * Description: After the user submits a request for an image query, 
 * the photos are returned in array called publicPhotoIDs. Show all mode
 * will iterate through the entire array and create markers for each individual photo
 */
/* 
 *Displays all the markers 
 *  @param null 
 *  @return null
 */
showMarkers = function() {



    for (var i = 0; i < allLatlng.length; i++) {
        allLatlng.setMap(null);
    }

    for (var i = 0; i < allLatlng.length; i++) {
        tempMarkerHolder.setMap(null);
    }


    console.log("Number of IDs: " + publicPhotoIDs.length);


    for (var i = 0; i < publicPhotoIDs.length; i++) {

        createMarker(publicPhotoIDs[i]);

    }

}

/* Algorithm to iterate and check entire image array and determine which have the same locations */
$("#check").click(function() {
    $("#imgHere").empty();
    $("#links").empty();

    console.log(tempMarkerHolder);

    var num = 0;
    for (var count = 0; count < tempMarkerHolder.length - 1; count++) {

        console.log(tempMarkerHolder[count].id + " Matches with: ");

        for (var i = 0; i < tempMarkerHolder.length - 1; i++) {

            // handles iterator matches 
            if (count === i) {
                i = i + 1;
            }

            //  if((tempMarkerHolder[count].position.A === tempMarkerHolder[i].position.A) && (tempMarkerHolder[count].position.F === tempMarkerHolder[i].position.F)){
            if ((tempMarkerHolder[count].lat === tempMarkerHolder[i].lat) && (tempMarkerHolder[count].lng === tempMarkerHolder[i].lng)) {

                // console.log(tempMarkerHolder[count].position.A + " , " + tempMarkerHolder[count].position.F + "(count): " + (count));
                console.log(tempMarkerHolder[i].position.A + " , " + tempMarkerHolder[i].position.F + "(i): " + (i));


                //console.log( tempMarkerHolder[count].id + " matches with -> " + tempMarkerHolder[i].id); 


                // add the IDs to an array - access them through object: tempMarkerHolder[count/i].id
                sameImgArrayID[num] = tempMarkerHolder[count].id;
                sameImgArrayID[num + 1] = tempMarkerHolder[i].id;
                num++;

            }

        }

    }

    // var sameImgArrayClean = [];
    // $.each(sameImgArrayID, function(i, el){
    //     if($.inArray(el, sameImgArrayClean) === -1) 
    //         sameImgArrayClean.push(el);
    // });

    // find and remove duplicates of the array
    var sameImgArrayClean = sameImgArrayID.filter(function(elem, pos) {
        return sameImgArrayID.indexOf(elem) == pos;
    });


    // Check if map has multiple photos in one location then
    // *  adds them to the saved slideshows
    // *  TODO: populate a slider that will allow us to put in a long description
    // *          showing location, coordinates, title, tags, etc

    if (sameImgArrayID.length > 0) {

        // var panel = document.getElementById("panel");
        // panel.innerHTML = "Photos added to Slideshow: " + window.confirm("Some images have the same location, would you like to display them separately in a slideshow?"); 

        var x;
        if (confirm("Some images have the same location, would you like to display them separately in a slideshow?") == true) {
            x = "Loading images";
        } else {
            x = "Operation Canceled!";
        }

        if (x === "Loading images") {
            // $("#pics").empty();
            // alert("Emptied Previous Array");

            $("#pics").empty();
            $("#imgHere").empty();
            $("#links").empty();

            aPhoto = [];
            publicPhotoIDs = [];


        }

    } else {
        alert("There are no images with the same geo-coodinates");
        return;
    }

    console.log("sameImgArrayID: " + sameImgArrayClean.length);

    //for loop the array to display all the IDs that have the same location
    for (var j = 0; j < sameImgArrayClean.length; j++) {


        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey + '&photo_id=' + sameImgArrayClean[j] + '&format=json&nojsoncallback=1',
            function(data) {

                var tempID = data.photo.id;
                var tempFarm = data.photo.farm;
                var tempServer = data.photo.server;
                var tempSecret = data.photo.secret;

                publicPhotoIDs[j] = tempID;

                //console.log("# of photos: " + data.photo.length); 

                publicPhotos[j] = 'http://farm' + tempFarm + '.static.flickr.com/' + tempServer + '/' + tempID + '_' + tempSecret + '_m.jpg';
                jQuery('<a href/>').attr('id', tempID).attr('onClick', 'createMarker(' + tempID + ')').html($('<img/>').attr('src', publicPhotos[j])).appendTo('#pics');
                populateSlideShow(tempID, tempFarm, tempServer, tempSecret);


            }); // end getJSON

    }
    playSlide();

});