//var database;
var submitButton1, submitButton2;
var unitPath1, unitPath2, masterPath;
var ref1, ref2, refAdmin;
var ref1_L, ref2_L;
var masterListContainer, listContainer1, listContainer2;
var tableMaster, tableUnit1, tableUnit2;
var detailViewPath, detailViewKey, detailView_itemId;
var detailView_itemName, detailView_itemDescription;
var detailView_UnitPath;
var childNodeIndex, childNodePath;
var newItemKey, newItemKey2, detailViewDeleteItemPath;


var database;
var officeViewRef;  //Database ref to OfficeView
var numOfUnits;     //Nuber of units stored on database
var unitNameArray =[];  //Names of units stored on database
var itemListTabButtonContainer; //mark to display itemListTabButtons
var itemListTabContainer;       //mark to display itemListTabsContents
//var itemListContents;           //mark to display tab contents
var tabButtons = [];    //Stores Tab buttons dynamically for item list
var tabContentsFrame = [];      //Stores Tab contents most outer div dynamically for item list
var tabContentsItemList = [];   //Stores Tab contents actual list dynamically for item list
var tabContentsItemTableContainer = [];  //Stores Table contents dynamically for item list


firebase_setup();
page_setup();
get_unit_info();
//detailView_setting();
//init_tables();
//renderListen();




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
    database = firebase.firestore();
    console.log("01 Firebase set up done...");
}

//initial setup for the page
function page_setup(){
    officeViewRef = database.collection('Office').doc('officeView');
    itemListTabButtonContainer = document.getElementById('ItemListTabContainer');
    itemListTabContainer = document.getElementById('ItemListTabContents');
//    itemListContents = document.getElementById('ItemListTabContents');
    //console.log("itemListTabContainer = "+itemListTabContainer);
    console.log("02 Page setup done...")
}

//Get unit information and create units dynamically
async function get_unit_info(){
    await officeViewRef.get().then(function(doc) {
        if(doc.exists){
            //Get number of units
            numOfUnits = doc.data().Units.length;
            console.log("Number of Units: "+numOfUnits);
            //Get unit's name and store it in an array
            for( let i=0; i<numOfUnits; i++ ){
                unitNameArray[i] = doc.data().Units[i];
                //console.log(unitNameArray[i]);
            }
        } 
        else {
            console.log("No such document");
        }
    }).catch(function(error) {
        console.log('Error: ');
    });
    console.log("03 Get unit info done...")
    await init_tabs();
    await init_tables();
    await document.getElementsByClassName("tablink")[0].click();
    await document.getElementsByClassName("tttabbb")[0].click();
}



/*
function page_setup(){
    submitButton1 = document.getElementById("submitButton1");
    submitButton2 = document.getElementById("submitButton2");
    unitPath1 = 'Unit/Unit_001';
    unitPath2 = 'Unit/Unit_002';
    masterPath = 'MasterList';
    ref1 = database.ref(unitPath1);
    ref2 = database.ref(unitPath2);
    refAdmin = database.ref(masterPath);
}
*/

//Dynamically create tabs
function init_tabs(){
    //Add Main List tab
    tabButtons[0]= document.createElement('button');
    console.log("tubButtons[0] = "+tabButtons[0]);
    tabButtons[0].setAttribute('class', 'w3-bar-item w3-button tablink');
    tabButtons[0].onclick = function(){
        openLink(event, 'MainFrameList');
    };
    tabButtons[0].innerHTML = 'Main List';
    itemListTabButtonContainer.appendChild(tabButtons[0]);
    //Iterate through units and create new tabs dynamically
    for( let i=1; i<numOfUnits+1; i++ ){
        tabButtons[i] = document.createElement('button');
        tabButtons[i].setAttribute('class', 'w3-bar-item w3-button tablink');
        tabButtons[i].onclick = function(){
            openLink(event, unitNameArray[i-1]+'FrameList');
        };
        tabButtons[i].innerHTML = unitNameArray[i-1];
        itemListTabButtonContainer.appendChild(tabButtons[i]);
        //console.log("Added tab: "+tabButtons[i]);
    }
    console.log("04 Init tab done...");
}

