 // Your web app's Firebase configuration
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
logOut()
async function logOut(){  

  await firebase.auth().signOut().then(function() {
          sessionStorage.removeItem('tokenK');
          sessionStorage.removeItem('displayName');
          sessionStorage.removeItem('userName');              
  }).catch(function(error) {
      console.log(error);
  }); 
}
firebase.auth().onAuthStateChanged(user =>{
  console.log(user);
  if(user){
    console.log('user logged in...', user);
  } else {
    console.log('user logged out...');
  }
})
