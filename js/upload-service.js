'use strict'

var myImage = null
var gImg
var gImgData

let imgInput = document.getElementById('imageInput');
imgInput.addEventListener('change', function (e) {
    renderWhenUpload()
    if (e.target.files) {
        let imageFile = e.target.files[0]; //here we get the image file
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function (e) {
            myImage = new Image(); // Creates image object
            myImage.src = e.target.result; // Assigns converted image to image object
            myImage.onload = function (ev) {
                gCtx.drawImage(myImage, 0, 0, canvas_width, canvas_height)
                gImgData = gCanvas.toDataURL("image/jpeg", 0.75); // Assigns image base64 string in jpeg format to a variable
            }
        }
    }


});
function renderWhenUpload() {
    console.log("u")
    setTimeout(renderChart, 500)
    setTimeout(renderChart, 600)
}

function addImage() {
    imgInput.click()
}