<template>
  <div :class="[$style.item, $style[type]]">
    <a
      :href="image.thumb"
      @click.prevent="handleGallery(index)">
      <div :class="$style.image">
        <img
          v-lazyload="image.thumb"
          class="lazyload"
          alt="">
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleGallery (index) {
      this.$emit('openModal', index);
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.item {
  padding: 0.4rem;
}

.image {
  position: relative;
  height: 0;
  overflow: hidden;
  background-color: $secondary-color;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.backdrop {
  width: 50%;

  @media (min-width: $breakpoint-xsmall) {
    width: 33.3333333%;
  }

  @media (min-width: $breakpoint-medium) {
    width: 25%;
  }

  @media (min-width: 1500px) {
    width: 20%;
  }

  @media (min-width: 1800px) {
    width: 16.6666667%;
  }

  @media (min-width: 2500px) {
    width: 14.2857143%;
  }

  .image {
    padding-top: 56.28%;
  }
}

.poster {
  width: 33.3333333%;

  @media (min-width: $breakpoint-xsmall) {
    width: 25%;
  }

  @media (min-width: $breakpoint-medium) {
    width: 20%;
  }

  @media (min-width: 1500px) {
    width: 16.6666667%;
  }

  @media (min-width: 1800px) {
    width: 14.2857143%;
  }

  @media (min-width: 2500px) {
    width: 12.5%;
  }

  .image {
    padding-top: 150.27%;
  }
}
</style>
