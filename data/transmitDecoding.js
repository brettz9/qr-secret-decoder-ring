// Note: For MiniQR, there is also a hidden type "rtype=pageredirect" (and optional "size" and "ps" for shortcut)
/*globals self */

(function () {'use strict';

self.on('click', function (node, data) {
    if (node.nodeName.toLowerCase() === 'canvas') {
        self.postMessage(node.toDataURL());
    }
    else {
        self.postMessage(node.src);
    }
});

}());
