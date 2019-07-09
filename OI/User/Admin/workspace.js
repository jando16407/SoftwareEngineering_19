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
//var dataSnapshots = []; //keep snapshots of all data in database
var masterlistdone = false;
//For the item list tabs
var itemListTabButtonContainer; //mark to display itemListTabButtons
var itemListTabContainer;       //mark to display itemListTabsContents
var tabButtons = [];    //Stores Tab buttons dynamically for item list
var tabContentsFrame = [];      //Stores Tab contents most outer div dynamically for item list
var tabContentsItemList = [];   //Stores Tab contents actual list dynamically for item list
var tabContentsItemTableContainer = [];  //Stores Table contents dynamically for item list
//For the master list
//var master_names=[], master_quantities=[];
//var master_quantityUnits=[], master_categories=[];
//var master_subcategories=[], master_minimumQuantities=[];
//For the tabs on right
var itemAddTabButtonContainer; //mark to display itemAddTabButtons
var itemAddTabContainer;       //mark to display itemAddTabsContents
var tabButtons_add = [];    //Stores Tab buttons dynamically for item add
var tabContentsFrame_add = [];      //Stores Tab contents most outer div dynamically for item add
var tabContentsItemAdd_add = [];   //Stores Tab contents actual list dynamically for item add
var nameSelection = null;
var quantityUnitSelection = null;
var categorySelection = null;
var subcategorySelection = null;
//For the detail view
var childNodePath;
var deletePath;
var detailView;
var listenData = '';
var selectedUnitNumber = 0;


firebase_setup();
page_setup();
//get_unit_info();
//detailView_setting();
//init_tables();
//renderListen();




/* Initialize Functions Start */

