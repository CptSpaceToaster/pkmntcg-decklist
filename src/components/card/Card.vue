<template>
  <div class="card" @click="$emit('cardClicked')">
    <picture>
      <source media="(min-width: 550px)" :srcset="card.imageUrl">
      <img :src="card.imageUrlHiRes">
    </picture>

    <div class="card-name">{{card.name}}</div>
    <div class="card-code subhead">{{cardCode}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

@Component({
  components: {
  },
})
export default class Card extends Vue {
  @Prop() public card!: PokemonTCG.Card;

  get cardCode(): string {
    const set = this.$store.state.sets
      .filter((set: PokemonTCG.Set) => set.code === this.card.setCode)[0];
    return `${set.name} ${this.card.number}/${set.totalCards}`;
  }

  get tooltipContent(): string {
    return `${this.card.name}`;
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
    border-radius: 12px;
  }

  @media (max-width: 550px) {
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }

  }
}
</style>
