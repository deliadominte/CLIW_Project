window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        const toId = new URLSearchParams(window.location.search).get('toId');

        document.getElementById('send-invitation').onclick = e => {
            const invitation = {
                activity: document.getElementById("inv-activity").value,
                from: userId,
                to: toId,
                where: document.getElementById("inv-where").value,
                when: document.getElementById("inv-when").value
            }

            db.collection('invitations').add({ ...invitation }).then( docRef => {
                let currentUser;

                db.collection('users').doc(userId).get().then(async doc => {
                    currentUser = doc.data();
                    const notif = {
                        created: firebase.firestore.FieldValue.serverTimestamp(),
                        seen: false,
                        userId: toId,
                        createdBy: currentUser.username,
                        message: `<a href="/profile_for_others.html?userId=${userId}">${currentUser.name}</a> sent you an <a href="/coffee_invitation.html?id=${docRef.id}">Invitation</a>`
                        }

                    await db.collection('notifications').add({ ...notif });

                    window.location.href = "/profile_for_others.html?userId="+toId;
                });
                
            });
            
        }

        
        document.getElementById('cancel-invitation').onclick = e => {
            window.location.href = "/profile_for_others.html?userId="+toId;
        }
    } else {
        window.location.href = '/login.html';
    }
}