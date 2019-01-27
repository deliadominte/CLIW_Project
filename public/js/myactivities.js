window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        if( navigator.onLine){
            db.collection('activities').where('userId', '==', userId).get().then(querySnapshot => {
                var current = " current"
                let localS_activity = 0;
                querySnapshot.forEach(function (doc) {
                    const activity = doc.data();

                    if(localS_activity==0){
                        localStorage.setItem("activity", JSON.stringify(activity));
                        localS_activity=1;    
                    }
                    

                    document.getElementById('container').innerHTML += `
                        <div itemscope itemtype ="http://schema.org/Action"  id="${doc.id}">
                            <div class="title_box">
                                Your${current} activity
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

                                <div>
                                    <button data-id="${doc.id}" class="delete_button">Delete</button>
                                </div>
                            </div>
                        </div>
                    `;
                    current = " previous";
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
        }
        else{
            let activity_info = localStorage.getItem("activity");
            if( activity_info!=0){
                let activity = JSON.parse(activity_info);
                console.log(activity);
                document.getElementById('container').innerHTML += `
                            <div itemscope itemtype ="http://schema.org/Action">
                                <div class="title_box">
                                    Your current activity
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
            }
        }
    } else {
        window.location.href = '/login.html';
    }
}