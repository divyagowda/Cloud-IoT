cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/WebViewer/www/webview.js",
        "id": "WebViewer.webview",
        "pluginId": "WebViewer",
        "clobbers": [
            "webview"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "WebViewer": "0.0.1"
}
// BOTTOM OF METADATA
});