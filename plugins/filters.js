import Vue from 'vue';
import { languages } from '~/api';

/**
 * Format the rating
 */
Vue.filter('rating', function (number) {
  if (number.toString().length <= 1) {
    return `${number.toString()}.0`;
  }

  return number.toString();
});

/**
 * Format number to have commas
 */
Vue.filter('numberWithCommas', function (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

/**
 * Format number to have double digits
 */
Vue.filter('numberWithDoubleDigits', function (number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
});

/**
 * Format minutes into hours and mins
 */
Vue.filter('runtime', function (minutes) {
  // seconds
  const seconds = minutes * 60;
  let secondsLeft = seconds;

  // hours
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  // mins
  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  return `${hours ? hours + 'h' : ''} ${mins}min`;
});

/**
 * Truncate text
 */
Vue.filter('truncate', function (text, length, clamp) {
  text = text || '';
  clamp = clamp || '...';
  length = length || 30;

  if (text.length <= length) return text;

  let tcText = text.slice(0, length - clamp.length);
  let last = tcText.length - 1;

  while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;

  // Fix for case when text dont have any `space`
  last = last || length - clamp.length;

  tcText = tcText.slice(0, last);

  return tcText + clamp;
});

/**
 * Format array to comma separated list
 */
Vue.filter('arrayToList', function (array) {
  return array.map(item => item.name).join(', ');
});

/**
 * Format date to full date
 */
Vue.filter('fullDate', function (string) {
  const dateArray = string.split('-');
  const date = dateArray[2].substr(0, 1) === '0' ? dateArray[2].substr(1, 1) : dateArray[2];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return `${date} ${months[dateArray[1] - 1]} ${dateArray[0]}`;
});

/**
 * Format iso_639_1 to full language
 */
Vue.filter('fullLang', function (iso) {
  const fullLang = languages.find(lang => lang.iso_639_1 === iso);

  if (fullLang) {
    return fullLang.english_name;
  }

  return iso;
});
