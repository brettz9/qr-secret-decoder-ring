/*globals self, QRCodeDecode*/
/*jslint vars: true*/
(function () {'use strict';

/**
* @param {HTMLCanvasElement} canvas
* @param {string} imgSrc The image URL
* @param {function} cb The callback to execute with the image data as first argument
*/
function getImageData (canvas, video, cb) {
    var ctx = canvas.getContext('2d');
    canvas.width = video.width;
    canvas.height = video.height;
    ctx.drawImage(video, 0, 0);
    var imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    cb(imagedata);
}

self.port.on('imgSrc', function (imgSrc) {
    var canvas = document.createElement('canvas');
    // document.body.appendChild(canvas);
    var video = document.createElement('video');
    video.width = imgSrc.videoWidth;
    //video.height = imgSrc.videoHeight;
    video.height = imgSrc.videoWidth; // Must be square, so we enforce
    video.src = imgSrc.videoSrc;
    var alreadySeeked = false, alreadyCanPlay = false;
    video.addEventListener('seeked', function () { // Wait until current time frame loaded
        if (!alreadyCanPlay || alreadySeeked) {
            return;
        }
        alreadySeeked = true;
        getImageData(canvas, video, function (imagedata) {
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
    video.addEventListener('canplay', function () {
        if (alreadyCanPlay) {
            return;
        }
        alreadyCanPlay = true;
        video.currentTime = imgSrc.currentTime;
    });
});

}());
