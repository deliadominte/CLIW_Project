window.onload = () => {
    const userId = Cookies.get('userId');

    if (!userId) {
        document.getElementById('loginForm').onsubmit = e => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            db.collection('users').where('username', '==', username).get().then(querySnapshot => {
                querySnapshot.forEach(function (doc) {
                    const user = doc.data();

                    if (user.password === password) {
                        Cookies.set('userId', doc.id);
                        window.location.href = '/home.html';
                    } else {

                    }
                });
            });
        }
    } else {
        window.location.href = '/home.html';
    }
}