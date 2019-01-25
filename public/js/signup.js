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
    
            db.collection('users').add(user).then(docRef => {
                Cookies.set('userId', docRef.id);
    
                window.location.href = '/home.html';
            });
        }
    } else {
        window.location.href = '/home.html';
    }
}