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
  ERROR = {};

  $('body').on('click', $('input[type=submit]'), function (e) {
    if (checkAddr($('input[type=text]').val())) {
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
   * @param {int} param - specifies an IP address
   */

  var checkAddr = function (param) {
    if (!net.isIPv4(param)) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * @method checkServer
   * 
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

        s.on('data', function (data) {
          $('#scan-result').append('DATA: ' + data + '<br/>');
        });

        s.on('error', function (e) {
          if (e.toString() === 'ECONNREFUSED') {
            return;
          }
        });
      })(start);
      start++;
    }
  };

});
