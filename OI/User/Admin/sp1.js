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
var database = firebase.database();
//reset login on window load
window.onload = function(){
  /*firebase.auth().signOut().then(function(){
    //successful
//      alert('logged out')
  },function(error){
    alert('still logged in')
  })*/
}
//setup();
var submitButton1 = document.getElementById("submitButton1");
var submitButton2 = document.getElementById("submitButton2");

/********************** update Password ********************************/
submitButton1.onclick = async function(){
         var itemUsername = document.getElementById("username");
         var itemOldPass = document.getElementById("oldpass");
         var itemNewPass = document.getElementById("newpass");
         //var itemOldEmail = document.getElementById("oldemail");
         //var itemNewEmail = document.getElementById("newemail");
          
/*           
firebase.auth().signInWithEmailAndPassword(itemUsername.value, itemOldPass.value).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert("error00000")
          // ...º
      });
  */    
var user22 = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged
user22.updatePassword(itemNewPass.value).then(function() {
  //Update successful.
  alert("AAAAAAAA");
}).catch(function(error) {
  console.log('An error happened.')
});
/*
var user = firebase.auth().currentUser;
var newPassword = getASecureRandomPassword();

user.updatePassword(newPassword).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});
*/

}

/************************* Delete Username ********************************/
submitButton2.onclick = function(){ 
 var itemDelete = document.getElementById("username2");
 var itemPass = document.getElementById("password2");
 
 firebase.auth().signInWithEmailAndPassword(itemDelete.value, itemPass.value).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("error1111111");
  // ...º
});
//var currentUser = itemDelete.value;
var user3 = firebase.auth().itemDelete;
//user3.delete().then(function() {
  firebase.auth().delete().then(function() {
  // User deleted.
  alert("%%%%%%%%%%%%%%%%");
}).catch(function(error) {
  // An error happened.
  alert("A");
});
/*
var user = firebase.auth().currentUser;

user.delete().then(function() {
  // User deleted.
}).catch(function(error) {
  // An error happened.
});
*/
}
