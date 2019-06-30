let time = new Date();

function renderMsg(doc){
    let li = document.createElement('li');
    let msgTitle = document.createElement('span');
    let msgSay = document.createElement('span');
    let postDate = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    msgTitle.textContent = doc.data().msgTitle;
    msgSay.textContent = doc.data().msgSay;
    postDate.textContent = doc.data().postDate;

    li.appendChild(msgTitle);
    li.appendChild(msgSay);
    li.appendChild(postDate);

    printAnnounce.appendChild(li);
}
db.collection('Announcement').get().then((snapShot) =>{
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
        postDate: time,
    })
})