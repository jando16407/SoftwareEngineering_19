
// listen for auth status changes
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        db.collection('item').orderBy('itemName').get().then((snapshot) =>{
            setupItems(snapshot.docs);
        })
      console.log('user logged in: ', user);
    } else {
        setupItems([])
      console.log('user logged out');
    }
  })
  
  // signup
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const confirmP = signupForm['confirm-password'].value;
    // matching passwords
    if(password !== confirmP){
        alert('passwords not matched...');
        signupForm.reset();
        return;
    }
    // sign up the user
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {

      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      alert('Account created...'); 
      signupForm.reset();
    }).catch(function(error){
        if(error != null){
            console.log(error.message);
            alert('Something is Wrong.  Sign-up failed.  Try signing in...');
            return;
        }
    });
  });
  
  // logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
  
  // login
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
  
    // log the user in
    firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    });
  
  });