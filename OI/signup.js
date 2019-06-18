 // Changed by Watis to make it realtime responds and able to log user's activity.
let timelog = new Date();

 //If admin or not
// var sectionNumInput = document.getElementById("secNumInput");
// var isAdmin = document.getElementById("isAdmin");
// sectionNumInput.style.visibility = 'hidden';
// isAdmin.onclick = function(){
//     if(isAdmin.checked == false){
//     sectionNumInput.style.visibility = 'visible';
//     }
//     else{
//     sectionNumInput.style.visibility = 'hidden';
//     }
// }

//signup button
var signup = document.getElementById("signupButton");
signup.addEventListener('submit', (entry)=>{
    entry.preventDefault();
    //get other necessary variables
    var nameInput = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pw1 = document.getElementById("password1").value;
    var pw2 = document.getElementById("password2").value;
    var userId = email.value.match(/^(.+)@/)[0]
    var secNum = 0
    var type = "Admin"

    if(pw1.value !== pw2.value){
        alert("Passwords are not matching...");
        return;
    }
        //creates new user in database & stores their info

        if(isAdmin.checked == false){
            secNum = sectionNum.value
            type = "Employee"
        }
        firebase.database().ref('users/' + userId).set({
            name: nameInput.value,
            sectionNum: secNum,
            userType: type
        });
          
          console.log("success!")
          window.location.href = "index.html"
          //and send other info to db
    //creates new user in firebase authentication
    firebase.auth().createUserWithEmailAndPassword(email.value, pw1.value).then(function(){ alert('Account created...'); 
        }).catch(function(error){
            if(error != null){
                console.log(error.message);
                alert('Something is Wrong.  Sign-up failed.');
                return;
            }
        });
    
});