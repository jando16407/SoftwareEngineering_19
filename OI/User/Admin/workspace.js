//var database;
/*
var submitButton1, submitButton2;
var unitPath1, unitPath2, masterPath;
var ref1, ref2, refAdmin;
var ref1_L, ref2_L;
var masterListContainer, listContainer1, listContainer2;
var tableMaster, tableUnit1, tableUnit2;
var detailViewPath, detailViewKey, detailView_itemId;
var detailView_itemName, detailView_itemDescription;
var detailView_UnitPath;
//var childNodeIndex, childNodePath;
var newItemKey, newItemKey2, detailViewDeleteItemPath;
*/
//Variables
var database;
var officeViewRef;  //Database ref to OfficeView
var numOfUnits;     //Nuber of units stored on database
var unitNameArray =[];  //Names of units stored on database
//For the item list tabs
var itemListTabButtonContainer; //mark to display itemListTabButtons
var itemListTabContainer;       //mark to display itemListTabsContents
var tabButtons = [];    //Stores Tab buttons dynamically for item list
var tabContentsFrame = [];      //Stores Tab contents most outer div dynamically for item list
var tabContentsItemList = [];   //Stores Tab contents actual list dynamically for item list
var tabContentsItemTableContainer = [];  //Stores Table contents dynamically for item list
//For the tabs on right
var itemAddTabButtonContainer; //mark to display itemAddTabButtons
var itemAddTabContainer;       //mark to display itemAddTabsContents
var tabButtons_add = [];    //Stores Tab buttons dynamically for item add
var tabContentsFrame_add = [];      //Stores Tab contents most outer div dynamically for item add
var tabContentsItemAdd_add = [];   //Stores Tab contents actual list dynamically for item add
var nameSelection = null;
var quantityUnitSelection = null;
var categorySelection = null;

//For the detail view
var childNodePath;
var deletePath;
var detailView;
var listenData = '';


firebase_setup();
page_setup();
//get_unit_info();
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
    itemAddTabButtonContainer = document.getElementById('ItemAddTabContainer');
    itemAddTabContainer = document.getElementById('ItemAddTabContents');
    console.log("02 Page setup done...")
    get_unit_info();
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
    await init_tabs_add();
    //await get_selections();
    
    await init_add_units_contents();
    await document.getElementsByClassName("tablink")[0].click();
    await document.getElementsByClassName("tttabbb")[0].click();
    await document.getElementsByClassName("secondtablink")[0].click();
    await initial_rendering();
    await init_detail_view();
    await get_selections();
    await add_options();
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
    console.log("04.1 Init tab done...");
}

//Dynamically create tabs
function init_tabs_add(){
    //Iterate through units and create new tabs dynamically
    for( let i=0; i<numOfUnits; i++ ){
        tabButtons_add[i] = document.createElement('button');
        tabButtons_add[i].setAttribute('class', 'w3-bar-item w3-button tttabbb');
        tabButtons_add[i].onclick = function(){
            openLink2(event, unitNameArray[i]+'FrameAdd');
        };
        tabButtons_add[i].innerHTML = unitNameArray[i];
        itemAddTabButtonContainer.appendChild(tabButtons_add[i]);
        //console.log("Added tab: "+tabButtons[i]);
    }
    console.log("04.2 Init tab for add items done...");
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
    let topRow = "<th>Unit</th><th>ID</th><th>Name</th><th>Quantity</th><th>Category</th><th>Sub Category</th><th>Item Description</th>";
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

    //Init tables for all units as well
    for( let i=1; i<numOfUnits+1; i++ ){
       //the most outer div
        tabContentsFrame[i] = document.createElement('div');
        tabContentsFrame[i].setAttribute('id', unitNameArray[i-1]+'FrameList');
        //console.log("FRAME NAME = "+unitNameArray[i-1]+'FrameList');
        tabContentsFrame[i].setAttribute('class', 'w3-container w3-white w3-padding-16 myLink');
        //Inside div1
        let _div1 = document.createElement('div');
        _div1.setAttribute('style', 'display: inline-block;');
        let _tabContentsTitle = document.createElement('h3');
        _tabContentsTitle.innerHTML = unitNameArray[i-1]+' Item List';
        //Inside div2
        let _div2 = document.createElement('div');
        _div2.setAttribute('style', 'height: 320px; overflow: scroll; width: 800px;');
        //Inside <p>
        tabContentsItemList[i] = document.createElement('p');
        tabContentsItemList[i].setAttribute('id', unitNameArray[i-1]+'ItemList');
        //Inside Table setup
        tabContentsItemTableContainer[i] = document.createElement('table');
        tabContentsItemList[i].appendChild(tabContentsItemTableContainer[i]);
        tabContentsItemTableContainer[i].setAttribute('id', unitNameArray[i-1]+'Table');
        let _listRow = document.createElement('tr');
        let _topRow = "<th>ID</th><th>Name</th><th>Quantity</th><th>Category</th><th>Sub Category</th><th>Item Description</th>";
        _listRow.innerHTML = _topRow;
        tabContentsItemTableContainer[i].appendChild(_listRow);

        //Put everything together
        _div2.appendChild(tabContentsItemList[i]);
        _div1.appendChild(_tabContentsTitle);
        _div1.appendChild(_div2);
        tabContentsFrame[i].appendChild(_div1);
        itemListTabContainer.appendChild(tabContentsFrame[i]);
    }
    console.log("05.1 Init table done...");
}

