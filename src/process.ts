const net = require('net');
const app = require('electron');

$(document).ready(function () {

  /**
   * HostScanner
   * 
   * @constructor
   */
  function HostScanner() { };

  // obj ERROR to hold error responses
  let ERROR: object = {};

  $('body').on('click', $('input[type=submit]'), function (e) {

    let _val = $('input[type=text]').val();

    if (checkAddr(_val as string)) {
      scanHost();
      return false;
    }
    else if ($(e.target).val() === '') {
      return;
    }
  });

  /**
   * @method checkAddr
   * 
   * @param {int} param
   */

  var checkAddr = function (param: string): boolean|string {
    if ( typeof param === "undefined" || !net.isIPv4(param) ) 
      return false;
    else 
      return true;
  };

  /**
   * @method checkServer
   * 
   * @param {string} ip
   */
  function scanHost() {
    $('#scan-result').empty().append('Scanning host...  <br />');

    var start = 1,
      end = 10000;

    while (start <= end) {

      (function (port) {

        var port = start,
          s = new net.Socket();

        s.connect(port, $('input[type=text]').val(), function () {
          $('#scan-result').append('OPEN: ' + port + '<br />');
        });

        s.on('data', function (data: string) {
          $('#scan-result').append('DATA: ' + data + '<br/>');
        });

        s.on('error', function (e: string) {
          if (e.toString() === 'ECONNREFUSED') {
            return;
          }
        });
      })(start);
      start++;

    }
  };

});