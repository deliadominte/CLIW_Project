window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        db.collection('users').get().then( querySnapshot => {
            let ord =0;
            const   MAX_LOAD = 2;
            querySnapshot.forEach(function (doc) {
                ord = ord + 1;
                const user = doc.data();
                let image;
                let displaystyle;
                if (user.image) {
                    image = user.image;
                } else {
                    image = 'media/profile.jpg';
                }
                 if(ord<=MAX_LOAD){
                    displaystyle = "block";
                 }else{
                    displaystyle = "none";
                 }
                document.getElementById('people-container').innerHTML += `
                <div id = "p-${ord}" style="display:${displaystyle}" class="pers">
                <img src=${image} alt="Avatar">
                <a class="name" href="profile_for_others.html?userId=${doc.id}">${user.name}</a>
                <a class="right" href="profile_for_others.html?userId=${doc.id}">See profile ></a>
                <br>
                <p>Profession: <a class="profession">${user.profesie}</a></p>
                <p>Description: <a class="description">${user.description}</a></p>
            </div>
                `;
            });

            let loaded = MAX_LOAD;
            document.getElementById("more-btn").onclick = e => {
                let i;
                for (i = loaded+1; i <= loaded+MAX_LOAD; i++) {
                    let element = document.getElementById("p-"+i);
                    // console.log("p-"+i);
                    if(element){
                        element.style.display = "block";
                    }
                }
                loaded = loaded+MAX_LOAD;
            }

            document.getElementById("searchbar").onkeyup = e =>{
                document.getElementById("more-btn").style.display = "none";
                let pers = document.getElementsByClassName("pers");
                let i;
                filter = document.getElementById("searchbar").value.toUpperCase();

                if (filter){
                    for (i = 0; i < pers.length; i++) {
                        name = pers[i].getElementsByClassName("name")[0].innerHTML;
                        
                        if (name.toUpperCase().indexOf(filter) > -1) {
                            pers[i].style.display = "block";
                        } else {
                            pers[i].style.display = "none";
                        }
                    }
                }
                else{
                    location.reload();
                }
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}