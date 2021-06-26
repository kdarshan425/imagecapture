// Set constraints for the video stream
var constraints = { 
  video: { facingMode: {exact: 'user'} }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
  cameraOutput = document.querySelector("#camera--output"),
  cameraSensor = document.querySelector("#camera--sensor"),
  cameraTrigger = document.querySelector("#camera--trigger");
  

// Access the device camera and stream to cameraView
function cameraStart() {
  navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(stream) {
          track = stream.getTracks()[0];
          cameraView.srcObject = stream;
      })
      .catch(function(error) {
          console.error("Oops. Something is broken.", error);
      });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");
  
  
  // track.stop();
};

function dlsubmit(){
  downloadImage('capture', cameraOutput.src);
  functionUploadToS3(cameraOutput.src);
}




downloadImage = function (name) {
  var a = document.createElement('a');
  a.setAttribute('download', name + '.png');
  a.setAttribute('href', cameraOutput.src);
  a.click();
}
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

///upload img to aws
UploadToS3= function(fileName){

  let myBucketName = "notarized-docs-2"; // put bucket name here
  let bucketRegion = "us-east-2"; // region
  let IdentityPoolId = "us-east-2:4cc2ed4b-4322-48b1-9261-44a8b2b9f2b3"; 
  AWS.config.region = bucketRegion; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  });

  let file1 = filePath
  function addPhoto(file1) {
    
  var file = file1;
  var fileName = file.name;
  var albumPhotosKey = encodeURIComponent(albumName) + "/";
  
    // var photoKey = albumPhotosKey + fileName;
  
    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: myBucketName,
        Key: `measurements/${orderId}/${file.name}`,
        Body: file
      }
    });
  
    var promise = upload.promise();
  
    promise.then(
      function(data) {
        alert("Successfully uploaded photo.");
        viewAlbum(albumName);
  data.Location
      },
      function(err) {
        return alert("There was an error uploading your photo: ", err.message);
      }
    );
  }}
  
