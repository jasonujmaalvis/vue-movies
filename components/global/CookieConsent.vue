<template>
  <div
    v-if="isOpen"
    class="alert alert--alt">
    <p>We use cookies and other tracking technologies to improve your browsing experience on our website. By using our website, you consent to our use of cookies and other tracking technologies. <a target="_blank" href="https://jason.codes/cookie-policy" rel="noopener">Find out more</a>.</p>

    <div>
      <button
        class="alert__btn alert__btn--secondary button"
        type="button"
        aria-label="Close"
        @click="decline">
        Decline
      </button>

      <button
        class="alert__btn alert__btn--primary button"
        type="button"
        aria-label="Close"
        @click="accept">
        Accept
      </button>
    </div>
  </div>
</template>

<script>
import { get, set } from 'tiny-cookie';
import { supportsLocalStorage } from '~/mixins/Functions';

export default {
  data () {
    return {
      isOpen: false,
      storageName: 'cookieconsent',
    };
  },

  mounted () {
    if (!this.getVisited()) {
      this.isOpen = true;
    }
  },

  methods: {
    getVisited () {
      if (supportsLocalStorage()) {
        return localStorage.getItem(this.storageName);
      } else {
        return get(this.storageName);
      }
    },

    setAccepted () {
      if (supportsLocalStorage()) {
        localStorage.setItem(this.storageName, 'accepted');
      } else {
        set(this.storageName, 'accepted');
      }
    },

    setDeclined () {
      if (supportsLocalStorage()) {
        localStorage.setItem(this.storageName, 'declined');
      } else {
        set(this.storageName, 'declined');
      }
    },

    accept () {
      this.setAccepted();
      this.isOpen = false;
    },

    decline () {
      this.setDeclined();
      this.isOpen = false;
    },
  },
};
</script>
