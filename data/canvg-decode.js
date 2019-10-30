/* globals self, canvg, QRCodeDecode */
'use strict';
(function () {
self.port.on('imgSrc', function (imgSrc) { // imgSrc is here an SVG string
  const canvas = document.createElement('canvas');
  // document.body.appendChild(canvas);
  canvg(canvas, imgSrc, {renderCallback () {
    const ctx = canvas.getContext('2d');
    const imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const qr = new QRCodeDecode();
    try {
      const decoded = qr.decodeImageData(imagedata, canvas.width, canvas.height);
      self.port.emit('decodedText', decoded);
    } catch (e) {
      self.port.emit('decodingError', e);
    }
  }});
});
}());
