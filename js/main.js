'use strict';

var AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png' ,'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLE = ['Сдаю квартиру', 'Продаю квартиру', 'Квартира с ремонтом', 'Квартира в черновой отделке'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var emptyArray = [];
var mapPins = [];
var author = {};
var offer = {};
var location = {};
var mapOverlay = document.querySelector('.map__pins')
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getRandomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

var createRandomObject = function (collection) {
	var newList = [];
	for (var i = 0; i < getRandomNumber(1, collection.length); i++) {
		newList[i] = collection[i];
	}
	return newList;
};

var generateMoki = function (count) {
	for (var i = 0; i <= count; i++) {
		var moki = {author: {avatar: getRandomElement(AVATAR)},
      offer: {
      title: getRandomElement(TITLE),
      address: getRandomNumber(0, 1000) + ', ' + getRandomNumber(0, 1000),
      price: getRandomNumber(10000000, 3000000),
      type: getRandomElement(TYPE),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 4),
      checkin: getRandomElement(CHECK),
      checkout: getRandomElement(CHECK),
      features: createRandomObject(FEATURES),
      description: getRandomElement(DESCRIPTION),
      photos: createRandomObject(PHOTOS)
    }, location: {x: getRandomNumber(0, 1200), y: getRandomNumber(130, 630)}};
		emptyArray.push(moki);
  }
	return emptyArray
};

console.log(emptyArray);


var renderMapPin = function (collection, count) {
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin')
    .content
  for (var i = 0; i < count; i++) {
    var mapPin = pinTemplate.cloneNode(true);
    var pinImageElement = mapPin.querySelector('img');
    var pinBody = mapPin.querySelector('.map__pin');
    pinImageElement.src = emptyArray[i].author.avatar;
    pinBody.style.left = emptyArray[i].location.x;
    pinBody.style.top = emptyArray[i].location.y;
    pinImageElement.alt = emptyArray[i].offer.title;
    fragment.appendChild(mapPin);
  }
  mapOverlay.appendChild(fragment);
};

generateMoki(7);
renderMapPin(emptyArray, 7);
