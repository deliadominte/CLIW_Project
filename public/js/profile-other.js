window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        const profileId = new URLSearchParams(window.location.search).get('userId');

        db.collection('users').doc(profileId).get().then(doc => {
            if (doc.exists) {
                console.log(doc.data());
                const user = doc.data();

                const image = document.getElementById('profile-pic');

                if (user.image) {
                    image.src = user.image;
                } else {
                    image.src = 'media/profile.jpg';
                }

                document.getElementById('nume').textContent = user.name;
                document.getElementById('uname_title').textContent = user.name;
                document.getElementById('email').textContent = user.email;
                document.getElementById('username').textContent = user.username;
                document.getElementById('phone').textContent = user.phone;
                document.getElementById('profesie').textContent = user.profesie;
                
                user.description ? document.getElementById('nonedit_desc').textContent = user.description : document.getElementById('nonedit_desc').textContent = 'No description';
               
                user.passions.forEach((pasiune, index) => {
                    document.getElementById('passions').innerHTML += `
                        <p class="passion">${pasiune}</p>
                    `;
                });

                db.collection('activities').where('userId', '==', profileId).limit(1).get().then(querySnapshot => {
                    querySnapshot.forEach(function (doc) {
                        const activity = doc.data();
        
                        document.getElementById('container').innerHTML += `
                            <div itemscope itemtype ="http://schema.org/Action" id="${doc.id}">
                                <div class="title_box">
                                    Current activity
                                </div>
        
                                <div class="activity_info">
                                    <div itemprop="location" itemscope itemtype ="https://schema.org/Place"><i class="fas fa-map-marker-alt"></i> Location: <h4>${activity.location}</h4>
                                    </div>
        
                                    <div><i class="far fa-smile-beam"></i> Activity: <h4>Programming</h4>
                                    </div>
        
                                    <div itemprop="target"><i class="fas fa-spa"></i>I implement a <h4>${activity.description[0]}</h4> using for the front-end part <h4>${activity.description[1]}</h4>
                                        and for back-end <h4>${activity.description[2]}</h4> using <h4>${activity.description[3]}</h4>.
                                    </div>
        
                                    <div itemprop="description"><i class="fas fa-feather"></i>I am an/a <h4>${activity.skills[0]}</h4>
                                        <h4>${activity.skills[1]}</h4> programmer. The things i know the best in this domain are: <h4>${activity.skills[2]}</h4>, <h4>${activity.skills[3]}</h4>,
                                        <h4>${activity.skills[4]}</h4>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
        
                });

                document.getElementById('send-invitation').onclick = e => {
                    document.getElementById('send-invitation').href = "/create_invitation.html?toId="+profileId;
                }
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}