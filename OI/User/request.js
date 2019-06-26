const firebaseConfig = {
  apiKey: "AIzaSyB0ZY93KxJK4UIRVnyXWqNm2V1l1M-4j_4",
  authDomain: "office-inventory-12f99.firebaseapp.com",
  databaseURL: "https://office-inventory-12f99.firebaseio.com",
  projectId: "office-inventory-12f99",
  storageBucket: "office-inventory-12f99.appspot.com",
  messagingSenderId: "147848186588",
  appId: "1:147848186588:web:33dbc8d727af1de4"
};
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database().ref().child('itemTypes');

  const itemsList = document.querySelector('.lists');
  const faultyItems = document.getElementById('furnitureList');
  const dbRefFaultyItems = db.child('furniture');
  
  dbRefFaultyItems.on('child_added', snapshot => {
    let item = snapshot.val();
    if(item.condition == 'bad'){
        const li = document.createElement('li');
        li.innerText = `${item.description} - ${item.condition}`;
        li.id = snapshot.key;
        faultyItems.appendChild(li);
        console.log(item)
      }
  });
  dbRefFaultyItems.on('child_changed', snapshot => {
    const liChanged = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liChanged.innerText = snapshot.val();
});
dbRefFaultyItems.on('child_removed', snapshot => {
    const liRemoved = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liRemoved.innerText = snapshot.val();
});
