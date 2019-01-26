window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        db.collection('users').doc(userId).get().then(doc => {
            if (doc.exists) {
                const user = doc.data();

                let sent = user.sent;

                const name = user.name;
                const email = user.email;
                const image = user.image;

                document.getElementById('btn').onclick = e => {
                    var currentdate = new Date();
                    var datetime = currentdate.getDate() + "/"
                        + (currentdate.getMonth() + 1) + "/"
                        + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes();
                    const message = {
                        time: datetime,
                        to: document.getElementById('to').value,
                        from: name,
                        createdBy: userId,
                        image,
                        subject: document.getElementById('subject').value,
                        message: document.getElementById('msg').value
                    }
                    //VALIDATION
                    if (message.to == "") alert("'To' must be filled out");
                    else {
                        if (message.subject == "") alert("'Subject' must be filled out");
                        else {
                            if (message.message == "") alert("'Message' must be filled out");
                            else {

                                db.collection('users').where('username', '==', message.to).get().then(async querySnapshot => {
                                    let id_to;
                                    let notif;
                                    let flag = 0;
                                    querySnapshot.forEach(data => {
                                        const receiver = data.data();

                                        let em = receiver.received;

                                        id_to = data.id;

                                        em.push(message);
                                        notif = {
                                            created: firebase.firestore.FieldValue.serverTimestamp(),
                                            seen: false,
                                            userId: id_to,
                                            createdBy: name,
                                            message: `<a href="/profile_for_others.html?userId=${userId}">${name}</a> sent you a <a href="/imbox.html">Message</a>`
                                        }
                                        flag = 1;
                                        db.collection('users').doc(data.id).set(receiver, { merge: true });
                                    });
                                    await db.collection('notifications').add({ ...notif });
                                    if (flag == 0)
                                        alert("The username is not valid!");
                                    else {
                                        user.sent.push(message);
                                        db.collection('users').doc(userId).set(user, { merge: true });
                                        window.location.href = '/sent.html';
                                    }
                                });

                            }
                        }

                    }
                }
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}