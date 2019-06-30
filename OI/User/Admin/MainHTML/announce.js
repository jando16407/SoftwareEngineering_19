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
    let msgTitle = document.createElement('span');
    let msgSay = document.createElement('span');
    let postDate = document.createElement('span');
    let cross = document.createElement('button');
    let col1 = document.createElement('h6');
    let col2 = document.createElement('br');
    let col3 = document.createElement('br');
    let title = document.createElement('h6')

    li.setAttribute('data-id', doc.id);
    msgTitle.textContent = doc.data().msgTitle;
    msgSay.textContent = doc.data().msgSay;
    postDate.textContent = doc.data().postDate;
    cross.textContent = 'X';
    col1.textContent = ' Message:';
    col2.textContent = ' - ';
    col3.textContent = ' - ';
    title.textContent = `Subject:`;

    li.appendChild(title);
    li.appendChild(msgTitle);
    li.appendChild(col1);
    li.appendChild(msgSay);
    li.appendChild(col2);
    li.appendChild(postDate);
    li.appendChild(col3);
    li.appendChild(cross);

    printAnnounce.appendChild(li);
    // delete Announcement
    cross.addEventListener('click', (e)=>{
        //e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Announcement').doc(id).delete();
    })
}
db.collection('Announcement').orderBy('postDate').get().then((snapShot) =>{
    snapShot.docs.forEach((doc) => {
        console.log(doc.data())
        renderMsg(doc);
    })
})

const printAnnounce = document.querySelector('#announce');
const form = document.querySelector("#send-msg-form");
const sndBtn = document.querySelector("sndBtn");


// Post this for everyone
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    db.collection('Announcement').add({
        msgTitle: form.msgTitle.value,
        msgSay: form.msgSay.value,
        postDate: formatTime(),
    })
})