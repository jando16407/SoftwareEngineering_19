function renderLowItem(doc){
    let li = document.createElement('li');
    let itemName = document.createElement('span');
    let itemDescription = document.createElement('span');
    let quantity = document.createElement('span');
    let price = document.createElement('span');
    let col1 = document.createElement('span');
    let col2 = document.createElement('span');
    let col3 = document.createElement('span');


    li.setAttribute('data-id', doc.id);
    itemName.textContent = doc.data().itemName;
    itemDescription.textContent = doc.data().itemDescription;
    quantity.textContent = doc.data().quantity;
    price.textContent = doc.data().price;
    col1.textContent = ' - ';
    col2.textContent = ' - ';
    col3.textContent = ' x ';

    li.appendChild(itemName);
    li.appendChild(col1);
    li.appendChild(itemDescription);
    li.appendChild(col2);
    li.appendChild(price);
    li.appendChild(col3);
    li.appendChild(quantity);

    printLowItem.appendChild(li);
}

db.collection('Watis/NusiCkayiV6LuuMOu94U/Supply').orderBy('itemName').onSnapshot((snapshot) =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
      if(change.type == 'added' && change.doc.data().quantity < 3){
        console.log(change.doc.data())
          renderLowItem(change.doc);
      } else if (change.type == 'removed'){
          let li = printLowItem.querySelector('[data-id=' + change.doc.id + ']');
          printLowItem.removeChild(li);
      } else if (change.type == 'updated'){
          renderLowItem(change.doc);
      }
  })
})
const printLowItem = document.querySelector('#lowItem');
