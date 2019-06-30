<template>
  <div class="card" @click="cardClicked(card)">
    <img :src="card.imageUrl"/>
    <div class="card-name">{{card.name}}</div>
    <div class="card-code subhead">{{cardCode}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { DECKLIST } from '@/store/actions';

@Component({
  components: {
  },
})
export default class Card extends Vue {
  @Prop({ type: Object as () => PokemonTCG.Card }) public card!: PokemonTCG.Card;
  get cardCode(): string {
    return `${this.card.setCode} ${this.card.number}`;
  }

  public cardClicked(card: PokemonTCG.Card) {
    this.$store.commit(DECKLIST.ADD_CARD, card);
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card {
  @include stack($spacing: 5px);
  margin: 10px;
  width: 160px;
  text-align: center;
  flex: 0 1 auto;

  img {
    width: 100%;
  }
}
</style>
