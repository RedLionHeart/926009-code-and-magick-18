'use strict';

var NUMBER_OF_OBJECTS = 4;
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

var setupElement = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var visibleElement = function () {
  setupElement.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
};

var getRandomIntegerNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomValueFromArray = function (array) {
  return array[getRandomIntegerNumber(0, array.length - 1)];
};

var getCharacterName = function () {
  return getRandomValueFromArray(NAMES) + ' ' + getRandomValueFromArray(LAST_NAMES);
};

var generateArrayOfSimilarCharacters = function () {
  var characterList = [];
  for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
    var character = {
      name: getCharacterName(),
      coatColor: getRandomValueFromArray(COAT_COLORS),
      eyesColor: getRandomValueFromArray(EYES_COLORS)
    };
    characterList[i] = character;
  }
  return characterList;
};

var getItemTemplateWizard = function (data) {
  var templateItem = similarWizardTemplate.cloneNode(true);
  var templateItemText = templateItem.querySelector('.setup-similar-label');
  var templateItemCoatColor = templateItem.querySelector('.wizard-coat');
  var templateItemEyesColor = templateItem.querySelector('.wizard-eyes');

  templateItemText.textContent = data.name;
  templateItemCoatColor.style.fill = data.coatColor;
  templateItemEyesColor.style.fill = data.eyesColor;
  return templateItem;
};

var fillSimilarWizard = function (data) {
  var wizardsBlock = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
    var wizard = getItemTemplateWizard(data[i]);
    fragment.appendChild(wizard);
  }
  wizardsBlock.appendChild(fragment);
};

var init = function () {
  fillSimilarWizard(generateArrayOfSimilarCharacters());
  visibleElement();
};

init();
