
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
  var db = firebase.firestore(); 
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
/************************************************Adding & Deleting Units***********************************************************/
var isAddingUnits = false
var isDeletingUnits = false
var canvas = new fabric.Canvas("officeView")
var deletedUnits = new Array()

//TODO: set innerhtml of unitNum input value to highest unit num in db



//enables adding units & saving units
async function addUnits(event){
    var button = document.getElementById("addUnit")
    //save new units
    if(isAddingUnits && !isDeletingUnits){
        isAddingUnits = false
        button.innerHTML = "Add Units"
        //add save function here
        await canvas.forEachObject(function(element){
            var varX = element.get("left")
            var varY = element.get("top")
            var unitSize = element.get("radius")
            var unitNum = element.get("id")
            db.collection("Office").doc("officeView").update({
               [unitNum]: {
                    x: varX,
                    y: varY,
                    size: unitSize,
                    id: unitNum
                }
            })
            //add unit in inventory too
            db.collection("Office").doc("inventories").update({
                [unitNum]:{}
            })
        })
    }
    // go into add units mode
    else if(!isAddingUnits && !isDeletingUnits){
        isAddingUnits = true
        button.innerHTML = "Save"
    }
}
//enables deleting units & saving
async function deleteUnits(event){
    var button = document.getElementById("deleteUnit")
    //save deleted units
    if(!isAddingUnits && isDeletingUnits){
        isDeletingUnits = false
        button.innerHTML = "Delete Units"
        console.log(deletedUnits)
        while(deletedUnits.length > 0){
            await db.collection("Office").doc("officeView").update({
                [deletedUnits[0]]: firebase.firestore.FieldValue.delete()
            })
            await deletedUnits.shift()
        }
        //add save function here
    }
    //go into delete mode
    else if(!isAddingUnits && !isDeletingUnits){
        isDeletingUnits = true
        button.innerHTML = "Save"
        await canvas.forEachObject( function(element){
            element.set("selectable", true)
        })
    }
} 
var officeView = document.getElementById("officeViewDiv") 
canvas.selection = false
canvas.hoverCursor = "default"
//onclick function for office view
officeView.onclick = function(event){
    var size = document.getElementById("size").value
    var rect = officeView.getBoundingClientRect()
    var x = event.clientX - rect.left - size
    var y = event.clientY - rect.top - size
    if(isAddingUnits){
        var unitNum = document.getElementById("unitNum").value
        //put circle at coords of mouse on canvas
        var circ = new fabric.Circle({
            id: unitNum,
            left: x,
            top: y,
            fill:'green',
            radius: size,
            opacity: 0.3,
            selectable: false,
        })
        canvas.add(circ)
        //show box with info here
        circ.on("mouseover", function(){
            console.log("hey")
        })
        document.getElementById("unitNum").value++  
    }
    else if(isDeletingUnits){
        var temp =  canvas.getActiveObject()
        deletedUnits.push(temp.get("id"))
        canvas.remove(canvas.getActiveObject())
    }

}
/**********************************************************************************************************************************/