//Initial rendering of tables
function init_tables(){
    //Init the Main List tab first
    //the most outer div
    tabContentsFrame[0] = document.createElement('div');
    tabContentsFrame[0].setAttribute('id', 'MainFrameList');
    tabContentsFrame[0].setAttribute('class', 'w3-container w3-white w3-padding-16 myLink');
    //Inside div1
    let div1 = document.createElement('div');
    div1.setAttribute('style', 'display: inline-block;');
    let tabContentsTitle = document.createElement('h3');
    tabContentsTitle.innerHTML = 'Main Inventory Item List';
    //Inside div2
    let div2 = document.createElement('div');
    div2.setAttribute('style', 'height: 320px; overflow: scroll; width: 800px;');
    //Inside <p>
    tabContentsItemList[0] = document.createElement('p');
    tabContentsItemList[0].setAttribute('id', 'masterItemList');
    //Inside Table setup
    tabContentsItemTableContainer[0] = document.createElement('table');
    tabContentsItemList[0].appendChild(tabContentsItemTableContainer[0]);
    tabContentsItemTableContainer[0].setAttribute('id', 'masterTable');
    let listRow = document.createElement('tr');
    let topRow = "<th>Unit</th><th>ID</th><th>Name</th><th>Quantity</th><th>Assign</th><th>Item Description</th>";
    listRow.innerHTML = topRow;
    tabContentsItemTableContainer[0].appendChild(listRow);

    //Put everything together
    div2.appendChild(tabContentsItemList[0]);
    div1.appendChild(tabContentsTitle);
    div1.appendChild(div2);
    tabContentsFrame[0].appendChild(div1);
    itemListTabContainer.appendChild(tabContentsFrame[0]);

    /* Example HTML 
    <div id="MainList" class="w3-container w3-white w3-padding-16 myLink">
        <div style="display: inline-block">
            <h3>Main Inventory Item List</h3>
            <!-- Item List -->
            <div style="height: 320px; overflow: scroll; width: 800px;">
                <p id="masterItemList"></p>
            </div>
        </div>
    </div>
    */
    for( let i=1; i<numOfUnits+1; i++ ){
       //the most outer div
        tabContentsFrame[0] = document.createElement('div');
        tabContentsFrame[0].setAttribute('id', unitNameArray[i-1]+'FrameList');
        console.log("FRAME NAME = "+unitNameArray[i-1]+'FrameList');
        tabContentsFrame[0].setAttribute('class', 'w3-container w3-white w3-padding-16 myLink');
        //Inside div1
        let div1 = document.createElement('div');
        div1.setAttribute('style', 'display: inline-block;');
        let tabContentsTitle = document.createElement('h3');
        tabContentsTitle.innerHTML = unitNameArray[i-1]+' Item List';
        //Inside div2
        let div2 = document.createElement('div');
        div2.setAttribute('style', 'height: 320px; overflow: scroll; width: 800px;');
        //Inside <p>
        tabContentsItemList[0] = document.createElement('p');
        tabContentsItemList[0].setAttribute('id', unitNameArray[i-1]+'ItemList');
        //Inside Table setup
        tabContentsItemTableContainer[0] = document.createElement('table');
        tabContentsItemList[0].appendChild(tabContentsItemTableContainer[0]);
        tabContentsItemTableContainer[0].setAttribute('id', unitNameArray[i-1]+'Table');
        let listRow = document.createElement('tr');
        let topRow = "<th>ID</th><th>Name</th><th>Quantity</th><th>Assign</th><th>Item Description</th>";
        listRow.innerHTML = topRow;
        tabContentsItemTableContainer[0].appendChild(listRow);

        //Put everything together
        div2.appendChild(tabContentsItemList[0]);
        div1.appendChild(tabContentsTitle);
        div1.appendChild(div2);
        tabContentsFrame[0].appendChild(div1);
        itemListTabContainer.appendChild(tabContentsFrame[0]);
    }
/*
    for( let i=1; i<numOfUnits+1; i++ ){
        //the most outer div
    tabContentsFrame[i] = document.createElement('div');
    tabContentsFrame[i].setAttribute('id', unitNameArray[i+1]+'FrameList');
    tabContentsFrame[i].setAttribute('class', 'w3-container w3-white w3-padding-16 myLink');
    tabContentsFrame[i].setAttribute('style', 'display: block;');
    //Inside div1
    let div1 = document.createElement('div');
    div1.setAttribute('style', 'display: inline-block');
    let tabContentsTitle = unitNameArray[i+1]+' Item List';
    //Inside div2
    let div2 = document.createElement('div');
    div2.setAttribute('style', 'height: 320px; overflow: scroll; width: 800px;');
    //Inside <p>
    tabContentsItemList[i] = document.createElement('p');
    tabContentsItemList[i].setAttribute('id', unitNameArray[i+1]+'ItemList');
    //Inside Table setup
    tabContentsItemTable[i] = document.createElement('table');
    
    tabContentsItemList[i].appendChild(tabContentsItemTable[i]);
    div2.innerHTML = tabContentsItemList[i];
    div1.innerHTML = tabContentsTitle + div2;
    tabContentsFrame[i].innerHTML = div1;
    tabContentsFrame[i].setAttribute("id", unitNameArray[i+1]+"Table");
    let listRow = document.createElement('tr');
    let topRow = "<th>ID</th><th>Name</th><th>Quantity</th><th>Assign</th><th>Item Description</th>";
    listRow.innerHTML = topRow;
    tabContentsItemTable[i].appendChild(listRow);
    itemListContents.innerHTML = itemListContents.innerHTML + tabContentsItemTable[i];
    }
    */
    console.log("Init table done...");
}
/*
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
    
    //Unit 1 tab setup
    //Create a table for Unit 1
    listContainer1 = document.createElement('table');
    document.getElementById("officeItemList1").appendChild(listContainer1);
    listContainer1.setAttribute('name1', 'itemTable1');
    listContainer1.setAttribute("id", "unit1Table");
    tableUnit1 = document.getElementById("unit1Table");
    let listRow_1 = document.createElement('tr');
    let topRow_1 = "<th>ID</th><th>Name</th><th>Quantity</th><th>Assign</th><th>Item Description</th>";
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
}
*/
//Error handling
function gotErr(err){
    console.log("Error!!");
    console.log(err);
}

