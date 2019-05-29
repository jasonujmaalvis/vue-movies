<template>
  <main class="main">
    <Hero
      :item="featured" />

    <ListingCarousel
      v-if="popular && popular.results.length"
      :title="popularTitle"
      :view-all-url="popularUrl"
      :items="popular" />

    <ListingCarousel
      v-if="topRated && topRated.results.length"
      :title="topRatedTitle"
      :view-all-url="topRatedUrl"
      :items="topRated" />

    <ListingCarousel
      v-if="upcoming && upcoming.results.length"
      :title="upcomingTitle"
      :view-all-url="upcomingUrl"
      :items="upcoming" />

    <ListingCarousel
      v-if="nowPlaying && nowPlaying.results.length"
      :title="nowPlayingTitle"
      :view-all-url="nowPlayingUrl"
      :items="nowPlaying" />
  </main>
</template>

<script>
import { getMovies, getMovie, getListItem } from '~/api';
import Hero from '~/components/Hero';
import ListingCarousel from '~/components/ListingCarousel';

export default {
  components: {
    Hero,
    ListingCarousel,
  },

  head () {
    return {
      title: 'Movies',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Movies' },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
      ],
    };
  },

  computed: {
    popularTitle () {
      return getListItem('movie', 'popular').title;
    },

    popularUrl () {
      return { name: 'movie-category-name', params: { name: 'popular' } };
    },

    topRatedTitle () {
      return getListItem('movie', 'top_rated').title;
    },

    topRatedUrl () {
      return { name: 'movie-category-name', params: { name: 'top_rated' } };
    },

    upcomingTitle () {
      return getListItem('movie', 'upcoming').title;
    },

    upcomingUrl () {
      return { name: 'movie-category-name', params: { name: 'upcoming' } };
    },

    nowPlayingTitle () {
      return getListItem('movie', 'now_playing').title;
    },

    nowPlayingUrl () {
      return { name: 'movie-category-name', params: { name: 'now_playing' } };
    },
  },

  async asyncData ({ error }) {
    try {
      const popular = await getMovies('popular');
      const topRated = await getMovies('top_rated');
      const upcoming = await getMovies('upcoming');
      const nowPlaying = await getMovies('now_playing');
      const featured = await getMovie(upcoming.results[0].id);

      return { popular, topRated, upcoming, nowPlaying, featured };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },
};
</script>
