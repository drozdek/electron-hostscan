const net = require('net');
const app = require('electron');
const dns = require('dns');
const util = require('util');

$(() => {

  /**
   * HostScanner
   *
   * @constructor
   */
  function HostScanner() { };

  // obj ERROR to hold error responses
  let ERROR: object = {},
    $scanResult = $('#scan-result'),
    $scanResultFailed = $('#scan-result-failed');

  $('body').on('click', 'input[type=submit]', function (e: any) {
    let _val = $('input[type=text]').val();
    if (checkAddr(_val as string)) {
      $scanResult.empty();
      $scanResultFailed.empty();
      scanHost();
      return false;
    }
    else if (_val === '') {
      return;
    }
  });

  /**
   * @method getIP
   *
   * @param {string} url
   */
  function getIP(url: string): string {
    let ip = dns.lookup(url, function (error: string, addresses: string, family: string) {
      return addresses
    });
    return ip;
  }

  /**
   * @method checkAddr
   *
   * @param {int} param
   */
  var checkAddr = function (param: string): boolean | string {
    if (typeof param === "undefined" || !getIP(param))
      return false;
    else
      return true;
  };

  /**
   * @method checkServer
   *
   * @param {string} IP
   */
  function scanHost() {
    let ip = getIP($('#ip_addr').val() as string);

    var start = 1,
      end = 1000;

    while (start <= end) {

      (function (port) {

        var port = start,
          s = new net.Socket();

        s.connect(port, ip, function () {
          $scanResult.
            empty().
            addClass('result_port-open').
            append(`OPEN: ${port}`);
        });

        s.on('data', function (data: object) {
          $scanResult.
            append(`DATA: ${data}`);
        });

        s.on('error', function (e: string) {
          $scanResultFailed.
            addClass('result_port-error').
            text(`Scanning port: ${port}`);

          if (e === 'ECONNREFUSED') {
            return;
          }
        });
      })(start);
      start++;

    }
  };

});