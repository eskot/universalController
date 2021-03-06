/*jslint white: true */
/*global module, require, console */

module.exports = (function () {
  'use strict';

  /**
   * @author brian@bevey.org
   * @fileoverview Basic control over PS3 pre-configured GIMX setup.
   * @requires child_process, fs
   * @note Requires the installation of sixemu package, version 1.11+ available
   *       here: https://code.google.com/p/diyps3controller/downloads/list
   */
  return {
    version : 20140418,

    inputs  : ['command'],

    /**
     * Whitelist of available key codes to use.  We could support all buttons,
     * as they are supported in GIMX, but timing of events for unnecessary
     * buttons in the context of media control seems pointless.
     */
    keymap  : ['PowerOn', 'Left', 'Right', 'Up', 'Down', 'PS', 'Select', 'Start', 'Triangle', 'Circle', 'Cross', 'Square'],

    translateCommand : function (command, deviceMac, platform) {
      var value  = '';

      if(platform === 'linux' || platform === 'win32') {
        switch(command) {
          case 'PowerOn' :
            value = 'date > tmp/ps3.lock && echo "Connecting to PS3" && emu ' + deviceMac + ' > /dev/null && echo "Disconnecting from PS3" && rm tmp/ps3.lock';
          break;

          case 'PS' :
            value = 'emuclient --event "PS(255)"';
          break;

          case 'Left'     :
          case 'Right'    :
          case 'Up'       :
          case 'Down'     :
          case 'Select'   :
          case 'Start'    :
          case 'Triangle' :
          case 'Circle'   :
          case 'Cross'    :
          case 'Square'   :
            value = 'emuclient --event "' + command.toLowerCase() + '(255)" & sleep .01 && emuclient --event "' + command.toLowerCase() + '(0)"';
          break;
        }
      }

      else {
        console.log('PS3: PS3 is not supported on your platform!');
      }

      return value;
    },

    init : function () {
      var fs = require('fs');

      // PS3 requires a lock file to determine if the daemon is running.
      // If the server is just started up, we should assume it is not.
      fs.exists('tmp/ps3.lock', function(exists) {
        if(exists) {
          fs.unlink('tmp/ps3.lock', function(error) {
            if(error) {
              console.log(error);
            }
          });
        }
      });
    },

    send : function (config) {
      var fs        = require('fs'),
          exec      = require('child_process').exec,
          ps3       = {};

      ps3.deviceMac = config.device.deviceMac;
      ps3.command   = config.command  || '';
      ps3.callback  = config.callback || function () {};
      ps3.platform  = config.platform || process.platform;

      if(fs.existsSync(__dirname + '/../tmp/ps3.lock')) {
        // If the PS3 is already on, we shouldn't execute PowerOn again.
        if(ps3.command === 'PowerOn') {
          console.log('PS3 looks on already.  Changing command to PS');

          ps3.command = 'PS';
        }
      }

      else {
        console.log('PS3 doesn\'t look on.');
      }

      exec(this.translateCommand(ps3.command, ps3.deviceMac, ps3.platform), function (err, stdout, stderr) {
        var errorMsg = '';

        if(err) {
          errorMsg = 'PS3: ' + err;
          ps3.callback(err);
          console.log(err);
        }

        else {
          ps3.callback(null, stdout);
        }
      });
    }
  };
}());