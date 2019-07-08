
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
  firebase.auth().onAuthStateChanged(user =>{
    console.log(user);
    if(user){
      console.log('user logged in...', user);
    } else {
      console.log('user logged out...');
    }
  })
  //reset login on window load
  window.onload = function(){
    firebase.auth().signOut().then(function(){
      //successful
//      alert('logged out')
    },function(error){
      alert('still logged in')
    })
  }
  //did user hit login?
  var login = document.getElementById("loginButton")

  login.onclick = function(e){
    e.preventDefault();
        //get email & password from fields
        var emailInput = document.getElementById("emailInput")
        var passwordInput = document.getElementById("passwordInput")

        var email = emailInput.value
        var password = passwordInput.value
       
        // get email input & password input
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
        });
    }
  //checks if signed in and sends to appropriate page
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var email = user.email;
      //alert("LOGGED IN")
      //sign in to appropriate page
      identifyUser(email)
    } else {
      // User is signed out.
      // ...
    }
  });

async function identifyUser(email){
  var userId = email.match(/^(.+)@/)[1]
  console.log("userID :"+userId);
  //save userId to send to next page
  localStorage.setItem('user', userId)

  //check db for admin or employee
  var type = await firebase.firestore().collection("Office").doc("Users").collection('Users').get().then(function(snapshot){
    snapshot.forEach(function(doc) {
      //console.log("doc.id = "+doc.id);
        if (doc.id == userId) {
          //send user to their page based on userType
        if(doc.data().userType == 'Admin')
              window.location.href = "User/Admin/main.html";
            else
              window.location.href = "User/main.html";

             //console.log("TYPE :"+doc.data().userType);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
    
    

  
}
