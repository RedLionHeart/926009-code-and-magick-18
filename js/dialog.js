'use strict';

(function () {
  var isFocusOnInputName = false;
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  var setupClose = window.util.setupElement.querySelector('.setup-close');
  var setupUserName = window.util.setupElement.querySelector('.setup-user-name');
  var controlDialog = window.util.setupElement.querySelector('.upload');
  var dialogDefault = {
    x: window.util.setupElement.style.left,
    y: window.util.setupElement.style.top
  };
  var formDialogWindow = window.util.setupElement.querySelector('.setup-wizard-form');

  // Открывает окно настройки персонажа.
  var openPopup = function () {
    window.util.setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.util.setupElement.style.left = dialogDefault.x;
    window.util.setupElement.style.top = dialogDefault.y;
  };

  // Закрывает окно настройки персонажа.
  var closePopup = function () {
    window.util.setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Отменяет передачу события если нажат esc в области ввода имени.
  var onPlayerNameInputEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  };

  // Возможность закрыть окно настройки при нажатии на esc.
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      if (isFocusOnInputName) {
        onPlayerNameInputEscPress();
      }
      closePopup();
    }
  };

  // Событие открытия окна настройки при нажатии на enter и фокусе на иконку пользователя.
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
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
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
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

  // Событие перемещения диалогового окна, если нажали левую кнопку мыши.
  controlDialog.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Функция перемещения окна относительно смещения мыши.
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.util.setupElement.style.top = (window.util.setupElement.offsetTop - shift.y) + 'px';
      window.util.setupElement.style.left = (window.util.setupElement.offsetLeft - shift.x) + 'px';
    };

    // Функция, срабатывающая при отпускании левой кнопки мыши, убирает конфликт загрузки игображения.
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (evtClick) {
          evtClick.preventDefault();
          controlDialog.removeEventListener('click', onClickPreventDefault);
        };
        controlDialog.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // ddd
  formDialogWindow.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formDialogWindow), function () {
      window.util.setupElement.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
