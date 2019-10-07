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

  var onLoad = function (mapPins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < mapPins.length; i++) {
      if (mapPins[i].offer) {
        fragment.appendChild(renderMapPin(mapPins[i]));
      }
    }
    mapOverlay.appendChild(fragment);
  };

  window.pin = {};
  window.pin.onLoad = onLoad;
})();
