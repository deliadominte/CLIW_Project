window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        db.collection('users').doc(userId).get().then(doc => {
            let msg_rec=[];
            if (doc.exists) {
                const user = doc.data();

                msg_rec=user.received;
                
            }
            for (let index = 0; index < msg_rec.length; index++){
                let msg=msg_rec[index];
                
                let receiver;
                db.collection('users').where('username', '==', msg.from).get().then( querySnapshot => {
                    querySnapshot.forEach(data => {
                         receiver = data.data();
                         document.getElementById("messages").innerHTML += `
                         <div class="msg">
                         <img src="${msg.image}" alt="Avatar">
                         <a class="name" href="/profile_for_others.html?userId=${receiver.id}">${receiver.name}</a>
                         <br>
                         <p>Subject: </p><a class="subject">${msg.subject}</a>
                         <p>Message: </p><a class="subject">${msg.message}</a>
                         <span class="time-right">${msg.time}</span>
                         </div>
                         `;
                    });
                });
                
                
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}