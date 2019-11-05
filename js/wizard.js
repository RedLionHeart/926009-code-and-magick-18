'use strict';

(function () {

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

  var wizard = {
    onCoatChange: function () {},
    onEyesChange: function () {}
  };

  var wizardCoat = window.util.setupElement.querySelector('.wizard-coat');
  var wizardEyes = window.util.setupElement.querySelector('.wizard-eyes');
  var wizardFireball = window.util.setupElement.querySelector(
      '.setup-fireball-wrap');

  // Событие смены цвета мантии при нажатии на нее.
  wizardCoat.addEventListener('click', function () {
    var wizardCoatColor = window.util.getRandomValueFromArray(COAT_COLORS);
    wizardCoat.style.fill = wizardCoatColor;
    window.util.setupElement.querySelector(
        'input[name="coat-color"]'
    ).value = wizardCoatColor;
    wizard.onCoatChange(wizardCoatColor);
  });

  // Событие смены цвета глаз при нажатии на них.
  wizardEyes.addEventListener('click', function () {
    var wizardEyesColor = window.util.getRandomValueFromArray(EYES_COLORS);
    wizardEyes.style.fill = wizardEyesColor;
    window.util.setupElement.querySelector(
        'input[name="eyes-color"]'
    ).value = wizardEyesColor;
    wizard.onEyesChange(wizardEyesColor);
  });

  // Событие смены цвета фаербола при нажатии на него.
  wizardFireball.addEventListener('click', function () {
    var wizardFireballColor = window.util.getRandomValueFromArray(FIREBALL_COLORS);
    wizardFireball.style.background = wizardFireballColor;
    window.util.setupElement.querySelector(
        'input[name="fireball-color"]'
    ).value = wizardFireballColor;
  });

  // Обновление похожих персонажей при смене цвета мантии.
  wizard.onCoatChange = window.debounce(function (color) {
    window.coatColor = color;
    window.similar.updateSimilarWizards();
  });

  // Обновление похожих персонажей при смене цвета глаз.
  wizard.onEyesChange = window.debounce(function (color) {
    window.eyesColor = color;
    window.similar.updateSimilarWizards();
  });
})();
