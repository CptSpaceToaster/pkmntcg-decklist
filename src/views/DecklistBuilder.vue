<template>
  <div class="decklist-builder">
    <SearchFilters id="search-bar-container"/>
    <CardGrid id="card-grid-container" :class="{'card-stack-shown': isCardStackShown}"/>
    <CardStackHeader id="card-stack-header-container" @toggleInspector="gotoInspector()" @toggleDecklist="toggleList()"/>
    <CardStack id="card-stack-container" :class="{'card-stack-shown': isCardStackShown}" @toggleInspector="gotoInspector()" @toggleDecklist="toggleList()"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CardGrid from '@/components/card/CardGrid.vue';
import CardStackHeader from '@/components/card/CardStackHeader.vue';
import CardStack from '@/components/card/CardStack.vue';
import SearchFilters from '@/components/search/SearchFilters.vue';
import { Component } from 'vue-property-decorator';
import { Decklist } from '@/types/decklist';

@Component({
  components: {
    SearchFilters,
    CardGrid,
    CardStackHeader,
    CardStack,
  },
})
export default class DecklistBuilder extends Vue {
  private isCardStackShown = window.innerWidth > 550;

  get decklist(): Decklist {
    return this.$store.state.decklist.decklist;
  }

  private gotoInspector() {
    this.$router.push('inspector');
  }

  private toggleList() {
    this.isCardStackShown = !this.isCardStackShown;
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

$card-stack-width: 300px;

#search-bar-container {
  z-index: 100;
  position: sticky;
  top: 0;
}

#card-grid-container {
  z-index: 50;
  transition: padding-right $default--transition-duration ease;
}

#card-stack-container {
  z-index: 200;
  position: fixed;
  right: 0;
  width: $card-stack-width;
  max-height: 100%;
  bottom: -100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border: 1px solid $border-color;
  overflow-y: auto;
  transition: all $default--transition-duration ease;

  &.card-stack-shown {
    bottom: 0;
  }
}

#card-stack-header-container {
  position: fixed;
  right: 0;
  width: $card-stack-width;
  bottom: 0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border: 1px solid $border-color;
}
</style>
