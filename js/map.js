'use strict';
(function () {
  var PIN_HEIGHT = 65;
  var PIN_WIDTH = 65;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var setMainPinCoordinate = function () {
    var coordinate = mainPin.getBoundingClientRect();
    window.form.adressInput.value = Math.round(coordinate.left + PIN_WIDTH / 2) + ', ' + Math.round(coordinate.top + PIN_HEIGHT);
  };

  var initPins = function (data) {
    window.map.pins = data;
    window.pin.renderPins(window.map.pins);
  };

  var activateMap = function () {
    window.form.ads.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    window.form.toggleDisabled(false);
    setMainPinCoordinate();
    window.backend.load(initPins, window.backend.mistaken);
  };

  var onMainPinClick = function () {
    activateMap();
  };

  var onMapPinKeyEnter = function (evt) {
    var ENTER_KEYCODE = 13;
    if (evt.keyCode === ENTER_KEYCODE) {
      activateMap();
    }
  };

  var onMapPinMove = function () {
    setMainPinCoordinate(mainPin);
  };

  mainPin.addEventListener('mousemove', onMapPinMove);
  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMapPinKeyEnter);

  map.addEventListener('click', function (evt) {
    window.showCard.parent(evt, window.pin.slicedPinsData);
  });

  var getCloseButton = function () {
    var closeButton = window.map.parent.querySelector('.popup__close');
    closeButton.setAttribute('tabindex', '0');
    document.addEventListener('keydown', onPopupEscPress);
    closeButton.addEventListener('mouseup', function () {
      closeAd();
    });
  };

  function onPopupEscPress(evt) {
    window.utils.isEscEvent(evt, closeAd);
  }

  function closeAd() {
    var mapCard = window.map.parent.querySelector('.map__card');
    window.map.parent.removeChild(mapCard);
    window.map.parent.querySelector('.map__pin--active').classList.remove('map__pin--active');
    document.removeEventListener('keydown', onPopupEscPress);
  }
  window.map = {};
  window.map.parent = map;
  window.map.getCloseButton = getCloseButton;
})();


