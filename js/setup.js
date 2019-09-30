'use strict';

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

var setupSimilar = document.querySelector('.setup-similar');
var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
var isFocusOnInputName = false;
var setupElement = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupClose = setupElement.querySelector('.setup-close');
var setupUserName = setupElement.querySelector('.setup-user-name');
var wizardCoat = setupElement.querySelector('.wizard-coat');
var wizardEyes = setupElement.querySelector('.wizard-eyes');
var wizardFireball = setupElement.querySelector('.setup-fireball-wrap');

var visibleElement = function () {
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

// Открывает окно настройки персонажа.
var openPopup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Закрывает окно настройки персонажа.
var closePopup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Отменяет передачу события если нажат esc в области ввода имени.
var onPlayerNameInputEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

// Возможность закрыть окно настройки при нажатии на esc.
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (isFocusOnInputName) {
      onPlayerNameInputEscPress();
    }
    closePopup();
  }
};

// Событие открытия окна настройки при нажатии на enter и фокусе на иконку пользователя.
setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Событие открытия окна настройки персонажа по клику.
setupOpen.addEventListener('click', function () {
  openPopup();
});

// Событие закрытия окна настройки при клике на крестик.
setupClose.addEventListener('click', function () {
  closePopup();
});

// Событие закрытия окна персонажа, при фокусе на крестик и нажатии на enter.
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Событие, блокирующее закрытие окна настройки персонажа при фокусе на поле ввода имени.
setupUserName.addEventListener('focus', function () {
  isFocusOnInputName = true;
});

// Событие, позволяющее закрыть на клавишу esq, при нажатии вне поля ввода имени.
setupUserName.addEventListener('blur', function () {
  isFocusOnInputName = false;
});

// Событие смены цвета мантии при нажатии на нее.
wizardCoat.addEventListener('click', function () {
  var wizardCoatColor = getRandomValueFromArray(COAT_COLORS);
  wizardCoat.style.fill = wizardCoatColor;
  setupElement.querySelector('input[name="coat-color"]').value = wizardCoatColor;
});

// Событие смены цвета глаз при нажатии на них.
wizardEyes.addEventListener('click', function () {
  var wizardEyesColor = getRandomValueFromArray(EYES_COLORS);
  wizardEyes.style.fill = wizardEyesColor;
  setupElement.querySelector('input[name="eyes-color"]').value = wizardEyesColor;
});

// Событие смены цвета фаербола при нажатии на него.
wizardFireball.addEventListener('click', function () {
  var wizardFireballColor = getRandomValueFromArray(FIREBALL_COLORS);
  wizardFireball.style.background = wizardFireballColor;
  setupElement.querySelector('input[name="fireball-color"]').value = wizardFireballColor;
});

// Запускаем функции.
var init = function () {
  fillSimilarWizard(generateArrayOfSimilarCharacters());
  visibleElement();
};

init();
