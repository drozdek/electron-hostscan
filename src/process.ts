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

  $('body').on('click', 'input[type=submit]', (e: any) => {
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
  let getIP = (url: string): string => {
    let ip = dns.lookup(url, (error: string, addresses: string, family: string) => {
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
  let checkAddr = (param: string): boolean | string => {
    if (typeof param === "undefined" || !getIP(param))
      return false;
    else
      return true;
  };

  /**
   * @method scanHost - performs a host scan
   *
   */
  let scanHost = () => {
    let ip = getIP($ipAddr.val() as string);

    $msg.text(`Scanning host ${$ipAddr.val()}...`);

    let start = 1,
      end = 1000;

    while (start <= end) {

      ((port) => {

        let p = start,
          s = new net.Socket();

        s.connect(p, ip, () => {
          $scanResult.
            addClass('result_port-open').
            append(`OPEN: ${p} <br />`);
        });

        s.on('data', (data: object) => {
          $scanResult.
            append(`DATA: ${data}`);
        });

        s.on('error', (e: string) => {

          if (e === 'ECONNREFUSED') {
            return;
          }

        });
      })(start);
      start++;

    }
  };

});
