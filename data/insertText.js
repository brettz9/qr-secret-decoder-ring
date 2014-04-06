function insertError (errorMsg) {
    var div = document.createElement('div');
    div.style.color = 'red';
    div.appendChild(document.createTextNode('Error decoding QR code (Decoder obtained from '));
    var a = document.createElement('a');
    a.href = 'https://github.com/kaarposoft/qrlogo';
    a.appendChild(document.createTextNode('QR-Logo'));
    div.appendChild(a);
    div.appendChild(document.createTextNode('):'));
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createTextNode(errorMsg));
    document.body.appendChild(div);
}
function insertText (text) {
    
    // document.body.appendChild(document.createTextNode(text));
    var textarea = document.createElement('textarea');
    textarea.autofocus = true;
    textarea.style.width = '100%';
    textarea.style.height = '400px';
    textarea.appendChild(document.createTextNode(text));
    document.body.appendChild(textarea);
    textarea.setSelectionRange(0, textarea.value.length); // Not sure why select() is not working
}
