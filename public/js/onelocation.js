window.onload = () => {
    const userId = Cookies.get('userId');

    var params = {};

        if (location.search) {
            var parts = location.search.substring(1).split('&');
        
            for (var i = 0; i < parts.length; i++) {
                var nv = parts[i].split('=');
                if (!nv[0]) continue;
                params[nv[0]] = nv[1] || true;
            }
        }
    //in params.name, va fi numele locatiei
     if (userId) {
        db.collection('locations').where('name', '==', params.name.replace("%20"," ")).get().then( querySnapshot => {
            querySnapshot.forEach(data => {
                const location = data.data();
                var stats = {};
                
                db.collection('activities').where('location', '==', params.name.replace("%20"," ")).get().then( querySnapshot => {
                    var max=0;
                    let max_skill;
                    //calculez ce skill e cel mai des intalnit printre activitatile ce au loc in aceasta locatie
                    querySnapshot.forEach(data => {
                        const skill=data.data().skills;
                        if(!stats[skill[1]]) stats[skill[1]]=1;
                        else stats[skill[1]]+=1;
                        if (stats[skill[1]]>max) {
                            max=stats[skill[1]];
                            max_skill=skill[1];
                        }
                    });
                    if(!max_skill) max_skill="Nobody";
                    document.getElementById("location").innerHTML=`<h1 itemprop="name">${location.name}</h1>
                <div itemprop="image" class="container_txt_img">
                    <img class="medium_img" src=${location.image} alt=${location.name}>
                </div>
                <div class="about">
                    <h4>About:</h4>
                    <p itemprop="description">${location.about}</p>
                    <div itemprop="openingHours">
                    <h4>Program:</h4>
                    <p>L-V: ${location.program[0]}</p>
                    <p>S-D: ${location.program[1]}</p>
                    </div>
            
                    <div itemprop="contactPoint">
                    <h4>Contact:</h4>
                    <div class="contact">
                        <div class="contactcell"><img src="media/fb.png" alt="Facebook"></div>
                        <div class="contactcell2">
                            <a href=${location.contact[0]}>${location.contact[0]}</a>
                        </div>
                    </div>
                    <div class="contact">
                        <div class="contactcell"><img src="media/mail.png" alt="Mail"></div>
                        <div class="contactcell2">
                            <a>${location.contact[1]}</a>
                        </div>
                    </div>
                    <div class="contact">
                        <div class="contactcell"><img src="media/phone-photo.png" alt="Number"></div>
                        <div class="contactcell2">
                            <a>${location.contact[2]}</a>
                        </div>
                    </div>
                    </div> 
                    <h4>Statistics:</h4>
                    <p>Most frequently: ${location.statistics}</p>
                    <!--Api Google Maps-->
                    <h4>Localization:</h4>
                    <div itemprop="location" itemscope itemtype ="https://schema.org/Place"  id="map">${location.location}</div>
            
                </div>`;document.getElementById("location").innerHTML=`<h1>${location.name}</h1>
                <div class="container_txt_img">
                    <img class="medium_img" src=${location.image} alt=${location.name}>
                </div>
                <div class="about">
                    <h4>About:</h4>
                    <p>${location.about}</p>
                    <h4>Program:</h4>
                    <p>L-V: ${location.program[0]}</p>
                    <p>S-D: ${location.program[1]}</p>
            
                    <h4>Contact:</h4>
                    <div class="contact">
                        <div class="contactcell"><img src="media/fb.png" alt="Facebook"></div>
                        <div class="contactcell2">
                            <a href=${location.contact[0]}>${location.contact[0]}</a>
                        </div>
                    </div>
                    <div class="contact">
                        <div class="contactcell"><img src="media/mail.png" alt="Mail"></div>
                        <div class="contactcell2">
                            <a>${location.contact[1]}</a>
                        </div>
                    </div>
                    <div class="contact">
                        <div class="contactcell"><img src="media/phone-photo.png" alt="Number"></div>
                        <div class="contactcell2">
                            <a>${location.contact[2]}</a>
                        </div>
                    </div>
                    <h4>Statistics:</h4>
                    <p>Most frequently: ${max_skill}</p>
                    <!--Api Google Maps-->
                    <h4>Localization:</h4>
                    <div itemprop="location" itemscope itemtype ="https://schema.org/Place" id="map">${location.location}</div>
            
                </div>`;
                
                var latitudine=10;
                var longitudine=10;
                var mapOptions = {
                    center: new google.maps.LatLng(latitudine, longitudine),
                    zoom: 10,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                    }
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                });

                
           });
            
        });
    } else {
        window.location.href = '/login.html';
    }
}