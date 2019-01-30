window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        if( navigator.onLine){
            db.collection('users').doc(userId).get().then(doc => {
                let msg_rec = [];
                if (doc.exists) {
                    const user = doc.data();

                    msg_rec = user.received;

                    localStorage.setItem("received", JSON.stringify(user.received));

                }

                if (msg_rec.length == 0) {
                    document.getElementById("messages").innerHTML += `<p>There are no messages!</p>`;
                    // console.log(msg_rec.length);
                }
                else {
                    for (let index = 0; index < msg_rec.length; index++) {
                        let msg = msg_rec[index];
                        let receiver;
                        db.collection('users').where('username', '==', msg.from).get().then(querySnapshot => {
                            querySnapshot.forEach(data => {
                                receiver = data.data();
                                document.getElementById("messages").innerHTML += `
                            <div itemscope itemtype ="https://schema.org/Message" class="msg">
                            <div itemprop="recipient" itemscope itemtype ="http://schema.org/Person">
                            <img itemprop="image" itemscope itemtype="https://schema.org/ImageObject"  src="${msg.image}" alt="Avatar">
                            <a itemprop="name" class="name" href="/profile_for_others.html?userId=${data.id}">${receiver.name}</a>
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
        }
        else{
            let received_info = localStorage.getItem("received");
            if( received_info!=0){
                let msg_rec = JSON.parse(received_info);
                if (msg_rec.length == 0) {
                    document.getElementById("messages").innerHTML += `<p>There are no messages!</p>`;
                    // console.log(msg_rec.length);
                }
                else {
                    for (let index = 0; index < msg_rec.length; index++) {
                        let msg = msg_rec[index];
                            document.getElementById("messages").innerHTML += `
                            <div itemscope itemtype ="https://schema.org/Message" class="msg">
                            <div itemprop="recipient" itemscope itemtype ="http://schema.org/Person">
                            <img itemprop="image" itemscope itemtype="https://schema.org/ImageObject"  src="/media/profile.jpg" alt="Avatar">
                            <a itemprop="name" class="name" >${msg.from}</a>
                            </div>
                            <br>
                            <p>Subject: </p><a itemprop="about" class="subject">${msg.subject}</a>
                            <p>Message: </p><a itemprop="text" class="subject">${msg.message}</a>
                            <span itemprop="dateSent" class="time-right">${msg.time}</span>
                            </div>
                            `;
                    }
                }
            }
        }
    } else {
        window.location.href = '/login.html';
    }
}