<template>
  <div :class="$style.block">
    <div :class="$style.error">
      <div :class="$style.title">
        {{ message }}
      </div>

      <!-- eslint-disable -->
      <div :class="$style.message">
        <p v-if="error.statusCode === 504">Looks like we are unable to fetch the data right now, please come back and try again soon.</p>
        <p v-else>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
        <p>Back to our <nuxt-link to="/">home page</nuxt-link>.</p>
      </div>
      <!-- eslint-enable -->
    </div>
  </div>
</template>

<script>
export default {
  layout: 'no-footer',

  props: {
    error: {
      type: Object,
      required: true,
    },
  },

  head () {
    return {
      title: this.message,
    };
  },

  computed: {
    message () {
      return this.error.message || `An error occurred`;
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.block {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
}

.error {
  max-width: 450px;
}

.title {
  margin-top: 1.5rem;
  font-size: 1.8rem;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    font-size: 2.4rem;
  }
}

.message {
  margin-top: 1.5rem;
  font-size: 1.9rem;
  color: $text-color-grey;

  a {
    text-decoration: underline;
  }
}
</style>
