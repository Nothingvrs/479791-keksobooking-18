'use strict';
(function () {
  var filterType = document.getElementById('housing-type');

  var cleanMap = function () {
    var pinsOnMap = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsOnMap.length; i++) {
      window.pin.mapOverlay.removeChild(pinsOnMap[i]);
    }
  };

  var arrayUnique = function (array) {
    var fullArray = array.concat();
    for (var i = 0; i < fullArray.length; ++i) {
      for (var j = i + 1; j < fullArray.length; ++j) {
        if (fullArray[i] === fullArray[j]) {
          fullArray.splice(j--, 1);
        }
      }
    }
    return fullArray;
  };

  var filteredType = function () {
    cleanMap();
    var palaceType = window.pins.filter(function (pin) {
      return pin.offer.type === 'palace';
    });
    var flatType = window.pins.filter(function (pin) {
      return pin.offer.type === 'flat';
    });
    var houseType = window.pins.filter(function (pin) {
      return pin.offer.type === 'house';
    });
    var bungaloType = window.pins.filter(function (pin) {
      return pin.offer.type === 'bungalo';
    });

    if (filterType.options.selectedIndex === 0) {
      window.pin.renderPins(window.pins);
    } else if (filterType.options.selectedIndex === 1) {
      window.pin.renderPins(arrayUnique(palaceType.concat(window.pins)));
    } else if (filterType.options.selectedIndex === 2) {
      window.pin.renderPins(arrayUnique(flatType.concat(window.pins)));
    } else if (filterType.options.selectedIndex === 3) {
      window.pin.renderPins(arrayUnique(houseType.concat(window.pins)));
    } else if (filterType.options.selectedIndex === 4) {
      window.pin.renderPins(arrayUnique(bungaloType.concat(window.pins)));
    }
  };
  filterType.addEventListener('change', filteredType);
})();
