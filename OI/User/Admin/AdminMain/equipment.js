
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

db.collection('Watis/NusiCkayiV6LuuMOu94U/Inventory').orderBy('itemName').onSnapshot((snapshot) =>{

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

