
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
 // const db = firebase.firestore();
  // create element and render item list
function renderList(doc){
    let li = document.createElement('li');
    let itemName = document.createElement('span');
    let itemDescription = document.createElement('span');
    let condition = document.createElement('span');
    let col1 = document.createElement('span');
    let col2 = document.createElement('span');


    li.setAttribute('data-id', doc.id);
    itemName.textContent = doc.data().itemName;
    itemDescription.textContent = doc.data().itemDescription;
    condition.textContent = doc.data().condition;
    col1.textContent = ' - ';
    col2.textContent = ' - ';

    li.appendChild(itemName);
    li.appendChild(col1);
    li.appendChild(itemDescription);
    li.appendChild(col2);
    li.appendChild(condition);

    printOut.appendChild(li);
}

db.collection('Office/Inventory/Units').orderBy('itemName').onSnapshot((snapshot) =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
      if(change.type == 'added'){
        console.log(change.doc.data())
          renderList(change.doc);
      } else if (change.type == 'removed'){
          let li = printOut.querySelector('[data-id=' + change.doc.id + ']');
          printOut.removeChild(li);
      }
  })

})
const printOut = document.querySelector('#equipmentList');

