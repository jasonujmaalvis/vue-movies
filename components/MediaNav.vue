<template>
  <div :class="$style.nav">
    <button
      v-for="(item, index) in menu"
      :key="`tab-${index}`"
      :class="[$style.button, { [$style.buttonActive] : active === index }]"
      type="button"
      @click="clicked(index, item)">
      {{ item }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      active: 0,
    };
  },

  methods: {
    clicked (index, item) {
      this.active = index;
      this.$emit('clicked', item.replace(/\s+/g, '-').toLowerCase());
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.nav {
  display: flex;
  height: 4.8rem;
  background-color: #1b1b1b;

  @media (min-width: $breakpoint-large) {
    justify-content: center;
    margin-top: 2.5rem;
    background: none;
  }
}

.button {
  display: block;
  width: 100%;
  padding: 0;
  margin: 0 0 -0.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: #585858;
  text-transform: uppercase;
  letter-spacing: $letter-spacing;
  background: none;
  border-right: 1px solid $base-bg;
  outline: 0;
  transition: color 0.2s ease;

  @media (min-width: $breakpoint-large) {
    width: auto;
    margin: 0 3rem;
    font-size: 2rem;
    border-bottom: 2px solid transparent;
  }

  &:last-child {
    border-right: 0;
  }

  &:hover,
  &:focus {
    color: #fff;
  }
}

.buttonActive {
  color: #fff;
  background-color: $base-bg;

  @media (min-width: $breakpoint-large) {
    background: none;
    border-bottom-color: #fff;
  }
}
</style>
