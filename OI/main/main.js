const db = firebase.firestore();
const itemList = document.querySelector('#item-list');
const form = document.querySelector('#add-item-form');
//const modelList = document.querySelector('#model-list');

// create element and render care
function renderitem(doc){
    // element
    let li = document.createElement('li');
    let itemsName = document.createElement('span');
    let condition = document.createElement('span');
    let itemsCatagory = document.createElement('span');
    let make = document.createElement('span');
    let model = document.createElement('span');
    let amount = document.createElement('span');
    let cross = document.createElement('div');
    
    // set attributes and contents
    li.setAttribute('data-id', doc.id);
    itemsName.textContent = doc.data().itemsName;
    condition.textContent = doc.data().condition;
    itemsCatagory.textContent = doc.data().itemsCatagory;
    model.textContent = doc.data().model;
    make.textContent = doc.data().make;
    amount.textContent = doc.data().amount;
    cross.textContent = 'x';

    // append it to the list tags
    li.appendChild(itemsName);
    li.appendChild(condition);
    li.appendChild(itemsCatagory);
    li.appendChild(make);
    li.appendChild(model);
    li.appendChild(amount);
    li.appendChild(cross);

    // append to document tag
    itemList.appendChild(li);
    //modelList.appendChild(li);
    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('item').doc(id).delete().then(function(){
            alert('Delete Successful...');
        }).catch(function(error){
            alert('Error! Deletion failed...');
        })
    });

}
// querying data
// where field == to what we are looking for.
// db.collection('item').where('itemsName', '==', 'laptop').get().then((snapshot) =>{ ....

// // getting data
// db.collection('item').orderBy('itemsName').get().then((snapshot) =>{
//     console.log(snapshot.docs);
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data());
//         renderitem(doc);
//     })
// })

// saving data
form.addEventListener('submit', (entry)=>{
    entry.preventDefault();
    db.collection('item').add({
        itemsName: form.itemsName.value,
        condition: form.condition.value,
        itemsCatagory: form.itemsCatagory.value,
        amount: form.amount.value
    })
    form.itemsName.value = '';
    form.condition.value = '';
    form.itemsCatagory.value = '';
    form.amount.value = '';
});

// real-time listener
db.collection('item').orderBy('itemsName').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    console.log(changes);
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderitem(change.doc);
        } else if (change.type == 'removed'){
            let li = itemList.querySelector('[data-id=' + change.doc.id + ']');
            itemList.removeChild(li);
        } else if (change.type == 'updated'){
            let li = itemList.querySelector('[data-id=' + change.doc.id + ']');
            itemList.replaceChild(li);
        }
    });
});

// Updating data
// saving data
form.addEventListener('submit', (entry)=>{
    entry.preventDefault();
    db.collection('item').where('itemsName', '==', 'form.itemsName.value').update({
        itemsName: form.itemsName.value,
        amount: form.amount.value
    })
    form.itemsName.value = '';
    form.amount.value = '';
});