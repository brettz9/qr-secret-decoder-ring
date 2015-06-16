/*globals getImageData:true */
/*jslint vars: true*/
/**
* @param {HTMLCanvasElement} canvas
* @param {string} imgSrc The image URL
* @param {function} cb The callback to execute with the image data as first argument
*/
function getImageData (canvas, imgSrc, cb) {'use strict';
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        var imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
        cb(imagedata);
    };
    img.src = imgSrc;
}
