'use strict';

(function () {
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
  var wizardCoat = window.util.setupElement.querySelector('.wizard-coat');
  var wizardEyes = window.util.setupElement.querySelector('.wizard-eyes');
  var wizardFireball = window.util.setupElement.querySelector(
      '.setup-fireball-wrap'
  );

  // Показываем похожих магов.
  (function () {
    setupSimilar.classList.remove('hidden');
  })();

  // Генерируем название мага.
  var getCharacterName = function () {
    return (
      window.util.getRandomValueFromArray(NAMES) +
      ' ' +
      window.util.getRandomValueFromArray(LAST_NAMES)
    );
  };

  // Генерация данных магов.
  var generateArrayOfSimilarCharacters = function () {
    var characterList = [];
    for (var i = 0; i < window.util.NUMBER_OF_OBJECTS; i++) {
      var character = {
        name: getCharacterName(),
        coatColor: window.util.getRandomValueFromArray(COAT_COLORS),
        eyesColor: window.util.getRandomValueFromArray(EYES_COLORS)
      };
      characterList[i] = character;
    }
    return characterList;
  };

  // Получаем мага для блока похожих магов.
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

  // Добавляем магов в разметку
  var fillSimilarWizard = function (data) {
    var wizardsBlock = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.util.NUMBER_OF_OBJECTS; i++) {
      var wizard = getItemTemplateWizard(data[i]);
      fragment.appendChild(wizard);
    }
    wizardsBlock.appendChild(fragment);
  };

  // Событие смены цвета мантии при нажатии на нее.
  wizardCoat.addEventListener('click', function () {
    var wizardCoatColor = window.util.getRandomValueFromArray(COAT_COLORS);
    wizardCoat.style.fill = wizardCoatColor;
    window.util.setupElement.querySelector(
        'input[name="coat-color"]'
    ).value = wizardCoatColor;
  });

  // Событие смены цвета глаз при нажатии на них.
  wizardEyes.addEventListener('click', function () {
    var wizardEyesColor = window.util.getRandomValueFromArray(EYES_COLORS);
    wizardEyes.style.fill = wizardEyesColor;
    window.util.setupElement.querySelector(
        'input[name="eyes-color"]'
    ).value = wizardEyesColor;
  });

  // Событие смены цвета фаербола при нажатии на него.
  wizardFireball.addEventListener('click', function () {
    var wizardFireballColor = window.util.getRandomValueFromArray(FIREBALL_COLORS);
    wizardFireball.style.background = wizardFireballColor;
    window.util.setupElement.querySelector(
        'input[name="fireball-color"]'
    ).value = wizardFireballColor;
  });

  // Запускаем функции.
  fillSimilarWizard(generateArrayOfSimilarCharacters());
})();