function init_add_units_contents(){
    //Init tables for all units as well
    for( let i=0; i<numOfUnits; i++ ){
        //the most outer div
        tabContentsFrame_add[i] = document.createElement('div');
        tabContentsFrame_add[i].setAttribute('id', unitNameArray[i]+'FrameAdd');
        //console.log("FRAME NAME = "+unitNameArray[i-1]+'FrameList');
        tabContentsFrame_add[i].setAttribute('class', 'w3-container w3-white w3-padding-16 myLink2');
        //Inside div1
        let div1 = document.createElement('div');
        div1.setAttribute('style', 'height: 400px; overflow: scroll;');
        let tabContentsTitle = document.createElement('h4');
        tabContentsTitle.innerHTML = 'Add an item on '+unitNameArray[i];
        //Inside <p>
        tabContentsItemAdd_add[i] = document.createElement('p');
        tabContentsItemAdd_add[i].setAttribute('id', unitNameArray[i]+'ItemAdd');
        //Input field setup
        //New line
            let new_line = document.createElement('br');
        //Item ID
            let item_id_label = document.createElement('label');
            item_id_label.setAttribute('for', 'item_id'+i);
            item_id_label.innerHTML = '<p>Item ID</p>';
            let item_id_input = document.createElement('input');
            item_id_input.setAttribute('id', 'id'+i);
            item_id_input.setAttribute('type', 'test');
            item_id_input.setAttribute('placeholder', 'Enter Item ID');
        //Item Name
            let item_name_label = document.createElement('label');
            item_name_label.setAttribute('for', 'item_name'+i);
            item_name_label.innerHTML = '<p>Item Name</p>';
            let item_name_input = document.createElement('input');
            item_name_input.setAttribute('id', 'name'+i);
            item_name_input.setAttribute('list', 'option_name'+i);
            item_name_input.setAttribute('placeholder', 'Enter Item Name');
//            let item_name_options = document.createElement("datalist");
//            item_name_options.setAttribute('id', 'option'+i);
//            item_name_options = add_selections_name(item_name_options);
            /*
            ////// Replace this to dropdown selection
            let item_name_input = document.createElement('div');
            item_name_input.setAttribute('id', 'name'+i);
            item_name_input.setAttribute('type', 'test');
            item_name_input.setAttribute('class', 'ui fluid search selection dropdown');
            //item_name_input.setAttribute('placeholder', 'Enter Item Name');
            /////
            let item_name_input_input = document.createElement('input');
            item_name_input_input.setAttribute('type', 'hidden');
            let item_name_input_i = document.createElement('i');
            item_name_input_i.setAttribute('class', 'dropdown icon')
            let item_name_input_hint = document.createElement('div');
            item_name_input_hint.setAttribute('class', 'default text');
            item_name_input_hint.textContent = 'Select item name';
            let item_name_input_menu = document.createElement('div');
            item_name_input_menu.setAttribute('class', 'menu');
            //let selection = document.createElement('div');
            
            item_name_input_menu = add_selections_name(item_name_input_menu);
            //Add selections
            
            //item_name_input_menu.setAttribute('class', 'menu');
            //item_name_input_menu.appendChild(selection);

            item_name_input.appendChild(item_name_input_input);
            item_name_input.appendChild(item_name_input_i);
            item_name_input.appendChild(item_name_input_hint);
            item_name_input.appendChild(item_name_input_menu);
           // item_name_input.appendChild(add_selections_name(item_name_input_menu));
      //      item_name_input.appendChild(add_selections_name(unitNameArray[i]));
*/

            ////
        //Quantity
            let item_quantity_label = document.createElement('label');
            item_quantity_label.setAttribute('for', 'item_quantity'+i);
            item_quantity_label.innerHTML = '<p>Item Quantity</p>';
            let item_quantity_input = document.createElement('input');
            item_quantity_input.setAttribute('id', 'quantity'+i);
            item_quantity_input.setAttribute('type', 'test');
            item_quantity_input.setAttribute('placeholder', 'Enter Quantity');
        //Quantity Unit    
            let item_quantity_unit_label = document.createElement('label');
            item_quantity_unit_label.setAttribute('for', 'item_quantity_unit'+i);
            item_quantity_unit_label.innerHTML = '<p>Item Quantity Unit</p>';
            let item_quantity_unit_input = document.createElement('input');
            item_quantity_unit_input.setAttribute('id', 'quantity_unit'+i);
            item_quantity_unit_input.setAttribute('type', 'test');
            item_quantity_unit_input.setAttribute('list', 'option_quantity_unit'+i);
            item_quantity_unit_input.setAttribute('placeholder', 'Enter Item Quantity Unit');
        //Item description
            let item_description_label = document.createElement('label');
            item_description_label.setAttribute('for', 'item_description'+i);
            item_description_label.innerHTML = '<p>Item Description</p>';
            let item_description_input = document.createElement('input');
            item_description_input.setAttribute('id', 'description'+i);
            item_description_input.setAttribute('type', 'test');
            item_description_input.setAttribute('placeholder', 'Enter Item Description');
        //Item category
            let item_category_label = document.createElement('label');
            item_category_label.setAttribute('for', 'category'+i);
            item_category_label.innerHTML = '<p>Item Category</p>';
            let item_category_input = document.createElement('input');
            item_category_input.setAttribute('id', 'category'+i);
            item_category_input.setAttribute('type', 'test');
            item_category_input.setAttribute('list', 'option_category'+i);
            item_category_input.setAttribute('placeholder', 'Enter Item Category');
        //Item sub-category
            let item_subcategory_label = document.createElement('label');
            item_subcategory_label.setAttribute('for', 'item_subcategory'+i);
            item_subcategory_label.innerHTML = '<p>Item Sub Category</p>';
            let item_subcategory_input = document.createElement('input');
            item_subcategory_input.setAttribute('id', 'subcategory'+i);
            item_subcategory_input.setAttribute('type', 'test');
            item_subcategory_input.setAttribute('placeholder', 'Enter Item Sub Category');
        //Assign
            let item_assign_label = document.createElement('label');
            item_assign_label.setAttribute('for', 'item_assign'+i);
            item_assign_label.innerHTML = '<p>Item Assign</p>';
            let item_assign_input = document.createElement('input');
            item_assign_input.setAttribute('id', 'assign'+i);
            item_assign_input.setAttribute('type', 'test');
            item_assign_input.setAttribute('placeholder', 'Enter Item Assign');
        //Optional detail
            let optional_details = document.createElement('h6');
            optional_details.innerHTML = 'Optional Detail Information:';
        //Submit Button
            let item_submit_button = document.createElement('button');
            item_submit_button.setAttribute('id', 'submit_button'+i);
            item_submit_button.innerHTML = 'Submit';
            item_submit_button.onclick = function(e) {
                submitButtonClicked(unitNameArray[i], i);
            };


         //Put everything together
         div1.appendChild(tabContentsTitle);
         //Add input fields
         //Id, Name, Quantity
            tabContentsItemAdd_add[i].appendChild(item_id_label);
            tabContentsItemAdd_add[i].appendChild(item_id_input);
            tabContentsItemAdd_add[i].appendChild(item_name_label);
            tabContentsItemAdd_add[i].appendChild(item_name_input);
            //tabContentsItemAdd_add[i].appendChild(item_name_options);
            tabContentsItemAdd_add[i].appendChild(item_quantity_label);
            tabContentsItemAdd_add[i].appendChild(item_quantity_input);
        //Quantity Unit, Description, Category
            tabContentsItemAdd_add[i].appendChild(item_quantity_unit_label);
            tabContentsItemAdd_add[i].appendChild(item_quantity_unit_input);
            tabContentsItemAdd_add[i].appendChild(item_description_label);
            tabContentsItemAdd_add[i].appendChild(item_description_input);
            tabContentsItemAdd_add[i].appendChild(item_category_label);
            tabContentsItemAdd_add[i].appendChild(item_category_input);
        //Sub Category, Assign
            tabContentsItemAdd_add[i].appendChild(item_subcategory_label);
            tabContentsItemAdd_add[i].appendChild(item_subcategory_input);
//            tabContentsItemAdd_add[i].appendChild(optional_details);
            tabContentsItemAdd_add[i].appendChild(item_assign_label);
            tabContentsItemAdd_add[i].appendChild(item_assign_input);

        //Add Submit button
            tabContentsItemAdd_add[i].appendChild(new_line);
            tabContentsItemAdd_add[i].appendChild(item_submit_button);
        div1.appendChild(tabContentsItemAdd_add[i]);
        tabContentsFrame_add[i].appendChild(div1);
        itemAddTabContainer.appendChild(tabContentsFrame_add[i]);
     }
     console.log("05.2 Init table for add items done...");
}

