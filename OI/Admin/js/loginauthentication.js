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
const database = firebase.firestore();
getState()
//checks user is logged in and in correct area
async function checkAuth(userId){
  let userType;
    var type = await firebase.firestore().collection("Office").doc("Users").collection('Users').get().then(function(snapshot){
        snapshot.forEach(function(doc){
            if (doc.id == userId) {
              console.log("Your credential is: ", userId)
              userType = doc.data().userType;// = (doc.data())[userId].userType

            } else {
                // doc.data() will be undefined in this case
                //console.log("No such document!");
            }
      });
  });
  if(userType != "Admin"){
    alert("Access restricted.")
    document.location.href = "../index.html"
  }
}
//gets current state of logged in user
 function getState(){
 firebase.auth().onAuthStateChanged( async function(user) {
    if (user) {
      var email = user.email
      var userId = email.match(/^(.+)@/)[1]
      checkAuth(userId)
      //sign in to appropriate page
    } else {
      // User is signed out send to log in page
      alert("Invalid user credentials. Please log in.")
      document.location.href = "../index.html"
    }
})
}
