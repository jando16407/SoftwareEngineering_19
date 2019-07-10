const flist = document.querySelector('#table');

const setFormat = (data) =>{
    const conditionOfEquipment = new Array('need disposed', 'bad', 'fair', 'good', 'new');
    let stat = '';
    let html = '';
    html+="<table border='1|1'>";
    data.forEach(doc =>{
        const display = doc.data();
        if(display.condition < 3){
            if(display.condition === 2){
                stat = conditionOfEquipment[2];
            }  else if (display.condition === 1) {
                stat = conditionOfEquipment[1];
            }   else if (display.condition === 0){
                stat = conditionOfEquipment[0]
            }   else {
                stat = display.condition;
            }
        const li =`
        <tr>
            <td>
                ${display.itemName}
            </td>
            <td>
                ${display.itemDescription}
            </td>
            <td>
                ${stat}
            </td>
        </tr>`
        html += li;
        }
    });
    html+="</table>";
    if(flist!=null){
        flist.innerHTML = html;
    }
    
}

database.collection('Watis/NusiCkayiV6LuuMOu94U/Inventory').onSnapshot(snapshot =>{
    setFormat(snapshot.docs);
});
