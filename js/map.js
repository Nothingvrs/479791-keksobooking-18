'use strict';
(function () {
  var PIN_HEIGHT = 65;
  var ENTER_KEYCODE = 13;
  var PIN_WIDTH = 65;
  var pins = [];
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var setMainPinCoordinate = function () {
    var coordinate = mainPin.getBoundingClientRect();
    window.form.adressInput.value = Math.round(coordinate.left + PIN_WIDTH / 2) + ', ' + Math.round(coordinate.top + PIN_HEIGHT);
  };

  var initPins = function (data) {
    pins = data;
    window.pin.renderPins(pins);
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

  window.map = {};
  window.map.parent = map;
  window.map.pins = pins;
})();


