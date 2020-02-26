'use strict';
(function () {
  var END_URL = ['.json', '.jpg', '.jpeg', '.png'];

  var elementInputUrl = document.querySelector('.form-uploud__url');

  window.getValidInputUrl = function () {
    if (elementInputUrl.value) {
      var textError = '';
      var strUrl = elementInputUrl.value.trim();

      var endUrl = strUrl.toLowerCase();

      var resultEndUrl = END_URL.some(function (item) {
        return endUrl.endsWith(item);
      });

      elementInputUrl.addEventListener('input', function () {
        elementInputUrl.setCustomValidity('');
        elementInputUrl.style.border = '1px solid black';
      });

      if (strUrl.split(' ').length > 1) {
        textError = 'Нельзя указать больше 1 URL или использовать пробел внутри URL';
      }

      if (!resultEndUrl) {
        textError = 'URL не заканчивается на .json .jpg .jpeg .png';
      }

      elementInputUrl.setCustomValidity(textError);

      if (textError) {
        elementInputUrl.style.border = '1px solid red';
      }
    }
  };

})();
