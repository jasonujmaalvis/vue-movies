<template>
  <tr :class="$style.item">
    <td :class="$style.year">
      {{ year ? year : '—' }}
    </td>
    <td>
      <nuxt-link :to="{ name: `${media}-id`, params: { id: credit.id } }">
        <strong>{{ name }}</strong>

        <span
          v-if="episodes"
          :class="$style.episodes">
          {{ episodes }}
        </span>

        <span
          v-if="role"
          :class="$style.role">
          {{ role }}
        </span>
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    year: {
      type: String,
      required: true,
    },

    credit: {
      type: Object,
      required: true,
    },
  },

  computed: {
    media () {
      if (this.credit.media_type) {
        return this.credit.media_type;
      } else if (this.credit.name) {
        return 'tv';
      } else {
        return 'movie';
      }
    },

    name () {
      return this.credit.title ? this.credit.title : this.credit.name;
    },

    role () {
      const character = this.credit.character;
      const job = this.credit.job;

      if (character) {
        return `as ${character}`;
      } else if (job) {
        return `as ${job}`;
      } else {
        return false;
      }
    },

    episodes () {
      const episodes = this.credit.episode_count;

      if (episodes) {
        if (episodes > 1) {
          return `(${episodes} episodes)`;
        } else {
          return `(${episodes} episode)`;
        }
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.item {
  font-size: 1.5rem;

  @media (min-width: $breakpoint-large) {
    font-size: 1.6rem;
  }

  td {
    padding: 1rem 2rem;
    border-bottom: 1px solid #141414;
  }
}

.year {
  width: 8rem;
}

.episodes {
  color: #999;
}

.role {
  color: rgba(255, 255, 255, 0.8);
}
</style>
