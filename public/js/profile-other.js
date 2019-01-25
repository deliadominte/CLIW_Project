window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        const profileId = new URLSearchParams(window.location.search).get('userId');

        db.collection('users').doc(profileId).get().then(doc => {
            if (doc.exists) {
                console.log(doc.data());
                
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}