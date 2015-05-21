/**
 * Author: Jonathan Raxa
 * Description: The beginning of the document that excutes once the page document is ready.
 * This script handles the localStorage and other setting functionalities
 */
/* Document Ready */
$(document).ready(function() {

    var instructions = '<h3><b><u>Mode 1</u></b>: Search Photo </h3>' +

        '<h4><b>Public Photo Search</b></h4>' +
        '<p>1) Enter a search keyword to find photos</p>' +
        '<p>2) <i>Optional filters</i> </p>' +
        '<p> Mininmum Upload Date: YYYY-MM-DD format - allows user to define the minimum' +
        'upload date</p>' +

        '<p> Max Upload Date: YYYY-MM-DD format - allows user to define maximum upload date </p>' +
        '<p> Display Defined Number of Photos: </p>' +
        '<p> Sort by:</p>' +
        '<ul>' +
        '<li> "date-taken-asc" </li>' +
        '<li> "date-taken-desc" </li>' +
        '<li> "date-posted-asc" </li>' +
        '<li> "date-posted-desc" </li>' +
        '<li> "revalance" </li>' +
        '</ul>' +
        '<p>Indoor/Outdoor - input either (1) for indoor photos or (2) for outdoor photos.</p>' +

        '<center><p><img src="./images/mode1.png" style= "size=height:100px; width:250;"/></p></center>' +

        '<br />' +

        '<h4><b>User Photoset Search</b></h4>' +
        '<p>1) Find the Flickr user name (make sure that it is not from Yahoo)</p>' +
        '<p>2) Find the photoset ID and paste it into the search</p>' +
        '<center><p><img src="./images/id.png" style= "size=height:200px; width:450;"/></p></center>' +

        '<br />' +
        '<br />' +

        '<h3><b><u>Mode 2</u></b>: Show All Photos </h3>' +
        '<p><b>Description</b></p>' +
        '<p>Displays all the markers of the photos you searched for in mode 1.</p>' +
        '<p>If you want to display all the markers at once instead of having to</p>' +
        '<p>individually click on each image to display its marker, mode</p>' +
        '<p>2 allows you to drop everything at once.</p>' +

        '<p><b>How to</b></p>' +
        '<p>1) After filling in the search options and hitting “SUBMIT",</p>' +
        '<p>press "Show ALL Photos”. This will cause the application to</p>' +
        '<p>rain all the markers down from the sky and onto its location.</p>' +
        '<p>2) You can click on each marker individually and see</p>' +
        '<p>all of its contents just like in mode 1.</p>' +
        '<p>3) Sometimes however, there are multiple photos</p>' +
        '<p>in one geo-coordinate that are not necessarily</p>' +
        '<p>accessible due to the number of markers present at that one location.</p>' +
        '<p>The “Check Same Location” button allows the application to check which</p>' +
        '<p>markers have the same geo-location and then displaying them</p>' +
        '<p>within a slideshow with the information.</p>' +

        '<center><p><img src="./images/mode2.png" style= "size=height:100px; width:250;"/></p></center>' +

        '<br />' +
        '<br />' +

        '<h3><b><u>Mode 3</u></b>: View Slideshow </h3>' +
        '<p><b>Description</b></p>' +
        '<p>Mode three is the “slideshow” mode where the photos found from the thumbnail</p>' +
        '<p>are made into slideshow. Users can make a slideshow of the public photos found,</p>' +
        '<p>photosets, and may even save photos to play on a slideshow for later use.</p>' +
        '<p>They may even comment on the photo within the info window if they do so desire</p>' +
        '<p>to and the comment will be displayed on the slideshow. </p>' +

        '<p><b>How to</b></p>' +

        '<p>1) put in a search within the text boxes in mode 1.</p>' +
        '<p>2) click “SUBMIT"</p>' +
        '<p>3) you will notice that below Mode 3: Slideshow,</p>' +
        '<p>there will appear a link below the text that indicates that the</p>' +
        '<p>slideshow is ready to be used upon clicking.</p>' +
        '<p>BE SURE TO CLICK ON THE BLUE LINK. Due to bugs,</p>' +
        '<p>only clicking on the words will cause the slideshow to appear. (see below)</p>' +

        '<center><img src="./images/mode3.png"style= "size=height:100px; width:250;"/></center>' +

        '<p>4) Upon viewing the slideshow, in order to view</p>' +
        '<p>the description of the image,</p>' +
        '<p>you must first click on the image.</p>' +
        '<p>5) To play the slideshow, find the “play”</p>' +
        '<p>icon on the bottom right-hand corner of the page</p>' +

        '<br />' +
        '<br />' +

        '<center><p>For any questions please contact:</p></center>' +
        '<center><p>El Amigos</p></center>'

    ;


    /* Gives the user instructions for the application */
    var pop = open("", "", "top=200,left=100,width=550,height=500");
    pop.document.write('<center><img src="./images/PhotoWorld.png" style= "size=height:200px; width:450;"/></center>');
    pop.document.write('<center><b><h1>Welcome to PhotoWorld!</h1></b></center>');
    pop.document.write("<h2>Instructions</h2>");
    pop.document.write(instructions);
    pop.document.close();



    document.getElementById("links").style.display = 'none';
    document.getElementById("panel").style.display = 'none';




    if (localStorage) {
        console.log("LOCALSTORAGE OKAY");
    } else {
        console.log("LOCALSTORAGE FAIL");
    }




    /* Clears all the comment data from the LocalStorage */
    $("#deleteStorage").click(function() {
        localStorage.clear();
        $("#imgHere").empty();
        $("#links").empty();
        alert("Local Storage cleared");
    });




    $("#deleteAll").click(function() {

        //checkMark(); 

        var del;
        if (confirm("WARNING: This will clear current searched photos and map markers. Do you want to continue?") == true) {
            del = "images and markers deleted";
        } else {
            del = "Operation Canceled!";
            return;
        }

        if (del === "images and markers deleted") {


            clearMarkers();

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


            $("#pics").empty();
            $("#imgHere").empty();
            $("#links").empty();

            alert("images and markers deleted");

            map.setZoom(3);
            map.setCenter(startLatLng);

            //checkMark(); 

        }




        console.log("allMarkers: " + allMarkers.length + "\n" +
            "allLatlng: " + allLatlng.length + "\n" +
            "tempMarkerHolder: " + tempMarkerHolder.length + "\n" +
            "markers: " + markers.length + "\n" +
            "photoArray: " + photoArray.length + "\n" +
            "slideshowPhotoID: " + slideshowPhotoID.length + "\n" +
            "photoInfo: " + photoInfo.length + "\n"


        );


    });




    addComment = function(photoID) {

        userComment = document.getElementById("textarea").value;
        document.getElementById("theComment").innerHTML = userComment;
        localStorage.setItem(photoID, userComment);
        console.log(photoID + " - " + userComment);
        userComment = null;
        console.log(localStorage.getItem(photoID));
    }




}); // END