'use strict';

(function () {
  var NUMBER_OF_OBJECTS = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
    NAMES: NAMES,
    LAST_NAMES: LAST_NAMES,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    setupElement: setupElement,
    getRandomIntegerNumber: getRandomIntegerNumber,
    getRandomValueFromArray: getRandomValueFromArray
  };
})();
