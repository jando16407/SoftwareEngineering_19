
const dbO = firebase.database().ref().child('itemTypes');

const supplyList = document.querySelector('.lists');
const supplyItems = document.getElementById('supplyList');
const dbRefSupplyItems = dbO.child('officeSupply');
dbRefSupplyItems.on('child_added', snapshot => {
  let item = snapshot.val();
    const li = document.createElement('li');
    li.innerText = `${item.description}, ${item.quantity}, ${item.unit}`;
    li.id = snapshot.key;
    supplyItems.appendChild(li);
    console.log(item)
});
dbRefSupplyItems.on('child_changed', snapshot => {
  const liChanged = document.getElementById(snapshot.key);    // key is the sub items within the val();
  liChanged.innerText = snapshot.val();
});
dbRefSupplyItems.on('child_removed', snapshot => {
  const liRemoved = document.getElementById(snapshot.key);    // key is the sub items within the val();
  liRemoved.innerText = snapshot.val();
});