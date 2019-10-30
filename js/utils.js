'use strict';

(function () {

  var onEscDown = function (evt, action) {
    var ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {};
  window.utils.onEscDown = onEscDown;
  window.utils.debounce = debounce;
})();
