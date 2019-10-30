// This is an active module of the QR Secret Decoder Ring Add-on
/* eslint-env webextensions */
/* globals require */
/* eslint-disable node/no-missing-require */

'use strict';

const _ = require('sdk/l10n').get,
  cm = require('sdk/context-menu'),
  tabs = require('sdk/tabs'),
  {data} = require('sdk/self'),
  simplePrefs = require('sdk/simple-prefs'),
  pageWorker = require('sdk/page-worker');

(() => {
/*
Planned todos:
1. If adding support for image uploading (as opposed to supplying the image URL),
  see ZXing (which I've already supported for URLs) and:
  http://www.patrick-wied.at/static/qrgen/ .
1. Use the Cache API?
2. If adding POST support, see http://blog.qr4.nl/Online-QR-Code_Decoder.aspx
  (nice for allowing copy-paste, though top-heavy banner at top of page)
3. For image uploading, also handle when SVG is selected

Possible todos:
1. Could i18n-ize errors, but would also need to modify qrcodedecode.js
2. Add additional context menu items in place of preferences?
*/

let item;
const setupDecoderMenuItem = function () {
  if (item) {
    item.destroy();
  }
  item = cm.Item({
    label: _('Decode_QR_Code_image'),
    context: cm.SelectorContext('*'),
    contentScriptFile: data.url('transmitDecoding.js'),
    data: simplePrefs.prefs.decoderSite,
    onMessage (imgSrc) {
      const workerOpts = {
        contentScriptWhen: 'ready',
        contentURL: 'chrome://qr-secret-decoder-ring/content/decode.html' // A chrome URL is needed for cross-domain toDataURL
      };
      const qrDecodeFiles = ['qrlogo/reedsolomon.js', 'qrlogo/qrcodedecode.js'];
      const canvgFiles = ['canvg/rgbcolor.js', 'canvg/StackBlur.js', 'canvg/canvg.js'];

      const isSVG = imgSrc.slice(0, 4) === '<svg';
      if (isSVG) {
        workerOpts.contentScriptFile = qrDecodeFiles.concat(canvgFiles, 'canvg-decode.js').map((url) => {
          return data.url(url);
        });
      } else {
        const {decoderSite} = simplePrefs.prefs;
        if (decoderSite !== 'internal') {
          tabs.open({url: decoderSite + encodeURIComponent(imgSrc)});
          return;
        }
        workerOpts.contentScriptFile = qrDecodeFiles.concat('decode.js').map((url) => {
          return data.url(url);
        });
      }

      const pworker = pageWorker.Page(workerOpts);
      pworker.port.on('decodingError', (text) => {
        tabs.open({
          url: data.url('empty.html'),
          onOpen (tab) {
            tab.on('ready', (tab) => {
              tab.attach({
                contentScriptFile: data.url('insertText.js'),
                contentScriptOptions: {
                  method: 'insertError',
                  text: String(text)
                }
              });
            });
          }
        });
      });
      pworker.port.on('decodedText', (text) => {
        if (text.match(/^https?:/) && simplePrefs.prefs.resolveURLs) {
          tabs.open({url: text});
          return;
        }
        tabs.open({
          url: data.url('empty.html'),
          onOpen (tab) {
            tab.on('ready', (tab) => {
              tab.attach({
                contentScriptFile: data.url('insertText.js'),
                contentScriptOptions: {
                  method: simplePrefs.prefs.URLHandling === 'toLink' ? 'insertLink' : 'insertText',
                  text
                }
              });
            });
          }
        });
      });
      pworker.port.emit('imgSrc', imgSrc);
    }
  });
};
simplePrefs.on('decoderSite', setupDecoderMenuItem);
setupDecoderMenuItem();
})();
