var self = require("sdk/self");

var button = require("sdk/ui/button/action").ActionButton({
    id: "style-tab",
    label: "Style Tab",
    icon: "./icon-16.png",
    onClick: function() {
        require("sdk/tabs").activeTab.attach({
            contentScriptFile: [ self.data.url("./three.js"),
                self.data.url("./leap.js"),
                self.data.url("./leap-plugins-0.1.6.1.js"),
                self.data.url("./leap.rigged-hand-0.1.3.min.js.js"),
                self.data.url("./showhand.js"),
                self.data.url("./abc.js") ]
        });
    }
});