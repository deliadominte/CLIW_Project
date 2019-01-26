const cacheName = `METOO-2`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/css/index.css`,
        `/media/roses.png`,
        `/media/people.jpg`,
        `/media/location.jpg`,
        `/media/identity.jpg`,
        `/media/profile.jpg`,
        `/home.html`,
        `/css/home.css`,
        `/css/menu.css`,
        `/activity_for_others.html`,
        `/css/activity_for_others.css`,
        `/add_activity.html`,
        `/css/add_activity.css`,
        `/coffee_invitation.html`,
        `/css/coffee_invitation.css`,
        `/create_invitation.html`,
        `/css/create_invitation.css`,
        `/discover_people.html`,
        `/css/discover_people.css`,
        `/imbox.html`,
        `/css/imbox.css`,
        `/locations.html`,
        `/css/locations.css`,
        `/login.html`,
        `/css/login.css`,
        `/myactivity.html`,
        `/css/myactivity.css`,
        `/new_msg.html`,
        `/css/new_msg.css`,
        `/notifications.html`,
        `/css/notifications.css`,
        `/onelocation.html`,
        `/css/onelocation.css`,
        `/profile_for_others.html`,
        `/css/profile_for_others.css`,
        `/profile.html`,
        `/css/profile.css`,
        `/sent.html`,
        `/css/sent.css`,
        `/signup.html`,
        `/css/signup.css`,
        `/js/profile.js`,
        `/js/notif.js`,
        `/js/menu.js`,
        `/js/account.js`,
        '/manifest.json',
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', e => {
   e.waitUntil(self.clients.claim());
});

this.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response){
      if(response)
        return response;
      return fetch(event.request).then(function(response){
        return response;
      });
  }));
});

// self.addEventListener('fetch', function(event) {
//  console.log(event.request.url);

//  event.respondWith(
//    caches.match(event.request).then(function(response) {
//      return response || fetch(event.request);
//    })
//  );
// });

// addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;     // daca gaseste un raspuns valid in cash, il returneaza
//         } else {
//           return fetch(event.request)     //fetch internet
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());    //salveaza raspunsul pentru cereri viitoare
//                   return res;   // returneaza datele
//             })
//             .catch(function(err) { 
//               console.log('offline error')
//             });
//         }
//       })
//   );
// });