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

function insertLink (text) { 'use strict';
    var a = document.createElement('a');
    a.href = text;
    a.appendChild(document.createTextNode(text));
    document.body.appendChild(a);
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
