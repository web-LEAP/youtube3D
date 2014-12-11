var riggedHandPlugin;

Leap.loop({
hand: function(hand){
var label = hand.data('label');
if (!label){
label = document.createElement('label');
document.body.appendChild(label);
/**
* Here we set the label to show the hand type
*/
label.innerHTML = hand.type + " hand";
hand.data('label', label)
}
var handMesh = hand.data('riggedHand.mesh');
var screenPosition = handMesh.screenPosition(
hand.palmPosition,
riggedHandPlugin.camera
);
label.style.left = screenPosition.x + 'px';
label.style.bottom = screenPosition.y + 'px';
}
})
.use('riggedHand')
.use('handEntry')
.on('handLost', function(hand){
var label = hand.data('label');
if (label){
document.body.removeChild(label);
hand.data({label: undefined});
}
});
// .use('playback', {
// recording: './left-or-right-77fps.json.lz',
// timeBetweenLoops: 1000
// });
riggedHandPlugin = Leap.loopController.plugins.riggedHand;