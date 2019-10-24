'use strict';
(function () {
  var BuildingMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var capacityInput = adForm.querySelector('[name = capacity]');
  var roomsInput = adForm.querySelector('[name = rooms');
  var priceInput = adForm.querySelector('#price');
  var addressInput = document.querySelector('[name = address]');
  var typeInput = adForm.querySelector('#type');
  var submit = adForm.querySelector('.ad-form__submit');
  var resetBtn = document.querySelector('.ad-form__reset');

  var onTypeInputChange = function (evt) {
    var minPrice = BuildingMinPrice[evt.target.value.toUpperCase()];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice.toString();
  };

  var setAddressCoords = function (coords) {
    addressInput.value = coords.x + ', ' + coords.y;
  };

  var validateRooms = function () {
    capacityInput.setCustomValidity('');
    if (roomsInput.value < capacityInput.value && capacityInput.value > '0' && roomsInput.value !== '100') {
      capacityInput.setCustomValidity('Вам нужна квартира побольше');
    } else if (roomsInput.value === '100' && capacityInput.value > '0') {
      capacityInput.setCustomValidity('Эти аппартаменты не для гостей');
    } else if (roomsInput.value !== '100' && capacityInput.value === '0') {
      capacityInput.setCustomValidity('Выберите аппартаменты не для гостей');
    }
  };

  var showSuccess = function () {
    var successTemplate = document.querySelector('#success')
      .content;
    var success = successTemplate.cloneNode(true);
    var successBody = success.querySelector('.success');
    document.body.insertAdjacentElement('afterbegin', successBody);
    var onSuccessRemove = function () {
      successBody.remove();
      window.form.ads.classList.add('ad-form--disabled');
      window.map.parent.classList.add('map--faded');
      document.removeEventListener('click', onSuccessRemove);
    };
    document.addEventListener('click', onSuccessRemove);
  };

  var onSubmitSuccess = function () {
    showSuccess();
    deactivateForm();
    window.map.deactivate();
  };

  var onSubmitError = function () {
    window.backend.mistaken();
  };

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.upload(onSubmitSuccess, onSubmitError, formData);
  };

  var onSubmitBtnClick = function () {
    validateRooms();
  };

  var onResetBtnClick = function (evt) {
    evt.preventDefault();
    deactivateForm();
    window.map.deactivate();
  };

  var addFormListeners = function () {
    typeInput.addEventListener('change', onTypeInputChange);
    submit.addEventListener('click', onSubmitBtnClick);
    adForm.addEventListener('submit', onAdFormSubmit);
    resetBtn.addEventListener('click', onResetBtnClick);
  };

  var removeFormListeners = function () {
    typeInput.removeEventListener('change', onTypeInputChange);
    submit.removeEventListener('click', onSubmitBtnClick);
    adForm.removeEventListener('submit', onAdFormSubmit);
    resetBtn.removeEventListener('click', onResetBtnClick);
  };

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    fieldsets.forEach(function (it) {
      it.disabled = false;
    });
    adFormHeader.disabled = false;
    addFormListeners();
  };

  var deactivateForm = function () {
    adForm.reset();
    fieldsets.forEach(function (it) {
      it.disabled = true;
    });
    adFormHeader.disabled = true;
    adForm.classList.add('ad-form--disabled');
    removeFormListeners();
  };

  deactivateForm();

  window.form = {};
  window.form.ads = adForm;
  window.form.activateForm = activateForm;
  window.form.setAddressCoords = setAddressCoords;
})();
