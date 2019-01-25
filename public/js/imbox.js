window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        db.collection('users').doc(userId).get().then(doc => {
            if (doc.exists) {
                const user = doc.data();

                console.log(user);
                
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}