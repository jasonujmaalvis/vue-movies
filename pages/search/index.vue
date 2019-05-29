<template>
  <main class="main">
    <SearchResults
      v-if="items && items.results.length"
      :title="title"
      :items="items"
      :loading="loading"
      @loadMore="loadMore" />
  </main>
</template>

<script>
import { search } from '~/api';
import SearchResults from '~/components/search/SearchResults';
let fromPage = '/';

export default {
  components: {
    SearchResults,
  },

  data () {
    return {
      loading: false,
    };
  },

  head () {
    return {
      title: 'Search',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Search' },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
      ],
      bodyAttrs: {
        class: 'page page-search',
      },
    };
  },

  computed: {
    query () {
      return this.$route.query.q ? this.$route.query.q : '';
    },

    title () {
      return this.query ? `Results For: ${this.query}` : '';
    },
  },

  async asyncData ({ query, error, redirect }) {
    try {
      if (query.q) {
        const items = await search(query.q, 1);
        return { items };
      } else {
        redirect('/');
      }
    } catch {
      error({ message: 'Page not found' });
    }
  },

  mounted () {
    this.$store.commit('search/openSearch');
    this.$store.commit('search/setFromPage', fromPage);
  },

  beforeRouteEnter (to, from, next) {
    fromPage = from.path;
    next();
  },

  beforeRouteUpdate (to, from, next) {
    next();
    this.getResults();
  },

  beforeRouteLeave (to, from, next) {
    const search = document.getElementById('search');

    next();

    if (search && search.value.length) {
      this.$store.commit('search/closeSearch');
    }
  },

  methods: {
    async getResults () {
      // if no search query
      if (!this.query.length) {
        this.items = null;
        return;
      }

      // trigger ajax call;
      const data = await search(this.query);

      // if no results, do nothing
      if (!data.total_results) {
        this.items = null;
        return;
      }

      // update the items
      this.items = data;
    },

    loadMore () {
      this.loading = true;

      search(this.query, this.items.page + 1).then((response) => {
        this.items.results = this.items.results.concat(response.results);
        this.items.page = response.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/css/utilities/_variables.scss';

.page-search .main {
  padding-top: 6rem;

  @media (min-width: $breakpoint-large) {
    padding-top: 8rem;
  }
}
</style>
