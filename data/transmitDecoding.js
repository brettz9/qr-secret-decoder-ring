// Note: For MiniQR, there is also a hidden type "rtype=pageredirect" (and optional "size" and "ps" for shortcut)
/*globals self */

(function () {'use strict';

self.on('click', function (node, data) {
    window.open(data + encodeURIComponent(node.src));
});

}());
