// Initialize Firebase
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
console.log(firebase);

// Get a reference to the database service
var database = firebase.database();

var userId = firebase.auth().currentUser.uid;
console.log("useId = "+userId);
/* Variables */
var pushButton = document.getElementById("submitButton");
pushButton.onclick = function(){
    var itemId = document.getElementById("id");
    var itemName = document.getElementById("name");
    var itemDescription = document.getElementById("description");
    var admin = require("firebase-admin");
    admin.initializeApp(firebaseConfig);

var db = admin.database();

var ref = db.ref("Office_02/");

var usersRef = ref.child("Items");
    var officeId = "Office_01";
    console.log("itemId = " + itemId.value);
    console.log("itemname = " + itemName.value);
    console.log("itemDescription = " + itemDescription.value);
    //writeItemData("Office_02", itemId, itemName, itemDescription);
    writeChildData(itemId, name, desc);
    console.log("success!");
}


/* Functions */
function writeItemData(officeId, itemId, name, desc){
    firebase.database().ref(officeId + '/' + itemId.value).set({
        name: name.value,
        description: desc.value
    });
}





function writeChildData(itemId, name, desc){
    usersRef.child(itemId.value).set({
        Name: name.value,
        Description: desc.value
    });
}