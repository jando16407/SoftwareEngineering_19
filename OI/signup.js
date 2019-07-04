
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

  //If admin or not
var sectionNumInput = document.getElementById("secNumInput");
var isAdmin = document.getElementById("isAdmin");
sectionNumInput.style.visibility = 'hidden';
isAdmin.onclick = function(){
    if(isAdmin.checked == false){
    sectionNumInput.style.visibility = 'visible';
    addOptions()
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
    if(nameInput.value == '' || nameInput.value == null){
        alert("User must have a name.")
        return
    }
    if(pw1.value !== pw2.value){
        alert("Passwords are not the same.")
        return
    }
    //creates new user in firebase authentication
    var isError = false
    await firebase.auth().createUserWithEmailAndPassword(email.value, pw1.value).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        isError = true
        // ...
    });
    if(isError)
        return 

    //creates new user in database & stores their info
    var userId = email.value.match(/^(.+)@/)[1]
    var secNum = 0
    var type = "Admin"
    if(isAdmin.checked == false){
        secNum = sectionNumInput.value
        type = "Employee"
    }
    //update users
    await firebase.firestore().collection("Office").doc("Users").update({
        [userId]:{
            name: nameInput.value,
            sectionNum: secNum,
            userType: type
        }
    })
    //update section if employee
    if(secNum != 0){
        await firebase.firestore().collection("Office").doc("Users").update({
            [secNum]:{
                user: nameInput.value
            }
        })
    }
      
      alert("You have successfully signed up!")
      document.location.href = "index.html"
}
async function addOptions(){
    var optionList = document.getElementById("options")
    var keys = new Array()
    var data = new Array()
    await firebase.firestore().collection("Office").doc("officeView").get().then(function(doc){
        if (doc.exists) {
           keys = Object.keys(doc.data())
           console.log("keys", keys)
           data = Object.values(doc.data())
           console.log("data ", data)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }})
        console.log("hi")
    for(var i = 0; i < keys.length -1; i++){
        console.log("hi")
        console.log(data[i])
        if((data[i]).user == null){
            console.log(keys[i])
            var option = document.createElement("OPTION")
            option.value = keys[i]
            optionList.appendChild(option)
        }
    }
}