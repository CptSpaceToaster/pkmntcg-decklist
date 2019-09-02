<template>
  <div class="deck-grid">
    <div class="grid-area">
      <!-- <Card v-for="card in pokemonCards" :key="card.id" :card="card" @cardClicked="cardClicked(card)"/> -->
      <CardPile v-for="bundle in pokemonBundles" :key="bundle.card.id" :bundle="bundle" @cardClicked="cardClicked(card)"/>
    </div>
    <div class="grid-area">
      <!-- <Card v-for="card in trainerCards" :key="card.id" :card="card" @cardClicked="cardClicked(card)"/> -->
      <CardPile v-for="bundle in trainerBundles" :key="bundle.card.id" :bundle="bundle" @cardClicked="cardClicked(card)"/>
    </div>
    <div class="grid-area">
      <!-- <Card v-for="card in energyCards" :key="card.id" :card="card" @cardClicked="cardClicked(card)"/> -->
      <CardPile v-for="bundle in energyBundles" :key="bundle.card.id" :bundle="bundle" @cardClicked="cardClicked(card)"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CardPile from '@/components/card/CardPile.vue';
import { Component } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { DECKLIST } from '@/store/actions';
import { NavigationStatus } from '@/types/network';
import { CardBundle } from '@/types/bundle';
import { Decklist } from '@/types/decklist';

@Component({
  components: {
    CardPile,
  },
})
export default class DeckGrid extends Vue {
  get decklist(): Decklist {
    return this.$store.state.decklist.decklist;
  }

  get pokemonBundles(): CardBundle[] {
    return this.decklist.pokemonBundles;
  }

  get trainerBundles(): CardBundle[] {
    return this.decklist.trainerBundles;
  }

  get energyBundles(): CardBundle[] {
    return this.decklist.energyBundles;
  }

  get pokemonCards(): PokemonTCG.Card[] {
    return this.decklist.pokemonBundles.map((bundle) => bundle.card);
  }

  get trainerCards(): PokemonTCG.Card[] {
    return this.decklist.trainerBundles.map((bundle) => bundle.card);
  }

  get energyCards(): PokemonTCG.Card[] {
    return this.decklist.energyBundles.map((bundle) => bundle.card);
  }

  public cardClicked(card: PokemonTCG.Card) {
    // console.log(card);
    this.$store.commit(DECKLIST.ADD_CARD, card);
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.deck-grid {
  @include stack();
  padding: 20px;
}

.grid-area {
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
