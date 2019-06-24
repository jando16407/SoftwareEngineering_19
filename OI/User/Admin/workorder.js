/**
 * This function will alert the admin of the low items, status, faulty items.
 */
// get element
const preObject = document.getElementById('object');

// create references
const db = firebase.database().ref().child('itemTypes');

/**  sync object changes **
db.on('value', snapshot => { 
    //console.log(snapshot.val());
    preObject.innerText = JSON.stringify(snapshot.val(), null, 3);
}); */
/** Faulty items list */
// create references
const faultyItems = document.getElementById('faultyItms');
const dbRefFaultyItems = db.child('furniture');
console.log(dbRefFaultyItems)
dbRefFaultyItems.on('child_added', snapshot => {
    let item = snapshot.val();
    console.log(item.description)
    if(item.condition == 'bad'){
    console.log(`${item.description} - ${item.condition}`);
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
/** Endo of Faulty items */
/** Low items list **/
const lowItems = document.getElementById('lowItms');
const dbRefLowItems = db.child('officeSupply');
console.log(dbRefLowItems)
dbRefLowItems.on('child_added', snapshot => {
    let list = snapshot.val();
    if(list.quantity <= 2){
    console.log(`${list.description} - ${list.quantity} : ${list.unit}`);
        const li = document.createElement('li');
        li.innerText = `${list.description} - ${list.quantity} : ${list.unit}`;
        li.id = snapshot.key;
        lowItems.appendChild(li);
    }
});
dbRefLowItems.on('child_changed', snapshot => {
    const liChanged = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liChanged.innerText = snapshot.val();
});
dbRefLowItems.on('child_removed', snapshot => {
    const liRemoved = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liRemoved.innerText = snapshot.val();
});
/** End of Low items list */




