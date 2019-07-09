
const form = document.querySelector("#requestForm");
function formatTime(timestamp){
    let time = new Date(),
    minutes = time.getMinutes().toString().length == 1 ? '0'+time.getMinutes() : time.getMinutes(),
    hours = time.getHours().toString().length == 1 ? '0'+time.getHours() : time.getHours(),
    ampm = time.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[time.getDay()]+' '+months[time.getMonth()]+' '+time.getDate()+' '+time.getFullYear()+' '+hours+':'+minutes+ampm;
    }
    //adds all work order in list view
    function renderOrder(doc){
        let dateRequest = formatTime(doc.data().requestDate);
        let dateNeeded = formatTime(doc.data().needBy);
        let li = document.createElement('li');
        let requestType = document.createElement('div');
        let problem = document.createElement('span');
        let requestDate = document.createElement('span');
        let needBy = document.createElement('span');
        let itemName = document.createElement('span');
        let itemDescription = document.createElement('span');
        let quantity = document.createElement('span');
        let unit = document.createElement('span')
        let br0 = document.createElement('br');
        let cross = document.createElement('button');
        let br1 = document.createElement('br');
        let br2 = document.createElement('br');
        let br3 = document.createElement('br');

        li.setAttribute('data-id', doc.id);
        requestType.textContent =`Request type: ${doc.data().requestType}`;
        problem.textContent = `Description of the problem:  ${doc.data().problem}`;
        requestDate.textContent = `Requested date: ${dateRequest}`;
        needBy.textContent = `Needed by: ${dateNeeded}`;
        itemName.textContent = `Item Name: ${doc.data().itemName}`;
        itemDescription.textContent = `, ${doc.data().itemDescription}`;
        quantity.textContent = doc.data().quantity;
        unit.textContent = doc.data().unit;
        cross.textContent = 'Delete';
 
        li.appendChild(requestType);
        li.appendChild(problem);
        li.appendChild(br0)
        li.appendChild(requestDate);
        li.appendChild(br1)
        li.appendChild(needBy);
        li.appendChild(br2)
        li.appendChild(itemName);
        li.appendChild(itemDescription);
        li.appendChild(quantity);
        li.appendChild(unit);
        li.appendChild(br3);

        li.appendChild(cross);

        printWorkOrder.appendChild(li);

        // delete Announcement
        cross.addEventListener('click',async function(e){
            let id = e.target.parentElement.getAttribute('data-id');
            await database.collection('Office/Workorder/workOrder').doc(id).update({
                condition: "Resolved"
            })
            database.collection('Office/Workorder/workOrder').doc(id).delete();
        });
    }
    //updates db 
    database.collection('Office/Workorder/workOrder').orderBy('requestDate').onSnapshot((snapshot) =>{
        let changes = snapshot.docChanges();
        changes.forEach(change =>{
            if(change.type == 'added'){
                renderOrder(change.doc);
            } else if (change.type == 'removed'){
                let li = printWorkOrder.querySelector('[data-id=' + change.doc.id + ']');
                printWorkOrder.removeChild(li);
           }
        })
    })  
    
    const printWorkOrder = document.querySelector('#workOrder');
    
    if(form != undefined && form != null){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            database.collection('Office/Completed/completedWork').add({
                comment: form.comment.value,
                completedBy: form.completedBy.value,
                completedDate: formatTime(),
            })
        })
    }
