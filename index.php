<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>For Testing Stuff</title>
  <style type="text/css">img{height:100px; float:left;}</style>

  <!-- Start WOWSlider.com HEAD section -->
  <link rel="stylesheet" type="text/css" href="./engine1/style.css" />
  <script type="text/javascript" src="./engine1/jquery.js"></script>
  <!-- End WOWSlider.com HEAD section -->
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->

      <script type="text/javascript">

      /* Script written by Adam Khoury @ DevelopPHP.com */
      /* Video Tutorial: http://www.youtube.com/watch?v=EraNFJiY0Eg */
      function _(el){
        return document.getElementById(el);
      }
      function uploadFile(){
        var file = _("file1").files[0];
  // alert(file.name+" | "+file.size+" | "+file.type);
  var formdata = new FormData();
  formdata.append("file1", file);
  var ajax = new XMLHttpRequest();
  ajax.upload.addEventListener("progress", progressHandler, false);
  ajax.addEventListener("load", completeHandler, false);
  ajax.addEventListener("error", errorHandler, false);
  ajax.addEventListener("abort", abortHandler, false);
  ajax.open("POST", "file_upload_parser.php");
  ajax.send(formdata);
}
function progressHandler(event){
  _("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
  var percent = (event.loaded / event.total) * 100;
  _("progressBar").value = Math.round(percent);
  _("status").innerHTML = Math.round(percent)+"% uploaded... please wait";
}
function completeHandler(event){
  _("status").innerHTML = event.target.responseText;
  _("progressBar").value = 0;
}
function errorHandler(event){
  _("status").innerHTML = "Upload Failed";
}
function abortHandler(event){
  _("status").innerHTML = "Upload Aborted";
}

</script>    



<script>
var obj1 = { user:"John", age:22, country:"United States" };
var obj2 = { user:"Will", age:27, country:"United Kingdom" };
var obj3 = { user:"Abiel", age:19, country:"Mexico" };
var obj4 = { u1:obj1, u2:obj2, u3:obj3 };
document.write(obj3.user+" lives in "+obj3.country);
obj3.country = "Italy";
document.write("<hr />");

document.write(obj3.user+" lives in "+obj3.country);
document.write("<hr />");

document.write(obj4.u2.user);
// document.write(obj4["u2"]["user"]);
document.write("<hr />");
var meats = ["beef","pork","lamb"];
var fruit = ["apple","plumb","grape","orange"];
var obj5 = { arr1:meats, arr2:fruit };
document.write(obj5.arr1[1]+" with "+obj5.arr2[0]+" is for dinner");
</script>
<script language="javascript" type="text/javascript">
function addtext() {
  var newtext = document.myform.inputtext.value;
  if (document.myform.placement[1].checked) {
    document.myform.outputtext.value = "";
    }
  document.myform.outputtext.value += newtext;
}
</script>

</head>
<body>
<form name="myform">
<table border="0" cellspacing="0" cellpadding="5"><tr>
<td><textarea name="inputtext"></textarea></td>
<input type="radio" name="placement" value="append" checked> Add to Existing Text<br>
<td><p><input type="radio" name="placement" value="replace"> Replace Existing Text<br>
<input type="button" value="Add New Text" onClick="addtext();"></p>
</td>
<td><textarea name="outputtext"></textarea></td>
</tr></table>
</form>

  <!-- Tutorial 0-->
  <h2>HTML5 File Upload Progress Bar Tutorial</h2>
  <form id="upload_form" enctype="multipart/form-data" method="post">
    <input type="file" name="file1" id="file1"><br>
    <input type="button" value="Upload File" onclick="uploadFile()">
    <progress id="progressBar" value="0" max="100" style="width:300px;"></progress>
    <h3 id="status"></h3>
    <p id="loaded_n_total"></p>
  </form>


  <br />
  <br />
  <br />
  <br />
  <!-- Tutorial 1-->
  <input type = "file" id="myFile" name = "myFile" />
  <input type = "button" id="upload" value="upload" />
  <br>
  <progress id="prog" value="0" min="0" max="100"></progress>

  <script type="text/javascript">

// Ajax File upload with jQuery and XHR2
// Sean Clark http://square-bracket.com
// xhr2 file upload
  // data is optional
  $.fn.upload = function(remote,data,successFn,progressFn) {
    // if we dont have post data, move it along
    if(typeof data != "object") {
      progressFn = successFn;
      successFn = data;
    }
    return this.each(function() {
      if($(this)[0].files[0]) {
        var formData = new FormData();
        formData.append($(this).attr("name"), $(this)[0].files[0]);

        // if we have post data too
        if(typeof data == "object") {
          for(var i in data) {
            formData.append(i,data[i]);
          }
        }

        // do the ajax request
        $.ajax({
          url: remote,
          type: 'POST',
          xhr: function() {
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload && progressFn){
              myXhr.upload.addEventListener('progress',function(prog) {
                var value = ~~((prog.loaded / prog.total) * 100);

                // if we passed a progress function
                if(progressFn && typeof progressFn == "function") {
                  progressFn(prog,value);

                // if we passed a progress element
              } else if (progressFn) {
                $(progressFn).val(value);
              }
            }, false);
            }
            return myXhr;
          },
          data: formData,
          dataType: "json",
          cache: false,
          contentType: false,
          processData: false,
          complete : function(res) {
            var json;
            try {
              json = JSON.parse(res.responseText);
            } catch(e) {
              json = res.responseText;
            }
            if(successFn) successFn(json);
          }
        });
}
});
};




