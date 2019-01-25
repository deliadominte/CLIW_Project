window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        let notifIds = [];

        db.collection('notifications').where('userId', '==', userId).orderBy("created", "desc").get().then(querySnapshot => {
            querySnapshot.forEach(data => {
                const notif = data.data();

                notifIds.push(data.id);

                db.collection('users').where('username', '==', notif.createdBy).get().then(querySnapshot => {
                    querySnapshot.forEach(data => {
                        const user = data.data();
                        var t = new Date(1970, 0, 1);
                        t.setSeconds(notif.created.seconds);
                        // console.log(t);
                        document.body.innerHTML += `
                            <div class="content_box${!notif.seen ? ' unread' : ''}">
                                <div class="img_container">
                                <img src="${user.image}" alt="Avatar">
                                </div>
                            
                                <div class="notificanion_message">
                                    ${notif.message}
                                </div>
                            
                                <div class="date">
                                    ${t.toString().substring(0,t.toString().indexOf('G'))}
                                </div>
                            </div>
                        `;
                    });

                    notifIds.forEach(id => {
                        db.collection('notifications').doc(id).set({ seen: true }, { merge: true });
                    });
                });
            });
        });
    } else {
        window.location.href = '/login.html';
    }
}