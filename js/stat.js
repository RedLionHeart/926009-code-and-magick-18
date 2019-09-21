'use strict';

var YOU_COLOR = 'rgba(255, 0, 0, 1)';
var CLOUD_START_X = 100;
var CLOUD_START_Y = 10;
var CLOUD_SHADOW_START_X = 110;
var CLOUD_SHADOW_START_Y = 20;
var HISTOGRAM_ITEM_WIDTH = 40;
var HISTOGRAM_ITEM_GAP = 50;
var HISTOGRAM_START_X = CLOUD_START_X + HISTOGRAM_ITEM_GAP;
var HISTOGRAM_START_Y = 240;
var HISTOGRAM_HEIGHT = 150;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var BLACK_TEXT_COLOR = '#000';
var WHITE_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var TEXT_GAP = 10;
var NAME_START_Y = TEXT_GAP + HISTOGRAM_START_Y;
var FONT_STYLE = '16px PT Mono';
var RESULTS_DESCRIPTION_START_X = 120;
var RESULTS_DESCRIPTION_START_Y = 30;
var DESCRIPTION_TEXT_GAP = 20;
var RESULTS_TEXT_WIN = 'Ура вы победили!';
var RESULTS_DESCRIPTION = 'Список результатов:';
var HUE_COLOR_OTHER_ITEMS = 240;
var LIGHTNESS_COLOR_OTHER_ITEMS = 50;

var getMaxNumberOfArray = function (arr) {
  var maxNumber = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxNumber) {
      maxNumber = arr[i];
    }
  }
  return maxNumber;
};
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var getRandomSaturation = function (hue, lightness) {
  var randomSaturationPercent = getRandomIntInclusive(0, 100);
  return (
    'hsl(' + hue + ', ' + randomSaturationPercent + '%, ' + lightness + '% )'
  );
};

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = CLOUD_SHADOW_COLOR;
  ctx.fillRect(CLOUD_SHADOW_START_X, CLOUD_SHADOW_START_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = WHITE_COLOR;
  ctx.fillRect(CLOUD_START_X, CLOUD_START_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.font = FONT_STYLE;
  ctx.fillStyle = BLACK_TEXT_COLOR;
  ctx.textBaseline = 'hanging';
  ctx.fillText(RESULTS_TEXT_WIN, RESULTS_DESCRIPTION_START_X, RESULTS_DESCRIPTION_START_Y);
  ctx.fillText(RESULTS_DESCRIPTION, RESULTS_DESCRIPTION_START_X, RESULTS_DESCRIPTION_START_Y + DESCRIPTION_TEXT_GAP);

  var maxTimeOfItem = getMaxNumberOfArray(times);

  for (var i = 0; i < names.length; i++) {
    var calculateHeightOfHistogramItem =
      (HISTOGRAM_HEIGHT * times[i]) / maxTimeOfItem;
    var calculateStartHistogramItemX =
      HISTOGRAM_START_X + (HISTOGRAM_ITEM_WIDTH + HISTOGRAM_ITEM_GAP) * i;
    var roundValue = Math.round(times[i]);
    var otherColorHistogramItem = getRandomSaturation(HUE_COLOR_OTHER_ITEMS, LIGHTNESS_COLOR_OTHER_ITEMS);

    ctx.fillStyle = BLACK_TEXT_COLOR;
    ctx.fillText(roundValue, calculateStartHistogramItemX, HISTOGRAM_START_Y - calculateHeightOfHistogramItem - TEXT_GAP * 2);
    ctx.fillText(names[i], calculateStartHistogramItemX, NAME_START_Y);
    ctx.fillStyle = names[i] === 'Вы' ? YOU_COLOR : otherColorHistogramItem;
    ctx.fillRect(calculateStartHistogramItemX, HISTOGRAM_START_Y, HISTOGRAM_ITEM_WIDTH, -calculateHeightOfHistogramItem);
  }
};
