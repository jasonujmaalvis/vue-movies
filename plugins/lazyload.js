import Vue from 'vue';

/**
 * Function called when image has loaded
 */
const imageLoaded = function (e) {
  e.target.parentElement.classList.remove('lazyerror', 'lazyloading');
  e.target.parentElement.classList.add('lazyloaded');
};

/**
 * Function called when image has error
 */
const imageError = function (e) {
  e.target.parentElement.classList.remove('lazyloaded', 'lazyloading');
  e.target.parentElement.classList.add('lazyerror');
};

/**
 * Function to load the image
 */
const loadImage = function (el, path) {
  // setup loading state
  el.parentElement.classList.remove('lazyerror', 'lazyloaded');
  el.parentElement.classList.add('lazyloading');

  // image successfully loaded
  el.addEventListener('load', imageLoaded);

  // image failed to load
  el.addEventListener('error', imageError);

  // set element src to the path
  el.src = path;
};

/**
 * Lazy loading images
 */
Vue.directive('lazyload', {
  inserted (el, binding) {
    function handleIntersect (entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          /* eslint-disable-next-line */
          return;
        } else {
          loadImage(el, binding.value);
          observer.unobserve(el);
        }
      });
    }

    // Detect that the element is in the viewport.
    function createObserver () {
      const options = {
        root: null, // defaults to the browser viewport if not specified or if null
        threshold: '0', // the degree of intersection between the target element and its root (0 - 1)
        // threshold of 1.0 means that when 100% of the target is visible within
        // the element specified by the root option, the callback is invoked
      };

      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el); // target element to watch
    }

    // If IntersectionObserver is not supported, fallback and just load the images
    if (!window.IntersectionObserver) {
      loadImage(el, binding.value);
    } else {
      createObserver();
    }
  },

  update (el, binding) {
    // only run if the value is different
    if (binding.value !== el.src) {
      loadImage(el, binding.value);
    }
  },
});
