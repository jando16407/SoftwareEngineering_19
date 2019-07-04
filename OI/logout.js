/*firebase.auth().signOut().then(function() {
//
}, function(error) {
  // An error happened.
});
*/
function logOut(){  
  firebase.initializeApp(settings);

  firebase.auth().signOut().then(function() {
          sessionStorage.removeItem('tokenK');
          sessionStorage.removeItem('displayName');
          sessionStorage.removeItem('userName');
          window.open('index.html', '_self');                 
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
// adding this function for logout and not allow the user to see anything after log out.
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  firebase.auth().signOut();
})