<template>
  <nav :class="$style.nav">
    <button
      type="button"
      aria-label="Go Back"
      :class="$style.button"
      @click="$router.go(-1)">
      <!-- eslint-disable-next-line -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M16.5 20.5l-9-8.5 9-8.5"/></svg>
    </button>

    <p
      :class="$style.text">
      {{ title }}
    </p>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/css/utilities/_variables.scss';

@media (max-width: $breakpoint-large - 1) {
  .topnav-active {
    padding-top: 4.5rem;
  }
}
</style>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.5rem;
  padding: 0 5.5rem;
  background-color: #000;

  @media (min-width: $breakpoint-large) {
    display: none;
  }
}

.text {
  margin: 0;
  overflow: hidden;
  font-size: 1.4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.button {
  position: absolute;
  top: 0;
  left: 0;
  width: 4.5rem;
  height: 100%;
  padding: 0;
  margin: 0;
  background: none;
  outline: 0;
  transition: all 0.2s;

  &:hover,
  &:focus {
    opacity: 0.8;
  }
}
</style>
