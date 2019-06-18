// this is the index.js in The Net Ninja

const db = firebase.firestore();
// getting data

db.collection('item').get().then(snapshot =>{
  console.log(snapshot.docs)
})
const itemsList = document.querySelector('.itemDisplay');
// setup item
const setupItems = (data) =>{
  if(data.length){
    let html = '';
    data.forEach(doc =>{
      const itemDescription = doc.data();
      //console.log(itemDescription);
      const li = `
        <li>
        <div class="collapsible-header grey lighten-4">${itemDescription.itemName}</div>
        <div class="collapsible-body white">${itemDescription.itemCatagory} ${itemDescription.make}  ${itemDescription.model} &nbsp &nbsp <div>Quantity: ${itemDescription.amount} ea.</div></div>
        </li>
      `;
      html += li;
    });
    console.log(html);
    itemsList.innerHTML = html;
  } else {
    itemsList.innerHTML = '<h5>Please login before starting to view inventory</h5>'
  }
}
// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    let navPoints = document.querySelectorAll('.collapsible');
    M.Collapsible.init(navPoints);
  });