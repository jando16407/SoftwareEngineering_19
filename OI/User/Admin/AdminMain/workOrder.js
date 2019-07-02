function formatTime(timestamp){
    let time = new Date(),
    minutes = time.getMinutes().toString().length == 1 ? '0'+time.getMinutes() : time.getMinutes(),
    hours = time.getHours().toString().length == 1 ? '0'+time.getHours() : time.getHours(),
    ampm = time.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[time.getDay()]+' '+months[time.getMonth()]+' '+time.getDate()+' '+time.getFullYear()+' '+hours+':'+minutes+ampm;
    }

    function renderOrder(doc){
        let dateRequest = formatTime(doc.data().requestDate);
        let dateNeeded = formatTime(doc.data().needBy);

        let li = document.createElement('li');
        let requestType = document.createElement('span');
        let request = document.createElement('span');
        let requestDate = document.createElement('span');
        let needBy = document.createElement('span');
        let itemName = document.createElement('span');
        let itemDescription = document.createElement('span');
        let quantity = document.createElement('span');
        let unit = document.createElement('span')

        let cross = document.createElement('button');
    
        li.setAttribute('data-id', doc.id);
        requestType.textContent = doc.data().requestType;
        request.textContent = doc.data().request;
        requestDate.textContent = dateRequest;
        needBy.textContent = doc.data().dateNeeded;
        itemName.textContent = doc.data().itemName;
        itemDescription.textContent = doc.data().itemDescription;
        quantity.textContent = doc.data().quantity;
        unit.textContent = doc.data().unit;
    
        cross.textContent = 'X';

        li.appendChild(unit);
        li.appendChild(requestType);
        li.appendChild(request);
        li.appendChild(requestDate);
        li.appendChild(needBy);
        li.appendChild(itemName);
        li.appendChild(itemDescription);
        li.appendChild(quantity);
        li.appendChild(unit);

        li.appendChild(cross);
    
        printWorkOrder.appendChild(li);
        // delete Announcement
        cross.addEventListener('click', (e)=>{
            //e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('Watis/NusiCkayiV6LuuMOu94U/CompletedWork').doc(id).add();
            db.collection('Watis/NusiCkayiV6LuuMOu94U/workOrder').doc(id).delete();
        })
    }
    db.collection('Watis/NusiCkayiV6LuuMOu94U/workOrder').orderBy('requestDate').onSnapshot((snapshot) =>{
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
    // const form = document.querySelector("#send-request-form");
    // const sndBtn = document.querySelector("sndBtn");
    
    
    // Post this for everyone
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        db.collection('Watis/NusiCkayiV6LuuMOu94U/workOrder').add({
            comment: form.comment.value,
            completedBy: form.completedBy.value,
            completedDate: formatTime(),
        })
    })