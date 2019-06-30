<template>
  <div class="decklist">
    <SearchBar id="search-bar-container" @toggleDecklist="isCardlistShown = !isCardlistShown"/>
    <!-- <button @click="isCardlistShown = !isCardlistShown">Click</button> -->
    <div class="workarea">
      <SearchResults id="search-results-container" :class="{'cardlist-shown': isCardlistShown}"/>
      <Cardlist id="card-list-container" :class="{'cardlist-shown': isCardlistShown}"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Cardlist from '@/components/cardlist/Cardlist.vue';
import SearchBar from '@/components/search/SearchBar.vue';
import SearchResults from '@/components/search/SearchResults.vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    SearchBar,
    SearchResults,
    Cardlist,
  },
})
export default class DecklistBuilder extends Vue {
  private isCardlistShown = false;
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

$cardlist-width: 300px;

.decklist {
  display: flex;
  flex-direction: column;
}

#search-bar-container {
  flex: 1 0 auto;
}

.workarea {
  position: relative;
  height: 100%;
}

#search-results-container {
  position: absolute;
  top: 0;
  right: $cardlist-width;
  bottom: 0;
  left: 0;

  transition: right $default--transition-duration ease;
  overflow-y: auto;

  &.cardlist-shown {
    right: 0;
  }
}

#card-list-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: $cardlist-width;

  transition: right $default--transition-duration ease;

  &.cardlist-shown {
    right: -$cardlist-width;
  }
}
</style>
