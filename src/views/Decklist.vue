<template>
  <div class="decklist">
    <SearchBar/>
    <div class="body">
      <SearchResults/>
      <Cardlist/>
    </div>
  </div>
</template>

<script lang="ts">
import Cardlist from '@/components/cardlist/Cardlist.vue';
import SearchBar from '@/components/search/SearchBar.vue';
import SearchResults from '@/components/search/SearchResults.vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    SearchBar,
    SearchResults,
    Cardlist,
  },
})
export default class Decklist extends Vue {
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.decklist {
  .search-bar {
    padding: 30px;
    border-bottom: 1px solid $primary;
  }

  .body {
    @include row($spacing: 0);
    align-items: stretch;
    .search-results {
      padding: 30px 0;
    }
    .card-list {
      width: 800px;
    }
  }
}
</style>
