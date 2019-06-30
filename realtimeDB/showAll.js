
const dbi = firebase.database().ref().child('itemTypes');

const electronicList = document.querySelector('.lists');
const allItems = document.getElementById('electronicList');
const dbRefAllItems = dbi.child('electronic');
dbRefAllItems.on('child_added', snapshot => {
  let item = snapshot.val();
    const li = document.createElement('li');
    li.innerText = `${item.make}, ${item.model}, ${item.SN}, ${item.serviceTag} - ${item.condition}`;
    li.id = snapshot.key;
    allItems.appendChild(li);
    console.log(item)
});
dbRefAllItems.on('child_changed', snapshot => {
  const liChanged = document.getElementById(snapshot.key);    // key is the sub items within the val();
  liChanged.innerText = snapshot.val();
});
dbRefAllItems.on('child_removed', snapshot => {
  const liRemoved = document.getElementById(snapshot.key);    // key is the sub items within the val();
  liRemoved.innerText = snapshot.val();
});