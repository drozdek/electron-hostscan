"use strict";
const net = require('net');
const app = require('electron');
const $ = require('jquery');

$(() => {

    /**
     * HostScanner
     *
     * @constructor
     */
    function HostScanner() { }
    ;
    // obj ERROR to hold error responses
    let ERROR = {};
    $('body').on('click', $('input[type=submit]'), function (e) {
        let _val = $('input[type=text]').val();
        if (checkAddr(_val)) {
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
    var checkAddr = function (param) {
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
        $('#scan-result').empty().append('Scanning host...  <br />');
        var start = 1, end = 10000;
        while (start <= end) {
            (function (port) {
                var port = start, s = new net.Socket();
                s.connect(port, $('input[type=text]').val(), function () {
                    debugger;
                    $('#scan-result').append('OPEN: ' + port + '<br />');
                });
                s.on('data', function (data) {
                    debugger;
                    $('#scan-result').append('DATA: ' + data + '<br/>');
                });
                s.on('error', function (e) {
                    alert('error' + e)
                    if (e.toString() === 'ECONNREFUSED') {
                        return;
                    }
                });
            })(start);
            start++;
        }
    }
    ;
});
