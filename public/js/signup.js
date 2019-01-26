window.onload = () => {
    const userId = Cookies.get('userId');

    if (!userId) {
        document.getElementById('signupForm').onsubmit = e => {
            e.preventDefault();
    
            const user = {
                username: document.getElementById('username').value,
                name: document.getElementById('nume').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                profesie: document.getElementById('profesie').value,
                password: document.getElementById('password').value,
                description: '',
                image: '',
                passions: [],
                received: [],
                sent: []
            };
            db.collection('users').where('username', '==', user.username).get().then(querySnapshot => {
                let flag=0;
                querySnapshot.forEach(data => {flag=1;});
                if(flag!=0)
                alert('Username already exists!');
                else{
                    db.collection('users').add(user).then(docRef => {
                        Cookies.set('userId', docRef.id);
            
                        window.location.href = '/home.html';
                    });
                }
            });
            
        }
    } else {
        window.location.href = '/home.html';
    }
}