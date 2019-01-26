window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        db.collection('users').doc(userId).get().then(doc => {
            let msg_snt = [];
            if (doc.exists) {
                const user = doc.data();

                msg_snt = user.sent;

            }
            if (msg_snt.length == 0) {
                document.getElementById("messages").innerHTML += `<p>There are no messages!</p>`;
            }
            else {
                for (let index = 0; index < msg_snt.length; index++) {
                    let msg = msg_snt[index];

                    db.collection('users').where('username', '==', msg.to).get().then(querySnapshot => {
                        querySnapshot.forEach(data => {
                            sent_to = data.data();
                            document.getElementById("messages").innerHTML += `
                         <div itemscope itemtype ="https://schema.org/Message" class="msg">
                         <div itemprop="recipient" itemscope itemtype ="http://schema.org/Person">
                         <img itemprop="image" itemscope itemtype="https://schema.org/ImageObject"  src="${sent_to.image}" alt="Avatar">
                         <a itemprop="name" class="name" href="/profile_for_others.html?userId=${sent_to.id}">${sent_to.name}</a>
                         </div>
                         <br>
                         <p>Subject: </p><a itemprop="about" class="subject">${msg.subject}</a>
                         <p>Message: </p><a itemprop="text" class="subject">${msg.message}</a>
                         <span itemprop="dateSent" class="time-right">${msg.time}</span>
                         </div>
                         `;
                        });
                    });




                }
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}