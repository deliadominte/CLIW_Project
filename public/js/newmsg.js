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
                    const message = {
                        to: document.getElementById('to').value,
                        from: name,
                        createdBy: userId,
                        image, 
                        subject: document.getElementById('subject').value,
                        message: document.getElementById('msg').value
                    }

                    user.sent.push(message);

                    db.collection('users').doc(userId).set(user, {merge: true});

                    db.collection('users').where('username', '==', message.to).get().then(querySnapshot => {
                        querySnapshot.forEach(data => {
                            const receiver = data.data();

                            let em = receiver.received;

                            em.push(message);

                            db.collection('users').doc(data.id).set(receiver, {merge: true});
                        });            
                    });
                }
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}