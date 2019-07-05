<template>
  <div class="decklist">
    <SearchFilters id="search-bar-container"/>
    <CardGrid id="card-grid-container" :class="{'card-stack-shown': isCardStackShown}"/>
    <CardStack id="card-stack-container" :class="{'card-stack-shown': isCardStackShown}" @toggleDecklist="isCardStackShown = !isCardStackShown"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CardGrid from '@/components/card/CardGrid.vue';
import CardStack from '@/components/card/CardStack.vue';
import SearchFilters from '@/components/search/SearchFilters.vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    SearchFilters,
    CardGrid,
    CardStack,
  },
})
export default class DecklistBuilder extends Vue {
  private isCardStackShown = false;
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

$card-stack-width: 300px;
$search-height: 70px;

#search-bar-container {
  position: sticky;
  top: 0;
}

#card-grid-container {
  transition: padding-right $default--transition-duration ease;
  &.card-stack-shown {
    padding-right: $card-stack-width;
  }
}

#card-stack-container {
  position: fixed;
  overflow-y: auto;
  background-color: $background-color;

  bottom: calc(70px - 100%);
  right: 0;
  width: $card-stack-width;
  height: 100%;

  transition: bottom $default--transition-duration ease;

  &.card-stack-shown {
    bottom: 0;
  }
}

.fab {
  bottom: 10px;
  right: 10px;
}
</style>
