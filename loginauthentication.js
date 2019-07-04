firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //alert("LOGGED IN")
      //sign in to appropriate page
    } else {
      // User is signed out.
      // ...
      alert("Invalid user credentials. Please log in.")
      document.location.href = "../index.html"
    }
  });