<template>
  <div class="search-results">
    <Card v-for="card in cards" :key="card.id" :card="card"/>
  </div>
</template>

<script lang="ts">
import Card from '@/components/Card.vue';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    Card,
  },
})
export default class SearchResults extends Vue {
  get cards(): PokemonTCG.Card[] {
    return this.$store.state.search.searchedCards;
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.search-results {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
}
</style>
