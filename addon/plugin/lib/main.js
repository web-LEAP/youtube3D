var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;
var button = buttons.ActionButton({
    id: "mozilla-link",
    label: "Visit Mozilla",
    icon: {
        "16": "./icon-16.png"
    },
    onClick: handleClick
});
var myscript = "(window.controller = new Leap.Controller) .use('riggedHand') .connect()";
pageMod.PageMod({
    include: "*" ,
    contentScriptFile: [ data.url("./three.js"),
    data.url("./leap.js"),
    data.url("./leap-plugins-0.1.6.1.js"),
    data.url("./leap.rigged-hand-0.1.5.js"),
    data.url("./myscript.js")]
//     contentScript: 'document.body.innerHTML = ' +
 //                   ' "<h1>Page matches ruleset</h1>";'
});

function handleClick(state) {
    //tabs.open("https://www.mozilla.org/");
    tabs.open({
        url: "https://www.google.co.in/",
        onReady: function onReady(tab) {
            console.log(tab.title);
        }
    });
    //console.log("hello baby i'm printing");
}