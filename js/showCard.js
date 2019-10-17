'use strict';

(function () {
  var showCard = function (evt, array) {
    var target = evt.target;
    var classElement = target.getAttribute('class');
    var elementTag = target.tagName;
    var elementParent = target.parentNode.getAttribute('class');

    if (classElement !== 'map__pin map__pin--main' && (classElement === 'map__pin' || (elementTag === 'IMG' && elementParent !== 'map__pin map__pin--main'))) {
      if (target.tagName === 'IMG') {
        target = target.parentNode;

        if (window.map.parent.querySelector('.map__card')) {
          var mapCard = window.map.parent.querySelector('.map__card');
          window.map.parent.removeChild(mapCard);
        }

        if (window.pin.mapOverlay.querySelector('.map__pin--active')) {
          window.pin.mapOverlay.querySelector('.map__pin--active').classList.remove('map__pin--active');
        }

        target.classList.add('map__pin--active');
        findRightAd(array);

        window.map.getCloseButton();
      }
    }
  };

  function findRightAd(array) {
    var pinIndex;
    for (var i = 1; i <= array.length; i++) {
      if (window.pin.mapOverlay.querySelectorAll('.map__pin')[i].getAttribute('class') === 'map__pin map__pin--active') {
        pinIndex = i - 1;
      }
    }

    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.renderCard(array[pinIndex]));
    window.map.parent.appendChild(fragment);
  }
  window.showCard = {};
  window.showCard.parent = showCard;
})();
