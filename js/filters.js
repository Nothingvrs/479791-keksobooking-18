'use strict';
(function () {
  var filterType = document.querySelector('[name = housing-type]');

  var cleanMap = function () {
    var pinsOnMap = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsOnMap.length; i++) {
      window.pin.mapOverlay.removeChild(pinsOnMap[i]);
    }
  };

  var filteredType = function (value) {
    var filteredPins = window.pins.filter(function (pin) {
      return pin.offer.type === value;
    });
    window.pin.renderPins(filteredPins);
  };

  filterType.addEventListener('change', function () {
    var index = filterType.options.selectedIndex;
    var selectedValue = filterType.options[index].value;
    cleanMap();
    filteredType(selectedValue);
  });
})();
