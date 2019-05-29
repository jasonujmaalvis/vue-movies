<template>
  <div :class="$style.item">
    <a
      :class="$style.link"
      :href="video.url"
      @click.prevent="handleVideo(index)">

      <div :class="$style.image">
        <img
          v-if="video.thumb"
          v-lazyload="video.thumb"
          class="lazyload"
          :alt="video.name">

        <div
          v-if="video.duration"
          :class="$style.duration">
          {{ formatDuration(video.duration) }}
        </div>

        <div :class="$style.play">
          <!-- eslint-disable-next-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="26.75" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"/></svg>
        </div>
      </div>

      <h2 :class="$style.name">
        {{ video.name }}
      </h2>

      <div :class="$style.type">
        {{ video.type }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  methods: {
    handleVideo (index) {
      // send the event up to the parent
      this.$emit('openModal', index);
    },

    getSeconds (duration) {
      let a = duration.match(/\d+/g);

      if (duration.indexOf('M') >= 0 && duration.indexOf('H') === -1 && duration.indexOf('S') === -1) {
        a = [0, a[0], 0];
      }

      if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
        a = [a[0], 0, a[1]];
      }

      if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1 && duration.indexOf('S') === -1) {
        a = [a[0], 0, 0];
      }

      duration = 0;

      if (a.length === 3) {
        duration = duration + parseInt(a[0]) * 3600;
        duration = duration + parseInt(a[1]) * 60;
        duration = duration + parseInt(a[2]);
      }

      if (a.length === 2) {
        duration = duration + parseInt(a[0]) * 60;
        duration = duration + parseInt(a[1]);
      }

      if (a.length === 1) {
        duration = duration + parseInt(a[0]);
      }

      return duration;
    },

    formatDuration (duration) {
      const seconds = this.getSeconds(duration);
      let secondsLeft = seconds;

      // hours
      // const hours = Math.floor(secondsLeft / 3600);
      secondsLeft = secondsLeft % 3600;

      // mins
      const mins = Math.floor(secondsLeft / 60);
      secondsLeft = secondsLeft % 60;

      // prepend 0 if less than 10
      if (secondsLeft < 10) {
        secondsLeft = `0${secondsLeft}`;
      }

      return `${mins}:${secondsLeft}`;
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.item {
  display: flex;
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;

  @media (min-width: $breakpoint-xsmall) {
    width: 50%;
  }

  @media (min-width: $breakpoint-medium) {
    width: 33.3333333%;
  }

  @media (min-width: 1450px) {
    width: 25%;
  }

  @media (min-width: 2000px) {
    width: 20%;
  }

  @media (min-width: 3000px) {
    width: 16.6666667%;
  }
}

.link {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.image {
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  background-color: $secondary-color;

  img,
  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.lazyloaded .lazyload {
    opacity: 0.8;
  }
}

.play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.duration {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.4rem 1.2rem 0.2rem;
  font-size: 1.3rem;
  background-color: rgba(0, 0, 0, 0.7);
}

.name {
  flex: 1 0 auto;
  margin-top: 1rem;
  font-size: 1.3rem;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
}

.type {
  font-size: 1.2rem;
  color: $text-color-grey;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    font-size: 1.4rem;
  }
}
</style>
