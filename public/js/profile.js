function editProfileInfo() {

    document.getElementById("edit_pi").style.display = "block";
    document.getElementById("nonedit_pi").style.display = "none";
}

function editDescription() {

    document.getElementById("edit_desc").style.display = "block";
    document.getElementById("nonedit_desc").style.display = "none";
}

function editPassions() {

    document.getElementById("edit_passions").style.display = "block";
    document.getElementById("nonedit_passions").style.display = "none";
}

var $max_id = 0;
function addTag(event) {
    $max_id++;
    var x = event.which || event.keyCode;
    if (x == 32) {
        document.getElementById('passions').innerHTML += `
            <p id="I${$max_id}" class="passion">${document.getElementById("tag-typer").value}</p>
        `;

        document.getElementById("demo").innerHTML = "<span class='tag' id=" + $max_id.toString() + " onclick='removeTag" + "(" + $max_id.toString() + ")'><span class='close'>&times;</span>" + document.getElementById("tag-typer").value + "</span>" + "<div id='demo'></div>" + "<input name='tag[]' style='display:none;' value=" + document.getElementById("tag-typer").value + " id=" + 'I' + $max_id.toString() + ">";
        document.getElementById("demo").id = "altceva";
        document.getElementById("tag-typer").value = "";
    }
};

function removeTag(id) {
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);

    const elem2 = document.getElementById(`I${id}`);
    elem2.parentNode.removeChild(elem2);
}

function displayUploadImg() {
    document.getElementById("btn_upload").style.display = "inline-block";
    document.getElementById("btn_save").style.display = "inline-block"
    document.getElementById("btn_change").style.display = "none"
}

function saveImg() {
    document.getElementById("btn_upload").style.display = "none";
    document.getElementById("btn_save").style.display = "none"
    document.getElementById("btn_change").style.display = "inline-block"
}