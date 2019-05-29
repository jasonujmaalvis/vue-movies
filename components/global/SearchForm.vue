<template>
  <div :class="$style.form">
    <form
      autocomplete="off"
      @submit.prevent>
      <label
        class="visuallyhidden"
        for="search">Search</label>

      <div :class="$style.field">
        <input
          id="search"
          ref="input"
          v-model.trim="query"
          name="search"
          type="text"
          placeholder="Search for a movie, tv show or person..."
          @keyup="goToRoute"
          @blur="unFocus">

        <button
          v-if="showButton"
          type="button"
          aria-label="Close"
          @click="goBack">
          <!-- eslint-disable-next-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5"><path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"/></g></svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      query: this.$route.query.q ? this.$route.query.q : '',
    };
  },

  computed: {
    showButton () {
      return this.$route.name === 'search';
    },

    ...mapState('search', [
      'fromPage',
    ]),
  },

  mounted () {
    this.$refs.input.focus();
  },

  methods: {
    goToRoute () {
      if (this.query) {
        this.$router.push({
          name: 'search',
          query: { q: this.query },
        });
      } else {
        this.$router.push({
          path: this.fromPage,
        });
      }
    },

    goBack () {
      this.query = '';

      this.$router.push({
        path: this.fromPage,
      });
    },

    unFocus (e) {
      if (this.$route.name !== 'search') {
        const target = e.relatedTarget;

        if (!target || !target.classList.contains('search-toggle')) {
          this.query = '';
          this.$store.commit('search/closeSearch');
        }
      }
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.form {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;

  @media (min-width: $breakpoint-large) {
    left: 10rem;
  }

  input[type='text'] {
    flex: 1;
    height: 6rem;
    padding: 2.1rem 1.5rem;
    font-size: 1.6rem;
    color: #fff;
    background: none;
    border: 0;
    outline: 0;

    @media (min-width: $breakpoint-large) {
      height: 8rem;
      padding: 3.1rem 5rem;
    }
  }

  button {
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    background: none;

    @media (min-width: $breakpoint-large) {
      padding: 0 5rem;
    }
  }
}

.field {
  display: flex;
  background-color: $secondary-color;
}
</style>
