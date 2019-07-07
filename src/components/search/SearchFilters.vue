<template>
  <div class="search-bar">
    <span class="search-filters">
      <label>Search</label>
      <input @input="searchCards" class="search-input"/>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import globals from '@/globals';
import { Component } from 'vue-property-decorator';
import { debounce } from 'lodash';
import { SEARCH } from '@/store/actions';

@Component({
  components: {
  },
})
export default class SearchFilters extends Vue {
  public dispatchSearch = debounce(() => {
    this.$store.dispatch(SEARCH.REQUEST);
  }, globals.debounceInterval);
  public searchCards(event: any) {
    if (event.target.value) {
      this.$store.commit(SEARCH.NAME, event.target.value);
      this.dispatchSearch();
    }
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.search-bar {
  @include row($align: stretch);
  background: $secondary;
}

.search-filters {
  margin: 20px;
  flex: 1 1 auto;
  @include row($spacing: 5px);
}

input {

}
</style>
