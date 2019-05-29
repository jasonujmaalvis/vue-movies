<template>
  <transition name="modal" appear>
    <div
      ref="modal"
      class="modal"
      tabindex="-1"
      aria-hidden="false"
      :aria-label="label"
      role="dialog"
      :class="modalClass"
      @click="close">
      <div class="modal__wrap">
        <div
          class="modal__body"
          @click.stop>
          <button
            class="modal__close"
            aria-label="Close"
            type="button"
            @click.stop="close">
            <!-- eslint-disable-next-line -->
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5"><path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"/></g></svg>
          </button>

          <div :class="`modal__${type}`">
            <iframe
              v-if="type === 'iframe' && activeItem"
              :src="activeItem.src"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen />

            <img
              v-if="type === 'image' && activeItem"
              v-lazyload="activeItem.src"
              class="lazyload"
              alt="">
          </div>

          <div
            v-if="showNav"
            class="modal__nav">
            <button
              class="modal__arrow modal__arrow--prev"
              aria-label="Previous"
              type="button"
              @click.stop="previous">
              <!-- eslint-disable-next-line -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.9 23.2L6.1 12 17.9.8"></path></svg>
            </button>

            <div class="modal__count">
              {{ selected + 1 }} / {{ data.length }}
            </div>

            <button
              class="modal__arrow modal__arrow--next"
              aria-label="Next"
              type="button"
              title="Next"
              @click.stop="next">
              <!-- eslint-disable-next-line -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { debounce } from '~/mixins/Functions';

let focusedElBeforeOpen;
let focusableEls;
let firstFocusableEl;
let lastFocusableEl;

export default {
  props: {
    data: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },

    type: {
      type: String,
      required: false,
      default: 'image',
    },

    modifier: {
      type: String,
      required: false,
      default: '',
    },

    nav: {
      type: Boolean,
      required: false,
      default: false,
    },

    startAt: {
      type: Number,
      required: false,
      default: 0,
    },

    ariaLabel: {
      type: String,
      required: false,
      default: '',
    },
  },

  head () {
    return {
      bodyAttrs: {
        class: 'modal-open',
      },
    };
  },

  data () {
    return {
      selected: null,
      activeItem: null,
    };
  },

  computed: {
    modalClass () {
      return {
        'modal--nav': this.showNav,
        [`modal--${this.type}`]: true,
        [this.modifier]: true,
      };
    },

    showNav () {
      return this.nav && this.data.length > 1;
    },

    label () {
      if (this.ariaLabel) {
        return this.ariaLabel;
      } else if (this.activeItem && this.activeItem.name) {
        return this.activeItem.name;
      } else {
        return null;
      }
    },
  },

  watch: {
    selected () {
      this.activeItem = this.data[this.selected];
    },
  },

  created () {
    this.selected = this.startAt;
  },

  beforeMount () {
    window.addEventListener('keydown', this.handleKeyDown);
    focusedElBeforeOpen = document.activeElement;
  },

  mounted () {
    focusableEls = this.$refs.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    focusableEls = Array.prototype.slice.call(focusableEls);

    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];

    // focus on the first element
    firstFocusableEl.focus();

    // calculate iframe size for responsive sizing on resize
    if (this.type === 'iframe') {
      this.handleIframeSize();
      window.addEventListener('resize', this.resizeIframeSize);
    }
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKeyDown);

    if (this.type === 'iframe') {
      window.removeEventListener('resize', this.resizeIframeSize);
    }

    if (focusedElBeforeOpen) {
      focusedElBeforeOpen.focus();
    }
  },

  methods: {
    previous () {
      this.selected = ((this.selected - 1) + this.data.length) % this.data.length;
    },

    next () {
      this.selected = (this.selected + 1) % this.data.length;
    },

    close () {
      this.$emit('close');
    },

    handleKeyDown (e) {
      if (e.keyCode === 27) { // esc key
        this.close();
      } else if (this.nav && e.keyCode === 39) { // right arrow
        this.next();
      } else if (this.nav && e.keyCode === 37) { // left arrow
        this.previous();
      } else if (e.keyCode === 9) { // tab
        if (focusableEls.length === 1) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          this.handleBackwardTab(e);
        } else {
          this.handleForwardTab(e);
        }
      }
    },

    handleForwardTab (e) {
      if (document.activeElement === lastFocusableEl) {
        e.preventDefault();
        firstFocusableEl.focus();
      }
    },

    handleBackwardTab (e) {
      if (document.activeElement === firstFocusableEl) {
        e.preventDefault();
        lastFocusableEl.focus();
      }
    },

    handleIframeSize () {
      const aspectRatio = 16 / 9;
      const styles = getComputedStyle(this.$refs.modal);
      let maxWidth = this.$refs.modal.offsetWidth;
      let maxHeight = this.$refs.modal.offsetHeight;
      let width;
      let height;

      maxWidth -= parseFloat(styles.paddingRight) + parseFloat(styles.paddingLeft);
      maxHeight -= parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

      width = maxWidth;
      height = maxHeight;

      if (maxHeight > maxWidth / aspectRatio) {
        height = maxWidth / aspectRatio;
      } else if (maxWidth > maxHeight * aspectRatio) {
        width = maxHeight * aspectRatio;
      }

      this.$refs.modal.querySelector('.modal__iframe').style.width = `${width}px`;
      this.$refs.modal.querySelector('.modal__iframe').style.height = `${height}px`;
    },

    resizeIframeSize: debounce(function () {
      this.handleIframeSize();
    }, 600),
  },
};
</script>