function initial_rendering(){
    //Iterate through all units to get data and display
    for( let j=0; j<numOfUnits; j++ ){
        renderUnit(j);
    }
    console.log('06 Initial table rendering done...');
}

//Error handling
function gotErr(err){
    console.log("Error!!");
    console.log(err);
}

//Detail view setup
function init_detail_view(){
    //Init stuff
    let div1 = document.createElement('div');
    div1.setAttribute('style', 'overflow: scroll;');
    let detailViewTitle = document.createElement('h4');
    detailViewTitle.innerHTML = 'Detail View of Selected Item';
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', 'deleteButton');
    deleteButton.setAttribute('style', 'display: inline-block;');
    deleteButton.textContent = 'Delete';
    let randomGenButton = document.createElement('button');
    randomGenButton.setAttribute('id', 'randomGenButton');
    randomGenButton.setAttribute('style', 'display: inline-block;');
    randomGenButton.textContent = 'Generate';
    let space = document.createElement('div');
    space.innerHTML = '    ';
    space.setAttribute('style', 'width: 50px; display: inline-block;');
    let div2 = document.createElement('div');
    div2.setAttribute('id', 'detailViewBasicInfo');
    div2.setAttribute('style', 'display: inline-block; width: 99%');
    let div3 = document.createElement('div');
    div3.setAttribute('id', 'detailViewOptionalInfor');
    div3.setAttribute('style', 'display: inline-block; width: 99%');
    
    //Container for each field
    let div4Left = document.createElement('div');
    let div4Middle = document.createElement('div');
    let div4Right = document.createElement('div');
    let div4LeftLabel = document.createElement('div');
    let div4LeftInput = document.createElement('div');
    let div4MiddleLabel = document.createElement('div');
    let div4MiddleInput = document.createElement('div');
    let div4RightLabel = document.createElement('div');
    let div4RightInput = document.createElement('div');
    //div4
    div4Left.setAttribute('style', 'display: inline-block;');
    div4Middle.setAttribute('style', 'display: inline-block;');
    div4Right.setAttribute('style', 'display: inline-block;');
    div4LeftLabel.setAttribute('style', 'display: inline-block; width: 150px');
    div4LeftInput.setAttribute('style', 'display: inline-block; width: 200px');
    div4MiddleLabel.setAttribute('style', 'display: inline-block; width: 150px');
    div4MiddleInput.setAttribute('style', 'display: inline-block; width: 200px');
    div4RightLabel.setAttribute('style', 'display: inline-block; width: 150px');
    div4RightInput.setAttribute('style', 'display: inline-block; width: 200px');
    //Cotainer for optional detail info
    let div5Left = document.createElement('div');
    let div5Middle = document.createElement('div');
    let div5Right = document.createElement('div');
    let div5LeftLabel = document.createElement('div');
    let div5LeftInput = document.createElement('div');
    let div5MiddleLabel = document.createElement('div');
    let div5MiddleInput = document.createElement('div');
    let div5RightLabel = document.createElement('div');
    let div5RightInput = document.createElement('div');
    //div5
    div5Left.setAttribute('style', 'display: inline-block;');
    div5Middle.setAttribute('style', 'display: inline-block;');
    div5Right.setAttribute('style', 'display: inline-block;');
    div5LeftLabel.setAttribute('style', 'display: inline-block; width: 150px');
    div5LeftInput.setAttribute('style', 'display: inline-block; width: 200px');
    div5MiddleLabel.setAttribute('style', 'display: inline-block; width: 150px');
    div5MiddleInput.setAttribute('style', 'display: inline-block; width: 200px');
    div5RightLabel.setAttribute('style', 'display: inline-block; width: 150px');
    div5RightInput.setAttribute('style', 'display: inline-block; width: 200px');

    //Detail view display/input field setup
    //Item Unit
        let item_unit_label = document.createElement('label');
        item_unit_label.setAttribute('for', 'detail_item_unit');
        item_unit_label.innerHTML = '<p>Item Unit</p>';
  //      item_unit_label.setAttribute('style', 'height: 30px');
        let item_unit_input = document.createElement('input');
        item_unit_input.setAttribute('id', 'detail_unit');
        item_unit_input.setAttribute('placeholder', 'Unit Name');
      //  item_unit_input.setAttribute('style', 'height: 30px');
    //Item ID
        let item_id_label = document.createElement('label');
        item_id_label.setAttribute('for', 'detail_item_id');
        item_id_label.innerHTML = '<p>Item ID</p>';
    //    item_id_label.setAttribute('style', 'height: 30px');
        let item_id_input = document.createElement('input');
        item_id_input.setAttribute('id', 'detail_id');
        item_id_input.setAttribute('placeholder', 'ID');
   //     item_id_input.setAttribute('style', 'height: 30px');
    //Item Name
        let item_name_label = document.createElement('label');
        item_name_label.setAttribute('for', 'detail_item_name');
        item_name_label.innerHTML = '<p>Item Name</p>';
    //    item_name_label.setAttribute('style', 'height: 30px');
        let item_name_input = document.createElement('input');
        item_name_input.setAttribute('id', 'detail_name');
        item_name_input.setAttribute('type', 'test');
        item_name_input.setAttribute('placeholder', 'Name');
     //   item_name_input.setAttribute('style', 'height: 30px');
    //Quantity
        let item_quantity_label = document.createElement('label');
        item_quantity_label.setAttribute('for', 'detail_item_quantity');
        item_quantity_label.innerHTML = '<p>Item Quantity</p>';
        //item_quantity_label.setAttribute('style', 'display: inline-block; width: 150px;')
        let item_quantity_input = document.createElement('input');
        item_quantity_input.setAttribute('id', 'detail_quantity');
        item_quantity_input.setAttribute('type', 'test');
        item_quantity_input.setAttribute('placeholder', 'Quantity');
        //item_quantity_input.setAttribute('style', 'display: inline-block; width: 150px;')
    //Quantity Unit    
        let item_quantity_unit_label = document.createElement('label');
        item_quantity_unit_label.setAttribute('for', 'detail_item_quantity_unit');
        item_quantity_unit_label.innerHTML = '<p>Item Quantity Unit</p>';
        //item_quantity_unit_label.setAttribute('style', 'display: inline-block;')
        let item_quantity_unit_input = document.createElement('input');
        item_quantity_unit_input.setAttribute('id', 'detail_quantity_unit');
        item_quantity_unit_input.setAttribute('type', 'test');
        item_quantity_unit_input.setAttribute('placeholder', 'Quantity Unit');
        //item_quantity_unit_input.setAttribute('style', 'display: inline-block;')
    //Item description
        let item_description_label = document.createElement('label');
        item_description_label.setAttribute('for', 'detail_item_description');
        item_description_label.innerHTML = '<p>Item Description</p>';
        //item_description_label.setAttribute('style', 'display: inline-block;')
        let item_description_input = document.createElement('input');
        item_description_input.setAttribute('id', 'detail_description');
        item_description_input.setAttribute('type', 'test');
        item_description_input.setAttribute('placeholder', 'Description');
    //Item category
        let item_category_label = document.createElement('label');
        item_category_label.setAttribute('for', 'detail_category');
        item_category_label.innerHTML = '<p>Item Category</p>';
        //item_category_label.setAttribute('style', 'display: inline-block;')
        let item_category_input = document.createElement('input');
        item_category_input.setAttribute('id', 'detail_category');
        item_category_input.setAttribute('type', 'test');
        item_category_input.setAttribute('placeholder', 'Category');
        //item_category_input.setAttribute('style', 'display: inline-block;')
    //Item sub-category
        let item_subcategory_label = document.createElement('label');
        item_subcategory_label.setAttribute('for', 'detail_item_subcategory');
        item_subcategory_label.innerHTML = '<p>Item Sub Category</p>';
        //item_subcategory_label.setAttribute('style', 'display: inline-block;')
        let item_subcategory_input = document.createElement('input');
        item_subcategory_input.setAttribute('id', 'detail_subcategory');
        item_subcategory_input.setAttribute('type', 'test');
        item_subcategory_input.setAttribute('placeholder', 'Sub Category');
        //item_subcategory_input.setAttribute('style', 'display: inline-block;')
    

    //Unit, Id, Name Label
        div4LeftLabel.appendChild(item_unit_label);
        div4LeftLabel.appendChild(item_id_label);
        div4LeftLabel.appendChild(item_name_label);
    //Id, Name, Quantity Input
        div4LeftInput.appendChild(item_unit_input);
        div4LeftInput.appendChild(item_id_input);
        div4LeftInput.appendChild(item_name_input);
    //Quantity Label, Quantity Unit, Description Label
        div4MiddleLabel.appendChild(item_quantity_label);
        div4MiddleLabel.appendChild(item_quantity_unit_label);
        div4MiddleLabel.appendChild(item_description_label);
    //Quantity Label, Quantity Unit, Description Input
        div4MiddleInput.appendChild(item_quantity_input);
        div4MiddleInput.appendChild(item_quantity_unit_input);
        div4MiddleInput.appendChild(item_description_input);
    //Category, Sub Category, Assign Label
        div4RightLabel.appendChild(item_category_label);
        div4RightLabel.appendChild(item_subcategory_label);
    //Category, Sub Category, Assign Input
        div4RightInput.appendChild(item_category_input);
        div4RightInput.appendChild(item_subcategory_input);

    //Put all columns to div4 and div5
    div4Left.appendChild(div4LeftLabel);
    div4Left.appendChild(div4LeftInput);
    div4Middle.appendChild(div4MiddleLabel);
    div4Middle.appendChild(div4MiddleInput);
    div4Right.appendChild(div4RightLabel);
    div4Right.appendChild(div4RightInput);
    div5Left.appendChild(div5LeftLabel);
    div5Left.appendChild(div5LeftInput);
    div5Middle.appendChild(div5MiddleLabel);
    div5Middle.appendChild(div5MiddleInput);
    div5Right.appendChild(div5RightLabel);
    div5Right.appendChild(div5RightInput);
    //Put all columns to div
    div2.appendChild(div4Left);
    div2.appendChild(div4Middle);
    div2.appendChild(div4Right);
    div2.appendChild(div5Left);
    div2.appendChild(div5Middle);
    div2.appendChild(div5Right);
    //Put everything toge ther
    detailViewTitle.appendChild(space);
    detailViewTitle.appendChild(deleteButton);
    detailViewTitle.appendChild(randomGenButton);
    div1.appendChild(detailViewTitle);
    //div1.appendChild(deleteButton);
    div1.appendChild(div2);
 //   div1.appendChild(div3);
    detailView = document.getElementById('DetailView');
    detailView.appendChild(div1);
    
    //Delete button funciton setup
    //let deleteButton = document.getElementById("deleteButton");
    deleteButton.onclick = function() {
        if(deletePath != '' && childNodePath != ''){
            let deleteRef = database.collection('Office').doc('Inventory').collection('Units').doc(deletePath).collection('Item').doc(childNodePath);
            deleteRef.delete().then(function() {
                console.log("Item deleted successfully");
                childNodePath = '';
                deletePath = '';
                document.getElementById('detail_unit').value = '';
                document.getElementById('detail_id').value = '';
                document.getElementById('detail_name').value = '';
                document.getElementById('detail_quantity').value = '';
                document.getElementById('detail_quantity_unit').value = '';
                document.getElementById('detail_description').value = '';
                document.getElementById('detail_category').value = '';
                document.getElementById('detail_subcategory').value = '';
            }).catch(function(error) {
                console.error("Error removing item from database: "+error);
            });
        }
    };

    randomGenButton.onclick = function(){
        console.log("Random Gen clicked");
        randomGen();
    }
    
    console.log('07 Init detail view done...');
}
/* Initialize Functions End */

