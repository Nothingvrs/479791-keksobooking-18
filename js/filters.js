'use strict';
(function () {
  var filters = document.querySelector('.map__filters-container');
  var filterType = document.querySelector('[name = housing-type]');

  var cleanMap = function () {
    var pinsOnMap = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsOnMap.length; i++) {
      window.pin.mapOverlay.removeChild(pinsOnMap[i]);
    }
  };

  var filteredType = function (value) {
    if (value === 'any') {
      window.pin.renderPins(window.map.pins);
    } else {
      var filteredPins = window.map.pins.filter(function (pin) {
        return pin.offer.type === value;
      });
      window.pin.renderPins(filteredPins);
    }
  };

  filterType.addEventListener('change', function () {
    cleanMap();
    filteredType(filterType.value);
  });

  window.filters = {};
  window.filters.parent = filters;
})();
