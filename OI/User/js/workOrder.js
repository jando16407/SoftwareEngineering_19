const db = firebase.firestore();
//formats time

function formatTime(){
    let time = new Date(),
    minutes = time.getMinutes().toString().length == 1 ? '0'+time.getMinutes() : time.getMinutes(),
    hours = time.getHours().toString().length == 1 ? '0'+time.getHours() : time.getHours(),
    ampm = time.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[time.getDay()]+' '+months[time.getMonth()]+' '+time.getDate()+' '+time.getFullYear()+' '+hours+':'+minutes+ampm;
    }
// displays info for all Employee's section work orders
    function renderMsg(doc){
        let li = document.createElement('li');
        let requestDate = document.createElement('li');
        let request = document.createElement('li');
        let itemName = document.createElement('li');
        let itemDescription = document.createElement('li');
        let requestType = document.createElement('li');
        let needBy = document.createElement('li');
        let condition = document.createElement('li')
        let cross = document.createElement('button');
        cross.classList.add("w3-bar-item")
        cross.classList.add("w3-button")
        cross.classList.add("tablink")
        cross.style.paddingBottom = " 20px";

        li.setAttribute('data-id', doc.id);
        requestDate.textContent = "Request Date: " + doc.data().requestDate;
        request.textContent = "Request: " + doc.data().problem;
        itemName.textContent = "Item Name: " + doc.data().itemName;
        itemDescription.textContent ="Item Description: " + doc.data().itemDescription;
        condition.textContent ="Condition: " + doc.data().condition
        requestType.textContent = "Request Type: " + doc.data().requestType
        cross.textContent = 'Cancel Request';

        li.appendChild(request);
        li.appendChild(requestType);
        li.appendChild(requestDate);
        li.appendChild(itemName);
        li.appendChild(itemDescription);
        li.appendChild(condition)

        li.appendChild(cross);
        var printRequest = document.getElementById("workOrder")
        console.log("hi")
        printRequest.appendChild(li);
        // delete Announcement
        cross.addEventListener('click', async function(e){
            //e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            await db.collection('Office/Workorder/workOrder').doc(id).update({
                condition: "Cancel"
            })
            //db.collection('Office/Completed/CompletedWork').doc(id).add();
            db.collection('Office/Workorder/workOrder').doc(id).delete();
            alert("Work Order has been Cancelled")
            li.innerHTML =""
        })
    }
var unit
//gets employee section
async function getSection(){
    var user = localStorage.getItem("user")
    await db.collection("Office/Users/Users").doc(user).get().then(function(doc){
         setSection(doc.data().sectionNum)
        
    })
}
//adds work order info on fb change
function setSection(temp){
    unit = temp
    db.collection('Office/Workorder/workOrder').orderBy('requestDate').onSnapshot((snapshot) =>{
        let changes = snapshot.docChanges();
        changes.forEach(change =>{
            if(change.type == 'added' && change.doc.data().section == unit){
                renderMsg(change.doc);
            } else if (change.type == 'removed'){
                let li = printRequest.querySelector('[data-id=' + change.doc.id + ']');
                printRequest.removeChild(li);
            }
        })
    }) 
}
getSection()

     