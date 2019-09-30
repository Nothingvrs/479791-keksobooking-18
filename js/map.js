'use strict';
(function () {
  var PIN_HEIGHT = 65;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var setMainPinCoordinate = function () {
    var coordinate = mainPin.getBoundingClientRect();
    window.addressInput.value = Math.round(coordinate.left + window.PIN_WIDTH / 2) + ', ' + Math.round(coordinate.top + PIN_HEIGHT);
  };

  var onMainPinClick = function () {
    window.adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    window.toggleDisabled(false);
    setMainPinCoordinate();
    window.getDrawMapPin(window.OFFERS_AMOUNT);
  };

  var onMapPinKeyEnter = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.adForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      window.toggleDisabled(false);
      setMainPinCoordinate();
      window.getDrawMapPin(window.OFFERS_AMOUNT);
    }
  };

  var onMapPinMove = function () {
    setMainPinCoordinate(mainPin);
  };

  mainPin.addEventListener('mousemove', onMapPinMove);
  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMapPinKeyEnter);
})();


