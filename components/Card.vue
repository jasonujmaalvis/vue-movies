<template>
  <div class="card">
    <nuxt-link
      class="card__link"
      :to="{ name: `${media}-id`, params: { id: item.id } }">
      <div class="card__img">
        <img
          v-if="poster"
          v-lazyload="poster"
          class="lazyload"
          :alt="name">

        <span v-else>
          <!-- eslint-disable-next-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" fill="#999"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
        </span>
      </div>

      <h2 class="card__name">
        {{ name }}
      </h2>

      <div
        v-if="media !== 'person' && (stars || item.vote_average)"
        class="card__rating">
        <div
          v-if="stars"
          class="card__stars">
          <div :style="{ width: `${stars}%` }" />
        </div>

        <div
          v-if="item.vote_average"
          class="card__vote">
          {{ item.vote_average | rating }}
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { apiImgUrl } from '~/api';
import { name, stars } from '~/mixins/Details';

export default {
  mixins: [
    name,
    stars,
  ],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.item.poster_path) {
        return `${apiImgUrl}/w370_and_h556_bestv2${this.item.poster_path}`;
      } else if (this.item.profile_path) {
        return `${apiImgUrl}/w370_and_h556_bestv2${this.item.profile_path}`;
      } else {
        return false;
      }
    },

    media () {
      if (this.item.media_type) {
        return this.item.media_type;
      } else if (this.item.name) {
        return 'tv';
      } else {
        return 'movie';
      }
    },
  },
};
</script>
