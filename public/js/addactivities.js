window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        db.collection('locations').get().then(querySnapshot => {
            querySnapshot.forEach(data => {
                const item = data.data();

                document.getElementById('locations').innerHTML += `
                    <option value="${item.nume}">${item.nume}</option>
                `;
            });
        });

        document.getElementById('locations').onchange = e => {
            document.getElementById('location-text').innerHTML = `
                Your location: <i class="fas fa-map-marker-alt"></i> ${e.target.value}
            `;
        }

        document.getElementById('save_button').onclick = e => {
            const activity = {
                location: document.getElementById('locations').value,
                description: [],
                skills: [],
                userId
            }

            const descriptions = document.getElementsByClassName('description');
            const skills = document.getElementsByClassName('skills');

            for (let index = 0; index < descriptions.length; index++) {
                const element = descriptions[index];

                activity.description.push(element.value);
            }

            for (let index = 0; index < skills.length; index++) {
                const element = skills[index];

                activity.skills.push(element.value);
            }

            db.collection('activities').add({ ...activity }).then(docRef => {
                let userIds = [];
                let currentUser;

                db.collection('users').get().then(async querySnapshot => {
                    querySnapshot.forEach(data => {
                        if (data.id !== userId) {
                            userIds.push(data.id);
                        } else {
                            currentUser = data.data();
                        }
                    });

                    for (let index = 0; index < userIds.length; index++) {
                        const id = userIds[index];
                        
                        const notif = {
                            created: firebase.firestore.FieldValue.serverTimestamp(),
                            seen: false,
                            userId: id,
                            createdBy: currentUser.username,
                            message: `<a href="/profile_for_others.html?userId=${userId}">${currentUser.name}</a> invited you to join her <a href="/activity_for_others.html?activityId=${docRef.id}">Activity</a>`
                        }

                        await db.collection('notifications').add({ ...notif });
                    }

                    window.location.href = '/myactivity.html';
                });
            });
        }
    } else {
        window.location.href = '/login.html';
    }
}