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
var database = firebase.database();
//reset login on window load
window.onload = function(){
}
//did user hit login?
var telephone = document.getElementById("submitButton1")
telephone.onclick = function(){
      var phone = document.getElementById("phoneInput");
      var cellphone = phone.value
     alert(cellphone)

    firebase.auth().languageCode = 'it';

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('submitButton1', {
'size': 'invisible',
'callback': function(response) {
  alert('SMS')
  // reCAPTCHA solved, allow signInWithPhoneNumber.
  onSignInSubmit();
}
});

//window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('submitButton1');

var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(cellphone, appVerifier)
  .then(function (confirmationResult) {
    alert ('AAAAAAA')
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
  }).catch(function (error) {
    // Error; SMS not sent
    // ...
  });
  /*
  window.recaptchaVerifier.render().then(function(widgetId) {
    grecaptcha.reset(widgetId);
  })
   */
}

/**********************************************************/
var pincode = document.getElementById("submitButton2")
pincode.onclick = function(){
  var pin = document.getElementById("pinInput")
  var code = pin.value;
confirmationResult.confirm(code).then(function (result) {
// User signed in successfully.
window.location.href ="User/main.html"
var user = result.user;
// ...
}).catch(function (error) {
// User couldn't sign in (bad verification code?)
// ...
alert('try again')
});

}
      