'use strict';

(function () {

  var isEscEvent = function (evt, action) {
    var ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    var ENTER_KEYCODE = 13;
    if (evt.keyCode === ENTER_KEYCODE) {
      action(evt);
    }
  };

  window.utils = {};
  window.utils.isEnterEvent = isEnterEvent;
  window.utils.isEscEvent = isEscEvent;
})();
