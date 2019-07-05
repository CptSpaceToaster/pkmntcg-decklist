<template>
  <div class="card-grid">
    <Card v-for="card in cards" :key="card.id" :card="card"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/card/Card.vue';
import { Component } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

@Component({
  components: {
    Card,
  },
})
export default class CardGrid extends Vue {
  get cards(): PokemonTCG.Card[] {
    return this.$store.state.search.searchedCards;
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-grid {
  display: flex;
  align-content: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
}

.boxxy {
  width: 240px;
  height: 360px;
  background-color: lightpink;
  margin: 10px;
}
</style>
