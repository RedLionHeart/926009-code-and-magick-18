'use strict';

(function () {
  var NUMBER_OF_OBJECTS = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupElement = document.querySelector('.setup');

  var getRandomIntegerNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomValueFromArray = function (array) {
    return array[getRandomIntegerNumber(0, array.length - 1)];
  };

  window.util = {
    NUMBER_OF_OBJECTS: NUMBER_OF_OBJECTS,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    setupElement: setupElement,
    getRandomIntegerNumber: getRandomIntegerNumber,
    getRandomValueFromArray: getRandomValueFromArray
  };
})();
