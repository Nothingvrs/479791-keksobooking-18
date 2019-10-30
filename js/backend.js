'use strict';

(function () {

  var ServerUrl = {
    GET: 'https://js.dump.academy/keksobooking/data',
    SET: 'https://js.dump.academy/keksobooking'
  };

  var createXhr = function (method, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status);
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
    createXhr('GET', ServerUrl.GET, onLoad, onError).send();
  };

  var set = function (onLoad, onError, data) {
    createXhr('POST', ServerUrl.SET, onLoad, onError).send(data);
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

    var closeError = function () {
      errorBody.remove();
      window.map.deactivate();
      window.form.ads.classList.add('ad-form--disabled');
      window.map.parent.classList.add('map--faded');
      errorButton.removeEventListener('click', closeError);
      document.removeEventListener('click', closeError);
      document.removeEventListener('keydown', onErrorEscDown);
    };

    var onErrorEscDown = function (evt) {
      window.utils.onEscDown(evt, closeError);
    };
    document.addEventListener('keydown', onErrorEscDown);
    document.addEventListener('click', closeError);
    errorButton.addEventListener('click', closeError);
  };

  window.backend = {};
  window.backend.set = set;
  window.backend.get = get;
  window.backend.mistaken = onError;
})();
