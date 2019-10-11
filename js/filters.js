'use strict';
(function () {
  var filterType = document.getElementById('housing-type');

  var cleanMap = function () {
    var pinsOnMap = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsOnMap.length; i++) {
      window.pin.mapOverlay.removeChild(pinsOnMap[i]);
    }
  };

  var filteredPalace = function () {
    var palaceType = window.pins.filter(function (pin) {
      return pin.offer.type === 'palace';
    });
    window.pin.renderPins(palaceType);
  };

  var filteredFlat = function () {
    var flatType = window.pins.filter(function (pin) {
      return pin.offer.type === 'flat';
    });
    window.pin.renderPins(flatType);
  };

  var filteredHouse = function () {
    var houseType = window.pins.filter(function (pin) {
      return pin.offer.type === 'house';
    });
    window.pin.renderPins(houseType);
  };

  var filteredBungalo = function () {
    var bungaloType = window.pins.filter(function (pin) {
      return pin.offer.type === 'bungalo';
    });
    window.pin.renderPins(bungaloType);
  };

  var filteredType = function () {
    cleanMap();
    if (filterType.options.selectedIndex === 0) {
      window.pin.renderPins(window.pins);
    } else if (filterType.options.selectedIndex === 1) {
      filteredPalace();
    } else if (filterType.options.selectedIndex === 2) {
      filteredFlat();
    } else if (filterType.options.selectedIndex === 3) {
      filteredHouse();
    } else if (filterType.options.selectedIndex === 4) {
      filteredBungalo();
    }
  };
  filterType.addEventListener('change', filteredType);
})();
