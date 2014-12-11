var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

pageMod.PageMod({
  include: "file:///home/aadil/Desktop/h.html*",
  contentScriptFile: [data.url("three.js"), data.url("leap.js"), data.url("leap_plugins.js"), data.url("leap.rigged_hand.min.js"), data.url("display_hand.js")]
  // contentScript: 'document.body.innerHTML = ' +
  //                ' "<h1>Page matches ruleset</h1>";'
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