var database;
var announcementsPath, ref;
var submitButton1;


firebase_setup();
page_setup();
init_tables();
renderListen();


/* Initialize Functions Start */

//Basic firebase setups
function firebase_setup(){
    var firebaseConfig = {
        apiKey: "AIzaSyB0ZY93KxJK4UIRVnyXWqNm2V1l1M-4j_4",
        authDomain: "office-inventory-12f99.firebaseapp.com",
        databaseURL: "https://office-inventory-12f99.firebaseio.com",
        projectId: "office-inventory-12f99",
        storageBucket: "office-inventory-12f99.appspot.com",
        messagingSenderId: "147848186588",
        appId: "1:147848186588:web:33dbc8d727af1de4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
}

//initial setup for the page
function page_setup(){
    submitButton1 = document.getElementById("submitButton1");
    announcementsPath = "Announcements"
    ref = database.ref(announcementsPath);
}

//Initial rendering of tables
function init_tables(){ 
    //Main Tab setup
    masterListContainer = document.createElement('table');
    document.getElementById("masterItemList").appendChild(masterListContainer);
    masterListContainer.setAttribute('name0', 'itemTable0');
    masterListContainer.setAttribute("id", "masterTable");
    tableMaster = document.getElementById("masterTable");
    var listRow_0 = document.createElement('tr');
    var topRow_0 = "<th>Unit</th><th>ID</th><th>Item Name</th><th>Item Description</th>";
    listRow_0.innerHTML = topRow_0;
    masterListContainer.appendChild(listRow_0);
}

//Error handling
function gotErr(err){
    console.log("Error!!");
    console.log(err);
}

/* Initialize Functions End */

/* Rendering funcitons Start */

//Render table, clear the table everytime it's called and display new data
function renderTableContents(path){
    //Rendering for MasterList
    if(path == masterPath){
        while(masterListContainer.children.length > 1){
            masterListContainer.removeChild(masterListContainer.childNodes[1]);
        }
        renderMasterList();
    }
    //Rendering for Unit 1
    else if(path == unitPath1){
        while(listContainer1.children.length > 1){
            listContainer1.removeChild(listContainer1.childNodes[1]);
        }
        renderUnit1();
    }
    //Rendering for Unit 2
    else  if(path == unitPath2){
        while(listContainer2.children.length > 1){
            listContainer2.removeChild(listContainer2.childNodes[1]);
        }
        renderUnit2();
    }
}

//Update the table for masterList
function renderMasterList(){
    refAdmin.once("value", function(snapshot){
        let items = snapshot.val();
        let keys = Object.keys(items);
        for( let i=0; i<keys.length; ++i ){
            let row = document.createElement('tr');
            let k = keys[i];
            let childNodeId = masterListContainer.children.length;
            let deletePath = items[k].UnitPath+"/"+items[k].ItemKey;
            row.addEventListener("click", function(){
                itemSelected(childNodeId, deletePath);
            });
            row.setAttribute("key", keys[i]);
            let unit = document.createElement('th');
            let id = document.createElement('th');
            let name = document.createElement('th');
            let desc = document.createElement('th');
            unit.innerHTML = items[k].UnitNum;
            id.innerHTML = items[k].itemId;
            name.innerHTML = items[k].itemName;
            desc.innerHTML = items[k].itemDescription;
            row.appendChild(unit);
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
            masterListContainer.appendChild(row);
        }
    }, gotErr);
}

/* Rendering funcitons End */

/* onClick handlings Start */

//Submit button handling, push data to firebase
submitButton1.onclick = function(){
    //Push data to Unit
    let data = {
        itemId: document.getElementById("id1").value,
        itemName: document.getElementById("name1").value,
        itemDescription: document.getElementById("description1").value,
    }
    ref1.push(data)
    //Push data to MasterList
    let masterData = {
        itemId: document.getElementById("id1").value,
        itemName: document.getElementById("name1").value,
        itemDescription: document.getElementById("description1").value,
        UnitNum : "001",
        UnitPath : unitPath1,
        ItemKey : newItemKey
    }
    refAdmin.push(masterData);
    //update unit with master key
    database.ref(unitPath1+"/"+newItemKey).set({
        itemId: document.getElementById("id1").value,
        itemName: document.getElementById("name1").value,
        itemDescription: document.getElementById("description1").value,
        masterKey : newItemKey2
    });
}

/* onClick handlings End */

/* Database modify handling start */

//Listen to any value changes on the database
function renderListen(){
    //Any item modification, adding, deleting will update the 
    //list in MasterList
    refAdmin.on("value", function(snapshot){
        renderTableContents(masterPath);
    }, gotErr);
    //Any item modification, adding, deleting will update the 
    //list in unit 1
    ref1.on("value", function(snapshot){
        renderTableContents(unitPath1);
    }, gotErr);
    //Any item modification, adding, deleting will update the 
    //list in unit 2
    ref2.on("value", function(snapshot){
        renderTableContents(unitPath2);
    }, gotErr);
    //when item is added to masterlist
    refAdmin.on("child_added", function(snapshot){
        newItemKey2 = snapshot.key;
    }, gotErr);
    //when item is added to unit 1
    ref1.on("child_added", function(snapshot){
        newItemKey = snapshot.key;
    }, gotErr);
    //when item is added to unit 2
    ref2.on("child_added", function(snapshot){
        newItemKey = snapshot.key;
    }, gotErr);
}

/* Database modify handling end */

