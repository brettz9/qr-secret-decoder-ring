// Note: For MiniQR, there is also a hidden type "rtype=pageredirect" (and optional "size" and "ps" for shortcut)
/*globals self */

(function () {'use strict';

var svgNS = 'http://www.w3.org/2000/svg';

self.on('context', function (node) { // Node could be element of intended type or its children
    return ['img','canvas'].indexOf(node.nodeName.toLowerCase()) > -1 ||
        node.namespaceURI === svgNS ||
        !!node.style.backgroundImage;
});

self.on('click', function (node, data) {
    switch (node.nodeName.toLowerCase()) {
        case 'canvas':
            self.postMessage(node.toDataURL());
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
            self.postMessage(
                node.src || // Images
                node.style.backgroundImage.replace(/url\("(.*)"\)/, '$1') // background URLs
            );
            break;
    }
});

}());
