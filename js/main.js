'use strict';

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
var PIN_WIDTH = 65;
var PIN_HEIGHT = 65;
var WINDOW_WIDTH = 1200;
var MIN_X = PIN_WIDTH / 2;
var MAX_X = WINDOW_WIDTH - PIN_WIDTH / 2;
var MIN_PRICE = 2000000;
var MAX_PRICE = 10000000;
var MIN_Y = 130;
var MAX_Y = 630;
var OFFERS_AMOUNT = 7;
var offersData = [];
var mapOverlay = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var clientMapPin = document.querySelector('.map__pin--main');
var addressInput = adForm.querySelector('[name = address]');
var capacityInput = adForm.querySelector('[name = capacity]');
var roomsInput = adForm.querySelector('[name = rooms');
var submitButton = adForm.querySelector('.ad-form__submit');

var fielsetDisabled = function (collection) {
  for (var i = 0; i < collection.length; i++){
    collection[i].disabled = true;
  }
};

var fieldsetUndisabled = function (collection) {
  for (var i = 0; i <collection.length; i++) {
    collection[i].disabled = false;
  }
};

var adFormDisabled = function (form) {
  if (form.classList.contains('ad-form--disabled')) {
    fielsetDisabled(fieldsets);
  } else {

  }
};

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
    offersData.push(getOfferData());
  } return offersData;
};

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

var getDrawMapPin = function (count) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    fragment.appendChild(renderMapPin(offersData[i], i));
  }
  mapOverlay.appendChild(fragment);
};

var entryCoordinateClient = function () {
  var coordinate = clientMapPin.getBoundingClientRect();
  addressInput.value = Math.round(coordinate.left + PIN_HEIGHT / 2) + ', ' + Math.round(coordinate.top + PIN_WIDTH);
};

clientMapPin.addEventListener('mousedown', function () {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    fieldsetUndisabled(fieldsets);
    entryCoordinateClient();
    getDrawMapPin(OFFERS_AMOUNT);
});

clientMapPin.addEventListener('mousemove', function () {
  entryCoordinateClient(clientMapPin);
});

submitButton.addEventListener('click', function () {
  if (capacityInput.value < roomsInput.value) {
    roomsInput.setCustomValidity ('Выберете квартиру поменьше');
  }
  if (capacityInput.value > roomsInput.value) {
    roomsInput.setCustomValidity ('Выберете квартиру побольше');
  }
});

adFormDisabled(adForm, fieldsets);
createOffersData(OFFERS_AMOUNT);



