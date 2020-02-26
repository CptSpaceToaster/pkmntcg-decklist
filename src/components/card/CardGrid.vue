<template>
  <div class="card-grid" :class="{'loading': loading}">
    <Card v-for="card in cards" :key="card.id" :card="card" @cardClicked="cardClicked(card)" @showCardInfo="showCardInfo(card)"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/card/Card.vue';
import { Component } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { DECKLIST, MODAL } from '@/store/actions';
import { NavigationStatus } from '@/types/network';

@Component({
  components: {
    Card,
  },
})
export default class CardGrid extends Vue {
  get loading(): boolean {
    return this.$store.state.search.status === NavigationStatus.LOADING;
  }

  get cards(): PokemonTCG.Card[] {
    if (this.$store.state.search.sets === this.$store.state.standardSets) {
      return this.$store.state.search.searchedCards.filter((card: PokemonTCG.Card) => card.setCode !== 'smp' || parseInt(card.number.slice(2), 10) >= 94);
    } else {
      return this.$store.state.search.searchedCards;
    }
  }

  public cardClicked(card: PokemonTCG.Card) {
    this.$store.commit(DECKLIST.ADD_CARD, card);
  }

  public showCardInfo(card: PokemonTCG.Card) {
    this.$store.commit(MODAL.SET_CARD_INFO, card);
    this.$store.dispatch(MODAL.LOAD_CARD_PRICE, card);
    this.$router.push({ path: this.$route.name, query: { card: card.id }});
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
  padding-bottom: 40px;
  transition: opacity $default--transition-duration ease;

  &.loading {
    opacity: 0.6;
  }
}
</style>
