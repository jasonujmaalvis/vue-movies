<template>
  <div
    v-if="people && people.length"
    class="listing listing--carousel">
    <div class="listing__head">
      <h2 class="listing__title">
        Cast
      </h2>
    </div>

    <div class="carousel">
      <button
        class="carousel__nav carousel__nav--left"
        aria-label="Previous"
        type="button"
        :disabled="disableLeftButton"
        @click="moveToClickEvent('left')">
        <!-- eslint-disable-next-line -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.9 23.2L6.1 12 17.9.8"/></svg>
      </button>

      <div
        ref="carouselElement"
        class="carousel__items"
        @scroll="scrollEvent">
        <CreditsItem
          v-for="person in people"
          :key="`credit-${person.id}`"
          :person="person" />
      </div>

      <button
        class="carousel__nav carousel__nav--right"
        aria-label="Next"
        type="button"
        :disabled="disableRightButton"
        @click="moveToClickEvent('right')">
        <!-- eslint-disable-next-line -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"/></svg>
      </button>
    </div>
  </div>
</template>

<script>
import carousel from '~/mixins/Carousel';
import { debounce } from '~/mixins/Functions';
import CreditsItem from '~/components/CreditsItem';

export default {
  components: {
    CreditsItem,
  },

  mixins: [carousel],

  props: {
    people: {
      type: Array,
      required: true,
    },
  },

  mounted () {
    this.calculateState(this.people.length);
  },

  methods: {
    resizeEvent: debounce(function () {
      this.calculateState(this.people.length);
    }, 100),
  },
};
</script>
