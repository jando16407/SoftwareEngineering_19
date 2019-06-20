var database;
var submitButton1, submitButton2;
var unitPath1, unitPath2;
var ref1, ref2;
var listContainer1, listContainer2;
var tableUnit1, tableUnit2;
var detailViewPath, detailViewKey, detailView_itemId;
var detailView_itemName, detailView_itemDescription;
var childNodeIndex, childNodePath;

var mainListContainer1;
var mainListContainer2;


firebase_setup();
page_setup();
detailView_setting();
init_tables();
renderTableContents();



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
    submitButton2 = document.getElementById("submitButton2");
    unitPath1 = 'Unit/Unit_001';
    unitPath2 = 'Unit/Unit_002';
    ref1 = database.ref(unitPath1);
    ref2 = database.ref(unitPath2);
}

//Initial rendering of tables
function init_tables(){ 
    //Main Tab setup
    mainListContainer1 = document.createElement('table');
    document.getElementById("mainListUnit1").appendChild(mainListContainer1);
    mainListContainer1.setAttribute('name3', 'itemTable3');
    var listRow_0 = document.createElement('tr');
    var topRow_0 = "<th>ID</th><th>Item Name</th><th>Item Description</th>";
    listRow_0.innerHTML = topRow_0;
    mainListContainer1.appendChild(listRow_0);
    
    //Unit 1 tab setup
    //Create a table for Unit 1
    listContainer1 = document.createElement('table');
    document.getElementById("officeItemList1").appendChild(listContainer1);
    listContainer1.setAttribute('name1', 'itemTable1');
    listContainer1.setAttribute("id", "unit1Table");
    tableUnit1 = document.getElementById("unit1Table");
    let listRow_1 = document.createElement('tr');
    let topRow_1 = "<th>ID</th><th>Item Name</th><th>Item Description</th>";
    listRow_1.innerHTML = topRow_1;
    listContainer1.appendChild(listRow_1);

    //Unit 2 tab setup
    //Create a table for Unit 2
    listContainer2 = document.createElement('table');
    document.getElementById("officeItemList2").appendChild(listContainer2);
    listContainer2.setAttribute('name2', 'itemTable2');
    listContainer2.setAttribute("id", "unit2Table");
    tableUnit2 = document.getElementById("unit2Table");
    let listRow_2 = document.createElement('tr');
    let topRow_2 = "<th>ID</th><th>Item Name</th><th>Item Description</th>";
    listRow_2.innerHTML = topRow_2;
    listContainer2.appendChild(listRow_2);

    //Main tab first rendering
    /*
    ref1.once("value", function(snapshot){
        let items = snapshot.val();
        let keys = Object.keys(items);
        for( let i=0; i<keys.length; ++i ){
            let row = document.createElement('tr');
            let k = keys[i];
            let id = document.createElement('th');
            let name = document.createElement('th');
            let desc = document.createElement('th');
            id.innerHTML = items[k].itemId;
            name.innerHTML = items[k].itemName;
            desc.innerHTML = items[k].itemDescription;
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
            listContainer1.appendChild(row);
        }
    }, gotErr);
*/
    //Unit 1 first rendering
    renderUnit1();

    //Unit 2 first rendering
    renderUnit2();
}

//Error handling
function gotErr(err){
    console.log("Error!!");
    console.log(err);
}

//Detail view setup
function detailView_setting(){
    deleteButton = document.getElementById("deleteButton");
    deleteButton.onclick = function() {
        let deleteRef = database.ref(detailViewPath+'/'+childNodePath);
        deleteRef.remove();
        console.log("Deleted item path is: "+detailViewPath+'/'+childNodePath);
    };
}

/* Initialize Functions End */


/* Rendering funcitons Start */

//Render table, clear the table everytime it's called and display new data
function renderTableContents(path){
    //Renderig for Unit 1
    if(path == unitPath1){
        console.log("Child size = "+listContainer1.children.length);
        while(listContainer1.children.length > 1){
            listContainer1.removeChild(listContainer1.childNodes[1]);
        }
        console.log("Child size = "+listContainer1.children.length);
        renderUnit1();
    }
    else  if(path == unitPath2){
        console.log("Child size = "+listContainer2.children.length);
        while(listContainer2.children.length > 1){
            listContainer2.removeChild(listContainer2.childNodes[1]);
        }
        console.log("Child size = "+listContainer1.children.length);
        renderUnit2();
    }
}