/* Get data from database function start */

async function get_selections(){
    let names = [], quantityUnits = [], categories = [];
    for( let i=0; i<numOfUnits; i++ ){
        let unitName = unitNameArray[i];
        let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName).collection('Item');
        await ref.get().then(function(snapshot){
            if(snapshot.empty){
            }
            snapshot.forEach(function(doc) {
                names.push(doc.data().name);
                quantityUnits.push(doc.data().quantity_unit);
                categories.push(doc.data().category);
            });
        });
    }
    let namesUniqueArray = [], quantityUnitsUniqueArray = [], categoriesUniqueArray = [];
    namesUniqueArray = getUniq(names);
    quantityUnitsUniqueArray = getUniq(quantityUnits);
    categoriesUniqueArray = getUniq(categories);
    
    
    await console.log("namesUniqueArray: "+namesUniqueArray);
    nameSelection = namesUniqueArray;
    await console.log("quantityUnitsUniqueArray: "+quantityUnitsUniqueArray);
    quantityUnitSelection = quantityUnitsUniqueArray;
    await console.log("categoriesUniqueArray: "+categoriesUniqueArray);
    categorySelection = categoriesUniqueArray;

    function getUniq(arr){
        let uniqueArr = {};
        return arr.filter(function(item) {
            return uniqueArr.hasOwnProperty(item) ? false : uniqueArr[item] = true;
        });
    };
}

