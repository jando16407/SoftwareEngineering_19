var database;
//var initialInput;
var submitButton1;

var unitPath1;
var messagePath;

var ref1;
var ref2;

var listContainer1;

var mainListContainer1;

var first1 = true;
var first3 = true;


setup();
submitButton1 = document.getElementById("submitButton1");

//unitPath1 = 'notification/Messages';
unitPath1 = 'users/as/messages';


ref1.on("value", got1, gotErr);


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

function got1(data) {
    gotData1(data);
    mainData1(data);
}

/******** Main List ********************************/
function mainData1(data){
    var items = data.val();
    var keys = Object.keys(items);
    console.log(keys);
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
            console.log(row);
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
            console.log(row);
            mainListContainer1.appendChild(row);
    }
    console.log(document.getElementsByName('itemTable3'));

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
