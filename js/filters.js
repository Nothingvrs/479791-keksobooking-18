'use strict';
(function () {
  var filterType = document.getElementById('housing-type');
  var filteredType = function () {
    var palaceType = window.map.pins.map(function (pin) {
      pin.offer.type = 'house';
    });
    if (filterType.options.selectedIndex === 3) {

      window.pin.renderPins(palaceType);
    }
  };

  filterType.addEventListener('change', filteredType);
})();
