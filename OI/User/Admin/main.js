var database;
var announcementsPath;
var submitButton1, deleteButton;
var announcementContainer;
var currentDate = new Date();
var childNodePath = '';
var childNodeRef;
var selecedItem;
var firebase;


firebase_setup();
page_setup();
renderAnnouncements();


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
}
//initial setup for the page
function page_setup(){
    submitButton1 = document.getElementById("submitButton1");
    deleteButton = document.getElementById("deleteButton");
    announcementsPath = "Announcements"
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

//Update the table for Annnouncements
function renderAnnouncements(){
    let ref = database.collection('Office').doc('Announcement').collection('Posts');
    ref.orderBy('date').onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
            if(change.type === "added"){
                let announcement;
                announcement = document.createElement('div');
                let title = document.createElement('div');
                let date = document.createElement('p');
                let body = document.createElement('p');
                announcement.setAttribute("key", change.doc.id);
                announcement.setAttribute("class", 'ui message');
                announcement.setAttribute('id', change.doc.id);
                announcement.addEventListener("click", function(e){
                    itemSelected(change.doc.id);
                });
                title.setAttribute("class", 'header');
                title.innerHTML = change.doc.data().title;
                body.innerHTML = change.doc.data().body;
                date.innerHTML = change.doc.data().date;
                announcement.appendChild(title);
                announcement.appendChild(date);
                announcement.appendChild(body);
                let temp_container = [];
                for( let i=0; i<announcementContainer.children.length; i++ ){
                    temp_container[i] = announcementContainer.children[i];
                }
                while(announcementContainer.children.length > 0){
                    announcementContainer.removeChild(announcementContainer.childNodes[0]);
                }
                announcementContainer.appendChild(announcement);
                for( let i=0; i<temp_container.length; i++){// let j=announcementContainer.children.length-1; j>=0; j--){
                    announcementContainer.appendChild(temp_container[i]);//console.log("adding child i = "+temp_container.children[i]);
                }
                temp_container = []
            }
            if (change.type === "removed") {
                for( let i=0; i<announcementContainer.children.length; i++){
                    if(announcementContainer.children[i].getAttribute('key') == change.doc.id){
                        announcementContainer.removeChild(announcementContainer.children[i]);
                    }

                }
            }
        });
    });
    console.log('Render Announcements done...');
}

/* Rendering funcitons End */



/* onClick handlings Start */

//Handle when item in a list is clicked
function itemSelected(key){
    childNodePath = key;
    let post = document.getElementById(key);
    console.log("clicked item key = "+key);
    selecedItem.value = post.children[0].innerHTML;
}

//Submit button handling, push data to firebase
submitButton1.onclick = function(){
    //Push data to Unit
    let data = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value.replace(/\r?\n/g, '<br />'),
        date: formatTime()
    }
    database.collection('Office').doc('Announcement').collection('Posts').add(data);
    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
}

//Delete button handling
deleteButton.onclick = function(){
    //Check if item is selected or not
    if(childNodePath!='' && childNodePath!=undefined){
        let deleteRef = database.collection('Office').doc('Announcement').collection('Posts').doc(childNodePath);
        deleteRef.delete().then(function() {
            console.log("Document successfully deleted from database!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        childNodePath = "";
        selecedItem.value = "";
    }
    else{
        console.log("Item not selected");
    }
}

function formatTime(){
    let time = new Date(),
    minutes = time.getMinutes().toString().length == 1 ? '0'+time.getMinutes() : time.getMinutes(),
    hours = time.getHours().toString().length == 1 ? '0'+time.getHours() : time.getHours(),
    ampm = time.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[time.getDay()]+' '+months[time.getMonth()]+' '+time.getDate()+' '+time.getFullYear()+' '+hours+':'+minutes+ampm;
}

/* onClick handlings End */


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