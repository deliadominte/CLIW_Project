    function menuFunction() {
        var x = document.getElementById("small-menu");
        if (x.className === "menu") {
            x.className += " responsive";
            document.getElementById("menu-icon").className = "far fa-times-circle"
        } else {
            x.className = "menu";
            document.getElementById("menu-icon").className = "fa fa-bars"
        }
    }