//Detail view setup
function detailView_setting(){
    //Delete button funciton setup
    let deleteButton = document.getElementById("deleteButton");
    deleteButton.onclick = function() {
        if(detailViewPath != ""){
            //Delete for masterlist
            if(detailViewPath == masterPath){
                console.log("Master");
                //Delete items in each unit as well
                database.ref(detailViewDeleteItemPath).remove();
                let deleteRef = database.ref(detailViewPath+'/'+childNodePath);
                deleteRef.remove();
            }
            //Delete for all other unit
            else {
                console.log("Other");
                database.ref(detailViewDeleteItemPath).remove();
                let deleteRef = database.ref(detailViewPath+'/'+childNodePath);
                deleteRef.remove();
                console.log("deleteRef = "+deleteRef);
                console.log("detailViewDeletePath = "+detailViewDeleteItemPath);
            }
            //let deleteRef = database.ref(detailViewPath+'/'+childNodePath);
            //deleteRef.remove();
            //Clear path of DetailView Table and others
            document.getElementById("detailViewTable").setAttribute("path", "");
            detailViewPath = "";
            childNodePath = "";
            //Clear childnode values
            childNodeIndex = 0;
            //clear itemkeys
            newItemKey = "";
            newItemKey2 = "";
            //Clear values of detailView elements
            document.getElementById("detailViewId").value = "";
            document.getElementById("detailViewName").value = "";
            document.getElementById("detailViewDescription").value = "";
            detailViewDeleteItemKey = "";
        }
    };
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
            let deletePath = masterPath+'/'+items[k].masterKey;
            row.addEventListener("click", function(){
                itemSelected(childNodeId, deletePath);
            });
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
            let deletePath = masterPath+'/'+items[k].masterKey;
            row.addEventListener("click", function(){
                itemSelected(childNodeId, deletePath);
            });
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
        }
    }, gotErr);
}


/* Rendering funcitons End */


/* Onclick function start */

