window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        db.collection('users').get().then( querySnapshot => {
            querySnapshot.forEach(function (doc) {
                const user = doc.data();
                let image;
                if (user.image) {
                    image = user.image;
                } else {
                    image = 'media/profile.jpg';
                }
                document.getElementById('people-container').innerHTML += `
                <div class="pers">
                <img src=${image} alt="Avatar">
                <a class="name" href="profile_for_others.html?userId=${doc.id}">${user.name}</a>
                <a class="right" href="profile_for_others.html?userId=${doc.id}">See profile ></a>
                <br>
                <p>Profession: <a class="profession">${user.profesie}</a></p>
                <p>Description: <a class="description">${user.description}</a></p>
            </div>
                `;
            });
        });
    } else {
        window.location.href = '/login.html';
    }
}