'use strict';
(function () {
  var PIN_HEIGHT = 65;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var setMainPinCoordinate = function () {
    var coordinate = mainPin.getBoundingClientRect();
    window.form.adressInput.value = Math.round(coordinate.left + window.data.pinWidth / 2) + ', ' + Math.round(coordinate.top + PIN_HEIGHT);
  };

  var pinActivate = function () {
    window.form.ads.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    window.form.toggleDisabled(false);
    setMainPinCoordinate();
    window.pin.render();
  };

  var onMainPinClick = function () {
    pinActivate();
  };

  var onMapPinKeyEnter = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pinActivate();
    }
  };

  var onMapPinMove = function () {
    setMainPinCoordinate(mainPin);
  };

  mainPin.addEventListener('mousemove', onMapPinMove);
  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMapPinKeyEnter);
})();


