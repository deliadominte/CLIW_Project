window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        if( navigator.onLine){

            // pun in baza de date informatiile actualizate despre utilizator(imaginea)
            let get_user_info = localStorage.getItem("user_modified");
            if( user_info!=0){
                let user_ls = JSON.parse(get_user_info);
                db.collection("users").doc(userId).set({ ...user_ls }, { merge: true });
                localStorage.removeItem("user_modified");
            }


            const btn_save = document.getElementById('btn_save');

            btn_save.onclick = e => {
                const btn_upload = document.getElementById('btn_upload').files[0];

                var reader = new FileReader();

                reader.addEventListener("load", function () {
                    const image = reader.result;

                    document.getElementById('profile-pic').src = image;

                    db.collection("users").doc(userId).set({ image }, { merge: true });
                }, false);

                if (btn_upload) {
                    reader.readAsDataURL(btn_upload);
                }
            }
            document.getElementById('save-edit').onclick = e => {
                document.getElementById("edit_pi").style.display = "none";
                document.getElementById("nonedit_pi").style.display = "block";

                const edit = {
                    name: document.getElementById('nume-edit').value,
                    email: document.getElementById('email-edit').value,
                    username: document.getElementById('username-edit').value,
                    phone: document.getElementById('phone-edit').value,
                    profesie: document.getElementById('profesie-edit').value
                }

                db.collection('users').where('username', '==', edit.username).get().then( querySnapshot => {
                    let flag = 0;
                    querySnapshot.forEach(function (doc) {
                        if(doc.id != userId)
                            flag = 1;
                    });
                    
                    if (flag == 1) 
                            alert('Username already used!');
                    else {
                        document.getElementById('nume').textContent = document.getElementById('nume-edit').value;
                        document.getElementById('email').textContent = document.getElementById('email-edit').value;
                        document.getElementById('username').textContent = document.getElementById('username-edit').value;
                        document.getElementById('phone').textContent = document.getElementById('phone-edit').value;
                        document.getElementById('profesie').textContent = document.getElementById('profesie-edit').value;
                        db.collection("users").doc(userId).set({ ...edit }, { merge: true });
                    }
                });
            }

            document.getElementById('save-desc').onclick = e => {
                document.getElementById("edit_desc").style.display = "none";
                document.getElementById("nonedit_desc").style.display = "block";

                const user = {
                    description: document.querySelector('#edit_desc textarea').value
                };

                document.getElementById('nonedit_desc').textContent = document.querySelector('#edit_desc textarea').value;

                document.getElementById('nonedit_desc').innerHTML += `
                    <br>
                    <a onclick="editDescription()"><i class="far fa-edit edit_icon"></i></a>
                `;

                db.collection("users").doc(userId).set({ ...user }, { merge: true });
            }

            document.getElementById('save-pasion').onclick = e => {
                document.getElementById("edit_passions").style.display = "none";
                document.getElementById("nonedit_passions").style.display = "block";

                const passions = [];

                for (let index = 0; index < document.getElementsByClassName('passion').length; index++) {
                    const element = document.getElementsByClassName('passion')[index];

                    passions.push(element.textContent);
                }

                db.collection("users").doc(userId).set({ passions }, { merge: true });
            }

            db.collection('users').doc(userId).get().then(doc => {
                if (doc.exists) {
                    const user = doc.data();

                    localStorage.setItem("user", JSON.stringify(user));

                    const image = document.getElementById('profile-pic');

                    if (user.image) {
                        image.src = user.image;
                    } else {
                        image.src = 'media/profile.jpg';
                    }

                    document.getElementById('nume').textContent = user.name;
                    document.getElementById('email').textContent = user.email;
                    document.getElementById('username').textContent = user.username;
                    document.getElementById('phone').textContent = user.phone;
                    document.getElementById('profesie').textContent = user.profesie;

                    document.getElementById('nume-edit').value = user.name;
                    document.getElementById('email-edit').value = user.email;
                    document.getElementById('username-edit').value = user.username;
                    document.getElementById('phone-edit').value = user.phone;
                    document.getElementById('profesie-edit').value = user.profesie;

                    user.description ? document.getElementById('nonedit_desc').textContent = user.description : document.getElementById('nonedit_desc').textContent = 'No description';

                    document.getElementById('nonedit_desc').innerHTML += `
                        <br>
                        <a onclick="editDescription()"><i class="far fa-edit edit_icon"></i></a>
                    `;

                    document.querySelector('#edit_desc textarea').value = user.description ? user.description : 'No description';

                    user.passions.forEach((pasiune, index) => {
                        document.getElementById('passions').innerHTML += `
                            <p id="I${index + 1}" class="passion">${pasiune}</p>
                        `;

                        document.getElementById('passions-edit').innerHTML += `
                            <span class="tag" id="${index + 1}" onclick="removeTag(${index + 1})"><span class="close">×</span>${pasiune}</span>
                        `;
                    });
                }
            });
        }
        else{
            var user_info = localStorage.getItem("user");
            if( user_info!=0){

                btn_save.onclick = e => {
                    const btn_upload = document.getElementById('btn_upload').files[0];
    
                    var reader = new FileReader();
    
                    reader.addEventListener("load", function () {
                        const image = reader.result;
    
                        document.getElementById('profile-pic').src = image;
                        
                        let user = JSON.parse(user_info);
                        user.image = image;
                        alert(user.image);
                        localStorage.setItem("user_modified", JSON.stringify(user));

                    }, false);
    
                    if (btn_upload) {
                        reader.readAsDataURL(btn_upload);
                    }
                }

                let user = JSON.parse(user_info);

                const image = document.getElementById('profile-pic');

                    if (user.image) {
                        image.src = user.image;
                    } else {
                        image.src = 'media/profile.jpg';
                    }

                document.getElementById('nume').textContent = user.name;
                document.getElementById('email').textContent = user.email;
                document.getElementById('username').textContent = user.username;
                document.getElementById('phone').textContent = user.phone;
                document.getElementById('profesie').textContent = user.profesie;
    
                user.description ? document.getElementById('nonedit_desc').textContent = user.description : document.getElementById('nonedit_desc').textContent = 'No description';
    
                document.getElementById('nonedit_desc').innerHTML += `
                            <br>
                            <a onclick="editDescription()"><i class="far fa-edit edit_icon"></i></a>
                        `;
                        
                user.passions.forEach((pasiune, index) => {
                            document.getElementById('passions').innerHTML += `
                                <p id="I${index + 1}" class="passion">${pasiune}</p>
                            `;
    
                            document.getElementById('passions-edit').innerHTML += `
                                <span class="tag" id="${index + 1}" onclick="removeTag(${index + 1})"><span class="close">×</span>${pasiune}</span>
                            `;
                        });
            }
        }
    } else {
        window.location.href = '/login.html';
    }
}