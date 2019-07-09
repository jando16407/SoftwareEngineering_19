//var database;
var announcementsPath;
var announcementContainer;


firebase_setup();
page_setup();
renderAnnouncements();

/* Initialize Functions Start */

//Basic firebase setups
function firebase_setup(){
    //database = firebase.firestore();
}

//initial setup for the page
function page_setup(){
    announcementsPath = "Announcements"
    announcementContainer = document.getElementById("pastAnnouncementsList");
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


// Click on the first tablink on load
document.getElementsByClassName("tablink")[0].click();
/* Basic Page JavaScript End */