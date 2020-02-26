'use strict';
(function () {

  var elementFormUploud = document.querySelector('.form-uploud')
  var elementBtnDownload = elementFormUploud.querySelector('.form-uploud__download');
  var elementTplPicture = document.querySelector('#template-gallery-item').content.querySelector('.gallery__item');
  var elementTplPictureImg = elementTplPicture.querySelector('.gallery__img');
  var elementGalllery = document.querySelector('.gallery');

  var getErrorOnConsole = function () {
    console.log('Ошибка при получении данных!');
  };

  //Создаём картинку по шаблону
  var createElementGallery = function (arrItem) {
    elementTplPictureImg.src = arrItem.url;
    elementTplPictureImg.width = arrItem.width;
    elementTplPictureImg.height = arrItem.height;

    return elementTplPicture.cloneNode(true);
  };

  //Создаём галерею картинок
  var createGallery = function (objUrl) {
    var arrObj = objUrl.galleryImages;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrObj.length; i++) {
      var itemPicture = createElementGallery(arrObj[i]);
      fragment.appendChild(itemPicture);
    }

    elementGalllery.appendChild(fragment);
  }

  //Отображаем галерею картинок - локальные данные
  var getGalleryLocal = function (form) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var objLoudUrl = JSON.parse(reader.result);

      createGallery(objLoudUrl);
    });

    reader.readAsText(form[0].files[0]);
  }

  //Отображаем галерею картинок и одну картинку - данные по сети
  var getGalleryNet = function (strUrl)  {
    if (strUrl.endsWith('.json')) {
      window.load(createGallery, getErrorOnConsole, strUrl);
    }

    if (strUrl) {
      var imgSingle = new Image();
      imgSingle.src = strUrl;

      imgSingle.addEventListener('load', function () {
        var objImgSingle = {
          url: imgSingle.src,
          width: imgSingle.width,
          height: imgSingle.height
        };

        elementGalllery.appendChild(createElementGallery(objImgSingle));
      });
    }
  }

  //обработчик на кнопке Загрузка
  var onFormUploudSubmit = function (evt) {
    evt.preventDefault();

    if (elementFormUploud[0].files.length) {
      getGalleryLocal(elementFormUploud);
    }

    if (elementFormUploud[1].value) {
      getGalleryNet(elementFormUploud[1].value.trim())
    }

    elementFormUploud.reset();
  };

  //события на кнопке Зарузить и на форме загрузки
  elementBtnDownload.addEventListener('click', window.getValidInputUrl);
  elementFormUploud.addEventListener('submit', onFormUploudSubmit);

})();


