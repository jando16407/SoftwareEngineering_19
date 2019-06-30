function formatTime(){
    let time = new Date(),
    minutes = time.getMinutes().toString().length == 1 ? '0'+time.getMinutes() : time.getMinutes(),
    hours = time.getHours().toString().length == 1 ? '0'+time.getHours() : time.getHours(),
    ampm = time.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[time.getDay()]+' '+months[time.getMonth()]+' '+time.getDate()+' '+time.getFullYear()+' '+hours+':'+minutes+ampm;
    }
    const workOrder = document.querySelector('#workOrder');
    function renderMsg(doc){
        let li = document.createElement('li');
        let firstName = document.createElement('span');
        let lastName = document.createElement('span');
        let requestDate = document.createElement('span');
        let midName = document.createElement('span');
        let request = document.createElement('span');
        let itemName = document.createElement('span');
        let itemDescription = document.createElement('span');
        let requestType = document.createElement('span');

        let cross = document.createElement('button');
    
        li.setAttribute('data-id', doc.id);
        firstName.textContent = doc.data().firstName;
        midName.textContent = doc.data().midName;
        lastName.textContent = doc.data().lastName;
        requestDate.textContent = doc.data().requestDate;
        request.textContent = doc.data().request;
        itemName.textContent = doc.data().itemName;
        itemDescription.textContent = doc.data().itemDescription;
        requestType.textContent = doc.data().requestType;

        cross.textContent = 'X';

        li.appendChild(firstName);
        li.appendChild(midName);
        li.appendChild(lastName);
        li.appendChild(request);
        li.appendChild(requestDate);
        li.appendChild(itemName);
        li.appendChild(itemDescription);
        li.appendChild(requestType);

        li.appendChild(cross);
    
        printAnnounce.appendChild(li);
        // delete Announcement
        cross.addEventListener('click', (e)=>{
            //e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('Announcement').doc(id).delete();
        })
    }
    db.collection('Announcement').orderBy('requestDate').onSnapshot((snapshot) =>{
        let changes = snapshot.docChanges();
        changes.forEach(change =>{
            if(change.type == 'added'){
                renderMsg(change.doc);
            } else if (change.type == 'removed'){
                let li = printAnnounce.querySelector('[data-id=' + change.doc.id + ']');
                printAnnounce.removeChild(li);
            }
        })
    })  
    
    const printAnnounce = document.querySelector('#announceAll');
    const form = document.querySelector("#send-msg-form");
    const sndBtn = document.querySelector("sndBtn");
    
    
    // Post this for everyone
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        db.collection('Announcement').add({
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            requestDate: formatTime(),
        })
    })