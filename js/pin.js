'use strict';
(function () {
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
    return mapPin;
  };

  var renderPins = function (pinsData) {
    var fragment = document.createDocumentFragment();
    var takeNumber = pinsData.length > 5 ? 5 : pinsData.length;
    for (var i = 0; i < takeNumber; i++) {
      if (pinsData[i].offer) {
        fragment.appendChild(renderMapPin(pinsData[i]));
      }
    }
    mapOverlay.appendChild(fragment);
  };

  window.pin = {};
  window.pin.renderPins = renderPins;
  window.pin.mapOverlay = mapOverlay;
})();
