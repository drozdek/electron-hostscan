const net = require('net');
const app = require('electron');

$(() => {

  /**
   * HostScanner
   * 
   * @constructor
   */
  function HostScanner() { };

  // obj ERROR to hold error responses
  let ERROR: object = {};

  $('body').on('click', 'input[type=submit]', function (e: any) {

    let _val = $('input[type=text]').val();

    if (checkAddr(_val as string)) {
      $('#scan-result').empty();
      $('#scan-result-failed').empty();
      scanHost();
      return false;
    }
    else if (_val === '') {
      return;
    }
  });

  /**
   * @method checkAddr
   * 
   * @param {int} param
   */

  var checkAddr = function (param: string): boolean | string {
    if (typeof param === "undefined" || !net.isIPv4(param))
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
    let $scanResult = $('#scan-result'),
      $scanResultFailed = $('#scan-result-failed'),
      $inputVal = $('input[type=text]').val();

    var start = 1,
      end = 100;

    while (start <= end) {

      (function (port) {

        var port = start,
          s = new net.Socket();

        s.connect(port, $inputVal, function () {
          $scanResult.
            empty().
            addClass('result_port-open').
            append('OPEN: ' + port);
        });

        s.on('data', function (data: object) {
          $scanResult.
          append('DATA: ' + data);
        });

        s.on('error', function (e: string) {
          $scanResultFailed.
            addClass('result_port-error').
            text('Scanning port ' + port);

          if (e === 'ECONNREFUSED') {
            return;
          }
        });
      })(start);
      start++;

    }
  };

});