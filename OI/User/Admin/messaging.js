const messaging = firebase.messaging();
messaging.requestPermission().then(function(){  // request permission from the user.
    console.log('Have permission');
}).catch(function (error){
    console.log('Error no message sent...')
})