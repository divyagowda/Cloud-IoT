cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "WebViewer.webview",
      "file": "plugins/WebViewer/www/webview.js",
      "pluginId": "WebViewer",
      "clobbers": [
        "webview"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.3",
    "WebViewer": "0.0.1"
  };
});