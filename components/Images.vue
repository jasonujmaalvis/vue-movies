<template>
  <div class="spacing">
    <div :class="$style.head">
      <h2 :class="$style.title">
        {{ title }}
      </h2>

      <strong :class="$style.count">
        {{ imagesCount }}
      </strong>
    </div>

    <div :class="$style.items">
      <ImagesItem
        v-for="(image, index) in images"
        :key="`image-${index}`"
        :image="image"
        :index="index"
        :type="type"
        @openModal="openModal" />
    </div>

    <Modal
      v-if="modalVisible"
      :data="images"
      modifier="modal--images"
      aria-label="Images"
      nav
      :start-at="modalStartAt"
      @close="closeModal" />
  </div>
</template>

<script>
import { apiImgUrl } from '~/api';
import ImagesItem from '~/components/ImagesItem';
import Modal from '~/components/Modal';

export default {
  components: {
    ImagesItem,
    Modal,
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    images: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      modalVisible: false,
      modalStartAt: 0,
    };
  },

  computed: {
    imagesCount () {
      return `${this.images.length} ${this.images.length > 1 ? 'Images' : 'Image'}`;
    },
  },

  created () {
    this.handleData();
  },

  methods: {
    handleData () {
      let thumb;

      if (this.type === 'poster') {
        thumb = `${apiImgUrl}/w370_and_h556_bestv2`;
      } else {
        thumb = `${apiImgUrl}/w533_and_h300_bestv2`;
      }

      this.images.map((image) => {
        image.thumb = `${thumb}${image.file_path}`;
        image.src = `${apiImgUrl}/original${image.file_path}`;
      });
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
  align-items: baseline;
  margin-bottom: 1.5rem;

  @media (min-width: $breakpoint-large) {
    margin-bottom: 2rem;
  }
}

.title {
  font-size: 1.8rem;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    font-size: 2.4rem;
  }
}

.count {
  margin-left: 1rem;
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
  margin-right: -0.4rem;
  margin-left: -0.4rem;
}
</style>
