var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

var childArgs = [    
    path.join(__dirname, 'caseLoader.js')  
];

var ph =childProcess.execFile(binPath, childArgs, function(err, stdout, stderr){
   console.log("execFile callback")
   err && console.log(err)
})

process.stdin.pipe(ph.stdin);
ph.stdout.pipe(process.stdout);