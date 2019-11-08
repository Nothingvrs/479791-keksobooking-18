'use strict';

(function () {
  var TIMEOUT = 10000;
  var STATUS_OK = 200;

  var ServerUrl = {
    GET: 'https://js.dump.academy/keksobooking/data',
    SET: 'https://js.dump.academy/keksobooking'
  };
  var errorButton;
  var errorBody;

  var createXhr = function (method, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + '. Пожалуйста, перезагрузите страницу.');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);
    return xhr;
  };

  var get = function (onLoad, onError) {
    createXhr('GET', ServerUrl.GET, onLoad, onError).send();
  };

  var set = function (onLoad, onError, data) {
    createXhr('POST', ServerUrl.SET, onLoad, onError).send(data);
  };

  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content;
    var error = errorTemplate.cloneNode(true);
    errorBody = error.querySelector('.error');
    var message = error.querySelector('.error__message');
    errorButton = error.querySelector('.error__button');
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBody);

    document.addEventListener('keydown', onErrorEscDown);
    document.addEventListener('click', onErrorOverlayDown);
    errorButton.addEventListener('click', onErrorButtonDown);
  };

  var closeError = function (error) {
    error.remove();
    window.map.deactivate();
    window.form.ads.classList.add('ad-form--disabled');
    window.map.parent.classList.add('map--faded');

    errorButton.removeEventListener('click', onErrorButtonDown);
    document.removeEventListener('click', onErrorOverlayDown);
    document.removeEventListener('keydown', onErrorEscDown);
  };

  var onErrorOverlayDown = function () {
    closeError(errorBody);
  };

  var onErrorEscDown = function (evt) {
    window.utils.onEscDown(evt, onErrorButtonDown);
  };

  var onErrorButtonDown = function () {
    closeError(errorBody);
  };

  window.backend = {};
  window.backend.set = set;
  window.backend.get = get;
  window.backend.mistaken = onError;
})();
