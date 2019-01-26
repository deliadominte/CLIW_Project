window.onload = () => {
    const userId = Cookies.get('userId');

    if (!userId) {
        document.getElementById('loginForm').onsubmit = e => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            db.collection('users').where('username', '==', username).get().then(querySnapshot => {
                let flag=0;
                querySnapshot.forEach(function (doc) {
                    const user = doc.data();
                    flag=1;
                    if (user.password === password) {
                        Cookies.set('userId', doc.id);
                        window.location.href = '/home.html';
                    } else {
                            alert("Incorrect Password!");
                    }
                });
                if(flag==0) alert('Incorrect Username!');
            });
        }
    } else {
        window.location.href = '/home.html';
    }
}