window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        const invId = new URLSearchParams(window.location.search).get('id');

        db.collection('invitations').doc(invId).get().then(doc => {
            if (doc.exists) {
                // console.log(doc.data());
               let invitation = doc.data();

               db.collection('users').doc(invitation.from).get().then(doc => {
                   let sender = doc.data()
                   let invFrom = document.getElementById('inv-from');
                   invFrom.textContent = sender.name;
                   invFrom.href = "/profile_for_others.html?userId="+invitation.from;
               });
                document.getElementById('inv-where').textContent = invitation.where;
                document.getElementById('inv-when').textContent = invitation.when;
                document.getElementById('inv-activity').textContent = invitation.activity;
                
                document.getElementById("accept-inv").onclick  = e => {
                    db.collection('users').doc(userId).get().then(async doc => {
                        currentUser = doc.data();
                        const notif = {
                            created: firebase.firestore.FieldValue.serverTimestamp(),
                            seen: false,
                            userId: invitation.from,
                            createdBy: currentUser.username,
                            message: `<a href="/profile_for_others.html?userId=${userId}">${currentUser.name}</a> accepted your <a>Invitation</a>`
                            }
                        // console.log(notif);
                        await db.collection('notifications').add({ ...notif });
    
                        window.location.href = "/home.html";
                    });
                }

                document.getElementById("decline-inv").onclick  = e => {
                    db.collection('users').doc(userId).get().then(async doc => {
                        currentUser = doc.data();
                        const notif = {
                            created: firebase.firestore.FieldValue.serverTimestamp(),
                            seen: false,
                            userId: invitation.from,
                            createdBy: currentUser.username,
                            message: `<a href="/profile_for_others.html?userId=${userId}">${currentUser.name}</a> declined your <a>Invitation</a>`
                            }
                        // console.log(notif);
                        await db.collection('notifications').add({ ...notif });
    
                        window.location.href = "/home.html";
                    });
                }
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}