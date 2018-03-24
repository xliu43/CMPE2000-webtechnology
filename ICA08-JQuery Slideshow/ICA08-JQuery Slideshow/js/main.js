
var imgArr = [];  //careful!!  {} for obj  initiliaztion JSON style, [] for  array 
strArr = ["image1", "image2", "image3", "image4", "image5"];      //notice hwo to initiate array in javascipt
var currentIndex = 0;
var autoFlag = false;                                            //for globale variable make sure to put outside the .on load method for every method to access 
var timerID = -1;
//window.onload = function () {
$(document).ready(function () {

    fInit();
    //document.getElementById('next').onclick = FNext;
    //document.getElementById('previous').onclick = FPrev;
    //document.getElementById('play').onclick = FAuto;
    $('#next').click(FNext);                                                                            //remember the syntax 
    $('#previous').click(FPrev);
    $('#play').click(FAuto);
});
  
function PicFrame(name, id) {
    this.displayName = name;
    this.imageNumber = id;
    this.p_image = new Image();   //Image() not image()!!!  Is Image() system type
    this.p_image.src = "images/img" + (this.imageNumber + 1) + ".jpg";
    this.p_image.imagename = name;
    this.viewCounter = 0;

}

function fInit() { //iterate thur the prebulit and build the imObj based on PicFrame CTOR and push the obj to imgArr.
    for (var i = 0; i < strArr.length; i++) {
        var imgObj = new PicFrame(strArr[i], i);
        imgArr.push(imgObj);
    }
    ShowPic();

}

function ShowPic() {
    var imgObj = imgArr[currentIndex];
    //document.getElementById('image').setAttribute('src', imgObj.p_image.src);
    $('#image').fadeOut(500, function () { $('#image').attr('src', imgObj.p_image.src);}); 
    $('#image').fadeIn(500);
    imgObj.viewCounter++;
    //document.getElementById('picIntro').innerHTML = imgObj.p_image.imagename + " This pic has been displayed " + imgObj.viewCounter;
    $('#picIntro').text(imgObj.p_image.imagename + " This pic has been displayed " + imgObj.viewCounter);                                      
}

/*FNext() - increment the current index ( wrapping if the last element ), and invoke showPic(). No control constructs
are allowed ( if, else, etc), use only arithmetic only ), picture count must not be retrieved from the image object array.*/
function FNext() {
    currentIndex++;
    currentIndex = (currentIndex + imgArr.length) % imgArr.length;                                                                       //notice how arithmatic algor works to warp data from 5 to 0 or from -1 to 4 
    console.log("currentImgArr Index: " + currentIndex);
    ShowPic();
}
function FPrev() {
    currentIndex--;
    currentIndex = (currentIndex + imgArr.length) % imgArr.length;
    console.log("currentImgArr Index: " + currentIndex);
    ShowPic();
}

function FAuto() {                                                                                                                         //remember how to use timer and toggle button
    if (!autoFlag) {
        timerID = window.setInterval(FNext, 2000);
        //document.getElementById('play').setAttribute('value', 'Stop');
        $('#play').val('Stop');
        autoFlag = true;
    }
    else {
        window.clearInterval(timerID);
        //document.getElementById('play').setAttribute('value', 'Play');
        $('#play').val('Play');
        autoFlag = false;
    }

}

