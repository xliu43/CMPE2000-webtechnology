// Your code here!
window.onload = function () {
    document.myForm.imageselector.onchange = function () { document.myForm.image.src = this.value; };
    document.myForm.x.oninput = SetXY;
    document.myForm.y.oninput = SetXY;
    for (var i = 0; i < document.myForm.scale.length; i++) {
        document.myForm.scale[i].onchange = function () { SetScale(Number(this.value)); };
    }
    document.myForm.image.onload = function () {
        var radiobutton = document.myForm.scale;
        radiobutton[0].checked = true;
        SetScale(Number(radiobutton[0].value));
    };
    document.myForm.onsubmit = Validate;
    



}

function SetXY() {
    var position = Number(this.value);
    if (isNaN(position)) {
        this.classList.add("invalid");
    } else
        this.classList.remove("invalid");
    Update();

}

function Update() {
    var x = Number(document.myForm.x.value);
    var y = Number(document.myForm.y.value);
    document.myForm.image.style.setProperty("position", "relative");
    document.myForm.image.style.setProperty("left", x + "px");
    document.myForm.image.style.setProperty("top", y + "px");
    
}

function SetScale(scaleValue) {
    var image = document.myForm.image;
    var newWidth = image.naturalWidth * scaleValue;
    var newHeight = image.naturalHeight * scaleValue;
   // image.style.setProperty("width", newWidth);
    // image.style.setProperty("height", newHeight);
    image.width = newWidth;
    image.height = newHeight;

}

function Validate() {
    var x = Number(document.myForm.x.value);
    var y = Number(document.myForm.y.value);
    if (isNaN(x) || isNaN(y)) {
        alert("incorrect input");
        return false;
    } else
        return true;

}