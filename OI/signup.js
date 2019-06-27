
//connect to firebase
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

// global to see if signup is finished
var isSignedUp = false

  //If admin or not
var sectionNumInput = document.getElementById("secNumInput");
var isAdmin = document.getElementById("isAdmin");
sectionNumInput.style.visibility = 'hidden';
isAdmin.onclick = function(){
    if(isAdmin.checked == false){
    sectionNumInput.style.visibility = 'visible';
    }
    else{
    sectionNumInput.style.visibility = 'hidden';
    }
}
//signup button
var signup = document.getElementById("signupButton")
signup.onclick = async function(){
    //get other necessary variables
    var nameInput = document.getElementById("name")
    var email = document.getElementById("email")
    var pw1 = document.getElementById("password1")
    var pw2 = document.getElementById("password2")
    if(pw1.value !== pw2.value){
        alert("Passwords not the sameeeee")
        return
    }
    //creates new user in firebase authentication
    await firebase.auth().createUserWithEmailAndPassword(email.value, pw1.value).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    //creates new user in database & stores their info
    var userId = email.value.match(/^(.+)@/)[1]
    var secNum = 0
    var type = "Admin"
    if(isAdmin.checked == false){
        secNum = sectionNumInput.value
        type = "Employee"
    }
    await firebase.database().ref('users/' + userId).set({
        name: nameInput.value,
        sectionNum: secNum,
        userType: type
    });
      
      alert("You have successfully signed up!")
      document.location.href = "index.html"
}