//Basic firebase setups
function firebase_setup(){
    const firebaseConfig = {
        apiKey: "AIzaSyAlLw14J9Wf8Tr3y26a3cQWOzTmiPN4-2w",
        authDomain: "officeinventory2.firebaseapp.com",
        databaseURL: "https://officeinventory2.firebaseio.com",
        projectId: "officeinventory2",
        storageBucket: "",
        messagingSenderId: "530222064086",
        appId: "1:530222064086:web:aaaf8b2c2a00f136"
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
    //if(nameSelection.length)
    await get_master_list();
}



//Dynamically create tabs
async function init_tabs(){
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
    //Make sure all unit docs exists, if not create new one
    for( let i=0; i<numOfUnits; i++ ){
        let unitName = unitNameArray[i];
        let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName);
        await ref.get().then(function(doc){
            if(doc.exists){
                console.log("\tdoc: "+doc.id+" exists.");
            }
            else{
                console.log("\tdoc: "+unitName+" does not exist");
                let newref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName);
                newref.set({unit: unitName});
            }
        });
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
    tabContentsItemTableContainer[0].setAttribute('class', "ui sortable celled table");
    tabContentsItemList[0].appendChild(tabContentsItemTableContainer[0]);
    tabContentsItemTableContainer[0].setAttribute('id', 'masterTable');
    let listRow = document.createElement('tr');
    let topRow = "<th>Name</th><th>Quantity</th><th>Quantity Unit</th><th>Category</th><th>Sub Category</th><th>Minimum Quantity in Office</th>";
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
        //tabContentsItemTableContainer[i].setAttribute('class', "ui sortable celled table");
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
            item_id_input.setAttribute('readonly', true);
            //Get the max ID in the unit
            //item_id_input.textContent = 
            get_max_id(item_id_input, i);
            
        //Item Name
            let item_name_label = document.createElement('label');
            item_name_label.setAttribute('for', 'item_name'+i);
            item_name_label.innerHTML = '<p>Item Name</p>';
            let item_name_input = document.createElement('input');
            item_name_input.setAttribute('id', 'name'+i);
            item_name_input.setAttribute('list', 'option_name'+i);
            item_name_input.setAttribute('placeholder', 'Enter Item Name');
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
            item_subcategory_input.setAttribute('list', 'option_subcategory'+i);
            item_subcategory_input.setAttribute('placeholder', 'Enter Item Sub Category');
        //Assign
            let item_assign_label = document.createElement('label');
            item_assign_label.setAttribute('for', 'item_assign'+i);
            item_assign_label.innerHTML = '<p>Item Assign</p>';
            let item_assign_input = document.createElement('input');
            item_assign_input.setAttribute('id', 'assign'+i);
            item_assign_input.setAttribute('type', 'test');
            item_assign_input.setAttribute('list', 'option_assign'+i);
            item_assign_input.setAttribute('placeholder', 'Enter Item Assign');
        //Assign
            let item_minimum_quantity_label = document.createElement('label');
            item_minimum_quantity_label.setAttribute('for', 'item_minimum_quantity'+i);
            item_minimum_quantity_label.innerHTML = '<p>Item Minimum Quantity</p>';
            let item_minimum_quantity_input = document.createElement('input');
            item_minimum_quantity_input.setAttribute('id', 'minimum_quantity'+i);
            item_minimum_quantity_input.setAttribute('type', 'test');
            item_minimum_quantity_input.setAttribute('placeholder', 'Enter Item Minimum Quantity');
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
        //Sub Category, Assign, Minimum QUantity
            tabContentsItemAdd_add[i].appendChild(item_subcategory_label);
            tabContentsItemAdd_add[i].appendChild(item_subcategory_input);
            tabContentsItemAdd_add[i].appendChild(item_assign_label);
            tabContentsItemAdd_add[i].appendChild(item_assign_input);
            tabContentsItemAdd_add[i].appendChild(item_minimum_quantity_label);
            tabContentsItemAdd_add[i].appendChild(item_minimum_quantity_input);

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
    div1.setAttribute('style', 'overflow-y: scroll; width: 800xp; height: 300px;');
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
    //div2.setAttribute('style', 'display: inline-block;');// width: 99%; overflow-y: scroll;');
    let div3 = document.createElement('div');
    div3.setAttribute('id', 'detailViewOptionalInfo');
    div3.setAttribute('style', 'display: inline-block;');// width: 99%; overflow-y: scroll;');
    /**************************************************** */
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
    /**************************************************** */

    //Detail view display/input field setup
    //Blank
        let blank_label = document.createElement('label');
        blank_label.setAttribute('for', 'detail_blank');
        blank_label.innerHTML = '<p> </p>';
        let blank_input = document.createElement('input');
        blank_input.setAttribute('id', 'detail_unit');
        blank_input.setAttribute('placeholder', 'Unit Name');
        blank_input.setAttribute('readonly', true);
    //Item Unit
        let item_unit_label = document.createElement('label');
        item_unit_label.setAttribute('for', 'detail_item_unit');
        item_unit_label.innerHTML = '<p>Item Unit</p>';
  //      item_unit_label.setAttribute('style', 'height: 30px');
        let item_unit_input = document.createElement('input');
        item_unit_input.setAttribute('id', 'detail_unit');
        item_unit_input.setAttribute('placeholder', 'Unit Name');
        item_unit_input.setAttribute('readonly', true);
        //item_unit_input.setAttribute('list', 'option_unit');
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
    //Item Assign
        let item_assign_label = document.createElement('label');
        item_assign_label.setAttribute('for', 'detail_item_assign');
        item_assign_label.innerHTML = '<p>Item Assign</p>';
        //item_subcategory_label.setAttribute('style', 'display: inline-block;')
        let item_assign_input = document.createElement('input');
        item_assign_input.setAttribute('id', 'detail_assign');
        item_assign_input.setAttribute('type', 'test');
        item_assign_input.setAttribute('placeholder', 'Assign');
    //Item Minimum Quantity
        let item_minimum_quantity_label = document.createElement('label');
        item_minimum_quantity_label.setAttribute('for', 'detail_item_minimum_quantity');
        item_minimum_quantity_label.innerHTML = '<p>Minimum Quantity</p>';
        let item_minimum_quantity_input = document.createElement('input');
        item_minimum_quantity_input.setAttribute('id', 'detail_minimum_quantity');
        item_minimum_quantity_input.setAttribute('type', 'test');
        item_minimum_quantity_input.setAttribute('placeholder', 'Minimum Quantity');
    

    /************************************************** */
    //Div4
            //Unit, Id, Name Label, blank, Minimum Quantity
                div4LeftLabel.appendChild(item_unit_label);
                div4LeftLabel.appendChild(item_id_label);
                div4LeftLabel.appendChild(item_name_label);
                //div4LeftLabel.appendChild(blank_label);
            //Id, Name, Quantity Input, blank, Minimum Quantity
                div4LeftInput.appendChild(item_unit_input);
                div4LeftInput.appendChild(item_id_input);
                div4LeftInput.appendChild(item_name_input);
                //div4LeftInput.appendChild(blank_input);
            //Quantity Label, Quantity Unit, Description Label, blank
                div4MiddleLabel.appendChild(item_quantity_label);
                div4MiddleLabel.appendChild(item_quantity_unit_label);
                div4MiddleLabel.appendChild(item_description_label);
                //div4MiddleLabel.appendChild(blank_label);
            //Quantity Label, Quantity Unit, Description Input, blank
                div4MiddleInput.appendChild(item_quantity_input);
                div4MiddleInput.appendChild(item_quantity_unit_input);
                div4MiddleInput.appendChild(item_description_input);
                //div4MiddleInput.appendChild(blank_input);
            //Category, Sub Category, Assign Label, blank
                div4RightLabel.appendChild(item_category_label);
                div4RightLabel.appendChild(item_subcategory_label);
                div4RightLabel.appendChild(item_assign_label);
                //div4RightLabel.appendChild(blank_label);
            //Category, Sub Category, Assign Input, blank
                div4RightInput.appendChild(item_category_input);
                div4RightInput.appendChild(item_subcategory_input);
                div4RightInput.appendChild(item_assign_input);
                //div4RightInput.appendChild(blank_input);
    /************************************************** */

    /************************************************** */
    //Div5
        //Unit, Id, Name Label, blank, Minimum Quantity
            div5LeftLabel.appendChild(item_minimum_quantity_label);
          //  div5LeftLabel.appendChild(item_name_label);
        //Id, Name, Quantity Input, blank, Minimum Quantity
            div5LeftInput.appendChild(item_minimum_quantity_input);
        //    div5LeftInput.appendChild(item_name_input);
        //Quantity Label, Quantity Unit, Description Label, blank
       //     div5MiddleLabel.appendChild(item_minimum_quantity_label);
         //   div5MiddleLabel.appendChild(item_description_label);
        //Quantity Label, Quantity Unit, Description Input, blank
          //  div5MiddleInput.appendChild(item_minimum_quantity_input);
   //         div5MiddleInput.appendChild(item_description_input);
        //Category, Sub Category, Assign Label, blank
    //        div5RightLabel.appendChild(item_minimum_quantity_label);
            //div5RightLabel.appendChild(item_assign_label);
        //Category, Sub Category, Assign Input, blank
      //      div5RightInput.appendChild(item_minimum_quantity_input);
            //div5RightInput.appendChild(item_assign_input);
/************************************************** */

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
    div3.appendChild(div5Left);
    div3.appendChild(div5Middle);
    div3.appendChild(div5Right);
    //Put everything toge ther
    detailViewTitle.appendChild(space);
    detailViewTitle.appendChild(deleteButton);
    detailViewTitle.appendChild(randomGenButton);
    div1.appendChild(detailViewTitle);
    //div1.appendChild(deleteButton);
    div1.appendChild(div2);
    div1.appendChild(div3);
    detailView = document.getElementById('DetailView');
    detailView.setAttribute('style', 'overflow: scroll;');
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
    console.log("Get Selection start");
    let names = [], quantityUnits = [], categories = [], subcategories = [];
    for( let i=0; i<numOfUnits; i++ ){
        let unitName = unitNameArray[i];
        let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName).collection('Item');
        await ref.get().then(function(snapshot){
            if(snapshot.empty){
          //      console.log("Noting found");
            }
            snapshot.forEach(function(doc) {
                names.push(doc.data().name);
                quantityUnits.push(doc.data().quantity_unit);
                categories.push(doc.data().category);
                subcategories.push(doc.data().subcategory);
            });
        });
    }

    console.log("Name array : "+names);
    let namesUniqueArray = [], quantityUnitsUniqueArray = [], categoriesUniqueArray = [], subcategoriesUniqueArray = [];
    namesUniqueArray = getUniq(names);
    quantityUnitsUniqueArray = getUniq(quantityUnits);
    categoriesUniqueArray = getUniq(categories);
    subcategoriesUniqueArray = getUniq(subcategories);
    
    
    await console.log("namesUniqueArray: "+namesUniqueArray);
    nameSelection = namesUniqueArray;
    await console.log("quantityUnitsUniqueArray: "+quantityUnitsUniqueArray);
    quantityUnitSelection = quantityUnitsUniqueArray;
    await console.log("categoriesUniqueArray: "+categoriesUniqueArray);
    categorySelection = categoriesUniqueArray;
    await console.log("subcategoriesUniqueArray: "+subcategoriesUniqueArray);
    subcategorySelection = subcategoriesUniqueArray;

    function getUniq(arr){
        let uniqueArr = {};
        return arr.filter(function(item) {
            return uniqueArr.hasOwnProperty(item) ? false : uniqueArr[item] = true;
        });
    };
}

