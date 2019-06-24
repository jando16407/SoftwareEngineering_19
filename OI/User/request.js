// const auth = firebase.auth();
// auth.onAuthStateChanged(user =>{
//     console.log(user);
//     if(user){
//       console.log('user logged in...', user);
//     } else {
//       console.log('user logged out...');
//     }
//   })

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
  // setup lists
  const setupLists = (data) =>{
      let html = '';
      data.forEach(doc => {
        const list = doc.data();
        console.log(list);
        const li = `
            <li>
                <div class="collapsible-header grey lighten-4">${list.furniture} </div>
                <div class="collapsible-body white">${list.officeSupply}</div>
            </li>
        `;
        html += li
      });
    itemsList.innerHTML = html;
  }
  const faultyItems = document.getElementById('itemList');
  const dbRefFaultyItems = db.child('furniture');
  dbRefFaultyItems.on('child_added', snapshot => {
    let item = snapshot.val();
    if(item.condition == 'bad'){
        const li = document.createElement('li');
        li.innerText = `${item.description} - ${item.condition}`;
        li.id = snapshot.key;
        faultyItems.appendChild(li);
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