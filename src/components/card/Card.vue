<template>
  <div class="card" @click="cardClicked(card)">
    <img :src="card.imageUrl" v-tooltip="{ content: tooltipContent }"/>
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

  get tooltipContent(): string {
    return `
      <div>
        <p>${this.card}</p>
        <img src="${this.card.imageUrl}"/>
      </div>
    `;
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
  text-align: center;

  img {
    width: 240px;
    height: 335px;
    border-radius: 12px;
  }

  @media (max-width: 800px) {
    width: inherit;
  }
}

.potato {
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>
