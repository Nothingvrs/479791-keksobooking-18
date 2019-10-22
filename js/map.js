'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var TAIL_HEIGHT = 16;
  var DEFAULT_MAIN_PIN_X = 600;
  var DEFAULT_MAIN_PIN_Y = 375;
  var activePage = false;
  var pinSize = {
    WIDTH: 65,
    HEIGHT: 65,
  };

  var dragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var border = {
    TOP: dragLimit.Y.MIN - pinSize.HEIGHT - TAIL_HEIGHT,
    BOTTOM: dragLimit.Y.MAX - pinSize.HEIGHT - TAIL_HEIGHT,
    LEFT: dragLimit.X.MIN - Math.round(pinSize.WIDTH / 2),
    RIGHT: dragLimit.X.MAX - Math.round(pinSize.WIDTH / 2)
  };

  var setMainPinCoordinate = function () {
    var coordinate = mainPin.getBoundingClientRect();
    window.form.adressInput.value = Math.round(coordinate.left + pinSize.WIDTH / 2) + ', ' + Math.round(coordinate.top + pinSize.HEIGHT);
  };

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
    mainPin.style.top = DEFAULT_MAIN_PIN_Y - pinSize.HEIGHT / 2 + 'px';
    mainPin.style.left = DEFAULT_MAIN_PIN_X - pinSize.WIDTH / 2 + 'px';
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
    window.form.toggleDisabled(false);
    setMainPinCoordinate();
    window.backend.load(initPins, window.backend.mistaken);
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

      var pinTailCoordinates = {
        x: mainPinPosition.x + Math.round(pinSize.WIDTH / 2),
        y: mainPinPosition.y + pinSize.HEIGHT + TAIL_HEIGHT
      };

      mainPin.style.left = mainPinPosition.x + 'px';
      mainPin.style.top = mainPinPosition.y + 'px';

      if (pinTailCoordinates.x < dragLimit.X.MIN) {
        mainPin.style.left = border.LEFT + 'px';
        pinTailCoordinates.x = dragLimit.X.MIN;
      }
      if (pinTailCoordinates.x > dragLimit.X.MAX) {
        mainPin.style.left = border.RIGHT + 'px';
        pinTailCoordinates.x = dragLimit.X.MAX;
      }
      if (pinTailCoordinates.y > dragLimit.Y.MAX) {
        mainPin.style.top = border.BOTTOM + 'px';
        pinTailCoordinates.y = dragLimit.Y.MAX;
      }
      if (pinTailCoordinates.y < dragLimit.Y.MIN) {
        mainPin.style.top = border.TOP + 'px';
        pinTailCoordinates.y = dragLimit.Y.MIN;
      }

      window.form.setAddress(pinTailCoordinates);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!activePage) {
        activateMap();
        window.form.toggleDisabled(false);
        activePage = true;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  initPage();

  window.map = {};
  window.map.parent = map;
})();


