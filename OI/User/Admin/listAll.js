
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
  const db = firebase.firestore();
db.collection('Watis').get().then((snapShot) =>{
    snapShot.forEach((doc) => {
        console.log(`${doc.condition}`)
    })

})
const dbRef = db.doc("Watis/NusiCkayiV6LuuMOu94U/Inventory");
const printOut = document.querySelector('#supplyList');
const showAll = document.querySelector("#showAll");
const sndBtn = document.querySelector("sndBtn");

sndBtn.addEventListener("click", function(){
    const textToSnd = showAll.value;
    console.log("I am showing it... " + textToSnd + "to firestore.");
    dbRef.set({
        printOut: textToSnd
    }).then(function(){
        alert("Request sent...");
    }).catch(function (e){
        alert("Request not sent...");
    })
})