
  // create element and render item list
function renderList(doc){
    let li = document.createElement('li');
    let  = document.createElement('span');
    let itemDescription = document.createElement('span');
    let condition = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    itemName.textContent = doc.data().itemName;
    itemDescription.textContent = doc.data().itemDescription;
    condition.textContent = doc.data().condition;

    li.appendChild(itemName);
    li.appendChild(itemDescription);
    li.appendChild(condition);

    printOut.appendChild(li);
}
db.collection('Office/inventories').get().then((snapShot) =>{
    snapShot.docs.forEach((doc) => {
        console.log(doc.data())
        renderList(doc);
    })

})
const printOut = document.querySelector('#officeList');

