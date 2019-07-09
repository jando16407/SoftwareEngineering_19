logOut()
function logOut(){  
  firebase.initializeApp(settings);

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
