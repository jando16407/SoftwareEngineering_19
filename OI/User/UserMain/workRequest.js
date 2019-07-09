
//formats time
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

    
    const printRequest = document.querySelector('#myRequest');
    const form = document.querySelector("#requestForm");
    const sndBtn = document.querySelector("#submitButton");

    // Adds to db from form on button click
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        db.collection('Office/Workorder/workOrder').add({
            section: form.section.value,
            condition: form.condition.value,
            requestType: form.requestType.value,
            itemName: form.itemName.value,
            itemDescription:form.itemDescription.value,
            quantity: form.quantity.value,
            problem: form.problem.value,
            needBy: form.needBy.value,
            requestDate: formatTime(),
        })
        alert("Work Order has been submitted!")
        form.reset()
    })