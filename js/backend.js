'use strict';

(function () {
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';

  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
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

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var load = function (onLoad, onError) {
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

    xhr.open('GET', URL_LOAD);
    xhr.send();
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
      window.map.main.classList.add('map--faded');
      window.form.toggleDisabled(true);
    });
  };

  window.backend = {};
  window.backend.save = save;
  window.backend.load = load;
  window.backend.mistaken = onError;
})();
