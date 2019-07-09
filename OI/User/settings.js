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
var database = firebase.firestore();

var submitButton1 = document.getElementById("submitButton1");
var submitButton2 = document.getElementById("submitButton2");
var submitButton3 = document.getElementById("submitButton3");

/********************** update Password ********************************/
submitButton1.onclick = async function(){
  var itemUsername = document.getElementById("username");
  var itemOldPass = document.getElementById("oldpass");
  var itemNewPass = document.getElementById("newpass");
   
await firebase.auth().signInWithEmailAndPassword(itemUsername.value, itemOldPass.value).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   alert("error")
   // ...º
});
//get current user
var user22 = firebase.auth().currentUser;
//update pass
user22.updatePassword(itemNewPass.value).then(function() {
alert('Password Updated successfully');
}).catch(function(error) {
console.log('An error happened.')
});
//Show in report
const report = document.getElementById('Message');
report.innerHTML = 'Password of user ' + '(' +itemUsername.value  + ')' + ' is changed by employee.'
}
/************************* Delete Username ********************************/
submitButton2.onclick = async function(){ 
  var itemDelete = document.getElementById("username2");
  var itemPass = document.getElementById("password2");
  
  await firebase.auth().signInWithEmailAndPassword(itemDelete.value, itemPass.value).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   alert("error");
   // ...º
 });
 //get current user
 var user = firebase.auth().currentUser;
 //get userid
 var userId = itemDelete.value.match(/^(.+)@/)[1]
 //delete user
 user.delete().then(function() {
   alert('User Deleted successfully');
 }).catch(function(error) {
   // An error happened.
 });
 firebase.firestore().collection("Office").doc("Users").collection("Users").doc(userId).delete()
 //show report to user
 const report = document.getElementById('Message');
 report.innerHTML = 'Account of user ' + '(' +itemDelete.value  + ')' + ' is deleted by employee.'
 }

/*******************************Change Section ***************************/
submitButton3.onclick = async function(){ 
    //var userId1 = document.getElementById("username5");
    var nameInput = document.getElementById("name");
    var secNum1 = document.getElementById("section");
    var typeInput = document.getElementById("type");
    var userIdUpdate 
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        userIdUpdate = user.email.match(/^(.+)@/)[1]
        console.log("Clicked: "+user);
      } else {
        // No user is signed in.
        console.log("did not work");
      }
    });
    
    //For each field update in database
    if( nameInput.value != '' && nameInput != undefined ){
      database.collection('Office').doc('Users').collection('Users').doc(userIdUpdate).update({
        name: nameInput.value
      });
    }
    if( secNum1.value != '' && secNum1 != undefined ){
      database.collection('Office').doc('Users').collection('Users').doc(userIdUpdate).update({
        sectionNum: secNum1.value
      });
    }
    if( typeInput != '' && typeInput != undefined ){
      database.collection('Office').doc('Users').collection('Users').doc(userIdUpdate).update({
        userType: typeInput.value
      });
    }
  const report = document.getElementById('Message');
  const report2 = document.getElementById('Message2');
  const report3 = document.getElementById('Message3');
  report.innerHTML = 'Profile of user is changed by employee:'
  report2.innerHTML = 'Name is: '+ nameInput.value;
  report3.innerHTML = 'Section is: '+ secNum1.value;
  }