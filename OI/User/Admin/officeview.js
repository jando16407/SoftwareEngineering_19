
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

  window.onload = function(){
      loadImg()
  }
/**********************************Loads image, if there is no image stored wait for image to be uploaded!*************************/
async function loadImg() {
    console.log('bloop')
imageDownloadRef = storageRef.child('officeView/officeView')
await imageDownloadRef.getDownloadURL().then( function(url) {
    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    //xhr.send();
    //display in the bkgd of canvas
    var canvas = document.getElementById("officeView")
    var background = new Image()
    background.src = url
    background.onload = async function(){
        canvas.style.backgroundRepeat ="no-repeat"
        canvas.style.backgroundImage = "url('" + url + "')"
        canvas.style.backgroundSize = "contain"
    }
  }).catch(function(error) {
    // image is not there so get one!!!
    alert("No image detected for Office View. Please select one in the settings.")
  });
}
//Reads file input and saves image.
async function readURL(input){
    var file = input.files[0]
    imageRef = storageRef.child('officeView/officeView')
    await imageRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      });
     loadImg()
}
/**********************************************************************************************************************************/
/*******************************************************Adding Unit****************************************************************/
var isAddingUnits = false
var isDeletingUnits = false
var canvas = new fabric.Canvas("officeView")
//enables adding units & saving units
function addUnits(event){
    var button = document.getElementById("addUnit")
    if(isAddingUnits && !isDeletingUnits){
        isAddingUnits = false
        button.innerHTML = "Add Units"
        //add save function here
    }
    else if(!isAddingUnits && !isDeletingUnits){
        isAddingUnits = true
        button.innerHTML = "Save"
    }
}
//enables deleting units & saving
function deleteUnits(event){
    var button = document.getElementById("deleteUnit")
    if(!isAddingUnits && isDeletingUnits){
        isDeletingUnits = false
        button.innerHTML = "Delete Units"
        //add save function here
    }
    else if(!isAddingUnits && !isDeletingUnits){
        isDeletingUnits = true
        button.innerHTML = "Save"
    }
} 
var officeView = document.getElementById("officeViewDiv") 
var green = new fabric.Color("rgb(173,255,47)")
//onclick function for office view
officeView.onclick = function(event){
    var rect = officeView.getBoundingClientRect()
    var x = event.clientX - rect.left - 5
    var y = event.clientY - rect.top - 5
    if(isAddingUnits){
        //put circle at coords of mouse on canvas
        console.log("extra time")
        var circ = new fabric.Circle({
            left: x,
            top: y,
            fill:'green',
            radius: 10,
            opacity: 0.3
        })
        canvas.add(circ)
    }

}
/**********************************************************************************************************************************/