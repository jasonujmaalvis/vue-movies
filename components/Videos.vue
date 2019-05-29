<template>
  <div class="spacing">
    <div :class="$style.head">
      <select
        v-if="videoTypes.length > 1"
        v-model="activeType"
        @change="filterVideos">
        <option value="all">
          All
        </option>
        <option
          v-for="type in videoTypes"
          :key="`video-type-${type}`"
          :value="type">
          {{ type }}
        </option>
      </select>

      <strong :class="$style.count">
        {{ videoCount }}
      </strong>
    </div>

    <div :class="$style.items">
      <VideosItem
        v-for="(video, index) in activeVideos"
        :key="`video-${video.id}`"
        :video="video"
        :index="index"
        @openModal="openModal" />
    </div>

    <Modal
      v-if="modalVisible"
      :data="videos"
      type="iframe"
      nav
      :start-at="modalStartAt"
      @close="closeModal" />
  </div>
</template>

<script>
import { getYouTubeVideo } from '~/api';
import VideosItem from '~/components/VideosItem';
import Modal from '~/components/Modal';

export default {
  components: {
    VideosItem,
    Modal,
  },

  props: {
    videos: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      activeType: 'all',
      activeVideos: this.videos,
      modalVisible: false,
      modalStartAt: 0,
    };
  },

  computed: {
    videoCount () {
      return `${this.activeVideos.length} ${this.activeVideos.length > 1 ? 'Videos' : 'Video'}`;
    },

    videoTypes () {
      return this.videos.map(video => video.type).filter((video, index, self) => self.indexOf(video) === index);
    },
  },

  created () {
    this.handleData();
  },

  methods: {
    handleData () {
      const ids = this.videos.map(video => video.key).join(',');

      // video params
      this.videos.forEach((video) => {
        this.$set(video, 'thumb', `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`);
        this.$set(video, 'src', `https://www.youtube.com/embed/${video.key}?rel=0&showinfo=0&autoplay=1`);
        this.$set(video, 'url', `https://youtube.com/watch?v=${video.key}`);
      });

      // get video duration from YouTube api
      getYouTubeVideo(ids).then((response) => {
        for (let index = 0; index < this.videos.length; index++) {
          if (response.items[index]) {
            this.$set(this.videos[index], 'duration', response.items[index].contentDetails.duration);
          }
        }
      });
    },

    filterVideos () {
      this.activeVideos = this.videos.filter(video => this.activeType === 'all' ? true : video.type === this.activeType);
    },

    openModal (index) {
      this.modalStartAt = index;
      this.modalVisible = true;
    },

    closeModal () {
      this.modalVisible = false;
      this.modalStartAt = 0;
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.head {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (min-width: $breakpoint-large) {
    margin-bottom: 2rem;
  }

  select {
    margin-right: 1rem;
  }
}

.count {
  font-size: 1.2rem;
  color: $text-color-grey;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    font-size: 1.4rem;
  }
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin-right: -1rem;
  margin-left: -1rem;
}
</style>