//Handle when item in a list is clicked
function itemSelected(id, deletePath){
    
    childNodeIndex = id;
    detailViewDeleteItemPath = deletePath;
    //when item is in masterlist
    if(0<=id && id < 100000){
        detailViewPath = masterPath;
        childNodePath = document.getElementById("masterTable").childNodes[childNodeIndex].getAttribute("key");
        let detailId = document.getElementById("masterTable").childNodes[childNodeIndex].cells[1];
        let detailName = document.getElementById("masterTable").childNodes[childNodeIndex].cells[2];
        let detailDescription = document.getElementById("masterTable").childNodes[childNodeIndex].cells[3];
////////////        
        console.log(detailId);
        console.log(detailName);
        console.log(detailDescription);
        console.log("Key: "+childNodePath);
        console.log("Clicked childNode#"+childNodeIndex);
////////////
        //Set the path of detail view
        document.getElementById("detailViewTable").setAttribute("path", detailViewPath);
        //Set values
        document.getElementById("detailViewId").value = detailId.textContent;
        document.getElementById("detailViewName").value = detailName.textContent;
        document.getElementById("detailViewDescription").value = detailDescription.textContent;
        //Detect Changes
        document.getElementById("detailViewId").onchange = detailViewItemChangedMaster;
        document.getElementById("detailViewName").onchange = detailViewItemChangedMaster;
        document.getElementById("detailViewDescription").onchange = detailViewItemChangedMaster;
        //set delete path of the item
        //detailViewDeleteItemPath = deletePath;
    }
    //when item is in unit 1
    else if(100000<=id && id < 200000){
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
        //Set the path of detail view
        document.getElementById("detailViewTable").setAttribute("path", detailViewPath+"/"+childNodePath);
        //Set values
        document.getElementById("detailViewId").value = detailId.textContent;
        document.getElementById("detailViewName").value = detailName.textContent;
        document.getElementById("detailViewDescription").value = detailDescription.textContent;
        //Detect Changes
        document.getElementById("detailViewId").onchange = detailViewItemChanged;
        document.getElementById("detailViewName").onchange = detailViewItemChanged;
        document.getElementById("detailViewDescription").onchange = detailViewItemChanged;
    } 
    //when item is in unit 2
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
        //Set the path of detail view
        document.getElementById("detailViewTable").setAttribute("path", detailViewPath+"/"+childNodePath);
        //Set values
        document.getElementById("detailViewId").value = detailId.textContent;
        document.getElementById("detailViewName").value = detailName.textContent;
        document.getElementById("detailViewDescription").value = detailDescription.textContent;
        //Detect Changes
        document.getElementById("detailViewId").onchange = detailViewItemChanged;
        document.getElementById("detailViewName").onchange = detailViewItemChanged;
        document.getElementById("detailViewDescription").onchange = detailViewItemChanged;
    }
}


/* Onclick function end */

/* onClick handlings Start */

//Submit button handling, push data to firebase
/*
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
submitButton2.onclick = function(){
    //Push data to Unit
    let data = {
        itemId: document.getElementById("id2").value,
        itemName: document.getElementById("name2").value,
        itemDescription: document.getElementById("description2").value,
    }
    ref2.push(data)
    //Push data to MasterList
    let masterData = {
        itemId: document.getElementById("id2").value,
        itemName: document.getElementById("name2").value,
        itemDescription: document.getElementById("description2").value,
        UnitNum : "002",
        UnitPath : unitPath2,
        ItemKey : newItemKey
    }
    refAdmin.push(masterData);
    //update unit with master key
    database.ref(unitPath2+"/"+newItemKey).set({
        itemId: document.getElementById("id2").value,
        itemName: document.getElementById("name2").value,
        itemDescription: document.getElementById("description2").value,
        masterKey : newItemKey2
    });
}
*/
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

function detailViewItemChangedMaster(){
    if(document.getElementById("detailViewTable").getAttribute("path") != ""){
        let unitNodePath;
        //Modify master list and it'll return the unit's unique ID
        unitNodePath = modifyMasterList(masterPath, childNodePath);
        //console.log("ItemKey: "+unitNodePath);
        //console.log("Path: "+detailView_UnitPath);
        
        //Then modify unit list
        modifyUnitList(detailView_UnitPath, unitNodePath);
    }
}

function detailViewItemChanged(){
    if(document.getElementById("detailViewTable").getAttribute("path") != ""){
        /*console.log("Change detected");
        let path = document.getElementById("detailViewTable").getAttribute("path");
        console.log("Path = "+path);
        database.ref(path).set({
            itemId : document.getElementById("detailViewId").value,
            itemName : document.getElementById("detailViewName").value,
            itemDescription : document.getElementById("detailViewDescription").value,
        });*/
        let unitNodePath;
        //Modify unit list first
        unitNodePath = modifyUnitList(detailViewPath, childNodePath);

        //Modify masterlist
        modifyMasterList(detailView_UnitPath, unitNodePath)
    }
}