function add_options(){
    for( let i=0; i<numOfUnits; i++ ){
        let item_name_options = document.createElement("datalist");
        item_name_options.setAttribute('id', 'option_name'+i);
        item_name_options = add_selections(item_name_options, nameSelection);
        tabContentsItemAdd_add[i].appendChild(item_name_options);

        let item_quantity_unit_options = document.createElement("datalist");
        item_quantity_unit_options.setAttribute('id', 'option_quantity_unit'+i);
        item_quantity_unit_options = add_selections(item_quantity_unit_options, quantityUnitSelection);
        tabContentsItemAdd_add[i].appendChild(item_quantity_unit_options);

        let item_category_options = document.createElement("datalist");
        item_category_options.setAttribute('id', 'option_category'+i);
        item_category_options = add_selections(item_category_options, categorySelection);
        tabContentsItemAdd_add[i].appendChild(item_category_options);
    }
}

function add_selections(item_options, itemSelection){
    for( let i=0; i<itemSelection.length; i++ ){
        let option = document.createElement("OPTION");
        option.value = itemSelection[i];
        item_options.appendChild(option);
    }
    return item_options;
}

/* Get data from database function end */

/* Rendering funcitons Start */

//Update the table for Unit 1
function renderUnit( unitNum ){
    let unitName = unitNameArray[unitNum]
    let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName).collection('Item');
    //Make the base of table setup
    ref.orderBy('id').onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
            if(change.type === "added"){
                tabContentsItemTableContainer[unitNum+1].appendChild(getRowInfo(change, unitNum));
            }
            if(change.type === "modified"){
                //console.log("Modifying detected, doc.id = "+change.doc.id);
                for( let num=0; num<numOfUnits; num++ ){
                    for( let i=0; i<tabContentsItemTableContainer[num+1].children.length; i++ ){
                        if(tabContentsItemTableContainer[num+1].children[i].getAttribute('id') == change.doc.id ){
                            tabContentsItemTableContainer[num+1].replaceChild(getRowInfo(change, num), tabContentsItemTableContainer[num+1].children[i]);
                        }
                    }
                }
            }
            if(change.type === "removed"){
                //console.log("Delete detected, doc.id = "+change.doc.id);
                for( let num=0; num<numOfUnits; num++ ){
                    for( let i=0; i<tabContentsItemTableContainer[num+1].children.length; i++ ){
                        //console.log("CHECKING : "+tabContentsItemTableContainer[num+1].children[i].getAttribute('id'));
                        if(tabContentsItemTableContainer[num+1].children[i].getAttribute('id') == change.doc.id ){
                            tabContentsItemTableContainer[num+1].removeChild(tabContentsItemTableContainer[num+1].children[i]);
                            //console.log("FOUNT IT");
                        }
                    }
                }
            }
        });
    });
}

