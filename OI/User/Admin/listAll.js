db.collection('Watis').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
        console.log(doc)
    })
})