function modifyMasterList(mPath, cPath){
        console.log("Modifing MaterList");
        let path = mPath;
        let itemPath = cPath;
        let placeNum, ItemKey, UnitNum, UnitPath, itemDescription, itemId, itemName;
        //console.log("Path = "+path);
        let ref = database.ref(path);
        //update the master list
        ref.once("value", function(snapshot){
            let items = snapshot.val();
            let keys = Object.keys(items);
            //Get number in which keys
            for( let i=0; i<keys.length; i++){
                if( Object.keys(items)[i] == itemPath ){
                    //console.log("PlaceNum = "+i);
                    placeNum = i;
                }
            }
            ItemKey = items[keys[placeNum]].ItemKey;
            UnitNum = items[keys[placeNum]].UnitNum;
            UnitPath = items[keys[placeNum]].UnitPath;
            itemDescription = items[keys[placeNum]].itemDescription;
            itemId = items[keys[placeNum]].itemId;
            itemName = items[keys[placeNum]].itemName;
            //console.log("ITEM IS : "+items[keys[placeNum]].ItemKey);
            //update the masterlist
            detailView_UnitPath = UnitPath;
            database.ref(path+'/'+itemPath).set({
                ItemKey: ItemKey,
                UnitNum: UnitNum,
                UnitPath: UnitPath,
                itemDescription: document.getElementById("detailViewDescription").value,
                itemId: document.getElementById("detailViewId").value,
                itemName: document.getElementById("detailViewName").value
            });
        });
        console.log("Modifying MasterList Done...")
        return ItemKey;
}

function modifyUnitList(uPath, cPath){
    console.log("Modifing UnitList");
        let path = uPath;
        let itemPath = cPath;
        let placeNum, itemDescription, itemId, itemName, masterKey;
        //console.log("Path = "+path);
        let ref = database.ref(path);
        //update the master list
        ref.once("value", function(snapshot){
            let items = snapshot.val();
            let keys = Object.keys(items);
//            console.log("keys: "+keys);
            //Get number in which keys
            for( let i=0; i<keys.length; i++){
                if( Object.keys(items)[i] == itemPath ){
                    //console.log("PlaceNum = "+i);
                    placeNum = i;
                }
            }
//            console.log("PlaceNum = "+placeNum);
            itemDescription = items[keys[placeNum]].itemDescription;
            itemId = items[keys[placeNum]].itemId;
            itemName = items[keys[placeNum]].itemName;
            masterKey = items[keys[placeNum]].masterKey;
//            console.log("itemId : "+items[keys[placeNum]].itemId);
//            console.log("itemName : "+items[keys[placeNum]].itemName);
//            console.log("masterKey : "+items[keys[placeNum]].masterKey);
            //update the unitList
            detailView_UnitPath = "MasterList";
            database.ref(path+'/'+itemPath).set({
                itemDescription: document.getElementById("detailViewDescription").value,
                itemId: document.getElementById("detailViewId").value,
                itemName: document.getElementById("detailViewName").value,
                masterKey: masterKey
            });
        });
        console.log("Modifying UnitList Done...")
        return masterKey;
}


/* Database modify handling end */



/* Page Display Stuff (Originally in tp2.js) */


// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

// Tabs
function openLink(evt, linkName) {
    console.log("CLOCKED LINK: "+linkName);
    if(linkName != undefined ){
        var i, x, tablinks;
        x = document.getElementsByClassName("myLink");
        for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
        }
        document.getElementById(linkName).style.display = "block";
        evt.currentTarget.className += " w3-red";
    }
}

// Tabs
function openLink2(evt, linkName) {
  var i, x, tttabbb;
  x = document.getElementsByClassName("myLink2");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tttabbb = document.getElementsByClassName("tttabbb");
  for (i = 0; i < x.length; i++) {
    tttabbb[i].className = tttabbb[i].className.replace(" w3-red", "");
  }
  document.getElementById(linkName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}


// Click on the first tablink on load
//document.getElementsByClassName("tablink")[0].click();
//document.getElementsByClassName("tttabbb")[0].click();


/* Page display stuff end */