function add_options(){
    for( let i=0; i<numOfUnits; i++ ){
        //Name
        let item_name_options = document.createElement("datalist");
        item_name_options.setAttribute('id', 'option_name'+i);
        item_name_options = add_selections(item_name_options, nameSelection);
        tabContentsItemAdd_add[i].appendChild(item_name_options);
        //Quantity Unit
        let item_quantity_unit_options = document.createElement("datalist");
        item_quantity_unit_options.setAttribute('id', 'option_quantity_unit'+i);
        item_quantity_unit_options = add_selections(item_quantity_unit_options, quantityUnitSelection);
        tabContentsItemAdd_add[i].appendChild(item_quantity_unit_options);
        //Category
        let item_category_options = document.createElement("datalist");
        item_category_options.setAttribute('id', 'option_category'+i);
        item_category_options = add_selections(item_category_options, categorySelection);
        tabContentsItemAdd_add[i].appendChild(item_category_options);
        //Sub Category
        let item_subcategory_options = document.createElement("datalist");
        item_subcategory_options.setAttribute('id', 'option_subcategory'+i);
        item_subcategory_options = add_selections(item_subcategory_options, subcategorySelection);
        tabContentsItemAdd_add[i].appendChild(item_subcategory_options);
    }
    $('table').tablesort();
}

