<template>
  <div class="decklist">
    <SearchBar id="search-bar-container" @toggleDecklist="isCardlistShown = !isCardlistShown"/>
    <div class="workarea">
      <SearchResults id="search-results-container" :class="{'cardlist-shown': isCardlistShown}"/>
      <Cardlist id="card-list-container" :class="{'cardlist-shown': isCardlistShown}"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Cardlist from '@/components/Cardlist.vue';
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
$search-height: 70px;

#search-bar-container {
  position: sticky;
  top: 0;
}

.workarea {
  display: flex;
  align-items: flex-start;
}

#search-results-container {
  flex: 1 1 auto;
  transition: margin-right $default--transition-duration ease;

  &.cardlist-shown {
    margin-right: -$cardlist-width;
  }

  @media (max-width: 800px) {
    margin-right: -$cardlist-width;
  }
}

#card-list-container {
  flex: 0 0 $cardlist-width;
  position: sticky;
  top: $search-height;
  bottom: 0;
  min-height: calc(100vh - 70px);
  overflow-y: auto;
  background-color: white;
  border-left: 1px solid black;

  transition: transform $default--transition-duration ease;

  &.cardlist-shown {
    transform: translateX($cardlist-width);
  }
}
</style>
