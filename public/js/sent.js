window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        db.collection('users').doc(userId).get().then(doc => {
            let msg_snt=[];
            if (doc.exists) {
                const user = doc.data();

                msg_snt=user.sent;
                
            }
            for (let index = 0; index < msg_snt.length; index++){
                let msg=msg_snt[index];
                
                let sent_to;
                db.collection('users').where('username', '==', msg.to).get().then( querySnapshot => {
                    querySnapshot.forEach(data => {
                         sent_to = data.data();
                         document.getElementById("messages").innerHTML += `
                         <div class="msg">
                         <img src="${sent_to.image}" alt="Avatar">
                         <a class="name" href="/profile_for_others.html?userId=${sent_to.id}">${sent_to.name}</a>
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