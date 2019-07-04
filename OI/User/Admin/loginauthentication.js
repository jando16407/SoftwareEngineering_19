
  getState()

async function checkAuth(userId){
    var type
await firebase.firestore().collection("Office").doc("Users").get().then(function(doc){
      if (doc.exists) {
        console.log("hey", userId)
         type = (doc.data())[userId].userType
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  })
  if(type != "Admin"){
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
