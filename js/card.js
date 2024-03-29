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
    var cardBody = card.querySelector('.map__card');
    window.card.parent = cardBody;
    cardTitle.textContent = cardData.offer.title;
    cardAddress.textContent = cardData.offer.address;
    cardPrice.textContent = cardData.offer.price + ' р/ночь';
    cardType.textContent = definitionType(cardData.offer.type);
    cardCapacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + cardData.offer.checkin + ' выезд до ' + cardData.offer.checkout;
    getFeaturesList(cardData.offer.features, cardFeatures);
    cardDescription.textContent = cardData.offer.description;
    cardAvatar.src = cardData.author.avatar;
    getCardPhotos(cardPhotos, cardData.offer.photos);
    var closeCardBtn = card.querySelector('.popup__close');
    closeCardBtn.tabIndex = 0;

    var closeCard = function () {
      cardBody.remove();
      closeCardBtn.removeEventListener('click', onCloseCardBtnClick);
      document.removeEventListener('keydown', onAdEscDown);
    };

    var onCloseCardBtnClick = function () {
      closeCard();
    };

    closeCardBtn.addEventListener('click', onCloseCardBtnClick);

    var onAdEscDown = function (evt) {
      window.utils.onEscDown(evt, closeCard);
    };

    document.addEventListener('keydown', onAdEscDown);
    return card;
  };

  window.card = {};
  window.card.render = renderCard;
})();
