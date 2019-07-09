
function formatTime(timestamp){
    let time = new Date(),
    minutes = time.getMinutes().toString().length == 1 ? '0'+time.getMinutes() : time.getMinutes(),
    hours = time.getHours().toString().length == 1 ? '0'+time.getHours() : time.getHours(),
    ampm = time.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[time.getDay()]+' '+months[time.getMonth()]+' '+time.getDate()+' '+time.getFullYear()+' '+hours+':'+minutes+ampm;
    }

const wlist = document.querySelector('#order');

const setFormatWork = (data) =>{

    let html = '';
    data.forEach(doc =>{
        let dateRequest = formatTime(doc.data().requestDate);
        let dateNeeded = formatTime(doc.data().needBy);
        const display = doc.data();
        const li =`
            <li>
                <div><strong>Nature of request:</strong>  ${display.requestType}</div>
                <div><strong>Description of the problem:</strong> ${display.problem} <br>Item name: ${display.requestType}, ${display.itemDescription}</div>
                <div><strong>Requested date:</strong> ${dateRequest}, <strong>Needed by:</strong> ${dateNeeded}
                <div><button w3-btn yellow onclick="delIt" >Delete</button></div>
            </li>
        `
        html += li;
        });
    html+="</table>";
    wlist.innerHTML = html;
}
db.collection('Office/Workorder/workOrder').onSnapshot(snapshot =>{
    setFormatWork(snapshot.docs);
});
function delIt(){
 //   let cross = document.createElement('div');
    cross.addEventListener('click', (e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Office/Workorder/workOrder').doc(id);
    })
}