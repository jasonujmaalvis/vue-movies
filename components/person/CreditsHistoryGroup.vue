<template>
  <tr :class="$style.group">
    <td :class="$style.row">
      <table>
        <tbody>
          <CreditsHistoryItem
            v-for="credit in group.credits"
            :key="`credit-${credit.credit_id}`"
            :year="group.year"
            :credit="credit" />
        </tbody>
      </table>
    </td>
  </tr>
</template>

<script>
import CreditsHistoryItem from '~/components/person/CreditsHistoryItem';

export default {
  components: {
    CreditsHistoryItem,
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.group:nth-child(odd) {
  background-color: $secondary-color;
}

.row {
  padding: 0;
}
</style>
