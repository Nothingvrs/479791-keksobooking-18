'use strict';
(function () {
  var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var TITLES = ['Сдаю квартиру', 'Продаю квартиру', 'Квартира с ремонтом', 'Квартира в черновой отделке'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['скромная хата', 'дворец короля', 'пентхаус аристократа', 'уютное гнёздышко на 2-их'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 4;
  var MIN_PRICE = 2000000;
  var MAX_PRICE = 10000000;
  window.PIN_WIDTH = 65;
  var WINDOW_WIDTH = 1200;
  var OFFERS_AMOUNT = 7;
  var MIN_X = window.PIN_WIDTH / 2;
  var MAX_X = WINDOW_WIDTH - window.PIN_WIDTH / 2;
  var MIN_Y = 130;
  var MAX_Y = 630;
  window.offersData = [];

  var getRandomElement = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var createRandomObject = function (collection) {
    var newList = [];
    for (var i = 0; i < getRandomNumber(1, collection.length); i++) {
      newList[i] = collection[i];
    }
    return newList;
  };

  var getOfferData = function () {
    return {author: {
      avatar: getRandomElement(AVATARS)}, offer:
      {title: getRandomElement(TITLES),
        address: getRandomNumber(MIN_X, MAX_X) + ', ' + getRandomNumber(MIN_Y, MAX_Y),
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomElement(TYPES),
        rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomElement(CHECK_IN),
        checkout: getRandomElement(CHECK_OUT),
        features: createRandomObject(FEATURES),
        description: getRandomElement(DESCRIPTIONS),
        photos: createRandomObject(PHOTOS)}, location: {x: getRandomNumber(MIN_X, MAX_X), y: getRandomNumber(MIN_Y, MAX_Y)}};
  };

  var createOffersData = function (count) {
    for (var i = 0; i <= count; i++) {
      window.offersData.push(getOfferData());
    }
  };

  createOffersData(OFFERS_AMOUNT);
})();