function add_selections(item_options, itemSelection){
    for( let i=0; i<itemSelection.length; i++ ){
        let option = document.createElement("OPTION");
        option.value = itemSelection[i];
        item_options.appendChild(option);
    }
    return item_options;
}

async function get_max_id(item_input, unitNum){
    let maxIdRef = database.collection('Office').doc('Inventory').collection('Units').doc(unitNameArray[unitNum]).collection('Item');
    let maxIdQuery = maxIdRef.orderBy("id", "desc").limit(1);
    let maxIdValue = 0; 
    await maxIdQuery.get().then(function(snapshot){
        snapshot.forEach(function(doc){
            //console.log("RTN value is : "+doc.data().id);
            maxIdValue = doc.data().id;
            let maxPlus = ++maxIdValue;
            item_input.value = ("00000"+maxPlus).slice(-5);
        });
    });
    return maxIdValue;
}

/* Get data from database function end */

/* Rendering funcitons Start */

//Update the table for Unit 1
function renderUnit( unitNum ){
    let unitName = unitNameArray[unitNum]
    let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName).collection('Item');
    //Make the base of table setup
    ref.orderBy('id').onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(async function(change) {
            if(change.type === "added"){
                tabContentsItemTableContainer[unitNum+1].appendChild(getRowInfo(change, unitNum));
                if(masterlistdone) resetMasterList();
                if(masterlistdone) await get_selections();
                if(masterlistdone) get_master_list(); 
            }
            if(change.type === "modified"){
                //console.log("Modifying detected, doc.id = "+change.doc.id);
                for( let num=0; num<numOfUnits; num++ ){
                    for( let i=0; i<tabContentsItemTableContainer[num+1].children.length; i++ ){
                        if(tabContentsItemTableContainer[num+1].children[i].getAttribute('id') == change.doc.id ){
                            tabContentsItemTableContainer[num+1].replaceChild(getRowInfo(change, num), tabContentsItemTableContainer[num+1].children[i]);
                            if(masterlistdone) resetMasterList();
                            if(masterlistdone) await get_selections();
                            if(masterlistdone) get_master_list();
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
                            if(masterlistdone) resetMasterList();
                            if(masterlistdone) await get_selections();
                            if(masterlistdone) get_master_list();
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

/* Create Master List start */

async function get_master_list(){
    //Clear the master list first
 /*   while(tabContentsItemTableContainer[0].children.length>1){
        tabContentsItemTableContainer[0].removeChild[1];
    }*/
    //Iterate though the nameSelection list
    for( let i=0; i<nameSelection.length; i++ ){
        //Iterate though each unit
        for( let num=0; num<numOfUnits; num++ ){
            let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitNameArray[num]).collection('Item');
          ref.where('name', '==', nameSelection[i]).onSnapshot(await async function(querySnapshot){
            
               if(querySnapshot.empty){
                   // console.log("Empty query for master list");
                }
                else {
                    querySnapshot.docChanges().forEach(await async function(change){
                        if (change.type === "added") {
                            let doc = change.doc;
                            let names, quantities, quantityUnits, categories, subcategories, minimumQuantities;
                            for(let nameIndex=0; nameIndex<nameSelection.length; nameIndex++ ){
                                if(doc.data().name==nameSelection[nameIndex]){
                                    let qt = 0;
                                    //Add data to other lists using index
                                    if(doc.data().name != undefined ){
                                        names = doc.data().name;
                                    }
                                    if(doc.data().quantity != undefined ){
                                        quantities = Number(doc.data().quantity);
                                    }
                                    if(doc.data().quantity_unit != undefined ){
                                        quantityUnits = doc.data().quantity_unit;
                                    }
                                    if(doc.data().category != undefined ){
                                        categories = doc.data().category;
                                    }
                                    if(doc.data().subcategory != undefined ){
                                        subcategories = doc.data().subcategory;
                                    }
                                    if(doc.data().minimum_quantity != undefined ){
                                        minimumQuantities = doc.data().minimum_quantity;
                                    }
                                    addRow( names, quantities, quantityUnits, categories, subcategories, minimumQuantities, i );
                                }
                                //Else is just skip
                            }
                        }
                    });
                }
            });
        }
    }
    this.masterlistdone = true;
}
function resetMasterList(){
    for( let k=0; k<tabContentsItemTableContainer[0].children.length; k++ ){
        tabContentsItemTableContainer[0].children[k].setAttribute('quantity', 0);
    }
    for( let j=0; j<nameSelection.length; j++ ){
        let qt = document.getElementById("masterListQuantity"+nameSelection[j]);
        qt.innerHTML = 0;
    }
}

function addRow(names, quantities, quantityUnits, categories, subcategories, minimumQuantities, i){
    let seen = document.getElementById('Name'+names+'Seen');
   // console.log("Items: "+names+", "+quantities+", "+quantityUnits+", "+categories+', '+subcategories+', '+minimumQuantities+', '+i);
    //console.log("Seen = "+seen);

    if( seen != undefined && seen.innerHTML == names ){
        //console.log("FOUND the item, name = "+names);
        //Just add quantity
        for( let k=0; k<tabContentsItemTableContainer[0].children.length; k++ ){
            if( tabContentsItemTableContainer[0].children[k].getAttribute('key') == names ){
                let q = Number(tabContentsItemTableContainer[0].children[k].getAttribute('quantity'));
                let qt = document.getElementById("masterListQuantity"+names);
                let total = quantities + q;
                qt.innerHTML = total;
                tabContentsItemTableContainer[0].children[k].setAttribute('quantity', total);
                //console.log("q = "+q+', quantity = '+quantities+', total = '+total+', qt = '+qt);
            }
        }
    }
    else{//Make new row

        let row = document.createElement('tr');
        let name = document.createElement('th');
        let quantity = document.createElement('th');
        quantity.setAttribute('id', 'masterListQuantity'+names);
        let quantityUnit = document.createElement('th');
        let category = document.createElement('th');
        let subcategory = document.createElement('th');
        let minimumQuantity = document.createElement('th');
        row.setAttribute('key', names);
        row.setAttribute('id', "masterListRow"+i);
        name.setAttribute('id', 'Name'+names+'Seen');

        if( names != undefined ){
            name.innerHTML = names;//localStorage.getItem('names'+i);
            //console.log("name in updating table = "+localStorage.getItem('names'+i));
        }
        if( quantities != undefined ){
      //      console.log("Quantity is : "+quantities);//localStorage.getItem('quantities'+i));
            quantity.innerHTML = quantities;///localStorage.getItem('quantities'+i);//master_quantities[i];
            row.setAttribute('quantity', quantities);
        }
        if( quantityUnits != undefined ){
            quantityUnit.innerHTML = quantityUnits;// localStorage.getItem('quantityUnits'+i);//master_quantityUnits[i];
        }
        if( categories != undefined ){
            category.innerHTML = categories;//localStorage.getItem('categories'+i);///master_categories[i];
        }
        if( subcategories != undefined ){
            subcategory.innerHTML = subcategories;// localStorage.getItem('subcategories'+i);//master_subcategories[i]
        }
        if( minimumQuantities != undefined ){
            minimumQuantity.innerHTML = minimumQuantities;// localStorage.getItem('minimumQuantities'+i);//master_minimumQuantities[i];
        }
        row.appendChild(name);
        row.appendChild(quantity);
        row.appendChild(quantityUnit);
        row.appendChild(category);
        row.appendChild(subcategory);
        row.appendChild(minimumQuantity);
        tabContentsItemTableContainer[0].appendChild(row);
    }
}


/* Create Master List end */


/* Onclick function start */

//Handle when item in a list is clicked
function itemSelected(key, unitNumber){
    childNodePath = key;
    deletePath = unitNameArray[unitNumber];
    selectedUnitNumber = unitNumber;
    let item = document.getElementById(key);
    console.log("Clicked item key = "+key+");, item name = "+item.children[1].innerHTML);
    console.log("Unit number : "+unitNumber);
    console.log("Unit name : "+unitNameArray[unitNumber]);
    detailViewUpdate(key, unitNameArray[unitNumber]);

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
    let assign = document.getElementById('detail_assign');
    let minimum_quantity = document.getElementById('detail_minimum_quantity');
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
            assign.value = doc.data().assign;
            minimum_quantity.value = doc.data().minimum_quantity;
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
            assign.value = '';
            minimum_quantity.value = ';'
        }
        else {
            unit.value = doc.data().unit_name;
            quantity_unit.value = doc.data().quantity_unit;
            assign.value = doc.data().assign;
            minimum_quantity.value = doc.data().minimum_quantity;
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
    assign.onchange = function(){
        if( assign.value != ref.assign ){
            ref.update({assign: assign.value});
        }
    }
    minimum_quantity.onchange = function(){
        if( minimum_quantity.value != ref.minimum_quantity ){
            ref.update({minimum_quantity: minimum_quantity.value});
        }
    }

}


/* Onclick function end */

/* onClick handlings Start */

//Submit button handling, push data to firebase

async function submitButtonClicked( unitName, i ) {
    console.log("Submit button clicked...");
    //check mandatory input field if empty or not
    let item = [];
    let category = [];
    let data = {};
    item[0] = document.getElementById('id'+i).value;
    category[0] = 'id';
    item[1] = document.getElementById('name'+i).value;
    category[1] = 'name';
    //item[1] = unitName;
    //category[1] = 'unit_name';
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
    item[8] = unitName;
    category[8] = 'unit_name';
    item[9] = document.getElementById('minimum_quantity'+i).value;
    category[9] = 'minimum_quantity';
    
    console.log(unitName);
    
    //Iterate to gather inputs and build data to push
    for( let j=0; j<item.length; j++ ){
        if( item[j] != ''){
            //Add input to data
            data[category[j]] = item[j];
            //Clear the input field
            if( j != 8 ){
                document.getElementById(category[j]+i).value = '';
            }
        }
    }

    //Add data to database
    let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName).collection('Item');
    ref.add(data)

    //Set the ID
    console.log("i="+i+", element = "+document.getElementById('id'+i));
    let maxId = await get_max_id(document.getElementById('id'+i), i);
    maxId++;
    document.getElementById('id'+i).value = ("00000"+maxId).slice(-5);
    console.log("maxId = "+maxId);

    console.log(data);
}
/* onClick handlings End */

/* Randomly generate and add items to units starts */

async function randomGen(){
    console.log('Generating random database...');
    for( let i=0; i<numOfUnits; i++ ){
        let unitName = unitNameArray[i];
        let ref = database.collection('Office').doc('Inventory').collection('Units').doc(unitName).collection('Item');
        
        //Add 10 data
        let maxId = await get_max_id(document.getElementById('id'+i), i);
        for( let j=0; j<3; j++, maxId++ ){
            let data = {};
            let num = maxId + 1;
            let id = ("00000"+num).slice(-5);
            let name = ['Desk', 'Chair', 'Pen', 'Laptop', 'Desktop', 'Stapler', 'Cords', 'Tape', 'Lamp', 'Delicious Ramen box'];
            let quantity = Math.floor(Math.random() * 2000);
            let quantity_unit = 'ea.';
            let description = ['description0', 'description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8', 'description9'];
            let category =['Office Supply', 'Electric', 'Others', 'Furniture'];
            let subcategory = [1, 2, 3, 4];
            let minimum_quantity = [10, 100, 200, 300, 400, 500, 600, 700, 800, 900];
            let assign = ['John', 'Smith', 'Autumn', 'Amir', 'Juri', 'Watis', 'Will', 'Torres', 'Sam', 'Ken'];
            let randomIndex = Math.floor(Math.random() * 10);
            data['id'] = id;
            data['name'] = name[randomIndex];
            data['quantity'] = quantity;
            data['quantity_unit'] = quantity_unit;
            data['description'] = description[Math.floor(Math.random() * 10)];
            data['category'] = category[randomIndex%4];
            data['subcategory'] = subcategory[randomIndex%4];
            data['unit_name'] = unitName;
            data['minimum_quantity'] = minimum_quantity[randomIndex];
            data['assign'] = assign[Math.floor(Math.random() * 10)];
            ref.add(data);
        }
        get_max_id(document.getElementById('id'+i), i);
        

        

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