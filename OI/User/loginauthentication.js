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
//check auth
getState()

async function checkAuth(userId){
  let userType;
    var type = await firebase.firestore().collection("Office").doc("Users").collection('Users').get().then(function(snapshot){
    snapshot.forEach(function(doc){
      if (doc.id == userId) {
        console.log("hey", userId)
        // type = (doc.data())[userId].userType
        console.log('userId'+doc.data().userType);
        userType = doc.data().userType;
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  })
});
  if(userType != "Employee"){
    alert("Access restricted.")
    document.location.href = "../index.html"
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
      document.location.href = "../index.html"
    }
})
}

