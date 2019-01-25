window.onload = () => {
    var params = {};

        if (location.search) {
            var parts = location.search.substring(1).split('&');
        
            for (var i = 0; i < parts.length; i++) {
                var nv = parts[i].split('=');
                if (!nv[0]) continue;
                params[nv[0]] = nv[1] || true;
            }
        }
    var slideIndex=1;
    if (params.index)  slideIndex = parseInt(params.index);
    const userId = Cookies.get('userId');
    if (userId) {
        db.collection('locations').get().then(querySnapshot => {
            let locations=[];
            querySnapshot.forEach(data => {
                const loc = data.data();
                locations.push(loc);
            });
            
            let number=locations.length;
            let loc=locations[slideIndex-1];
            document.getElementById("slide").innerHTML += `
                         <div class="mySlides fade">
                         <div class="numbertext">${slideIndex} / ${number}</div>
                         <img src=${loc.image} alt="${loc.name}">
                         <div class="text"><a href="onelocation.html?name=${loc.name}">${loc.name}</a></div>
                         </div>
                         `;
            if(slideIndex==1){

            }
            else{
                document.getElementById("slide").innerHTML += `
                <a class="prev" href="/locations.html?index=${slideIndex-1}">&#10094;</a>
                             `;
            }
            if(slideIndex==number){

            }
            else{
                document.getElementById("slide").innerHTML += `
                <a class="next" href="/locations.html?index=${slideIndex+1}">&#10095;</a>
                             `;
            }
                        
        });
        db.collection('activities').where('userId', '==', userId).get().then(querySnapshot => {
            let ultimele=[];
            querySnapshot.forEach(function (doc) {
                const activity = doc.data();
                ultimele.push(activity.location);
            });
            if (ultimele.length==0){
                document.getElementById("row").innerHTML += `
                <div class="column">
                <a href="add_activity.html"> Add new activities </a>
                </div> `;
            }
            else{
                let limit;
                if (ultimele.length>=3) limit=3;
                else limit=ultimele.length;
                for (let index=0 ;index < limit;index++){
                    db.collection('locations').where('name','==',ultimele[index]).get().then(querySnapshot => {
                        querySnapshot.forEach(data => {
                            const loc = data.data();
                            document.getElementById("row").innerHTML += `
                              <div class="column">
                              <img src=${loc.image} alt=${loc.name}>
                              <a href="onelocation.html?name=${loc.name}">${loc.name}</a>
                              </div> `;
                        });
                    });
                }
            }
        });
    } else {
        window.location.href = '/login.html';
    }
}