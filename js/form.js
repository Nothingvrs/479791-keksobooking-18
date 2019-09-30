'use strict';
(function () {
  window.adForm = document.querySelector('.ad-form');
  var fieldsets = window.adForm.querySelectorAll('fieldset');
  window.addressInput = window.adForm.querySelector('[name = address]');
  var capacityInput = window.adForm.querySelector('[name = capacity]');
  var roomsInput = window.adForm.querySelector('[name = rooms');
  var submit = window.adForm.querySelector('.ad-form__submit');
  window.toggleDisabled = function (isDisabled) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = isDisabled;
    }
  };
  var adFormDisabled = function (form) {
    if (form.classList.contains('ad-form--disabled')) {
      window.toggleDisabled(true);
    }
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
  var onFormSubmit = function () {
    validateRooms();
  };
  submit.addEventListener('click', onFormSubmit);
  adFormDisabled(window.adForm, fieldsets);
})();
