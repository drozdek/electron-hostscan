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
    $msg = $('#msg'),
    $scanResult = $('#scan-result'),
    $scanResultFailed = $('#scan-result-failed'),
    $ipAddr = $('#ip_addr');

  $('body').on('click', 'input[type=submit]', function (e: any) {

    $scanResult.empty();
    $scanResultFailed.empty();

    let _val = $('input[type=text]').val();
    if (checkAddr(_val as string)) {
      scanHost();
      return false;
    }
    else if (_val === '') {
      return;
    }
  });

  /**
   * @method getIP - transforms url into its IP equivalent
   *
   * @param {string} url
   * @returns {string} 
   */
  function getIP(url: string): string {
    let ip = dns.lookup(url, function (error: string, addresses: string, family: string) {
      return addresses
    });
    return ip;
  }

  /**
   * @method checkAddr - checks address/url 
   *
   * @param {string} param
   * @returns {boolelan|string}
   */
  var checkAddr = function (param: string): boolean | string {
    if (typeof param === "undefined" || !getIP(param))
      return false;
    else
      return true;
  };

  /**
   * @method scanHost - performs a host scan
   *
   */
  function scanHost() {
    let ip = getIP($ipAddr.val() as string);

    $msg.text(`Scanning host ${$ipAddr.val()}...`);

    var start = 1,
      end = 1000;

    while (start <= end) {

      (function (port) {

        var port = start,
          s = new net.Socket();

        s.connect(port, ip, function () {
          $scanResult.
            addClass('result_port-open').
            append(`OPEN: ${port} <br />`);
        });

        s.on('data', function (data: object) {
          $scanResult.
            append(`DATA: ${data}`);
        });

        s.on('error', function (e: string) {

          if (e === 'ECONNREFUSED') {
            return;
          }

        });
      })(start);
      start++;

    }
  };

});
