

const printLowItem = document.querySelector('#lowItem');
var list = new Array()
db.collection("Office/Inventory/Units").onSnapshot(async function(querySnapshot) {
    await querySnapshot.forEach(function(doc) {
        list.push(doc.id)
    });
    getItemList(list)
    
})
var newList = new Array()
async function getItemList(arrayList){
    console.log(arrayList)
    for(var i= 0; i < arrayList.length; i++){
        
    await db.collection("Office").doc("Inventory").collection("Units").doc(arrayList[i]).collection("Item")
      .get().then(function(querySnapshot) {
          
        querySnapshot.forEach(function(doc) {
            newList.push(doc.data())
        });
        
    });
    
    }
    
    //create master list
    for(var i = 0; i < newList.length; i++){
        for(var j = i + 1; j < newList.length; j++){
            if(newList[i].name == newList[j].name){
                newList[i].quantity =parseInt(newList[i].quantity) + parseInt(newList[j].quantity)
                newList.splice(j, 1);
                    j--
            }
        }
    }
    //get rid of all that are greater than min value
    for(var i = 0; i < newList.length; i++){
        if(parseInt(newList[i].quantity) > parseInt(newList[i].minimum_quantity)){
            newList.splice(i, 1)
            i--
        }
    }
    displayLow(newList)
}
    
    function displayLow(list){
        var listView = document.getElementById("lowItem")
        for(var i = 0; i < list.length; i++){
        var li = document.createElement("li")
        li.textContent = list[i].name + " - " + list[i].quantity + " " + list[i].quantity_unit
        listView.appendChild(li)
        }

<<<<<<< HEAD:OI/User/Admin/AdminMain/lowItem.js
    }
=======
database.collection('Watis/NusiCkayiV6LuuMOu94U/Supply').orderBy('itemName').onSnapshot((snapshot) =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
      if(change.type == 'added' && change.doc.data().quantity < 3){
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
>>>>>>> c9a19df1d0f8a51517860120d36c766290855987:OI/Admin/js/lowItem.js
