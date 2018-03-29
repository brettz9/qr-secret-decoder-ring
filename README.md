# qr-secret-decoder-ring

A webextensions
([Firefox](https://addons.mozilla.org/en-US/firefox/addon/qr-secret-decoder-ring/))
add-on which allows right clicking an image (including a background image),
SVG element, or canvas (e.g., from
<https://www.the-qrcode-generator.com/>) containing a QR code to decode it.
Allows choice of the [ZXing](http://zxing.org)
<!--
Put back if site ever back online
and [MiniQR](http://miniqr.com)
-->
websites for handling the decoding or
[QR-Logo](https://github.com/kaarposoft/qrlogo)-based internal decoding with
optional URL resolution or link creation and error reporting.
<!--
Put back if site ever back online
Note that MiniQR makes a public URL but conveniently converts URLs to links.
-->

# Possible to-dos

1. Support image (including SVG) uploading
1. Support POST
1. Could i18n-ize errors, but would also need to modify `qrcodedecode.js`
1. Add additional context menu items in place of preferences?
