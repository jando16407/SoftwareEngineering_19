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
var first1 = true;
var first2 = true;



/* */
setup();
submitButton1 = document.getElementById("submitButton1");
submitButton2 = document.getElementById("submitButton2");
//submitButton3 = document.getElementById("submitButton3");
unitPath1 = 'Unit/Unit_001';
unitPath2 = 'Unit/Unit_002';
//unitPath1 = 'Office_01';
//unitPath2 = 'Office_01';
ref1 = database.ref(unitPath1);
ref2 = database.ref(unitPath2);
ref1.on("value", gotData1, gotErr);
ref2.on("value", gotData2, gotErr);

/* */
function setup(){
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
    console.log(firebase);
}

/******** Main List ********************************/
function gotData2(data){
    var items = data.val();
    var keys = Object.keys(items);
    console.log(keys);
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
            console.log(row);
            listContainer2.appendChild(row);
        }
    first2 = false;
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
            console.log(row);
            listContainer2.appendChild(row);
    }
    console.log(document.getElementsByName('itemTable1'));

}

function gotData2(data){
    var items = data.val();
    var keys = Object.keys(items);
    console.log(keys);
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
            console.log(row);
            listContainer2.appendChild(row);
        }
    first2 = false;
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
            console.log(row);
            listContainer2.appendChild(row);
    }
    console.log(document.getElementsByName('itemTable1'));

}


/******** Tab1 (Unit 1) ********************************/
submitButton1.onclick = function(){
    var data = {
        itemId: document.getElementById("id1").value,
        itemName: document.getElementById("name1").value,
        itemDescription: document.getElementById("description1").value
    }
    console.log(data);
    var result = ref1.push(data)
    console.log(result.key);
}

function gotData1(data){
    //console.log(data.val());
    var items = data.val();
    var keys = Object.keys(items);
    console.log(keys);
    //console.log(document.getElementsByName('itemTable'));
    if(first1){
        listContainer1 = document.createElement('table');
        document.getElementById("officeItemList1").appendChild(listContainer1);
        listContainer1.setAttribute('name1', 'itemTable1');
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

            var k = keys[i];
            var id = document.createElement('th');
            id.innerHTML = items[k].itemId;
            var name = document.createElement('th');
            name.innerHTML = items[k].itemName;
            var desc = document.createElement('th');
            desc.innerHTML = items[k].itemDescription;

    /*        var data = {
                name: items[k].itemName,
                id: items[k].itemId,
                desc: items[k].itemDescription
            }
    */        
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(desc);
            console.log(row);
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
            console.log(row);
            listContainer1.appendChild(row);
    }
    console.log(document.getElementsByName('itemTable1'));

}

function gotErr(err){
    console.log("Error!");
    console.log(err);
}

/******** Tab1 (Unit 2) ********************************/
submitButton2.onclick = function(){
    var data = {
        itemId: document.getElementById("id2").value,
        itemName: document.getElementById("name2").value,
        itemDescription: document.getElementById("description2").value
    }
    console.log(data);
    var result = ref2.push(data)
    console.log(result.key);
}

function gotData2(data){
    var items = data.val();
    var keys = Object.keys(items);
    console.log(keys);
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
            console.log(row);
            listContainer2.appendChild(row);
        }
    first2 = false;
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
            console.log(row);
            listContainer2.appendChild(row);
    }
    console.log(document.getElementsByName('itemTable1'));

}

function gotErr(err){
    console.log("Error!");
    console.log(err);
}


//function displayList()