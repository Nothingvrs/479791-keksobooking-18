'use strict';
(function () {
  var MAX_PIN_COUNT = 5;
  var mapOverlay = document.querySelector('.map__pins');

  var renderMapPin = function (pinData) {
    var pinTemplate = document.querySelector('#pin')
      .content;
    var mapPin = pinTemplate.cloneNode(true);
    var pinImageElement = mapPin.querySelector('img');
    var pinBody = mapPin.querySelector('.map__pin');
    pinImageElement.src = pinData.author.avatar;
    pinBody.style.left = pinData.location.x + 'px';
    pinBody.style.top = pinData.location.y + 'px';
    pinImageElement.alt = pinData.offer.title;

    var onPinItemClick = function () {
      if (window.card.parent) {
        window.card.parent.remove();
      }
      window.map.parent.appendChild(window.card.render(pinData));
    };

    pinBody.addEventListener('click', onPinItemClick);
    return mapPin;
  };

  var renderPins = function (pinsData) {
    var fragment = document.createDocumentFragment();
    window.pin.slicedPinsData = pinsData.slice(0, MAX_PIN_COUNT);
    window.pin.slicedPinsData = window.pin.slicedPinsData.filter(function (item) {
      return (item.offer);
    });
    window.pin.slicedPinsData.forEach(function (item) {
      fragment.appendChild(renderMapPin(item));
    });
    mapOverlay.appendChild(fragment);
  };

  window.pin = {};
  window.pin.renderPins = renderPins;
  window.pin.mapOverlay = mapOverlay;
})();
