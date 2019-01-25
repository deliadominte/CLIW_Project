window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        db.collection('activities').where('userId', '==', userId).get().then(querySnapshot => {
            var current = " current"
            querySnapshot.forEach(function (doc) {
                const activity = doc.data();
                document.getElementById('container').innerHTML += `
                    <div id="${doc.id}">
                        <div class="title_box">
                            Your${current} activity
                        </div>

                        <div class="activity_info">
                            <div><i class="fas fa-map-marker-alt"></i> Location: <h4>${activity.location}</h4>
                            </div>

                            <div><i class="far fa-smile-beam"></i> Activity: <h4>Programming</h4>
                            </div>

                            <div><i class="fas fa-spa"></i>I implement a <h4>${activity.description[0]}</h4> using for the front-end part <h4>${activity.description[1]}</h4>
                                and for back-end <h4>${activity.description[2]}</h4> using <h4>${activity.description[3]}</h4>.
                            </div>

                            <div><i class="fas fa-feather"></i>I am an/a <h4>${activity.skills[0]}</h4>
                                <h4>${activity.skills[1]}</h4> programmer. The things i know the best in this domain are: <h4>${activity.skills[2]}</h4>, <h4>${activity.skills[3]}</h4>,
                                <h4>${activity.skills[4]}</h4>
                            </div>

                            <div>
                                <button data-id="${doc.id}" class="delete_button">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
                current = "";
            });

            const deletes = document.getElementsByClassName('delete_button');

            for (let index = 0; index < deletes.length; index++) {
                const element = deletes[index];

                element.onclick = e => {
                    const { id } = e.target.dataset;

                    document.getElementById(id).style.display = 'none';

                    db.collection('activities').doc(id).delete();
                }
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}