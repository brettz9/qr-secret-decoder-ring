// Note: For MiniQR, there is also a hidden type "rtype=pageredirect" (and optional "size" and "ps" for shortcut)
/*globals self */

(function () {'use strict';

var svgNS = 'http://www.w3.org/2000/svg';
self.on('click', function (node, data) {
    switch (node.nodeName.toLowerCase()) {
        case 'canvas':
            self.postMessage(node.toDataURL());
            break;
        case 'video':
            self.postMessage({videoSrc: node.src, currentTime: node.currentTime, videoWidth: node.videoWidth, videoHeight: node.videoHeight});
            break;
        default:
            if (node.namespaceURI === svgNS) { // In case we are in a child of an SVG element, we probably need the whole SVG block
                var lastElement = node;
                while (node.namespaceURI === svgNS) {
                    lastElement = node;
                    node = node.parentNode;
                }
                self.postMessage(lastElement.outerHTML);
                break;
            }
            // Images
            self.postMessage(node.src);
            break;
    }
});

}());
