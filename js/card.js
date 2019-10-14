'use strict';
(function () {
  var definitionType = function (type) {
    if (type === 'flat') {
      var typeText = 'Квартира';
    } else if (type === 'bungalo') {
      typeText = 'Бунгало';
    } else if (type === 'house') {
      typeText = 'Дом';
    } else if (type === 'palace') {
      typeText = 'Дворец';
    } return typeText;
  };

  var getCardPhotos = function (photosElement, photos) {
    var photosContent = '';
    photos.forEach(function (photo) {
      photosContent += '<img src="' + photo + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    });
    photosElement.innerHTML = photosContent;
  };

  var getFeaturesList = function (arr, futureElements) {
    var featuresContent = '';
    arr.forEach(function (feature) {
      featuresContent += '<li class="popup__feature popup__feature--' + feature + '"></li>';
    });
    futureElements.innerHTML = featuresContent;
  };

  var renderCard = function (cardData) {
    var cardTemplate = document.querySelector('#card')
      .content;
    var card = cardTemplate.cloneNode(true);
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardType = card.querySelector('.popup__type');
    var cardCapacity = card.querySelector('.popup__text--capacity');
    var cardTime = card.querySelector('.popup__text--time');
    var cardFeatures = card.querySelector('.popup__features');
    var cardDescription = card.querySelector('.popup__description');
    var cardAvatar = card.querySelector('.popup__avatar');
    var cardPhotos = card.querySelector('.popup__photos');
    cardTitle.value = cardData.offer.title;
    cardAddress.value = cardData.offer.address;
    cardPrice.value = cardData.offer.price + 'р/ночь';
    cardType.value = definitionType(cardData.offer.type);
    cardCapacity.value = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardTime.value = 'Заезд после ' + cardData.offer.checkin + ' выезд до ' + cardData.offer.checkout;
    getFeaturesList(cardData.offer.features, cardFeatures);
    cardDescription.value = cardData.offer.description;
    cardAvatar.src = cardData.author.avatar;
    getCardPhotos(cardPhotos, cardData.offer.photos);
    return card;
  };

  var renderCards = function (cardsData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cardsData.length; i++) {
      fragment.appendChild(renderCard(cardsData[i]));
    }
    window.filters.parent.before(fragment);
  };

  window.card = {};
  window.card.renderCards = renderCards;
})();
