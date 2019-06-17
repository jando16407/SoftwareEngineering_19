
//connect to firebase
var firebaseConfig = {
    apiKey: "AIzaSyB0ZY93KxJK4UIRVnyXWqNm2V1l1M-4j_4",
    authDomain: "office-inventory-12f99.firebaseapp.com",
    databaseURL: "https://office-inventory-12f99.firebaseio.com",
    projectId: "office-inventory-12f99",
    storageBucket: "office-inventory-12f99.appspot.com",
    messagingSenderId: "147848186588",
    appId: "1:147848186588:web:33dbc8d727af1de4"
  };
  
  var storage = firebase.storage();
  var storageRef = storage.ref();
  
var file = document.getElementById('file')
//IF IMAGE IS NOT IN FB DO SHOW FILE INPUT
imageDownloadRef = storageRef.child('officeView/officeView')
imageDownloadRef.getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
  
    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
  
    // Or inserted into an <img> element:
    var canvas = document.getElementById("officeView")
    var context = canvas.getContext('2d')
    var background = new Image()
    background.src = url
    background.onload = function(){
        //canvas.appendChild(background)
        if(background.height > canvas.height || background.width > canvas.width)
            if(background.height - canvas.height > background.width - canvas.width)
                var ratio = canvas.height/background.height
            else   
                var ratio = canvas.width/background.width
        context.imageSmoothingEnabled = false
        context.scale(ratio, ratio)
        context.drawImage(background,0,0)
    }
  }).catch(function(error) {
    // image is not there so get one!!!
  });

function readURL(input){
    var file = input.files[0]
            imageRef = storageRef.child('officeView/officeView')
            imageRef.put(file).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
              });
        reader.readAsDataURL(input.files[0]);
}
