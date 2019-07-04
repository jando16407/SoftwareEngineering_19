function renderFaulty(doc){
    let li = document.createElement('li');
    let itemName = document.createElement('span');
    let itemDescription = document.createElement('span');
    let condition = document.createElement('span');
    let price = document.createElement('span');
    let col1 = document.createElement('span');
    let col2 = document.createElement('span');
    let col3 = document.createElement('span');


    li.setAttribute('data-id', doc.id);
    itemName.textContent = doc.data().itemName;
    itemDescription.textContent = doc.data().itemDescription;
    condition.textContent = doc.data().condition;
    price.textContent = doc.data().price;
    col1.textContent = ' - ';
    col2.textContent = ' - $';
    col3.textContent = ' condition: ';

    li.appendChild(itemName);
    li.appendChild(col1);
    li.appendChild(itemDescription);
    li.appendChild(col2);
    li.appendChild(price);
    li.appendChild(col3);
    li.appendChild(condition);

    printFaulty.appendChild(li);
}

db.collection('Office/Workorder/workOrder').orderBy('itemName').onSnapshot((snapshot) =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    console.log(change.doc.data());
      if(change.type == 'added' && change.doc.data().condition < 3){
          renderFaulty(change.doc);
      } else if (change.type == 'removed'){
          let li = printFaulty.querySelector('[data-id=' + change.doc.id + ']');
          printFaulty.removeChild(li);
      } else if (change.type == 'updated' && change.doc.data().condition < 3){
          renderFaulty(change.doc);
      }
  })
})
const printFaulty = document.querySelector('#faulty');
