'use strict';
(function () {
  var PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filters = document.querySelector('.map__filters');
  var filterType = filters.querySelector('#housing-type');
  var filterPrice = filters.querySelector('#housing-price');
  var filterRooms = filters.querySelector('#housing-rooms');
  var filterGuests = filters.querySelector('#housing-guests');
  var filterFeatures = filters.querySelector('#housing-features');
  var filteredPins = [];

  var cleanMap = function () {
    var pinsOnMap = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsOnMap.length; i++) {
      window.pin.mapOverlay.removeChild(pinsOnMap[i]);
    }
  };

  var filteredByType = function (value) {
    if (value === 'any') {
      filteredPins = window.map.pins;
    } else {
      filteredPins = window.map.pins.filter(function (pin) {
        return pin.offer.type === value;
      });
    }
  };

  var filteredByPrice = function (value) {
    var filteringPrice = PriceRange[value.toUpperCase()];
    if (value !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        return (pin.offer.price >= filteringPrice.MIN && pin.offer.price <= filteringPrice.MAX);
      });
    }
  };

  var filteredByRooms = function (value) {
    if (value !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        return pin.offer.rooms === Number(value);
      });
    }
  };

  var filteredByGuests = function (value) {
    if (value !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        return pin.offer.guests === Number(value);
      });
    }
  };

  var filteredByFeatures = function () {
    var checkedFeatures = filterFeatures.querySelectorAll('input:checked');
    filteredPins = filteredPins.filter(function (pin) {
      return Array.from(checkedFeatures).every(function (element) {
        return pin.offer.features.includes(element.value);
      });
    });
  };

  filters.addEventListener('change', function () {
    cleanMap();
    window.map.cardRemove();
    filteredByType(filterType.value);
    filteredByPrice(filterPrice.value);
    filteredByRooms(filterRooms.value);
    filteredByGuests(filterGuests.value);
    filteredByFeatures();
    window.pin.renderPins(filteredPins);
  });
})();
