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
