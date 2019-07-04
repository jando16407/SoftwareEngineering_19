
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB0ZY93KxJK4UIRVnyXWqNm2V1l1M-4j_4",
    authDomain: "office-inventory-12f99.firebaseapp.com",
    databaseURL: "https://office-inventory-12f99.firebaseio.com",
    projectId: "office-inventory-12f99",
    storageBucket: "office-inventory-12f99.appspot.com",
    messagingSenderId: "147848186588",
    appId: "1:147848186588:web:33dbc8d727af1de4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
function formatTime(){
    let time = new Date(),
    minutes = time.getMinutes().toString().length == 1 ? '0'+time.getMinutes() : time.getMinutes(),
    hours = time.getHours().toString().length == 1 ? '0'+time.getHours() : time.getHours(),
    ampm = time.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[time.getDay()]+' '+months[time.getMonth()]+' '+time.getDate()+' '+time.getFullYear()+' '+hours+':'+minutes+ampm;
    }

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
        let needBy = document.createElement('span');

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
        needBy.textContent = doc.data().needBy

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
    
        printRequest.appendChild(li);
        // delete Announcement
        cross.addEventListener('click', (e)=>{
            //e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('Office/Workorder/workOrder').doc(id).delete();
        })
    }
    db.collection('Office/Workorder/workOrder').orderBy('requestDate').onSnapshot((snapshot) =>{
        let changes = snapshot.docChanges();
        changes.forEach(change =>{
            if(change.type == 'added'){
                renderMsg(change.doc);
            } else if (change.type == 'removed'){
                let li = printRequest.querySelector('[data-id=' + change.doc.id + ']');
                printRequest.removeChild(li);
            }
        })
    })  
    
    const printRequest = document.querySelector('#myRequest');
    const form = document.querySelector("#requestForm");
    const sndBtn = document.querySelector("#submitButton");

    // Post this for everyone
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        db.collection('Office/Workorder/workOrder').add({
            firstName: form.firstName.value,
            midName: form.midName.value,
            lastName: form.lastName.value,
            section: form.section.value,
            requestType: form.requestType.value,
            itemName: form.itemName.value,
            itemDescription:form.itemDescription.value,
            quantity: form.quantity.value,
            problem: form.problem.value,
            needBy: form.needBy.value,
            requestDate: formatTime(),
        })
    })