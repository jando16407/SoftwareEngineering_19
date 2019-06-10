var database;
var initialInput;
var submitButton;
var officePath;
var ref;
var listContainer;
var first = true;



/* */
setup();
submitButton = document.getElementById("submitButton");
officePath = 'Office_01';
ref = database.ref(officePath);
ref.on("value", gotData, gotErr);

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


submitButton.onclick = function(){
    var data = {
        itemId: document.getElementById("id").value,
        itemName: document.getElementById("name").value,
        itemDescription: document.getElementById("description").value
    }
    console.log(data);
    var result = ref.push(data)
    console.log(result.key);
}

function gotData(data){
    //console.log(data.val());
    var items = data.val();
    var keys = Object.keys(items);
    console.log(keys);
    //console.log(document.getElementsByName('itemTable'));
    if(first){
        listContainer = document.createElement('table');
        document.getElementById("officeItemList").appendChild(listContainer);
        listContainer.setAttribute('name', 'itemTable');
        var listRow = document.createElement('tr');
        var topRow = "<th>ID</th><th>Item Name</th><th>Item Description</th>";
        listRow.innerHTML = topRow;
        listContainer.appendChild(listRow);
        
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
            listContainer.appendChild(row);
        }
    first = false;
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
            listContainer.appendChild(row);
    }
    console.log(document.getElementsByName('itemTable'));

}

function gotErr(err){
    console.log("Error!");
    console.log(err);
}

//function displayList()