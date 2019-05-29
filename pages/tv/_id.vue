<template>
  <main class="main">
    <TopNav
      :title="metaTitle" />

    <Hero
      :item="item" />

    <MediaNav
      :menu="menu"
      @clicked="navClicked" />

    <template v-if="activeMenu === 'overview'">
      <TvInfo
        :item="item" />

      <Credits
        v-if="showCredits"
        :people="item.credits.cast" />
    </template>

    <template v-if="activeMenu === 'episodes' && showEpisodes">
      <Episodes
        :number-of-seasons="item.number_of_seasons" />
    </template>

    <template v-if="activeMenu === 'videos' && showVideos">
      <Videos
        :videos="item.videos.results" />
    </template>

    <template v-if="activeMenu === 'photos' && showImages">
      <Images
        v-if="item.images.backdrops.length"
        title="Backdrops"
        type="backdrop"
        :images="item.images.backdrops" />

      <Images
        v-if="item.images.posters.length"
        title="Posters"
        type="poster"
        :images="item.images.posters" />
    </template>

    <ListingCarousel
      v-if="recommended && recommended.results.length"
      title="More Like This"
      :items="recommended" />
  </main>
</template>

<script>
import { apiImgUrl, getTvShow, getTvShowRecommended } from '~/api';
import { name, yearStart, yearEnd } from '~/mixins/Details';
import TopNav from '~/components/global/TopNav';
import Hero from '~/components/Hero';
import MediaNav from '~/components/MediaNav';
import TvInfo from '~/components/tv/TvInfo';
import Videos from '~/components/Videos';
import Images from '~/components/Images';
import Credits from '~/components/Credits';
import Episodes from '~/components/tv/Episodes';
import ListingCarousel from '~/components/ListingCarousel';

export default {
  components: {
    TopNav,
    Hero,
    MediaNav,
    TvInfo,
    Videos,
    Images,
    Credits,
    Episodes,
    ListingCarousel,
  },

  mixins: [
    name,
    yearStart,
    yearEnd,
  ],

  head () {
    return {
      title: this.metaTitle,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.metaTitle },
        { hid: 'og:description', property: 'og:description', content: this.metaDescription },
        { hid: 'description', name: 'description', content: this.metaDescription },
        { hid: 'og:image', property: 'og:image', content: this.metaImage },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
      ],
      bodyAttrs: {
        class: 'topnav-active',
      },
    };
  },

  data () {
    return {
      menu: [],
      activeMenu: 'overview',
      recommended: null,
    };
  },

  computed: {
    metaTitle () {
      if (this.item.status === 'Ended' && this.yearStart && this.yearEnd) {
        return `${this.name} (TV Series ${this.yearStart}-${this.yearEnd})`;
      } else if (this.yearStart) {
        return `${this.name} (TV Series ${this.yearStart}-)`;
      } else {
        return `${this.name} (TV Series)`;
      }
    },

    metaDescription () {
      if (this.item.overview) {
        return this.truncate(this.item.overview, 200);
      } else {
        return '';
      }
    },

    metaImage () {
      if (this.item.poster_path) {
        return `${apiImgUrl}/w500${this.item.poster_path}`;
      } else {
        return '';
      }
    },

    showCredits () {
      const credits = this.item.credits;
      return credits && credits.cast && credits.cast.length;
    },

    showEpisodes () {
      return this.item.number_of_seasons;
    },

    showVideos () {
      const videos = this.item.videos;
      return videos && videos.results && videos.results.length;
    },

    showImages () {
      const images = this.item.images;
      return images && ((images.backdrops && images.backdrops.length) || (images.posters && images.posters.length));
    },
  },

  async asyncData ({ params, error }) {
    try {
      const item = await getTvShow(params.id);

      if (item.adult) {
        error({ message: 'This tv show is not available' });
      } else {
        return { item };
      }
    } catch {
      error({ message: 'Page not found' });
    }
  },

  created () {
    this.createMenu();
    this.initRecommended();
  },

  methods: {
    truncate (string, length) {
      return this.$options.filters.truncate(string, length);
    },

    createMenu () {
      const menu = [];

      // overview
      menu.push('Overview');

      // episodes
      if (this.showEpisodes) menu.push('Episodes');

      // videos
      if (this.showVideos) menu.push('Videos');

      // images
      if (this.showImages) menu.push('Photos');

      this.menu = menu;
    },

    navClicked (label) {
      this.activeMenu = label;
    },

    initRecommended () {
      // if recommended don't exist, retreive them
      if (this.recommended !== null) return;

      getTvShowRecommended(this.$route.params.id).then((response) => {
        this.recommended = response;
      });
    },
  },
};
</script>
