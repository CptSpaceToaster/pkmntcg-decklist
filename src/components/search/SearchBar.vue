<template>
  <div class="search-bar">
    <span>Search</span>
    <input @input="handleInput" class="search-input"/>
  </div>
</template>

<script lang="ts">
import globals from '@/globals';
import { SEARCH } from '@/store/actions';
import { debounce } from 'lodash';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class SearchBar extends Vue {
  public handleInput = debounce(this.searchCards, globals.debounceInterval);

  public searchCards(event: any) {
    if (event.target.value) {
      this.$store.commit(SEARCH.NAME, event.target.value);
      this.$store.dispatch(SEARCH.CARD);
    }
  }
  public doSearch() {
    this.$store.dispatch(SEARCH.CARD);
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.search-bar {
  @include row($spacing: 5px);

  input {
    padding: 5px;
    border: solid 1px $primary;
    border-radius: 5px;
  }
}
</style>
