// JavaScript source code


function concatData(id,data)
{
    return id + " : " + data + "<br>";
}


var output = document.getElementById('output');
var frameString = "", handString = "", fingerString = "";

var options = { enableGestures: true };


Leap.loop(options, function (frame) {

    console.log(frame);

    frameString = concatData("frame_id", frame.id);

    frameString += concatData("number of hands", frame.hands.length);

    frameString += concatData("number of fingers", frame.fingers.length);

    if (typeof frame.hands[0]  != "undefined")
    {
     frameString += concatData("Z Coordinate :",frame.hands[0]._translation[2]);

    }

    frameString += "<br>";

    $('#output').html(frameString);

    //alert(frameString);

    //document.write(frameString);
    //console.log(frameString);


});

