<template>
  <div class="card" @click="$emit('cardClicked')">
    <v-popover trigger="hover">
      <picture>
        <source media="(min-width: 550px)" :srcset="card.imageUrl">
        <img :src="card.imageUrlHiRes">
      </picture>
      <CardInfo :card="card" slot="popover"/>
    </v-popover>
    <div class="card-name">{{card.name}}</div>
    <div class="card-code subhead">{{cardCode}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CardInfo from '@/components/card/CardInfo.vue';
import { Component, Prop } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

@Component({
  components: {
    CardInfo,
  },
})
export default class Card extends Vue {
  @Prop() public card!: PokemonTCG.Card;

  get cardCode(): string {
    const set = this.$store.state.sets
      .filter((set: PokemonTCG.Set) => set.code === this.card.setCode)[0];
    if (!!set) {
      return `${set.name} ${this.card.number}/${set.totalCards}`;
    } else {
      return `${this.card.number}`;
    }
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
