'use strict';

(function () {
  var NUMBER_OF_OBJECTS = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var NUMBER_OF_WIZARDS = 4;

  var setupSimilar = document.querySelector('.setup-similar');
  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
  var setupElement = document.querySelector('.setup');

  var getRandomIntegerNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomValueFromArray = function (array) {
    return array[getRandomIntegerNumber(0, array.length - 1)];
  };

  // Обработчик ошибочной загрузки.
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.util = {
    NUMBER_OF_OBJECTS: NUMBER_OF_OBJECTS,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    setupElement: setupElement,
    NUMBER_OF_WIZARDS: NUMBER_OF_WIZARDS,
    similarWizardTemplate: similarWizardTemplate,
    setupSimilar: setupSimilar,
    getRandomIntegerNumber: getRandomIntegerNumber,
    getRandomValueFromArray: getRandomValueFromArray,
    errorHandler: errorHandler
  };
})();
