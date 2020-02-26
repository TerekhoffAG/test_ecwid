'use strict';
(function () {
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;

  window.load = function (onSuccess, onError, url) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
          onError();
        }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', url);

    xhr.send();
  };
})();

