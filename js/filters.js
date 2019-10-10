'use strict';
(function () {
  var pinsArr = [];
  var filterType = document.getElementById('housing-type');
  var initPins = function (data) {
    pinsArr = data;
  };

  window.backend.load(initPins, window.backend.mistaken);

  var palaceType = pinsArr.map(function (pin) {
    pin.offer.type = 'palace';
  });
  var filteredType = function () {
    if (filterType.options.selectedIndex === 1) {
      window.pin.renderPin(palaceType);
    }
  };
  filterType.addEventListener('change', filteredType);
})();
