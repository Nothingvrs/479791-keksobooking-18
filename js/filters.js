'use strict';
(function () {
  var filterType = document.getElementById('housing-type');
  var pinsOnMap = document.querySelectorAll('.map__pin');
  var cleanMap = function () {
    for (var i = 1; i < pinsOnMap.length; i++) {
      window.pin.mapOverlay.removeChild(pinsOnMap[i]);
    }
  };

  var filteredType = function (value) {
    cleanMap();
    var filteredPins = window.pins.filter(function (pin) {
      return pin.offer.type === value;
    });
    window.pin.renderPins(filteredPins);
  };

  var onFiltered = function () {
    var index = pinsOnMap.options.selectedIndex;
    return pinsOnMap.options[index].value;
  };

  filterType.addEventListener('change', filteredType(onFiltered));
})();