$("#upload").on("click", function(){
  $("#myFile").upload("xhr2.php", function(success){
    console.log("done");
  }, $("#prog"));
})
</script>


<br />
<br />
<br />
<br />

<input type = "button" id = "button" value = "get pics!"></input>
<input type ="button" id = "photoset" value = "get my photos"></input>
<form action = "./js/ajax.js">
  <input id = "string" type = "text" name = "string" />  <input type="button" id = "button">Click Me!</input> 
</form>
<a href="myfile.htm">
  <img src="http://farm9.static.flickr.com/8101/8618353732_9b322c2da7_m.jpg">
</a> 

<div id = "feedback">
</div>

<div id="image-container">
<!--             <img src="http://farm9.static.flickr.com/8118/8608239293_200bc13df5_m.jpg">
-->        </div>
<br />
<br />
<br />
<br />
<br />

<h2>Title<h2>
 <ul>
   <li>Title: </li>
   <li>Username: </li>
   <li>Date: </li>
   <li>Description: </li>
   <li>Location: </li>
 </ul>


 <table>
  <tr><td>Text to Save:</td></tr>
  <tr>
    <td colspan="3">
      <textarea id="inputComment" style="width:150px;height:70px"></textarea>
    </td>
  </tr>
  <tr>
    <td>Save Comment as:</td>
<!--     <td><input id="inputFileNameToSaveAs"></input></td>
-->    <td><button onclick="saveTextAsFile()">Save Comment</button></td>
</tr>
<tr>
  <td>Select a File to Load:</td>
  <td><input type="file" id="fileToLoad"></td>
  <td><button onclick="loadFileAsText()">Load Selected File</button><td>
  </tr>
</table>

<script type='text/javascript'>

// var photoID = 2;
// saveTextAsFile(photoID); 

// function saveTextAsFile(photoID)
// {
//   // the user generated comment
//   var textToWrite = document.getElementById("inputComment").value;


//   // the type of text written
//   var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});



//   // the name of the comment FILE 
//   // photoID is the comment number file 
//   var fileNameToSaveAs = 'comment'+photoID+''; 
//   // document.getElementById("inputFileNameToSaveAs").value;



//   var downloadLink = document.createElement("a");
//     downloadLink.download = fileNameToSaveAs;
//     downloadLink.innerHTML = "Download File";

//   if (window.webkitURL != null)
//   {
//     // Chrome allows the link to be clicked
//     // without actually adding it to the DOM.
//     downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
//   }
//   else
//   {
//     // Firefox requires the link to be added to the DOM
//     // before it can be clicked.
//     downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
//     downloadLink.onclick = destroyClickedElement;
//     downloadLink.style.display = "none";
//     document.body.appendChild(downloadLink);
//   }

//   downloadLink.click();
// }

// function destroyClickedElement(event)
// {
//   document.body.removeChild(event.target);
// }

// function loadFileAsText()
// {
//   var fileToLoad = document.getElementById("fileToLoad").files[0];

//   var fileReader = new FileReader();
//   fileReader.onload = function(fileLoadedEvent) 
//   {
//     var textFromFileLoaded = fileLoadedEvent.target.result;
//     document.getElementById("inputTextToSave").value = textFromFileLoaded;
//   };
//   fileReader.readAsText(fileToLoad, "UTF-8");
// }

</script>


<!-- Start WOWSlider.com BODY section -->
<div id="wowslider-container1">
  <div class="ws_thumbs">
    <div id="pics"><a href=""></a> </div>
  </div>
</div>



  <!-- <div class="ws_script" style="position:absolute;left:-99%"></div>
  <div class="ws_shadow"></div> -->
  
  <script type="text/javascript" src="engine1/wowslider.js"></script>
  <script type="text/javascript" src="engine1/script.js"></script>
  <!-- End WOWSlider.com BODY section -->





  <script src="https://code.jquery.com/jquery-1.10.2.js"></script> 
  <script type="text/javascript" src="./js/ajax.js"></script>

</body>
