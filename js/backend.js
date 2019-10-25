'use strict';

(function () {

  var ServerUrl = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var createXhr = function (method, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open(method, url);
    return xhr;
  };

  var get = function (onLoad, onError) {
    createXhr('GET', ServerUrl.LOAD, onLoad, onError).send();
  };

  var set = function (onLoad, onError, data) {
    createXhr('POST', ServerUrl.UPLOAD, onLoad, onError).send(data);
  };


  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content;
    var error = errorTemplate.cloneNode(true);
    var errorBody = error.querySelector('.error');
    var message = error.querySelector('.error__message');
    var errorButton = error.querySelector('.error__button');
    message.innerHTML = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBody);
    errorButton.addEventListener('click', function () {
      errorBody.remove();
      window.form.ads.classList.add('ad-form--disabled');
      window.map.parent.classList.add('map--faded');
    });
  };

  window.backend = {};
  window.backend.set = set;
  window.backend.get = get;
  window.backend.mistaken = onError;
})();
