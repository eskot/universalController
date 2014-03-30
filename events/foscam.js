/*jslint white: true */
/*global module, require, console */

/**
 * @author brian@bevey.org
 * @fileoverview Simple script to fire when the given device executes a
 *               presumed good command.
 * @requires fs
 */

module.exports = (function () {
  'use strict';

  return {
    fire : function(device, command, controllers) {
      var runCommand = require('../lib/runCommand'),
          deviceName = 0;

      if((command === 'AlarmOn') || (command === 'AlarmOff')) {
        for(deviceName in controllers) {
          if((deviceName !== 'config') && (controllers[deviceName].config.typeClass === 'speech')) {
            runCommand.runCommand(deviceName, command === 'AlarmOn' ? 'text-Camera armed' : 'text-Camera disarmed', controllers, 'single', false);
          }
        }
      }
    }
  };
}());