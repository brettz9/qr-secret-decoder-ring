# qr-secret-decoder-ring

A restartless
[Firefox add-on](https://addons.mozilla.org/en-US/firefox/addon/qr-secret-decoder-ring/)
which allows right clicking an image or canvas (e.g., from
<https://www.the-qrcode-generator.com/>) containing a QR code to decode it.
Allows choice of the ZXing and MiniQR websites for handling the decoding or
[QR-Logo](https://github.com/kaarposoft/qrlogo)-based internal decoding with
optional URL resolution or link creation and error reporting.

Note that MiniQR makes a public URL but conveniently converts URLs to links.

Currently does not work with local files.

# Possible to-dos
1. Incorporate https://github.com/kaarposoft/qrlogo/blob/master/qrdecode.html
to avoid site dependency
1. Support image uploading
1. Support POST
