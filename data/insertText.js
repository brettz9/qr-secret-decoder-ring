function insertError (errorMsg) { 'use strict';
    var a = document.createElement('a'),
        div = document.createElement('div');
    div.style.color = 'red';
    div.appendChild(document.createTextNode('Error decoding QR code (Decoder obtained from '));
    a.href = 'https://github.com/kaarposoft/qrlogo';
    a.appendChild(document.createTextNode('QR-Logo'));
    div.appendChild(a);
    div.appendChild(document.createTextNode('):'));
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createTextNode(errorMsg));
    document.body.appendChild(div);
}


var link = /\bhttps?:.*?(?=\s|$)/;
var textStart = 0;
function insertLink (text) { 'use strict';
    var start = text.search(link);
    var match = text.match(link);
    if (start === -1) {
        document.body.appendChild(document.createTextNode(text));
        return;
    }

    if (start) {
        document.body.appendChild(document.createTextNode(text.slice(0, start)));
    }

    var a = document.createElement('a');
    var linkText = match[0];
    a.href = linkText;
    a.appendChild(document.createTextNode(linkText));
    document.body.appendChild(a);
    insertLink(text.slice(start + match[0].length));
}

function insertText (text) { 'use strict';
    var textarea = document.createElement('textarea');
    textarea.autofocus = true;
    textarea.style.width = '100%';
    textarea.style.height = '400px';
    textarea.appendChild(document.createTextNode(text));
    document.body.appendChild(textarea);
    textarea.setSelectionRange(0, textarea.value.length); // Not sure why select() is not working
}

var methods = {
    insertError: insertError,
    insertLink: insertLink,
    insertText: insertText
};


methods[self.options.method](self.options.text);
