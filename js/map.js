'use strict';
(function () {
  var TAIL_HEIGHT = 16;
  var DEFAULT_MAIN_PIN_X = 600;
  var DEFAULT_MAIN_PIN_Y = 375;
  var activePage = false;

  var PinSize = {
    WIDTH: 65,
    HEIGHT: 65,
  };

  var DragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var DefaultMainPinCoordinates = {
    x: DEFAULT_MAIN_PIN_X + Math.floor(PinSize.HEIGHT / 2),
    y: DEFAULT_MAIN_PIN_Y + PinSize.HEIGHT + TAIL_HEIGHT
  };

  var pinTailCoordinates = DefaultMainPinCoordinates;

  var PinCircleCoordinate = {
    y: DEFAULT_MAIN_PIN_Y - Math.floor(PinSize.HEIGHT / 2),
    x: DEFAULT_MAIN_PIN_X - Math.floor(PinSize.HEIGHT / 2)
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  };

  var removeMapCard = function () {
    if (window.card.parent) {
      window.card.parent.remove();
    }
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    removePins();
    removeMapCard();
    mainPin.style.top = DEFAULT_MAIN_PIN_Y - PinSize.HEIGHT / 2 + 'px';
    mainPin.style.left = DEFAULT_MAIN_PIN_X - PinSize.WIDTH / 2 + 'px';
    window.form.setAddressCoordinates(PinCircleCoordinate);
    activePage = false;
  };

  var initPage = function () {
    deactivateMap();
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  var initPins = function (data) {
    window.map.pins = data;
    window.pin.renderPins(window.map.pins);
  };

  var activateMap = function () {
    window.form.ads.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    window.form.activateForm();
    window.form.setAddressCoordinates(DefaultMainPinCoordinates);
    window.backend.get(initPins, window.backend.mistaken);
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var mainPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      pinTailCoordinates = {
        x: mainPinPosition.x + Math.floor(PinSize.WIDTH / 2),
        y: mainPinPosition.y + PinSize.HEIGHT + TAIL_HEIGHT
      };

      if (pinTailCoordinates.x > DragLimit.X.MIN && pinTailCoordinates.x < DragLimit.X.MAX) {
        mainPin.style.left = mainPinPosition.x + 'px';
      }

      if (pinTailCoordinates.y < DragLimit.Y.MAX && pinTailCoordinates.y > DragLimit.Y.MIN) {
        mainPin.style.top = mainPinPosition.y + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!activePage) {
        activateMap();
        window.form.activateForm();
        activePage = true;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.setAddressCoordinates(pinTailCoordinates);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  initPage();

  window.map = {};
  window.map.defaultPinCoordinates = PinCircleCoordinate;
  window.map.parent = map;
  window.map.deactivate = initPage;

})();


