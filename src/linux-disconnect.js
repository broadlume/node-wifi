var execFile = require('child_process').execFile;
var env = require('./env');

function disconnect(config, ap, callback) {
  var args = [];
  args.push('device');
  args.push('disconnect');

  if (config.iface) {
    args.push(config.iface);
  }

  let file = 'nmcli';
  if (ap.sudo) {
    args.unshift(file);
    file = 'sudo';
  }

  execFile(file, args, { env }, function(err) {
    callback && callback(err);
  });
}

module.exports = function(config) {
  return function(ap, callback) {
    if (callback) {
      disconnect(config, ap, callback);
    } else {
      return new Promise(function(resolve, reject) {
        disconnect(config, ap, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  };
};
