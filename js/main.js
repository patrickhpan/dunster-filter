// Hi! if you're reading this, I wrote this in about 15 minutes and it's either terrible code or stolen. Sorry!

// http://stackoverflow.com/questions/22255580/javascript-upload-image-file-and-draw-it-into-a-canvas

function el(id){return document.getElementById(id);} // Get elem by ID

var canvas  = el("canvas");
var context = canvas.getContext("2d");

function readImage() {
    if ( this.files && this.files[0] ) {
        var FR = new FileReader();
        FR.onload = function(e) {
           var img = new Image();
           img.onload = function() {
             context.drawImage(img, 0, 0, canvas.width, canvas.width * img.height / img.width);
             var overlay = el("overlay");
             context.drawImage(overlay, 0, 0, canvas.width, canvas.width * overlay.height / overlay.width);
           };
           img.src = e.target.result;
        };
        FR.readAsDataURL( this.files[0] );
    }
}

el("fileUpload").addEventListener("change", readImage, false);


function convertCanvasToImage(canvas) {
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        return image;
    }

el("canvas").onclick= function(e){

    var image = convertCanvasToImage(e.target);
    var anchor = document.createElement('a');

    console.log(anchor);
    anchor.setAttribute('href', image.src);
    anchor.setAttribute('download', 'image.png');
    anchor.click();
}
