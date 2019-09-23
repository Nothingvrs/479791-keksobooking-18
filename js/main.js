'use strict';

var AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png' ,'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLE = ['Сдаю квартиру', 'Продаю квартиру', 'Квартира с ремонтом', 'Квартира в черновой отделке'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var array = [];

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

var createRandomOffer = function () {
    var offer = {title: getRandomElement(TITLE),
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
 	}
 	return offer
};

var createRandomAuthor = function () {
	var author = {avatar: getRandomElement(AVATAR)
 	}
 	return author
};

var createRandomLocation = function () {
	var locationHouse = {
		locationx: getRandomNumber(0, 1200),
		locationy: getRandomNumber(130, 630)
	}
	return locationHouse
};

var generateMoki = function (count) {
	for (var i = 0; i <= count; i++) {
		var author = createRandomAuthor();
		var offer = createRandomOffer();
		var location = createRandomLocation();
		array.push({author, offer, location})
	}
	return array
};

generateMoki(7);
console.log(array);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var renderMapPin = function (data, count) {
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  for (var i = 0; i < count; i++) {
    var mapPin = pinTemplate.cloneNode(true);
    mapPin.querySelector('.map__pin').children.src = array[i].author.avatar;
    mapPin.querySelector('.map__pin').style.left = array[i].location.locationx;
    mapPin.querySelector('.map__pin').style.right = array[i].location.locationy;
    mapPin.querySelector('.map__pin').children.alt.textContent = array[i].offer.description;
  }
};

renderMapPin(array, 8);
