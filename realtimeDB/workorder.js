/**
 * This function will alert the admin of the low items, status, faulty items.
 */
// get element
const preObject = document.getElementById('object');

// create references
const db = firebase.database().ref().child('itemTypes');

const faultyElectronicItems = document.getElementById('faultyElectronic');
const dbRefFautlyElectronic = db.child('electronic');
console.log(dbRefFautlyElectronic)
/***************** Electronic Faulty *******************************/
dbRefFautlyElectronic.on('child_added', snapshot => {
    let itemE = snapshot.val();
    console.log(`${itemE.make}, ${itemE.model},service tag: ${itemE.serviceTag}, SN: ${itemE.SN} - ${itemE.condition}`);
    if(itemE.condition == 'bad'){
        const li = document.createElement('li');
        li.innerText = `${itemE.make}, ${itemE.model},service tag: ${itemE.serviceTag}, SN: ${itemE.SN} - ${itemE.condition}`;
        li.id = snapshot.key;
        faultyElectronicItems.appendChild(li);
    }
});
dbRefFautlyElectronic.on('child_changed', snapshot => {
    const liChanged = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liChanged.innerText = snapshot.val();
});
dbRefFautlyElectronic.on('child_removed', snapshot => {
    const liRemoved = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liRemoved.innerText = snapshot.val();
});
/***************** Furniture Faulty **********************/
const faultyFurniture = document.getElementById('faultyFurniture');
const dbRefFautlyFurniture = db.child('furniture');
dbRefFautlyFurniture.on('child_added', snapshot => {
    let item = snapshot.val();
    if(item.condition == 'bad'){
    console.log(`${item.description} - ${item.condition}`);
        const li = document.createElement('li');
        li.innerText = `${item.description} - ${item.condition}`;
        li.id = snapshot.key;
        faultyFurniture.appendChild(li);
    }
});
dbRefFautlyFurniture.on('child_changed', snapshot => {
    const liChanged = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liChanged.innerText = snapshot.val();
});
dbRefFautlyFurniture.on('child_removed', snapshot => {
    const liRemoved = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liRemoved.innerText = snapshot.val();
});
/** Endo of Faulty items */

/** Low items list **/
const lowItems = document.getElementById('lowItms');
const dbRefLowItems = db.child('officeSupply');
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




