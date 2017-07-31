var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var p = Promise.promisifyAll(require('child_process'));
var exec = p.exec;
var spec = [];
var tests = [];
fs.readFileAsync("./tests/test.spec.js", "utf8").then(function(data) {
  
  var specRx = /describe\(['"](.*?)['"],/g
  while (item = specRx.exec(data)) {
    spec.push(item[1]);
  }

  var testSpec = /it\([`'"](.*?)[`'"],/g
  
  while (item = testSpec.exec(data)) {
    tests.push(item[1]);
  }

  
  exec('karma start');

  exec(`karma run -- --grep='should focus the element if it is the first molecular formula'`, (err, data, derr) => {
    console.log(data);
  });
});
