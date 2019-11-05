'use strict';

(function () {

  // Получаем мага для блока похожих магов.
  var getItemTemplateWizard = function (data) {
    var templateItem = window.util.similarWizardTemplate.cloneNode(true);
    var templateItemText = templateItem.querySelector('.setup-similar-label');
    var templateItemCoatColor = templateItem.querySelector('.wizard-coat');
    var templateItemEyesColor = templateItem.querySelector('.wizard-eyes');

    templateItemText.textContent = data.name;
    templateItemCoatColor.style.fill = data.colorCoat;
    templateItemEyesColor.style.fill = data.colorEyes;
    return templateItem;
  };

  // Добавление похожих персонажей в блок в диалоговом окне
  var showSimilarCharacters = function (wizards) {
    var wizardsBlock = document.querySelector('.setup-similar-list');
    wizardsBlock.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.util.NUMBER_OF_WIZARDS; i++) {
      var wizard = getItemTemplateWizard(wizards[i]);
      fragment.appendChild(wizard);
    }
    wizardsBlock.appendChild(fragment);
  };

  // Показываем похожих магов.
  (function () {
    window.util.setupSimilar.classList.remove('hidden');
  })();

  window.render = {
    showSimilarCharacters: showSimilarCharacters
  };
})();
