// create references
const electronicItems = document.getElementById('electronicList');
const dbRefElectronic = db.child('electronic');
console.log(dbRefElectronic)
/***************** Electronic Faulty *******************************/
dbRefElectronic.on('child_added', snapshot => {
    let itemE = snapshot.val();
    console.log(`${itemE.make}, ${itemE.model},service tag: ${itemE.serviceTag}, SN: ${itemE.SN} - ${itemE.condition}`);
    const li = document.createElement('li');
    li.innerText = `${itemE.make}, ${itemE.model},service tag: ${itemE.serviceTag}, SN: ${itemE.SN} - ${itemE.condition}`;
    li.id = snapshot.key;
    electronicItems.appendChild(li);
});
dbRefElectronic.on('child_changed', snapshot => {
    const liChanged = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liChanged.innerText = snapshot.val();
});
dbRefElectronic.on('child_removed', snapshot => {
    const liRemoved = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liRemoved.innerText = snapshot.val();
});
/***************** Furniture Faulty **********************/
const furnitureList = document.getElementById('furnitureList');
const dbRefFurniture = db.child('furniture');
dbRefFurniture.on('child_added', snapshot => {
    let item = snapshot.val();
    console.log(`${item.description} - ${item.condition}`);
    const li = document.createElement('li');
    li.innerText = `${item.description} - ${item.condition}`;
    li.id = snapshot.key;
    furnitureList.appendChild(li);
});
dbRefFurniture.on('child_changed', snapshot => {
    const liChanged = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liChanged.innerText = snapshot.val();
});
dbRefFurniture.on('child_removed', snapshot => {
    const liRemoved = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liRemoved.innerText = snapshot.val();
});
/** Endo of Faulty items */

/** Low items list **/
const supplyList = document.getElementById('supplyList');
const dbRefSupply = db.child('officeSupply');
dbRefSupply.on('child_added', snapshot => {
    let list = snapshot.val();
    if(list.quantity <= 2){
    console.log(`${list.description} - ${list.quantity} : ${list.unit}`);
        const li = document.createElement('li');
        li.innerText = `${list.description} - ${list.quantity} : ${list.unit}`;
        li.id = snapshot.key;
        supplyList.appendChild(li);
    }
});
dbRefSupply.on('child_changed', snapshot => {
    const liChanged = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liChanged.innerText = snapshot.val();
});
dbRefSupply.on('child_removed', snapshot => {
    const liRemoved = document.getElementById(snapshot.key);    // key is the sub items within the val();
    liRemoved.innerText = snapshot.val();
});
/** End of Low items list */