<style lang="scss">
@import '~/assets/css/utilities/_variables.scss';

body.modal-open {
  overflow: hidden;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  overflow-x: hidden;
  overflow-y: auto;
  cursor: pointer;
  background-color: #000;

  @media (min-width: $breakpoint-large) {
    padding: 4.4rem 10rem;
  }
}

.modal__wrap {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.modal__body {
  position: relative;
  margin: auto;
  cursor: default;
}

.modal__close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.4rem;
  height: 4.4rem;
  padding: 0;
  background: none;

  @media (max-width: $breakpoint-large - 1) {
    position: fixed;
    left: 0;
    width: 6rem;
    height: 6rem;
  }
}

.modal--nav {
  @media (max-width: $breakpoint-large - 1) {
    padding-bottom: 5rem;
  }

  .modal__image img {
    @media (max-width: $breakpoint-large - 1) {
      max-height: calc(100vh - 5rem);
    }
  }
}

.modal__nav {
  position: absolute;
  right: 0;
  bottom: -4.4rem;
  left: 0;
  display: flex;
  align-items: center;
  height: 4.4rem;

  @media (max-width: $breakpoint-large - 1) {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    height: 5rem;
    background-color: #000;
  }

  @media (min-width: $breakpoint-large) {
    justify-content: flex-end;
  }
}

.modal__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;

  @media (max-width: $breakpoint-large - 1) {
    flex: 1;
    height: 5rem;
  }

  @media (min-width: $breakpoint-large) {
    position: fixed;
    top: 50%;
    width: 10rem;
    height: 10rem;
    margin-top: -5rem;
  }
}

@media (min-width: $breakpoint-large) {
  .modal__arrow--prev {
    left: 0;
  }

  .modal__arrow--next {
    right: 0;
  }
}

.modal__count {
  font-size: 1.6rem;
  line-height: 1;
}

@media (min-width: $breakpoint-large) {
  .modal--images {
    .modal__close {
      top: -4.4rem;
    }
  }
}

.modal__image {
  &.lazyloading {
    background: url('~assets/images/loader.svg') no-repeat center;
  }

  img {
    max-height: calc(100vh);

    @media (min-width: $breakpoint-large) {
      max-height: calc(100vh - 8.8rem);
    }
  }
}

@media (min-width: $breakpoint-large) {
  .modal--iframe {
    .modal__close {
      top: -4.4rem;
    }
  }
}

.modal__iframe {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: #000;
    border: 0;
  }
}

.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
</style>
