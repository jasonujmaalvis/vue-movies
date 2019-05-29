<template>
  <div>
    <Nav />
    <nuxt />
  </div>
</template>

<script>
import Nav from '~/components/global/Nav';

export default {
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
@import '~/assets/css/global.scss';
</style>