//Create row in a table and it return row
function getRowInfo(change, unitNumber){
    let row = document.createElement('tr');
    let id = document.createElement('th');
    let name = document.createElement('th');
    let quantity = document.createElement('th');
    let category = document.createElement('th');
    let subcategory = document.createElement('th');
    let description = document.createElement('th');
    //row.setAttribute('key', change.doc.id);
    row.setAttribute('id', change.doc.id);
    row.addEventListener('click', function(e){
        itemSelected(change.doc.id, unitNumber);
    });
    if( change.doc.data().id != undefined ){
        id.innerHTML = change.doc.data().id;
    }
    if( change.doc.data().name != undefined ){
        name.innerHTML = change.doc.data().name;
    }
    if( change.doc.data().quantity != undefined ){
        quantity.innerHTML = change.doc.data().quantity;
    }
    if( change.doc.data().category != undefined ){
        category.innerHTML = change.doc.data().category;
    }
    if( change.doc.data().subcategory != undefined ){
        subcategory.innerHTML = change.doc.data().subcategory;
    }
    if( change.doc.data().description != undefined ){
        description.innerHTML = change.doc.data().description;
    }
    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(quantity);
    row.appendChild(category);
    row.appendChild(subcategory);
    row.appendChild(description);
    return row;
}

/* Rendering funcitons End */


