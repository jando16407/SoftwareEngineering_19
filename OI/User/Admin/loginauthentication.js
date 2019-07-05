
  getState()

async function checkAuth(userId){
  let userType;
    var type = await firebase.firestore().collection("Office").doc("Users").collection('Users').get().then(function(snapshot){
        snapshot.forEach(function(doc){
            if (doc.id == userId) {
              console.log("hey", userId)
              userType = doc.data().userType;// = (doc.data())[userId].userType

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
      });
  });
  if(userType != "Admin"){
    alert("Access restricted.")
    document.location.href = "../../index.html"
  }
}

 function getState(){
 firebase.auth().onAuthStateChanged( async function(user) {
    if (user) {
      //alert("LOGGED IN")
      var email = user.email
      var userId = email.match(/^(.+)@/)[1]
      checkAuth(userId)
      //sign in to appropriate page
    } else {
      // User is signed out.
      // ...
      alert("Invalid user credentials. Please log in.")
      document.location.href = "../../index.html"
    }
})
}
