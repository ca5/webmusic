var context;
var audioBuffer = null;
window.addEventListener('load', init, false);

function init() {
  try {
    context = new webkitAudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}


function loadSound(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      audioBuffer = buffer;
      callback(audioBuffer);
    }, function(err) {console.log(err)});
  }
  request.send();
}

function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                          // play the source now
}

onload = function() {
    var e = document.getElementById('play');
    e.removeAttribute("disabled");
    e.onclick = function() {
        playSound(audioBuffer);
    };
}

init();
loadSound("./amen.wav", function() {console.log('loaded')});
