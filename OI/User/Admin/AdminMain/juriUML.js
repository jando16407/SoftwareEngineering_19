
  // create element and render item list
function renderOfficeList(doc){
    let li = document.createElement('li');
    let id = document.createElement('span');
    let size = document.createElement('span');
    let x = document.createElement('span');
    let y = document.createElement('span');
    let Units = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    id.textContent = doc.data().id;
    size.textContent = doc.data().size;
    x.textContent = doc.data().x;
    y.textContent = doc.data().y;
    Units.textContent = doc.data().Units;

    li.appendChild(id);
    li.appendChild(size);
    li.appendChild(x);
    li.appendChild(y);
    li.appendChild(Units);

    printOffice.appendChild(li);
}
db.collection('Office').get().then((snapShot) =>{
    snapShot.docs.forEach((doc) => {
        console.log(doc.data())
        renderOfficeList(doc);
    })

})
const printOffice = document.querySelector('#officeList');

// // select certain field of data
//  db.collection('Office').where('size', '>', '100').get().then((snapShot) =>{
//     snapShot.docs.forEach((doc) => {
//         console.log(doc.data())
//         renderOfficeList(doc);
//     })

// })