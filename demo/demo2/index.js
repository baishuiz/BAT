var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');


phantomjs.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  phantom.exit(1);
};

var binPath = phantomjs.path;

var childArgs = [
    path.join(__dirname, 'callPhantom.js')
];

var ph =childProcess.execFile(binPath, childArgs, function(err, stdout, stderr){
   console.log("execFile callback")
   err && console.log(err)
})

process.stdin.pipe(ph.stdin);
ph.stdout.pipe(process.stdout);
