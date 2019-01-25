window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        db.collection('notifications').where('userId', '==', userId).get().then(querySnapshot => {
            querySnapshot.forEach(data => {
                const notif = data.data();

                if (notif.seen === false) {
                    document.getElementById('notif').style.color = 'red';
                }
            });
        });
    } else {
        window.location.href = '/login.html';
    }
}