/*globals self, canvg, getImageData */
/*jslint vars: true*/
(function () {'use strict';

self.port.on('imgSrc', function (imgSrc) { // imgSrc is here an SVG string
    var canvas = document.createElement('canvas');
    // document.body.appendChild(canvas);
    canvg(canvas, imgSrc, {renderCallback: function () {
        var ctx = canvas.getContext('2d');
        var imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var qr = new QRCodeDecode();    
        try {
            var decoded = qr.decodeImageData(imagedata, canvas.width, canvas.height);
            self.port.emit('decodedText', decoded);
        }
        catch (e) {
            self.port.emit('decodingError', e);
        }    
    }});
});

}());
