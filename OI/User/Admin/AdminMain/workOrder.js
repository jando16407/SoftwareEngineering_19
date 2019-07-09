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
        let requestType = document.createElement('li');
        let request = document.createElement('li');
        let requestDate = document.createElement('li');
        let needBy = document.createElement('li');
        let itemName = document.createElement('li');
        let itemDescription = document.createElement('li');
        let quantity = document.createElement('li');
        let unit = document.createElement('li')
        let condition = document.createElement('li')
        let cross = document.createElement('button');
        cross.classList.add("w3-bar-item")
        cross.classList.add("w3-button")
        cross.classList.add("tablink")
        cross.style.paddingBottom = " 20px";

        li.setAttribute('data-id', doc.id);
        requestType.textContent = "Request Type: " + doc.data().requestType + "\n";
        request.textContent ="Problem: " + doc.data().problem + "\n";
        requestDate.textContent ="Request Date: " + dateRequest + "\n";
        needBy.textContent = "Date Needed By: " + doc.data().needBy + "\n";
        itemName.textContent ="Item Name: " + doc.data().itemName + "\n";
        itemDescription.textContent = "Item Description: " + doc.data().itemDescription + "\n";
        quantity.textContent ="Quantity: " + doc.data().quantity + "\n";
        unit.textContent = "Unit: " + doc.data().section + "\n";
        condition.textContent ="Condition: " + doc.data().condition + "\n"
    
        cross.textContent = 'Resolve';

        li.appendChild(unit);
        li.appendChild(requestType);
        li.appendChild(request);
        li.appendChild(requestDate);
        li.appendChild(needBy);
        li.appendChild(itemName);
        li.appendChild(itemDescription);
        li.appendChild(quantity);
        li.appendChild(condition);
        li.appendChild(cross);

        printWorkOrder.appendChild(li);
        // delete Announcement
        cross.addEventListener('click',async function(e){
            let id = e.target.parentElement.getAttribute('data-id');
            await db.collection('Office/Workorder/workOrder').doc(id).update({
                condition: "Resolved"
            })
            db.collection('Office/Workorder/workOrder').doc(id).delete();
            alert("Work Order has been resolved.")
            li.innerHTML =""
        })
    }
    //updates db 
    db.collection('Office/Workorder/workOrder').orderBy('requestDate').onSnapshot((snapshot) =>{
        let changes = snapshot.docChanges();
        changes.forEach(change =>{
            console.log(change.doc.data())
            if(change.type == 'added'){
                renderOrder(change.doc);
            } else if (change.type == 'removed'){
                let li = printWorkOrder.querySelector('[data-id=' + change.doc.id + ']');
                printWorkOrder.removeChild(li);
            }
        })
    })  
    
    const printWorkOrder = document.querySelector('#workOrder');
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        db.collection('Office/Completed/completedWork').add({
            comment: form.comment.value,
            completedBy: form.completedBy.value,
            completedDate: formatTime(),
        })
    })