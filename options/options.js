/* eslint-env browser, webextensions */
import jml from './jml.js';

function _ (...args) {
    return browser.i18n.getMessage(...args);
}

document.title = _('extensionName'); // If switch to tabs

(async () => {
jml('section', [], document.body);
/*
// Todo: Adapt this for this add-on!!!
// Todo: Comment out MiniQR for now as apparently not online
{
    "name": "decoderSite",
    "options": [
        {
            "label": "QR Secret Decoder Ring Internal Decoder",
            "value": "internal"
        },
        {
            "label": "MiniQR",
            "value": "http://miniqr.com/api/read.php?url="
        },
        {
            "label": "ZXing",
            "value": "http://zxing.org/w/decode?u="
        }
    ],
    "type": "radio",
    "value": "internal"
},
{
    "name": "URLHandling",
    "type": "radio",
    "value": "toLink",
    "options": [
        {
            "label": "Convert URLs to links",
            "value": "toLink"
        },
        {
            "label": "Add text in text box",
            "value": "toText"
        }
    ]
},
{
    "name": "resolveURLs",
    "type": "bool",
    "value": true
}

jml('section', await Promise.all([
    ['noSeparator'],
    ['lineBreakSeparator'],
    ['doubleLineBreakSeparator'],
    ['clearClipboard']
].map(async ([preferenceKey]) => {
    let enabled = true;
    try {
        ({[preferenceKey]: enabled = true} = await browser.storage.local.get(preferenceKey));
    } catch (err) {}
    return ['label', [
        ['input', {
            type: 'checkbox',
            checked: enabled,
            $on: {
                change: async ({target}) => {
                    await browser.storage.local.set({
                        [preferenceKey]: target.checked
                    });
                    const backgroundPage = browser.extension.getBackgroundPage();
                    backgroundPage.updateContextMenus();
                }
            }
        }],
        ' ',
        _(preferenceKey + '_title'),
        ['section', {class: 'addon-description'}, [
            _(preferenceKey + '_description')
        ]],
        ['br']
    ]];
})), document.body);
*/
})();
