/**
* @param {HTMLCanvasElement} canvas
* @param {string} imgSrc The image URL
* @param {function} cb The callback to execute with the image data as first argument
*/
'use strict';
// We use this style for sake of eslint-config-standard
window.getImageData = function (canvas, imgSrc, cb) {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
        cb(imagedata);
    };
    img.src = imgSrc;
};
