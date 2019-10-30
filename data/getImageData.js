/**
* @param {HTMLCanvasElement} canvas
* @param {string} imgSrc The image URL
* @returns {Promise<ImageData>}
*/
'use strict';
window.getImageData = function (canvas, imgSrc) {
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
};