/* Onclick function start */

//Handle when item in a list is clicked
function itemSelected(key, unitNumber){
    childNodePath = key;
    deletePath = unitNameArray[unitNumber];
    let item = document.getElementById(key);
    console.log("Clicked item key = "+key+");, item name = "+item.children[1].innerHTML);
    console.log("Unit number : "+unitNumber);
    console.log("Unit name : "+unitNameArray[unitNumber]);
    detailViewUpdate(key, unitNameArray[unitNumber]);
    /*
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
    }*/
}

function detailViewUpdate(key, unitName){
    if( listenData != ''){
        listenData();
        //console.log("Detached listener");
    }
    let unit = document.getElementById('detail_unit');
    let id = document.getElementById('detail_id');
    let name = document.getElementById('detail_name');
    let quantity = document.getElementById('detail_quantity');
    let quantity_unit = document.getElementById('detail_quantity_unit');
    let description = document.getElementById('detail_description');
    let category = document.getElementById('detail_category');
    let subcategory = document.getElementById('detail_subcategory');
    let item = document.getElementById(key);
    let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName).collection('Item').doc(key);
    listenData = ref.onSnapshot(function(doc){
        if(doc.type === "modified"){
            console.log("DATA modified: "+doc.data().unit_name);
            unit.value = doc.data().unit_name;
            id.value = doc.data().id;
            name.value = doc.data().name;
            quantity.value = doc.data().quantity;
            quantity_unit = doc.data().quantity_unit;
            category.value = doc.data().category;
            subcategory.value = doc.data().subcategory;
            description.value = doc.data().description;
        }
        else if(doc.type === "removed"){
            console.log("DATA removed: "+doc.data().unit_name);
            unit.value = '';
            id.value = '';
            name.value = '';
            quantity.value = '';
            quantity_unit = '';
            category.value = '';
            subcategory.value = '';
            description.value = '';
        }
        else {
            unit.value = doc.data().unit_name;
            quantity_unit.value = doc.data().quantity_unit;
            console.log("qu uni: "+quantity_unit);
        }
    });
    
    id.value = item.children[0].innerHTML;
    name.value = item.children[1].innerHTML;
    quantity.value = item.children[2].innerHTML;
    category.value = item.children[3].innerHTML;
    subcategory.value = item.children[4].innerHTML;
    description.value = item.children[5].innerHTML;

    //Set onchange values to modify item information
    unit.onchange = function(){
        if( unit.value != ref.unit_name ){
            ref.update({unit_name: unit.value});
        }
    }
    id.onchange = function(){
        if( id.value != ref.id ){
            ref.update({id: id.value});
        }
    }
    name.onchange = function(){
        if( name.value != ref.name ){
            ref.update({name: name.value});
        }
    }
    quantity.onchange = function(){
        if( quantity.value != ref.quantity ){
            ref.update({quantity: quantity.value});
        }
    }
    quantity_unit.onchange = function(){
        if( quantity_unit.value != ref.quantity_unit ){
            ref.update({quantity_unit: quantity_unit.value});
        }
    }
    category.onchange = function(){
        if( category.value != ref.category ){
            ref.update({category: category.value});
        }
    }
    subcategory.onchange = function(){
        if( subcategory.value != ref.subcategory ){
            ref.update({subcategory: subcategory.value});
        }
    }
    description.onchange = function(){
        if( description.value != ref.description ){
            ref.update({description: description.value});
        }
    }

}


