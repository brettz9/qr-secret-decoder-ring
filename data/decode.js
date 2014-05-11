/*globals self, QRCodeDecode*/
/*jslint vars: true*/
(function () {'use strict';

/**
* @param {HTMLCanvasElement} canvas
* @param {string} imgSrc The image URL
* @param {function} cb The callback to execute with the image data as first argument
*/
function getImageData (canvas, imgSrc, cb) {
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

self.port.on('imgSrc', function (imgSrc) {
    var canvas = document.createElement('canvas');
    // document.body.appendChild(canvas);
    getImageData(canvas, imgSrc, function (imagedata) {
        var qr = new QRCodeDecode();
        try {
            var decoded = qr.decodeImageData(imagedata, canvas.width, canvas.height);
            self.port.emit('decodedText', decoded);
        }
        catch (e) {
            self.port.emit('decodingError', e);
        }
    });
});

}());
