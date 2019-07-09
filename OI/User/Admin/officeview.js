
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
  var isOnLoad = true

  // on load functions and listeners
  window.onload = async function(){
      await loadImg()
      await clearCanvas()
      await updateUnits()
      await db.collection("Office").doc("Workorder").collection("workOrder")
      .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            updateColor(doc.data())
        });
    });
    isOnLoad = false
    console.log("done")
  }
  //if change in db update units & array
  db.collection("Office").doc("officeView")
    .onSnapshot(async function(doc) {
        if(!savingUnits && !isOnLoad){
            await clearCanvas()
            updateUnitsArray(doc.data())
            await updateUnits()
        }
    });
  //if change to work order
  db.collection("Office").doc("Workorder").collection("workOrder")
    .onSnapshot(async function(querySnapshot) {
        console.log("change detected!!")
        querySnapshot.forEach(function(doc) {
            console.log(doc.data())
            updateColor(doc.data());
        });
    });
/**********************************Loads image, if there is no image stored wait for image to be uploaded!*************************/
//loads image for office view
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
                    user: "",
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
            createToolTip(this)
        })
        circ.on("mouseout", cancelTip)
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
//updates units on any db change
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
// draw in all units onto canvas
function drawInUnits(units){
    const unitArray = Object.values(units)
    for ( i = 0; i < (unitArray.length -1); i++){
        const value = Object.values(unitArray[i])
        var circ = new fabric.Circle({
            id: value[0],
            left: value[3],
            top: value[4],
            fill:'green',
            radius: value[1],
            opacity: 0.3,
            selectable: false,
        })
        fabricCanvas.add(circ)
        //show box with info here
        circ.on("mouseover", function(){
            console.log(this.get("id"))
            createToolTip(this)
        })
        circ.on("mouseout", function(){
            cancelTip()
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
var string
//creates tooltip for mouseover event on circles
async function createToolTip(circle){
    var tooltip = document.createElement("DIV")
    tooltip.id = "tooltip"
    tooltip.classList.add("tooltip")
    var text = document.createElement("SPAN")
    text.classList.add("tooltiptext")
    await getUnitInfo(circle.get("id"), text)
    var div = document.getElementById("officeViewDiv")
    div.insertBefore(tooltip, div.firstChild)
    tooltip.appendChild(text)
}
//removes tooltip
function cancelTip(circle){
    var div = document.getElementById("officeViewDiv")
    while(div.firstChild.id == "tooltip"){
        div.removeChild(div.firstChild)
    }
}
//gets information and formats it for tooltip
async function getUnitInfo(num, elem){
     var string = "<br>Unit:   " + num + "<br><br>"  
    await firebase.firestore().collection("Office").doc("officeView").get().then(function(doc){
        if (doc.exists) {
           var name = (doc.data())[[num]].user
            string = string.concat("Employee:   ", name, "<br><br>")

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    })
    var isFaults = false
    string = string.concat("Faults:   ")
    await firebase.firestore().collection("Office").doc("Workorder").collection("workOrder").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(doc.data().section == num){
                string = string.concat(doc.data().itemName, "<br><br>")
                isFaults = true
            }
        })
    })
    if(!isFaults){
        string = string.concat("none<br><br>")
    }
    elem.innerHTML = string
}
// updates color of each unit when work order is processed for a unit
function updateColor(listUnits){
    var objs = fabricCanvas.getObjects()
    var color
    console.log(objs.length)
    for(var i = 0; i < objs.length; i++){
        if(objs[i].get("id") == listUnits.section){
            console.log(listUnits.condition)
            if(listUnits.condition == "Mild")
                color = "yellow"
            else if(listUnits.condition == "Severe")
                color ="red"
            else
                color = "green"
             console.log(color)
             //objs[i].fill = color
             var circ = new fabric.Circle({
                id: objs[i].get("id"),
                left: objs[i].get("left"),
                top: objs[i].get("top"),
                fill: color,
                radius: objs[i].get("radius"),
                opacity: 0.3,
                selectable: false,
            })
            circ.on("mouseover", function(){
                console.log(this.get("id"))
                createToolTip(this)
            })
            circ.on("mouseout", function(){
                cancelTip()
            })
            fabricCanvas.add(circ) 
            fabricCanvas.remove(objs[i]) 
        
            
        }
    }
}

