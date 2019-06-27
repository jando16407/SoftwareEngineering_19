var database;
var announcementsPath, ref;
var submitButton1, deleteButton;
var announcementContainer;
var currentDate = new Date();
var childNodePath;
var selecedItem;


firebase_setup();
page_setup();
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
    deleteButton = document.getElementById("deleteButton");
    announcementsPath = "Announcements"
    ref = database.ref(announcementsPath);
    announcementContainer = document.getElementById("pastAnnouncementsList");
    selecedItem = document.getElementById("selectedAnnouncement");
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
    //Rendering for Annnouncements
    if(path == announcementsPath){
        while(announcementContainer.children.length > 0){
            announcementContainer.removeChild(announcementContainer.childNodes[1]);
        }
        renderAnnouncements();
    }
}

//Update the table for Annnouncements
function renderAnnouncements(){
    ref.once("value", function(snapshot){
        let items = snapshot.val();
        let keys = Object.keys(items);
        for( let i=keys.length-1; i>=0; --i ){
            let k = keys[i];
            let announcement = document.createElement('div');
            let title = document.createElement('div');
            let date = document.createElement('p');
            let body = document.createElement('p');
            let id = announcementContainer.children.length + 1;
            announcement.setAttribute("key", keys[i]);
            announcement.setAttribute("class", 'ui message');
            announcement.addEventListener("click", function(){
                itemSelected(id, announcement);
            });
            title.setAttribute("class", 'header');
            title.innerHTML = items[k].title;
            body.innerHTML = items[k].body;
            date.innerHTML = items[k].date;
            announcement.appendChild(title);
            announcement.appendChild(date);
            announcement.appendChild(body);
            announcementContainer.appendChild(announcement);
        }
    }, gotErr);
}

/* Rendering funcitons End */



/* onClick handlings Start */

//Handle when item in a list is clicked
function itemSelected(id, container){
    childNodePath = document.getElementById("pastAnnouncementsList").childNodes[id].getAttribute("key");
    selecedItem.value = document.getElementById("pastAnnouncementsList").childNodes[id].childNodes[0].innerHTML;
    console.log(selecedItem);
    console.log(id);
}

//Submit button handling, push data to firebase
submitButton1.onclick = function(){
    //Push data to Unit
    let data = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value.replace(/\r?\n/g, '<br />'),
        date: currentDate.getMonth()+'/'+currentDate.getDate()+'/'+currentDate.getFullYear()
    }
    ref.push(data)
    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
}

//Delete button handling
deleteButton.onclick = function(){
    //Check if item is selected or not
    let deleteRef = database.ref(announcementsPath+'/'+childNodePath);
    deleteRef.remove();
    childNodePath = "";
    selecedItem.value = "";
}


/* onClick handlings End */




/* Database modify handling start */

//Listen to any value changes on the database
function renderListen(){
    //Any item modification, adding, deleting will update the 
    //list in Announcement
    ref.on("value", function(snapshot){
        renderTableContents(announcementsPath);
    }, gotErr);
}

/* Database modify handling end */



/* Basic Page JavaScript Start */

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
document.getElementsByClassName("tablink")[0].click();
document.getElementsByClassName("tttabbb")[0].click();
/* Basic Page JavaScript End */