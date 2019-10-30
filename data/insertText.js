'use strict';

function insertError (errorMsg) {
  const a = document.createElement('a'),
    div = document.createElement('div');
  div.style.color = 'red';
  div.append('Error decoding QR code (Decoder obtained from ');
  a.href = 'https://github.com/kaarposoft/qrlogo';
  a.append('QR-Logo');
  div.append(a);
  div.append('):');
  div.append(document.createElement('br'));
  div.append(document.createElement('br'));
  div.append(errorMsg);
  document.body.append(div);
}

const link = /\bhttps?:.*?(?=\s|$)/;

function insertLink (text) {
  const start = text.search(link);
  const match = text.match(link);
  if (start === -1) {
    document.body.append(text);
    return;
  }

  if (start) {
    document.body.append(text.slice(0, start));
  }

  const a = document.createElement('a');
  const linkText = match[0];
  a.href = linkText;
  a.append(linkText);
  document.body.append(a);
  insertLink(text.slice(start + match[0].length));
}

function insertText (text) {
  const textarea = document.createElement('textarea');
  textarea.autofocus = true;
  textarea.style.width = '100%';
  textarea.style.height = '400px';
  textarea.append(text);
  document.body.append(textarea);
  textarea.setSelectionRange(0, textarea.value.length); // Not sure why select() is not working
}

const methods = {
  insertError,
  insertLink,
  insertText
};

methods[self.options.method](self.options.text);
