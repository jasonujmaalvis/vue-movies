<template>
  <div class="spacing">
    <div :class="$style.head">
      <div :class="$style.filter">
        <label for="credits_category">
          Department
        </label>

        <select
          id="credits_category"
          v-model="active_category"
          :disabled="!categories.length || categories.length === 1"
          @change="filterCredits">
          <option value="all">
            All
          </option>

          <option
            v-for="(category) in categories"
            :key="`credit-filter-${category.toLowerCase()}`"
            :value="category.toLowerCase()">
            {{ category }}
          </option>
        </select>
      </div>

      <div :class="$style.filter">
        <label for="credits_media">
          Media
        </label>

        <select
          id="credits_media"
          v-model="active_media"
          @change="getCredits">
          <option value="combined_credits">
            All
          </option>
          <option value="movie_credits">
            Movies
          </option>
          <option value="tv_credits">
            TV Shows
          </option>
        </select>
      </div>
    </div>

    <div
      v-for="category in active_credits"
      :key="`credits-${category.name.toLowerCase()}`"
      :class="$style.category">
      <h2 :class="$style.title">
        {{ category.name }}
      </h2>

      <table>
        <tbody>
          <CreditsHistoryGroup
            v-for="group in category.groups"
            :key="`credit-${category.name.toLowerCase()}-${group.year}`"
            :group="group" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getCredits } from '~/api';
import CreditsHistoryGroup from '~/components/person/CreditsHistoryGroup';

export default {
  components: {
    CreditsHistoryGroup,
  },

  props: {
    credits: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      active_media: 'combined_credits',
      active_category: 'all',
      categories: [],
      active_credits: null,
      combined_credits: [],
      movie_credits: [],
      tv_credits: [],
    };
  },

  created () {
    const cast = this.handleCast(this.credits.cast);
    const crew = this.handleCrew(this.credits.crew);

    if (cast) this.$data[this.active_media].push({ name: 'Acting', groups: cast });
    if (crew) this.$data[this.active_media] = [...this.$data[this.active_media], ...crew];

    // set the active credits
    this.active_credits = this.$data[this.active_media];

    // set the category filter
    this.categories = this.getCategories();
  },

  methods: {
    handleCast (items) {
      if (!items || !items.length) return;

      // group credits (by year)
      let groups = this.groupItems(items);

      // get blank group (no year)
      const blankGroup = groups.find(group => group.year === '');

      // remove blank group
      if (blankGroup) groups = groups.filter(group => group.year !== '');

      // sort groups by year
      this.sortGroups(groups);

      // add blank group to the start
      if (blankGroup) groups.unshift(blankGroup);

      // sort credits in the group by date
      groups.forEach(group => this.sortCredits(group.credits));

      return groups;
    },

    handleCrew (items) {
      if (!items || !items.length) return;

      // group by department
      const categories = this.createCategories(items);

      categories.forEach((category) => {
        // group credits (by year)
        let groups = this.groupItems(category.groups);

        // get blank group (no year)
        const blankGroup = groups.find(group => group.year === '');

        // remove blank group
        if (blankGroup) groups = groups.filter(group => group.year !== '');

        // sort groups by year
        this.sortGroups(groups);

        // add blank group to the start
        if (blankGroup) groups.unshift(blankGroup);

        // sort credits in the group by date
        groups.forEach(group => this.sortCredits(group.credits));

        // set items to the new group
        category.groups = groups;
      });

      return categories;
    },

    getCategories () {
      return this.active_credits.map(category => category.name);
    },

    getCredits () {
      const media = this.active_media;

      // if we already have the credits, just show them
      // else do api call
      if (this.$data[media] && this.$data[media].length) {
        this.active_credits = this.$data[media];
        this.active_category = 'all';
        this.categories = this.getCategories();
      } else {
        getCredits(this.$route.params.id, media).then((response) => {
          const cast = this.handleCast(response.cast);
          const crew = this.handleCrew(response.crew);

          if (cast) this.$data[media].push({ name: 'Acting', groups: cast });
          if (crew) this.$data[media] = [...this.$data[media], ...crew];

          this.active_credits = this.$data[media];
          this.active_category = 'all';
          this.categories = this.getCategories();
        });
      }
    },

    filterCredits () {
      if (this.active_category === 'all') {
        this.active_credits = this.$data[this.active_media];
      } else {
        this.active_credits = this.$data[this.active_media].filter(category => category.name.toLowerCase() === this.active_category);
      }
    },

    createCategories (items) {
      const categories = [];

      items.forEach((item) => {
        const exists = categories.find(category => category.name === item.department);

        if (exists) {
          exists.groups.push(item);
        } else {
          categories.push({
            name: item.department,
            groups: [item],
          });
        }
      });

      return categories;
    },

    groupItems (items) {
      return items.reduce(function (arr, current) {
        const date = current.release_date ? current.release_date : current.first_air_date;
        const year = date ? date.split('-')[0] : '';
        const exists = arr.find(item => item.year === year);

        if (exists) {
          exists.credits.push(current);
        } else {
          arr.push({
            year,
            credits: [current],
          });
        }

        return arr;
      }, []);
    },

    sortGroups (items) {
      return items.sort((a, b) => a.year > b.year ? -1 : 1);
    },

    sortCredits (items) {
      // sort items in the group by date
      return items.sort((a, b) => {
        const aDate = a.release_date ? a.release_date : a.first_air_date;
        const bDate = b.release_date ? b.release_date : b.first_air_date;

        if (aDate > bDate) {
          return -1;
        } else if (aDate < bDate) {
          return 1;
        }

        return 0;
      });
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
}

.filter {
  margin-right: 3rem;

  label {
    margin-right: 1rem;
    font-size: 1.2rem;
    letter-spacing: $letter-spacing;

    @media (min-width: $breakpoint-large) {
      font-size: 1.4rem;
    }
  }
}

.category {
  margin-bottom: 3rem;
}

.title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    margin-bottom: 2rem;
    font-size: 2.4rem;
  }
}
</style>
