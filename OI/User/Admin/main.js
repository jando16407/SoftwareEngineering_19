var database;
var announcementsPath, ref;
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
}
//initial setup for the page
function page_setup(){
    submitButton1 = document.getElementById("submitButton1");
    deleteButton = document.getElementById("deleteButton");
    announcementsPath = "Announcements"
   // ref = database.ref(announcementsPath);
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
  console.log("Render announcement");
    let ref = database.collection('Office').doc('Announcement').collection('Posts');
    
    //let announcement = document.createElement('div');
    //ref.orderBy('date').get().then(function(querySnapshot) {
      //  querySnapshot.forEach(function(doc) {
      ref.onSnapshot(function(querySnapshot) {
  //      while(announcementContainer.children.length > 0){
    //        announcementContainer.removeChild(announcementContainer.childNodes[0]);
      //  }
        console.log("ref.onSnapshot running...");
          let i = 0;
          let announcement = [];
          querySnapshot.docChanges().forEach(function(change) {
            if(change.type === "added"){console.log("New city: ", change.doc.data());
              let k = i;
              announcement[i] = document.createElement('div');
              let title = document.createElement('div');
              let date = document.createElement('p');
              let body = document.createElement('p');
              let id = announcementContainer.children.length + 1;
              announcement[i].setAttribute("key", change.doc.id);
              announcement[i].setAttribute("class", 'ui message');
              console.log("ID: "+id);
                  console.log("Anounc Id: "+announcement[i]);
              announcement[i].addEventListener("click", function(e){
                  itemSelected(id, announcement[i], e.target.parentElement.getAttribute('key'));
                  console.log("CLICKED ID: "+id);
                  console.log("CLICKED Anounc Id: "+announcement[i]);
                  console.log("Attribute "+e.target.parentElement.getAttribute('key'))
              });
              title.setAttribute("class", 'header');
              title.innerHTML = change.doc.data().title;
              body.innerHTML = change.doc.data().body;
              date.innerHTML = change.doc.data().date;
              console.log(change.doc.id);
              console.log(change.doc.data().title);
              console.log(change.doc.data().date);
              console.log(change.doc.data().body);
              announcement[i].appendChild(title);
              announcement[i].appendChild(date);
              announcement[i].appendChild(body);
              //announcementContainer.appendChild(announcement[i]);
                i++;
              }
              if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
          });
          for( let j=i-1; j>=0; j-- ){
              announcementContainer.appendChild(announcement[j]);
          }
      });
  /*
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
    */
}

/* Rendering funcitons End */



/* onClick handlings Start */

//Handle when item in a list is clicked
function itemSelected(id, announcement ){
    childNodePath = document.getElementById("pastAnnouncementsList").childNodes[id+1].getAttribute("key");
//    childNodeRef = database.collection('Office').doc('Annoouncement').collection('Posts').doc(childNodePath);
    selecedItem.value = document.getElementById("pastAnnouncementsList").childNodes[id+1].childNodes[0].innerHTML;
    console.log(childNodePath);
    console.log(id);
    
}

//Submit button handling, push data to firebase
submitButton1.onclick = function(){
    //Push data to Unit
    let data = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value.replace(/\r?\n/g, '<br />'),
        date: formatTime()//currentDate.getMonth()+'/'+currentDate.getDate()+'/'+currentDate.getFullYear()
    }
    database.collection('Office').doc('Announcement').collection('Posts').add(data);
    console.log("Data:"+ data.title);
    console.log("Data:"+ data.body);
    console.log("Data:"+ data.date);
    //ref.push(data)
    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
}

//Delete button handling
deleteButton.onclick = function(){
    //Check if item is selected or not
    if(childNodePath!='' && childNodePath!=undefined){
      let deleteRef = database.collection('Office').doc('Announcement').collection('Posts').doc(childNodePath);
      deleteRef.delete().then(function() {
          console.log("Document successfully deleted!");
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