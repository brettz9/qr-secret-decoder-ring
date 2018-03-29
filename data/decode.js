/* globals self, QRCodeDecode */
// Todo: Somehow do for WebGL? ;)
(() => {
'use strict';

/**
* @param {HTMLCanvasElement} canvas
* @param {string} imgSrc The image URL
* @param {function} cb The callback to execute with the image data as first argument
*/
function getImageData (canvas, imgSrc, cb) {
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
}

self.port.on('imgSrc', function (imgSrc) {
    const canvas = document.createElement('canvas');
    // document.body.appendChild(canvas);
    getImageData(canvas, imgSrc, (imagedata) => {
        const qr = new QRCodeDecode();
        try {
            const decoded = qr.decodeImageData(imagedata, canvas.width, canvas.height);
            self.port.emit('decodedText', decoded);
        } catch (e) {
            self.port.emit('decodingError', e);
        }
    });
});
})();
