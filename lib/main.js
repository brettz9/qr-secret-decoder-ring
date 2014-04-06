// This is an active module of the QR Secret Decoder Ring Add-on
/*globals require, exports */

(function () {'use strict';

/*
Todos:
1. If adding support for image uploading (as opposed to supplying the image URL), see ZXing (which I've already supported for URLs) and:
http://www.patrick-wied.at/static/qrgen/ . Note the following resources for grabbing the cache entry (see the "openCacheEntry" function):
    chrome://browser/content/pageinfo/pageInfo.js
    https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsICacheEntryDescriptor#openInputStream%28%29
    https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsISeekableStream
2. If adding POST support, see http://blog.qr4.nl/Online-QR-Code_Decoder.aspx (nice for allowing copy-paste, though top-heavy banner at top of page)
3. Make auto-opening of URL optional
*/

var item;
exports.main = function() {

    var _ = require('sdk/l10n').get,
        cm = require('sdk/context-menu'),
        tabs = require('sdk/tabs'),
        data = require('sdk/self').data,
        simplePrefs = require('sdk/simple-prefs'),
        setupDecoderMenuItem = function () {
            if (item) {
                item.destroy();
            }
            item = cm.Item({
                label: _("Decode_QR_Code_image"),
                context: cm.SelectorContext('img,canvas'),
                contentScriptFile: data.url('transmitDecoding.js'),
                data: simplePrefs.prefs.decoderSite,
                onMessage: function (imgSrc) {
                    var pworker = require('sdk/page-worker').Page({
                        contentScriptFile: ['reedsolomon.js', 'qrcodedecode.js', 'decode.js'].map(function (url) {
                            return data.url(url);
                        }),
                        contentScriptWhen: 'ready',
                        contentURL: ('chrome://qr-secret-decoder-ring/content/decode.html')
                    });
                    pworker.port.on('decodedText', function (text) {
                        if (text.match(/https?:/)) {
                            tabs.open({url: text});
                            return;
                        }
                        tabs.open({
                            url: data.url('empty.html'),
                            onOpen: function (tab) {
                                tab.on('ready', function (tab) {
                                    tab.attach({
                                        contentScriptFile: data.url('insertText.js'),
                                        contentScript: 'insertText("' + text.replace(/"/g, '\\"') + '");'
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
};

}());
