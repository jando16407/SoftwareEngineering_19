
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
  firebase.initializeApp(firebaseConfig);
  var storage = firebase.storage();
  var storageRef = storage.ref(); 
  var db = firebase.firestore(); 
  var file = document.getElementById('file')
  var fabricCanvas = new fabric.Canvas("officeView")
  var savingUnits = false

  // on load functions and listeners
  window.onload = async function(){
      await loadImg()
      //await updateUnits()
  }
  //if change in db update units & array
  db.collection("Office").doc("officeView")
    .onSnapshot(async function(doc) {
        if(!savingUnits){
            await clearCanvas()
            updateUnitsArray(doc.data())
            updateUnits()
        }
    });
/**********************************Loads image, if there is no image stored wait for image to be uploaded!*************************/
async function loadImg() {
    
imageDownloadRef = storageRef.child('officeView/officeView')
await imageDownloadRef.getDownloadURL().then( function(url) {
    // This can be downloaded directly:
    console.log('bloop')
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
    console.log(error.message)
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

var deletedUnits = new Array()
var tempUnits = new Array()

//TODO: set innerhtml of unitNum input value to highest unit num in db



//enables adding units & saving units
async function addUnits(event){
    var button = document.getElementById("addUnit")
    //save new units
    if(isAddingUnits && !isDeletingUnits){
        isAddingUnits = false
        savingUnits = true
        button.innerHTML = "Add Units"
        //add save function here
        await fabricCanvas.forEachObject(async function(element){
            var varX = element.get("left")
            var varY = element.get("top")
            var unitSize = element.get("radius")
            var unitNum = element.get("id")
            await db.collection("Office").doc("officeView").update({
               [unitNum]: {
                    x: varX,
                    y: varY,
                    size: unitSize,
                    id: unitNum
                }
            })
            tempUnits = []
        })
        savingUnits = false
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
        savingUnits = true
        button.innerHTML = "Delete Units"
        while(deletedUnits.length > 0){
            await db.collection("Office").doc("officeView").update({
                [deletedUnits[0]]: firebase.firestore.FieldValue.delete()
            })


            //TODO DELETE INVENTORY HEREEEEE


            await deletedUnits.shift()
        }
        savingUnits = false
    }
    //go into delete mode
    else if(!isAddingUnits && !isDeletingUnits){
        alert("WARNING: If you delete a unit, it's inventory will also be deleted.")
        isDeletingUnits = true
        button.innerHTML = "Save"
        await fabricCanvas.forEachObject( function(element){
            element.set("selectable", true)
        })
    }
} 
var officeView = document.getElementById("officeViewDiv") 
fabricCanvas.hoverCursor = "default"
//onclick function for office view
officeView.onclick = async function(event){
    var size = document.getElementById("size").value
    var rect = officeView.getBoundingClientRect()
    var x = event.clientX - rect.left - size
    var y = event.clientY - rect.top - size
    if(isAddingUnits){
        await getUnitNum()
        var unitNum = tempUnits[0]
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
        fabricCanvas.add(circ)
        //show box with info here
        circ.on("mouseover", function(){
            console.log(this.get("id"))
        })
    }
    else if(isDeletingUnits){
        var temp =  fabricCanvas.getActiveObject()
        deletedUnits.push(temp.get("id"))
        fabricCanvas.remove(fabricCanvas.getActiveObject())
    }

}

//creates unit number based on db and # currently added
 async function getUnitNum(){
    await db.collection("Office").doc("officeView").get().then(function(doc){
        if (doc.exists) {
            var keys = Object.keys(doc.data())
            if(keys.length > 1 && tempUnits.length == 0){
                tempUnits.push(++(keys[keys.length - 2]))
            }
            else{
                if(tempUnits.length == 0)
                    tempUnits.push(100)
                else
                    tempUnits.push((tempUnits[0])++)
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    })
}
/**********************************************************************************************************************************/
/*************************************************Update Units*********************************************************************/
function updateUnits(){
    db.collection("Office").doc("officeView").get().then(function(doc){
        if (doc.exists) {
            drawInUnits(doc.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    })
}
function drawInUnits(units){
    const unitArray = Object.values(units)
    for ( i = 0; i < (unitArray.length -1); i++){
        const value = Object.values(unitArray[i])
        var circ = new fabric.Circle({
            id: value[0],
            left: value[2],
            top: value[3],
            fill:'green',
            radius: value[1],
            opacity: 0.3,
            selectable: false,
        })
        fabricCanvas.add(circ)
        //show box with info here
        circ.on("mouseover", function(){
            console.log(this.get("id"))
        })
    }

}
// updates array of unit numbers for the inventory workspace 
function updateUnitsArray(data){
    keys = Object.keys(data)
    keys.pop()
    var i
    var unitArray = new Array()
    for(i = 0; i < keys.length; i++){
        var tempString = "Unit_" + keys[i]
        unitArray.push(tempString)
    }
    db.collection("Office").doc("officeView").update({
        Units: unitArray
     })
}
//for on change in db -- clears canvas
async function clearCanvas(){
    console.log("im doing something")
    var objs = fabricCanvas.getObjects()
    for(var i = 0; i < objs.length; i++){
    await fabricCanvas.setActiveObject(objs[i])
    await fabricCanvas.remove(fabricCanvas.getActiveObject())
    }
}


