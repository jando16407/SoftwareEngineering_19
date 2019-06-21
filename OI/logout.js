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