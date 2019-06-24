var database;
//var initialInput;
var submitButton1;
var submitButton2;
//var submitButton3s;
var unitPath1;
var unitPath2;
var ref1;
var ref2;
var ref3;
var listContainer1;
var listContainer2;
var mainListContainer1;
var mainListContainer2;
var first1 = true;
var first2 = true;
var first3 = true;
var first4 = true;
var tableUnit1;
var tableUnit2;
var deleteButton;
var detailViewPath;
var detailViewKey;
var detailView_itemId;
var detailView_itemName;
var detailView_itemDescription;
var childNodeIndex;
var childNodePath;


/* */
firebase_setup();
submitButton1 = document.getElementById("submitButton1");
submitButton2 = document.getElementById("submitButton2");
//submitButton3 = document.getElementById("submitButton3");
unitPath1 = 'Unit/Unit_001';
unitPath2 = 'Unit/Unit_002';
//unitPath1 = 'Office_01';
//unitPath2 = 'Office_01';
ref1 = database.ref(unitPath1);
ref2 = database.ref(unitPath2);
//ref1.on("value", got1, gotErr);
ref1.once("value", listSetup)
ref2.on("value", got2, gotErr);
//ref1.on("child_changed", child_changed(snapshot));
ref1.on("child_changed", function(snapshot){
    console.log("child changed title is : "+snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
ref1.on("child_removed", function(snapshot){
    console.log("child removed key : "+snapshot.key);
    console.log("child removed val : "+snapshot.val());
    console.log("child removed title : "+snapshot.val().title);
    console.log(Object.keys(snapshot.val()));
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
listSetup();
detailView_setting();

/* */
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
//    console.log(firebase);
}

function got1(data) {
    gotData1(data);
    mainData1(data);
}
function got2(data) {
    gotData2(data);
    mainData2(data);
}

/******** Main List ********************************/
function mainData1(data){
    var items = data.val();
    var keys = Object.keys(items);
//    console.log(keys);
    if(first3){
        mainListContainer1 = document.createElement('table');
        document.getElementById("mainListUnit1").appendChild(mainListContainer1);
        mainListContainer1.setAttribute('name3', 'itemTable3');
        var listRow = document.createElement('tr');
        var topRow = "<th>ID</th><th>Item Name</th><th>Item Description</th>";
        listRow.innerHTML = topRow;
        mainListContainer1.appendChild(listRow);
        
        for( var i=0; i<keys.length; ++i ){
            var row = document.createElement('tr');

            var k = keys[i];
            var id = document.createElement('th');
            id.innerHTML = items[k].itemId;
            var name = document.createElement('th');
            name.innerHTML = items[k].itemName;
            var desc = document.createElement('th');
            desc.innerHTML = items[k].itemDescription;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
//            console.log(row);
            mainListContainer1.appendChild(row);
        }
    first3 = false;
    }
    else{
        var row = document.createElement('tr');

            var k = keys[keys.length-1];
            var id = document.createElement('th');
            id.innerHTML = items[k].itemId;
            var name = document.createElement('th');
            name.innerHTML = items[k].itemName;
            var desc = document.createElement('th');
            desc.innerHTML = items[k].itemDescription;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
//            console.log(row);
            mainListContainer1.appendChild(row);
    }
//    console.log(document.getElementsByName('itemTable3'));

}

function mainData2(data){
    var items = data.val();
    var keys = Object.keys(items);
//    console.log(keys);
    if(first4){
        mainListContainer2 = document.createElement('table');
        document.getElementById("mainListUnit2").appendChild(mainListContainer2);
        mainListContainer2.setAttribute('name4', 'itemTable4');
        var listRow = document.createElement('tr');
        var topRow = "<th>ID</th><th>Item Name</th><th>Item Description</th>";
        listRow.innerHTML = topRow;
        mainListContainer2.appendChild(listRow);
        
        for( var i=0; i<keys.length; ++i ){
            var row = document.createElement('tr');

            var k = keys[i];
            var id = document.createElement('th');
            id.innerHTML = items[k].itemId;
            var name = document.createElement('th');
            name.innerHTML = items[k].itemName;
            var desc = document.createElement('th');
            desc.innerHTML = items[k].itemDescription;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
//            console.log(row);
            mainListContainer2.appendChild(row);
        }
    first4 = false;
    }
    else{
        var row = document.createElement('tr');

            var k = keys[keys.length-1];
            var id = document.createElement('th');
            id.innerHTML = items[k].itemId;
            var name = document.createElement('th');
            name.innerHTML = items[k].itemName;
            var desc = document.createElement('th');
            desc.innerHTML = items[k].itemDescription;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
//            console.log(row);
            mainListContainer2.appendChild(row);
    }
//    console.log(document.getElementsByName('itemTable4'));

}


/******** Tab1 (Unit 1) ********************************/
submitButton1.onclick = function(){
    var data = {
        itemId: document.getElementById("id1").value,
        itemName: document.getElementById("name1").value,
        itemDescription: document.getElementById("description1").value
    }
//    console.log(data);
    var result = ref1.push(data)
//    console.log(result.key);
}

function gotData1(data){
    //console.log(data.val());
    var items = data.val();
    var keys = Object.keys(items);
    //console.log('keys'+keys);
    //console.log(document.getElementsByName('itemTable'));
    if(first1){
        listContainer1 = document.createElement('table');
        document.getElementById("officeItemList1").appendChild(listContainer1);
        listContainer1.setAttribute('name1', 'itemTable1');
        listContainer1.setAttribute("id", "unit1Table");
        tableUnit1 = document.getElementById("unit1Table");
        var listRow = document.createElement('tr');
        var topRow = "<th>ID</th><th>Item Name</th><th>Item Description</th>";
        listRow.innerHTML = topRow;
        listContainer1.appendChild(listRow);
        
    //console.log(document.getElementsByName('itemTable'));
    
    //console.log(document.getElementsByName('itemTable'));
    //Clear the table by removing all table elements
//    while(listContainer.firstChild){
//        listContainer.removeChild(listContainer.firstChild);
//    }
    //console.log(document.getElementsByName('itemTable'));
    

        for( var i=0; i<keys.length; ++i ){
            var row = document.createElement('tr');
            //var unit1row = "unit1row"+i;
            //console.log(unit1row);
            i += 100000;
            
        
            row.setAttribute("id", i);
            //Set child node id start
            let childNodeId = listContainer1.children.length;
            childNodeId += 100000;
            row.setAttribute("onclick", "itemSelected("+childNodeId+")");
            //setting child node id end
            console.log("node# "+childNodeId);
            console.log("Id = "+row.getAttribute("id"));
            i -= 100000;

            var k = keys[i];
            row.setAttribute("key", keys[i]);
            var id = document.createElement('th');
            //id.innerHTML = items[k].itemId;
            id.textContent = items[k].itemId;
            var name = document.createElement('th');
            //name.innerHTML = items[k].itemName;
            name.textContent = items[k].itemName;
            var desc = document.createElement('th');
            //desc.innerHTML = items[k].itemDescription;
            desc.textContent = items[k].itemDescription;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
//            console.log(row);
            listContainer1.appendChild(row);
            
        }
    first1 = false;
    }
    else{
        var row = document.createElement('tr');

            var k = keys[keys.length-1];
            var id = document.createElement('th');
            id.innerHTML = items[k].itemId;
            var name = document.createElement('th');
            name.innerHTML = items[k].itemName;
            var desc = document.createElement('th');
            desc.innerHTML = items[k].itemDescription;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
//            console.log(row);
            listContainer1.appendChild(row);
    }
//    console.log(document.getElementsByName('itemTable1'));

}

function gotErr(err){
    console.log("Error!");
    console.log(err);
}

/******** Tab2 (Unit 2) ********************************/
submitButton2.onclick = function(){
    var data = {
        itemId: document.getElementById("id2").value,
        itemName: document.getElementById("name2").value,
        itemDescription: document.getElementById("description2").value
    }
//    console.log(data);
    var result = ref2.push(data)
//    console.log(result.key);
}

function gotData2(data){
    var items = data.val();
    var keys = Object.keys(items);
//    console.log(keys);
    if(first2){
        listContainer2 = document.createElement('table');
        document.getElementById("officeItemList2").appendChild(listContainer2);
        listContainer2.setAttribute('name2', 'itemTable2');
        var listRow = document.createElement('tr');
        var topRow = "<th>ID</th><th>Item Name</th><th>Item Description</th>";
        listRow.innerHTML = topRow;
        listContainer2.appendChild(listRow);
        
        for( var i=0; i<keys.length; ++i ){
            var row = document.createElement('tr');

            var k = keys[i];
            var id = document.createElement('th');
            id.innerHTML = items[k].itemId;
            var name = document.createElement('th');
            name.innerHTML = items[k].itemName;
            var desc = document.createElement('th');
            desc.innerHTML = items[k].itemDescription;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
//            console.log(row);
            listContainer2.appendChild(row);
        }
    first2 = false;
    }
    else{
        var row = document.createElement('tr');

            var k = keys[keys.length-1];
            var id = document.createElement('th');
//            id.innerHTML = items[k].itemId;
            var name = document.createElement('th');
            name.innerHTML = items[k].itemName;
            var desc = document.createElement('th');
            desc.innerHTML = items[k].itemDescription;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
//            console.log(row);
            listContainer2.appendChild(row);
    }
//    console.log(document.getElementsByName('itemTable1'));

}

function gotErr(err){
    console.log("Error!");
    console.log(err);
}

//tableUnit1 = document.getElementById("unit1Table");
if( tableUnit1 != null ){
    console.log("In the for loop");
    for( var i=1; i<tableUnit1.rows.length; ++i ){
        tableUnit1.onclick = function()
        {
            console.log("Clicked : "+this.cells[0].innerHTML);
            //document.getElementById("detdetailViewId").value = this.cells[0].innerHTML;
        }
    }
}

function listSetup(){
    //Create a table for Unit 1
    listContainer1 = document.createElement('table');
//    document.getElementById("officeItemList1").appendChild(listContainer1);
    listContainer1.setAttribute('name1', 'itemTable1');
    listContainer1.setAttribute("id", "unit1Table");
    tableUnit1 = document.getElementById("unit1Table");
    let listRow = document.createElement('tr');
    let topRow = "<th>ID</th><th>Item Name</th><th>Item Description</th>";
    listRow.textContent = topRow;
    listContainer1.appendChild(listRow);
}

function itemSelected(id){
//    let itemId = id;
    childNodeIndex = id;

    

    if(100000<=id && id < 200000){
//        console.log(document.getElementById(itemId).cells[0]);
//        console.log(document.getElementById(itemId).cells[1]);
//        console.log(document.getElementById(itemId).cells[2]);
    childNodeIndex -= 100000;
        childNodePath = document.getElementById("unit1Table").childNodes[childNodeIndex].getAttribute("key");
        let detailId = document.getElementById("unit1Table").childNodes[childNodeIndex].cells[0];
        let detailName = document.getElementById("unit1Table").childNodes[childNodeIndex].cells[1];
        let detailDescription = document.getElementById("unit1Table").childNodes[childNodeIndex].cells[2];

        console.log(detailId);
        console.log(detailName);
        console.log(detailDescription);
        console.log("Key: "+childNodePath);
        
        console.log("Clicked childNode#"+childNodeIndex);

        document.getElementById("detailViewId").textContent = detailId.textContent;
        document.getElementById("detailViewName").textContent = detailName.textContent;
        document.getElementById("detailViewDescription").textContent = detailDescription.textContent;

        
        detailViewPath = 'Unit/Unit_001'
        //detailViewKey = 
//        detailView_itemId = document.getElementById(itemId).cells[0].innerHTML;
//      document.getElementById("detailViewId").innerHTML = detailView_itemId;
//      detailView_itemName = document.getElementById(itemId).cells[1].innerHTML;
//        document.getElementById("detailViewName").innerHTML = detailView_itemName;
//        detailView_itemDescription = document.getElementById(itemId).cells[2].innerHTML;
//        document.getElementById("detailViewDescription").innerHTML = detailView_itemDescription;
//        itemId -= 100000;
//        console.log("Clicked : "+itemId);
        
//        console.log("childNode#"+childNodeId);
        //console.log("key = "+);
        
        
    }
    else if(200000<=id && id < 300000)
        console.log("Clicked : "+id-200000);
    else
        console.log("not working");
}

//Reder the list
function displayList(data, listContainer){
    let items = data.val();
    let keys = Object.keys(items);



}


//Detail view setup
function detailView_setting(){
    deleteButton = document.getElementById("deleteButton");
    deleteButton.onclick = function() {
       // e.stopPropagation();
       // let id = e.target.parentElement
        let deleteRef = database.ref(detailViewPath+'/'+childNodePath);
        deleteRef.remove();
        console.log(detailViewPath+'/'+childNodePath);
    };

}

//Display detail view table on left and right


//Real time listner
database.collection('Unit/Unit_001').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    console.log('changes here=>'+changes);
    
});
