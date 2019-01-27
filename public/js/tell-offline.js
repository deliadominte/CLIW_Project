window.addEventListener('load', function() {
    var x = document.getElementById("tell_offline");
    function updateOnlineStatus(event) {
      if(navigator.onLine){
          x.style.display = "none";
      }
      else{
          x.style.display = "block";
      }
    }
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  });