//Update the table for Unit 1
function renderUnit1(){
    ref1.once("value", function(snapshot){
        let items = snapshot.val();
        let keys = Object.keys(items);
        for( let i=0; i<keys.length; ++i ){
            let row = document.createElement('tr');
            let k = keys[i];
            let childNodeId = listContainer1.children.length;
            childNodeId += 100000;
            row.setAttribute("onclick", "itemSelected("+childNodeId+")");
            row.setAttribute("key", keys[i]);
            let id = document.createElement('th');
            let name = document.createElement('th');
            let desc = document.createElement('th');
            id.innerHTML = items[k].itemId;
            name.innerHTML = items[k].itemName;
            desc.innerHTML = items[k].itemDescription;
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
            listContainer1.appendChild(row);
            console.log("node# "+childNodeId);
        }
    }, gotErr);
}

//Update the table for Unit 2
function renderUnit2(){
    ref2.once("value", function(snapshot){
        let items = snapshot.val();
        let keys = Object.keys(items);
        for( let i=0; i<keys.length; ++i ){
            let row = document.createElement('tr');
            let k = keys[i];
            let childNodeId = listContainer2.children.length;
            childNodeId += 200000;
            row.setAttribute("onclick", "itemSelected("+childNodeId+")");
            row.setAttribute("key", keys[i]);
            let id = document.createElement('th');
            let name = document.createElement('th');
            let desc = document.createElement('th');
            id.innerHTML = items[k].itemId;
            name.innerHTML = items[k].itemName;
            desc.innerHTML = items[k].itemDescription;
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
            listContainer2.appendChild(row);
            console.log("node# "+childNodeId);
        }
    }, gotErr);
}

/* Rendering funcitons End */


/* Onclick function start */

//Handle when item in a list is clicked
function itemSelected(id){
    childNodeIndex = id;
    if(100000<=id && id < 200000){
        detailViewPath = 'Unit/Unit_001';
        childNodeIndex -= 100000;
        childNodePath = document.getElementById("unit1Table").childNodes[childNodeIndex].getAttribute("key");
        let detailId = document.getElementById("unit1Table").childNodes[childNodeIndex].cells[0];
        let detailName = document.getElementById("unit1Table").childNodes[childNodeIndex].cells[1];
        let detailDescription = document.getElementById("unit1Table").childNodes[childNodeIndex].cells[2];
////////////        
        console.log(detailId);
        console.log(detailName);
        console.log(detailDescription);
        console.log("Key: "+childNodePath);
        console.log("Clicked childNode#"+childNodeIndex);
////////////
        document.getElementById("detailViewId").textContent = detailId.textContent;
        document.getElementById("detailViewName").textContent = detailName.textContent;
        document.getElementById("detailViewDescription").textContent = detailDescription.textContent;
    } 
    else if(200000<=id && id < 300000){
        detailViewPath = 'Unit/Unit_002'
        childNodeIndex -= 200000;
        childNodePath = document.getElementById("unit2Table").childNodes[childNodeIndex].getAttribute("key");
        let detailId = document.getElementById("unit2Table").childNodes[childNodeIndex].cells[0];
        let detailName = document.getElementById("unit2Table").childNodes[childNodeIndex].cells[1];
        let detailDescription = document.getElementById("unit2Table").childNodes[childNodeIndex].cells[2];
////////////        
        console.log(detailId);
        console.log(detailName);
        console.log(detailDescription);
        console.log("Key: "+childNodePath);
        console.log("Clicked childNode#"+childNodeIndex);
////////////
        document.getElementById("detailViewId").textContent = detailId.textContent;
        document.getElementById("detailViewName").textContent = detailName.textContent;
        document.getElementById("detailViewDescription").textContent = detailDescription.textContent;
    }
}

/* Onclick function end */

/* onClick handlings Start */

//Submit button handling, push data to firebase
submitButton1.onclick = function(){
    let data = {
        itemId: document.getElementById("id1").value,
        itemName: document.getElementById("name1").value,
        itemDescription: document.getElementById("description1").value
    }
    ref1.push(data)
}
submitButton2.onclick = function(){
    let data = {
        itemId: document.getElementById("id2").value,
        itemName: document.getElementById("name2").value,
        itemDescription: document.getElementById("description2").value
    }
    ref2.push(data)
}

/* onClick handlings End */


/* Database modify handling start */

ref1.on("child_changed", function(snapshot){

}, gotErr);

ref1.on("child_removed", function(snapshot){
    console.log("child removed key : "+snapshot.key);
    console.log(Object.keys(snapshot.val()));
    renderTableContents(unitPath1);
}, gotErr);

ref2.on("child_removed", function(snapshot){
    console.log("child removed key : "+snapshot.key);
    console.log(Object.keys(snapshot.val()));
    renderTableContents(unitPath2);
}, gotErr);

/* Database modify handling end */