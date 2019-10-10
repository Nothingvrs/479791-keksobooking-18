'use strict';
(function () {
  var filterType = document.getElementById('housing-type');

  var palaceType = window.map.pinsArr.map(function (pin) {
    pin.offer.type = 'palace';
  });
  var filteredType = function () {
    if (filterType.options.selectedIndex === 1) {
      window.pin.renderPins(palaceType);
    }
  };

  filterType.addEventListener('change', filteredType);
})();