/* Onclick function end */

/* onClick handlings Start */

//Submit button handling, push data to firebase

function submitButtonClicked( unitName, i ) {
    console.log("Submit button clicked...");
    //check mandatory input field if empty or not
    let item = [];
    let category = [];
    let data = {};
    item[0] = document.getElementById('id'+i).value;
    category[0] = 'id';
//    item[1] = document.getElementById('name'+i).value;
//    category[1] = 'name';
    item[1] = unitName;
    category[1] = 'unit_name';
    item[2] = document.getElementById('quantity'+i).value;
    category[2] = 'quantity';
    item[3] = document.getElementById('quantity_unit'+i).value;
    category[3] = 'quantity_unit';
    item[4] = document.getElementById('description'+i).value;
    category[4] = 'description';
    item[5] = document.getElementById('category'+i).value;
    category[5] = 'category';
    item[6] = document.getElementById('subcategory'+i).value;
    category[6] = 'subcategory';
    item[7] = document.getElementById('assign'+i).value;
    category[7] = 'assign';
    
    console.log(unitName);
    
    //Iterate to gather inputs and build data to push
    for( let j=0; j<item.length; j++ ){
        if( item[j] != ''){
            //Add input to data
            data[category[j]] = item[j];
            //Clear the input field
        //    document.getElementById(category[j]+i).value = '';
        }
    }

    //Add data to database
    let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName).collection('Item');
    ref.add(data)

    console.log(data);
}
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

/* Randomly generate and add items to units starts */

function randomGen(){
    console.log('Generating random database...');
    for( let i=0; i<numOfUnits; i++ ){
        let unitName = unitNameArray[i];
        let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName).collection('Item');
        
        //Add 10 data
        for( let j=0; j<10; j++ ){
            let data = {};
            let id = Math.floor(Math.random() * 2000);
            let name = ['Desk', 'Chair', 'Pen', 'Laptop', 'Desktop', 'Stapler', 'Cords', 'Tape', 'Lamp', 'Delicious Ramen box'];
            let quantity = Math.floor(Math.random() * 2000);
            let quantity_unit = 'ea.';
            let description = ['description0', 'description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8', 'description9'];
            let category =['Office Supply', 'Electric', 'Others', 'Furniture'];
            let subcategory = [1, 2, 3, 4, 5];
            data['id'] = id;
            data['name'] = name[Math.floor(Math.random() * 10)];
            data['quantity'] = quantity;
            data['quantity_unit'] = quantity_unit;
            data['description'] = description[Math.floor(Math.random() * 10)];
            data['category'] = category[Math.floor(Math.random() * 4)];
            data['subcategory'] = subcategory[Math.floor(Math.random() * 5)];
            data['unit_name'] = unitName;
            ref.add(data);
        }
        

        

    }
    console.log("Generating random database done...");
}

/* Randomly generate and add items to units end */


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

//Detail view tab
function secondopenLink(evt, linkName) {
    var i, x, tttabbb;
    x = document.getElementsByClassName("secondmyLink");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tttabbb = document.getElementsByClassName("secondtablink");
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