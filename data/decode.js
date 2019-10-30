/* globals self, QRCodeDecode */
// Todo: Somehow do for WebGL? ;)
'use strict';
(() => {
/**
* @param {HTMLCanvasElement} canvas
* @param {string} imgSrc The image URL
* @returns {Promise<ImageData>}
*/
function getImageData (canvas, imgSrc) {
  const ctx = canvas.getContext('2d');
  const img = new Image();
  return new Promise((resolve, reject) => {
    img.addEventListener('load', function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
      resolve(imagedata);
    });
    img.src = imgSrc;
  });
}

self.port.on('imgSrc', async function (imgSrc) {
  const canvas = document.createElement('canvas');
  // document.body.appendChild(canvas);
  const imagedata = await getImageData(canvas, imgSrc);
  const qr = new QRCodeDecode();
  try {
    const decoded = qr.decodeImageData(imagedata, canvas.width, canvas.height);
    self.port.emit('decodedText', decoded);
  } catch (e) {
    self.port.emit('decodingError', e);
  }
});
})();
