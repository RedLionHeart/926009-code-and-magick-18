'use strict';

(function () {

  var wizards = [];

  // Делаем систему "Похожести персонажей" на основе цвета мантии и глаз.
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  // Дополнительная сортировка магов, если цвет мании и глаз - одинаковы.
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // Показываем обновленный список похожих персонажей.
  var updateSimilarWizards = function () {
    window.render.showSimilarCharacters(wizards
      .slice()
      .sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }
        return rankDiff;
      }));
  };

  // Запускаем функцию загрузки магов.
  var similarCharactersLoad = function () {
    window.backend.load(function (data) {
      wizards = data;
      updateSimilarWizards();
    }, window.util.errorHandler);
  };

  window.similar = {
    updateSimilarWizards: updateSimilarWizards,
    similarCharactersLoad: similarCharactersLoad
  };
})();
