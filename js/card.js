'use strict';
(function () {
  var definitionType = function (type) {
    var typeText;
    switch (type) {
      case 'flat':
        typeText = 'Квартира';
        break;
      case 'bungalo':
        typeText = 'Бунгало';
        break;
      case 'house':
        typeText = 'Дом';
        break;
      case 'palace':
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

  var getFeaturesList = function (features, futureElement) {
    var featuresContent = '';
    features.forEach(function (feature) {
      featuresContent += '<li class="popup__feature popup__feature--' + feature + '"></li>';
    });
    futureElement.innerHTML = featuresContent;
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
    cardTitle.textContent = cardData.offer.title;
    cardAddress.textContent = cardData.offer.address;
    cardPrice.textContent = cardData.offer.price + ' р/ночь';
    cardType.value = definitionType(cardData.offer.type);
    cardCapacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + cardData.offer.checkin + ' выезд до ' + cardData.offer.checkout;
    getFeaturesList(cardData.offer.features, cardFeatures);
    cardDescription.textContent = cardData.offer.description;
    cardAvatar.src = cardData.author.avatar;
    getCardPhotos(cardPhotos, cardData.offer.photos);
    return card;
  };

  window.card = {};
  window.card.renderCard = renderCard;
})();
