'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('[name = address]');
  var capacityInput = adForm.querySelector('[name = capacity]');
  var roomsInput = adForm.querySelector('[name = rooms');
  var submit = adForm.querySelector('.ad-form__submit');

  var toggleDisabled = function (isDisabled) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = isDisabled;
    }
  };

  var adFormDisabled = function (form) {
    if (form.classList.contains('ad-form--disabled')) {
      toggleDisabled(true);
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
  adFormDisabled(adForm, fieldsets);

  window.form = {};
  window.form.ads = adForm;
  window.form.coordinate = addressInput;
  window.form.toggleDisabled = toggleDisabled();
})();
