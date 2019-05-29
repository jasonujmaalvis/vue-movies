/**
 * Debounce
 */
export const debounce = function (func, delay) {
  let timeoutID;

  return function () {
    clearTimeout(timeoutID);

    const args = arguments;
    const that = this;

    timeoutID = setTimeout(function () {
      func.apply(that, args);
    }, delay);
  };
};

/**
 * Check if localStorage is supported
 */
export const supportsLocalStorage = function () {
  let supports = true;

  try {
    const test = '__vue-localStorage-check';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
  } catch (e) {
    supports = false;
  }

  return supports;
};
