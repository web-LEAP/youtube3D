/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

module.metadata = {
  "stability": "experimental"
};

const { Ci } = require("chrome");
const { open } = require("../event/dom");
const { observe } = require("../event/chrome");
const { filter, merge, map, expand } = require("../event/utils");
const { windows } = require("../window/utils");
const { events: windowEvents } = require("sdk/window/events");

// Note: Please note that even though pagehide event is included
// it's not observable reliably since it's not always triggered
// when closing tabs. Implementation can be imrpoved once that
// event will be necessary.
let TYPES = ["DOMContentLoaded", "load", "pageshow", "pagehide"];

let insert = observe("document-element-inserted");
let windowCreate = merge([
  observe("content-document-global-created"),
  observe("chrome-document-global-created")
]);
let create = map(windowCreate, function({target, data, type}) {
  return { target: target.document, type: type, data: data }
});

function streamEventsFrom({document}) {
  // Map supported event types to a streams of those events on the given
  // `window` for the inserted document and than merge these streams into
  // single form stream off all window state change events.
  let stateChanges = TYPES.map(function(type) {
    return open(document, type, { capture: true });
  });

  // Since load events on document occur for every loded resource
  return filter(merge(stateChanges), function({target}) {
    return target instanceof Ci.nsIDOMDocument
  })
}
exports.streamEventsFrom = streamEventsFrom;

let opened = windows(null, { includePrivate: true });
let state = merge(opened.map(streamEventsFrom));


let futureReady = filter(windowEvents, function({type})
                                        type === "DOMContentLoaded");
let futureWindows = map(futureReady, function({target}) target);
let futureState = expand(futureWindows, streamEventsFrom);

exports.events = merge([insert, create, state, futureState]);
